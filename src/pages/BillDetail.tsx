import React from 'react';
import { useParams } from 'react-router-dom';
import { getBillDetails } from '../services/billService';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, MessageCircle, Twitter } from 'lucide-react';

const BillDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, user, login } = useAuth();
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState<any[]>([]);
  const bill = getBillDetails(slug || '');

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (!bill) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Bill not found</h2>
          <p className="mt-2 text-gray-600">The requested bill could not be found.</p>
        </div>
      </div>
    );
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !comment.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      userId: user?.id,
      username: user?.username,
      content: comment,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{bill.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{bill.summary}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <p className="text-gray-700">{bill.status}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Analysis</h2>
          <p className="text-gray-700">{bill.analysis}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Coverage</h2>
          <div className="space-y-4">
            {bill.coverage.map((article, index) => (
              <div key={index} className="border-b pb-4">
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {article.title}
                </a>
                <div className="text-sm text-gray-600 mt-1">
                  {article.source} • {article.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        
        {isAuthenticated ? (
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts..."
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-8 p-6 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-600 mb-4">Sign in with X (Twitter) to join the discussion</p>
            <button
              onClick={handleLogin}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Sign in with X
            </button>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium">@{comment.username}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {comment.upvotes}
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-red-600">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {comment.downvotes}
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillDetail;