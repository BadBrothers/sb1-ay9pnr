import React from 'react';
import { Link } from 'react-router-dom';

// This would typically come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: 'The Impact of Crypto PACs on US Politics',
    slug: 'impact-of-crypto-pacs',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
    preview: 'As cryptocurrency continues to reshape the financial landscape, its influence on American politics grows increasingly significant. Political Action Committees focused on blockchain technology and digital assets are emerging as powerful players...',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Privacy Rights in the Digital Age',
    slug: 'privacy-rights-digital-age',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1200',
    preview: 'The intersection of cryptocurrency and privacy rights has become a crucial battleground in contemporary politics. As governments worldwide grapple with digital privacy regulations...',
    date: '2024-03-10'
  },
  // Add more blog posts as needed
];

const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-8">
        {blogPosts.map(post => (
          <Link 
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <div className="text-sm text-gray-500 mb-4">{post.date}</div>
              <p className="text-gray-600 line-clamp-3">{post.preview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;