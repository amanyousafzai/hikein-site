import { useState } from "react";
import { Link } from "react-router";
import type { FeedPost } from "../data/community";
import CommentSection from "./CommentSection";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";

interface Props {
  post: FeedPost;
}

const postTypeLabel: Record<string, string> = {
  adventure: "Completed an adventure",
  photo: "Shared a photo",
  tripreport: "Published a trip report",
  achievement: "Earned an achievement",
  update: "Shared an update",
  tip: "Shared an outdoor tip",
  question: "Asked the community",
};

export default function FeedCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  async function handleLike() {
    if (!user) {
      setMessage("Sign in to like this activity.");
      return;
    }
    const next = !liked;
    setLiked(next);
    setLikeCount((count) => count + (next ? 1 : -1));
    try {
      await productApi.toggleInteraction("like", post.id, next);
    } catch {
      setLiked(!next);
      setLikeCount((count) => count + (next ? -1 : 1));
      setMessage("Like could not be saved.");
    }
  }

  async function handleSave() {
    if (!user) {
      setMessage("Sign in to save this activity.");
      return;
    }
    const next = !saved;
    setSaved(next);
    try {
      await productApi.toggleInteraction("save", post.id, next);
      setMessage(next ? "Saved to your collection." : "Removed from saved items.");
    } catch {
      setSaved(!next);
      setMessage("Save could not be updated.");
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}/posts/${post.id}`;
    if (navigator.share) {
      await navigator.share({ title: `${post.author.name} on HikeIN`, text: post.content.slice(0, 120), url });
    } else {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied to clipboard.");
    }
  }

  async function handleReport() {
    if (!user) {
      setMessage("Sign in to report content.");
      return;
    }
    await productApi.reportContent("post", post.id, "Community standards review");
    setMenuOpen(false);
    setMessage("Report submitted for moderator review.");
  }

  return (
    <article className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
      {/* Author row */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Link to={`/explorer/${post.author.username}`}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ede9e0] hover:ring-[#2a4d0f] transition-all"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to={`/explorer/${post.author.username}`} className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">
              {post.author.name}
            </Link>
            <span className="text-[#8a8278] text-xs">·</span>
            <span className="text-[#8a8278] text-xs">{post.author.location}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[#5a5549] text-xs">{postTypeLabel[post.type]}</span>
            <span className="text-[#8a8278] text-xs">·</span>
            <span className="text-[#8a8278] text-xs">{post.timestamp}</span>
          </div>
        </div>
        <div className="relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#8a8278] hover:text-[#2e2b26] transition-colors p-1" aria-label="Post options">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#ddd8cc] rounded-xl shadow-xl p-1.5 z-20">
            <button onClick={handleSave} className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#5a5549] hover:bg-[#f6f3ee]">{saved ? "Remove saved item" : "Save activity"}</button>
            <button onClick={handleReport} className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-red-700 hover:bg-red-50">Report activity</button>
          </div>
        )}
        </div>
      </div>

      {message && (
        <div className="mx-5 mb-3 bg-[#f6f3ee] border border-[#ede9e0] rounded-lg px-3 py-2 text-xs text-[#5a5549] flex items-center justify-between gap-3">
          <span>{message}</span>
          {!user && <Link to="/login" className="text-[#2a4d0f] font-semibold">Sign in</Link>}
          <button onClick={() => setMessage("")} className="text-[#8a8278]" aria-label="Dismiss">×</button>
        </div>
      )}

      {/* Achievement card */}
      {post.type === "achievement" && post.achievement && (
        <div className="mx-5 mb-4 bg-gradient-to-r from-[#2a4d0f]/8 to-[#3a6b18]/8 border border-[#2a4d0f]/20 rounded-xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#2a4d0f]/12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            {post.achievement.icon}
          </div>
          <div>
            <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-0.5">Achievement Unlocked</p>
            <p className="font-display font-bold text-[#2e2b26] text-xl">{post.achievement.label}</p>
          </div>
        </div>
      )}

      {/* Post text */}
      <div className="px-5 pb-3">
        <p className="text-[#5a5549] text-sm leading-relaxed whitespace-pre-line">
          {post.type === "tripreport" && post.content.length > 220
            ? post.content.slice(0, 220) + "…"
            : post.content}
        </p>
      </div>

      {/* Destination tag */}
      {post.destination && (
        <div className="px-5 pb-3">
          <Link
            to={`/destinations/${post.destination.id}`}
            className="inline-flex items-center gap-2 bg-[#f6f3ee] border border-[#ddd8cc] rounded-full px-3 py-1 text-xs font-medium text-[#2e2b26] hover:border-[#2a4d0f]/40 transition-colors"
          >
            <span>{post.destination.type === "Lake" ? "🏞" : post.destination.type === "Peak" ? "⛰" : post.destination.type === "Meadow" ? "🌿" : "🥾"}</span>
            <span>{post.destination.name}</span>
            <span className="text-[#8a8278]">·</span>
            <span className="text-[#8a8278]">{post.destination.elevation}</span>
          </Link>
        </div>
      )}

      {/* Image */}
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-[#ddd8cc] mx-0">
          <img src={post.image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Interaction bar */}
      <div className="px-5 py-3 flex items-center justify-between border-t border-[#f6f3ee]">
        <div className="flex items-center gap-1 text-xs text-[#8a8278]">
          <span>❤️</span>
          <span>{likeCount.toLocaleString()}</span>
          {post.comments.length > 0 && (
            <>
              <span className="mx-2">·</span>
              <span>{post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}</span>
            </>
          )}
        </div>
      </div>
      <div className="px-5 pb-4 flex items-center gap-1 border-t border-[#f6f3ee] pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
            liked ? "text-red-500 bg-red-50" : "text-[#5a5549] hover:bg-[#f6f3ee]"
          }`}
        >
          {liked ? "❤️" : "🤍"} <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#5a5549] hover:bg-[#f6f3ee] transition-colors flex-1 justify-center"
        >
          💬 <span>Comment</span>
        </button>
        <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${saved ? "text-[#2a4d0f] bg-[#2a4d0f]/5" : "text-[#5a5549] hover:bg-[#f6f3ee]"}`}>
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
        <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#5a5549] hover:bg-[#f6f3ee] transition-colors flex-1 justify-center">
          <span>Share</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-[#f6f3ee] px-5 py-4">
          <CommentSection comments={post.comments} contentId={post.id} />
        </div>
      )}
    </article>
  );
}
