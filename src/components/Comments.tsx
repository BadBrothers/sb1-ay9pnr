import React, { useState } from 'react';
import { format } from 'date-fns';
import { ThumbsUp, ThumbsDown, MessageCircle, Twitter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

interface CommentsProps {
  billId: string;
}

const Comments: React.FC<CommentsProps> = ({ billId }) => {
  const { user, login } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleTwitterLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Failed to login with Twitter. Please try again.');
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userImage: user.profile_image_url,
      content: newComment.trim(),
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!user || !replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userImage: user.profile_image_url,
      content: replyContent.trim(),
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [reply, ...comment.replies] };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyContent('');
  };

  const handleVote = (commentId: string, isUpvote: boolean) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          upvotes: isUpvote ? comment.upvotes + 1 : comment.upvotes,
          downvotes: !isUpvote ? comment.downvotes + 1 : comment.downvotes
        };
      }
      return comment;
    }));
  };

  const CommentComponent: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => (
    <div className={`${isReply ? 'ml-12' : 'border-b border-gray-200 pb-6 mb-6 last:border-0'}`}>
      <div className="flex items-start gap-4">
        <img
          src={comment.userImage}
          alt={comment.userName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{comment.userName}</span>
            <span className="text-gray-500 text-sm">
              {format(comment.timestamp, 'MMM d, yyyy')}
            </span>
          </div>
          <p className="mt-2">{comment.content}</p>
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => handleVote(comment.id, true)}
              className="flex items-center gap-1 text-gray-500 hover:text-green-600"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.upvotes}</span>
            </button>
            <button
              onClick={() => handleVote(comment.id, false)}
              className="flex items-center gap-1 text-gray-500 hover:text-red-600"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{comment.downvotes}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}
          </div>
          {replyingTo === comment.id && (
            <div className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              <div className="flex justify-end gap-4 mt-2">
                <button
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
          {comment.replies.map(reply => (
            <CommentComponent key={reply.id} comment={reply} isReply />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Discussion</h2>
      
      {!user ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Log in with X (Twitter) to join the discussion</p>
          <button
            onClick={handleTwitterLogin}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Twitter className="h-5 w-5" />
            Log in with X
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map(comment => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;