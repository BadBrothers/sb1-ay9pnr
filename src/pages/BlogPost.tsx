import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// This would typically come from an API or CMS
const getBlogPost = (slug: string) => {
  // Mock data - replace with actual API call
  return {
    title: 'The Impact of Crypto PACs on US Politics',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
    date: '2024-03-15',
    content: `
      <p>As cryptocurrency continues to reshape the financial landscape, its influence on American politics grows increasingly significant. Political Action Committees focused on blockchain technology and digital assets are emerging as powerful players in the political arena, channeling millions of dollars into campaigns and advocacy efforts.</p>
      
      <h2>The Rise of Crypto PACs</h2>
      <p>In recent years, we've witnessed an unprecedented surge in cryptocurrency-focused Political Action Committees. These organizations are not just funding campaigns; they're actively shaping the narrative around digital asset regulation and financial innovation.</p>
      
      <h2>Key Players and Their Influence</h2>
      <p>From established PACs like Stand With Crypto to newcomers like Fair Shake, these organizations are making their presence felt in Washington. Their strategies often involve supporting candidates who advocate for favorable cryptocurrency regulations while opposing those who push for stricter oversight.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we approach future elections, the role of Crypto PACs in American politics is likely to expand further. Their influence could prove decisive in shaping the regulatory landscape for digital assets and blockchain technology.</p>
    `
  };
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogPost(slug || '');

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Blog</span>
      </button>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-8">{post.date}</div>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;