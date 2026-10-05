import { useParams, Link } from "react-router";
import { feedPosts } from "../data/community";
import { explorers } from "../data/mock";
import CommentSection from "../components/CommentSection";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const post = feedPosts.find((p) => p.id === id) ?? feedPosts[0];
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const postTypeLabel: Record<string, string> = {
    adventure: "Completed an adventure",
    photo: "Shared a photo",
    tripreport: "Published a trip report",
    achievement: "Earned an achievement",
    update: "Shared an update",
    tip: "Shared an outdoor tip",
    question: "Asked the community",
  };

  const related = explorers.filter((e) => e.username !== post.author.username).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24 md:pb-10 grid lg:grid-cols-[1fr_280px] gap-10">
      {/* Left — post */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-[#8a8278] mb-6">
          <Link to="/" className="hover:text-[#2e2b26]">Home</Link>
          <span>/</span>
          <Link to="/community" className="hover:text-[#2e2b26]">Community</Link>
          <span>/</span>
          <span className="text-[#2e2b26]">Post</span>
        </nav>

        <article className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
          {/* Author */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-4">
            <Link to={`/explorer/${post.author.username}`}>
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ede9e0]" />
            </Link>
            <div>
              <Link to={`/explorer/${post.author.username}`} className="font-display font-bold text-[#2e2b26] text-lg hover:text-[#2a4d0f] transition-colors">
                {post.author.name}
              </Link>
              <p className="text-[#8a8278] text-xs">{postTypeLabel[post.type]} · {post.timestamp}</p>
              <p className="text-[#8a8278] text-xs">{post.author.location}</p>
            </div>
          </div>

          {/* Achievement */}
          {post.type === "achievement" && post.achievement && (
            <div className="mx-5 mb-4 bg-[#2a4d0f]/6 border border-[#2a4d0f]/15 rounded-xl p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2a4d0f]/10 rounded-full flex items-center justify-center text-2xl">{post.achievement.icon}</div>
              <div>
                <p className="text-[#2a4d0f] text-xs font-semibold uppercase tracking-widest mb-0.5">Achievement Unlocked</p>
                <p className="font-display font-bold text-[#2e2b26] text-xl">{post.achievement.label}</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-5 pb-4">
            <p className="text-[#5a5549] text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          {/* Destination tag */}
          {post.destination && (
            <div className="px-5 pb-4">
              <Link
                to={`/destinations/${post.destination.id}`}
                className="inline-flex items-center gap-2 bg-[#f6f3ee] border border-[#ddd8cc] rounded-full px-3 py-1.5 text-xs font-medium text-[#2e2b26] hover:border-[#2a4d0f]/40 transition-colors"
              >
                📍 {post.destination.name} · {post.destination.type} · {post.destination.elevation}
              </Link>
            </div>
          )}

          {/* Image */}
          {post.image && (
            <div className="aspect-[16/9] overflow-hidden bg-[#ddd8cc]">
              <img src={post.image} alt="Post" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Stats */}
          <div className="px-5 py-3 flex items-center gap-4 border-t border-[#f6f3ee] text-xs text-[#8a8278]">
            <span>❤️ {likeCount.toLocaleString()} likes</span>
            <span>💬 {post.comments.length} comments</span>
          </div>

          {/* Actions */}
          <div className="px-5 pb-4 flex gap-1 border-t border-[#f6f3ee] pt-3">
            <button
              onClick={() => { setLiked(!liked); setLikeCount((c) => liked ? c - 1 : c + 1); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                liked ? "text-red-500 bg-red-50" : "text-[#5a5549] hover:bg-[#f6f3ee]"
              }`}
            >
              {liked ? "❤️" : "🤍"} Like
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[#5a5549] hover:bg-[#f6f3ee] transition-colors flex-1 justify-center">
              💬 Comment
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[#5a5549] hover:bg-[#f6f3ee] transition-colors flex-1 justify-center">
              ↗ Share
            </button>
          </div>

          {/* Comments */}
          <div className="border-t border-[#f6f3ee] px-5 py-5">
            <h3 className="font-display font-bold text-[#2e2b26] text-lg mb-5">
              {post.comments.length} Comment{post.comments.length !== 1 ? "s" : ""}
            </h3>
            <CommentSection comments={post.comments} contentId={post.id} />
          </div>
        </article>
      </div>

      {/* Right — related explorers */}
      <aside className="hidden lg:block space-y-4">
        <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
          <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">About the Explorer</h3>
          <Link to={`/explorer/${post.author.username}`} className="flex items-center gap-3 mb-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-[#2e2b26] text-sm hover:text-[#2a4d0f] transition-colors">{post.author.name}</p>
              <p className="text-[#8a8278] text-xs">{post.author.location}</p>
            </div>
          </Link>
          <Link
            to={`/explorer/${post.author.username}`}
            className="block w-full text-center text-xs font-semibold text-[#2a4d0f] border border-[#2a4d0f]/30 py-2 rounded-lg hover:bg-[#2a4d0f]/5 transition-colors"
          >
            View Profile →
          </Link>
        </div>

        <div className="bg-white border border-[#ede9e0] rounded-xl p-4">
          <h3 className="font-display font-bold text-[#2e2b26] text-base mb-4">More Explorers</h3>
          <div className="space-y-3">
            {related.map((exp) => (
              <div key={exp.id} className="flex items-center gap-2.5">
                <img src={exp.avatar} alt={exp.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <Link to={`/explorer/${exp.username}`} className="font-semibold text-[#2e2b26] text-xs hover:text-[#2a4d0f] transition-colors truncate block">{exp.name}</Link>
                  <p className="text-[#8a8278] text-[10px]">{exp.adventures} adventures</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {post.destination && (
          <div className="bg-white border border-[#ede9e0] rounded-xl overflow-hidden">
            <img src={post.image ?? ""} alt={post.destination.name} className="w-full h-28 object-cover" />
            <div className="p-4">
              <p className="text-xs text-[#2a4d0f] font-semibold uppercase mb-1">{post.destination.type}</p>
              <p className="font-display font-bold text-[#2e2b26] text-base">{post.destination.name}</p>
              <p className="text-[#8a8278] text-xs mb-3">{post.destination.elevation}</p>
              <Link
                to={`/destinations/${post.destination.id}`}
                className="text-xs font-semibold text-[#2a4d0f] hover:underline"
              >
                View Destination →
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
