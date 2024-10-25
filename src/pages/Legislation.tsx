import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink } from 'lucide-react';

// This would typically come from an API or database
const bills = [
  {
    id: 'hr-4763',
    title: 'Financial Innovation and Technology for the 21st Century Act',
    chamber: 'house',
    sponsors: ['Patrick McHenry', 'Glenn Thompson'],
    introducedDate: '2023-07-19',
    status: 'In Committee',
    summary: 'To provide for the regulation of digital assets, and for other purposes.',
    slug: 'financial-innovation-act'
  },
  {
    id: 's-2860',
    title: 'Digital Asset Anti-Money Laundering Act',
    chamber: 'senate',
    sponsors: ['Elizabeth Warren', 'Roger Marshall'],
    introducedDate: '2023-09-14',
    status: 'In Committee',
    summary: 'To strengthen digital asset anti-money laundering regulations.',
    slug: 'digital-asset-aml-act'
  }
];

const Legislation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Crypto Legislation Tracker</h1>
        <p className="text-gray-600">
          Track and analyze current cryptocurrency-related bills in Congress.
        </p>
      </div>

      {/* Bills List */}
      <div className="grid gap-6">
        {bills.map((bill) => (
          <Link
            key={bill.id}
            to={`/legislation/${bill.slug}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{bill.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      bill.chamber === 'house' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {bill.chamber === 'house' ? 'House' : 'Senate'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Sponsors:</span>{' '}
                    {bill.sponsors.join(', ')}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Introduced:</span>{' '}
                    {bill.introducedDate}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    {bill.status}
                  </div>
                  <p className="mt-4 text-gray-700">{bill.summary}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Legislation;