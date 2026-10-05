import { useState } from "react";
import type { Comment } from "../data/community";
import { useAuth } from "../contexts/AuthContext";
import { productApi } from "../lib/api";

interface Props {
  comments: Comment[];
  contentId: string;
}

function CommentItem({ comment, nested = false }: { comment: Comment; nested?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className={`flex gap-2.5 ${nested ? "ml-8 mt-3" : ""}`}>
      <img src={comment.author.avatar} alt={comment.author.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="bg-[#f6f3ee] rounded-xl px-3 py-2">
          <span className="font-semibold text-[#2e2b26] text-xs">{comment.author.name}</span>
          <p className="text-[#5a5549] text-xs mt-0.5 leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 ml-1">
          <span className="text-[#8a8278] text-[10px]">{comment.timestamp}</span>
          <button
            onClick={() => setLiked(!liked)}
            className={`text-[10px] font-semibold transition-colors ${liked ? "text-red-500" : "text-[#8a8278] hover:text-[#5a5549]"}`}
          >
            {liked ? "❤️" : "Like"} {comment.likes + (liked ? 1 : 0) > 0 && `${comment.likes + (liked ? 1 : 0)}`}
          </button>
          {!nested && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-[10px] font-semibold text-[#8a8278] hover:text-[#5a5549] transition-colors"
            >
              Reply
            </button>
          )}
        </div>

        {/* Nested replies */}
        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} nested />
        ))}

        {/* Reply input */}
        {showReply && (
          <div className="flex gap-2 mt-2 ml-8">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-[#f6f3ee] border border-[#ddd8cc] text-[#2e2b26] px-3 py-1.5 rounded-full text-xs placeholder:text-[#8a8278] focus:outline-none focus:ring-1 focus:ring-[#2a4d0f]"
            />
            <button
              onClick={() => { setReplyText(""); setShowReply(false); }}
              className="text-[#2a4d0f] text-xs font-semibold"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({ comments, contentId }: Props) {
  const { user, profile } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [items, setItems] = useState(comments);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  async function postComment() {
    if (!user || !profile) {
      setStatus("error");
      return;
    }
    const text = newComment.trim();
    if (!text) return;
    setStatus("saving");
    try {
      const result = await productApi.createComment("post", contentId, text);
      setItems((current) => [
        ...current,
        {
          id: result.id,
          author: {
            name: profile.name,
            avatar: profile.avatarUrl,
            username: profile.username,
          },
          text,
          timestamp: "Just now",
          likes: 0,
        },
      ]);
      setNewComment("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-4">
      {/* Write comment */}
      <div className="flex gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#2a4d0f] flex items-center justify-center flex-shrink-0">
          <span className="text-[#f6f3ee] text-xs font-bold">A</span>
        </div>
        <div className="flex-1 flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-[#f6f3ee] border border-[#ddd8cc] text-[#2e2b26] px-4 py-2 rounded-full text-xs placeholder:text-[#8a8278] focus:outline-none focus:ring-1 focus:ring-[#2a4d0f]"
          />
          {newComment.trim() && (
            <button
              onClick={postComment}
              disabled={status === "saving"}
              className="text-[#2a4d0f] text-xs font-semibold px-2"
            >
              {status === "saving" ? "Posting…" : "Post"}
            </button>
          )}
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-700 text-xs ml-10">
          {user ? "Your comment could not be posted. Try again." : "Sign in to join the conversation."}
        </p>
      )}

      {/* Comments list */}
      {items.length === 0 ? (
        <p className="text-[#8a8278] text-xs text-center py-2">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-4">
          {items.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}
