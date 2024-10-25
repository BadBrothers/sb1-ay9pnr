import React from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Bill {
  name: string;
  url: string;
  explanation: string;
  explanationUrl: string;
  vote: string;
  cryptoStance: 'Pro-Crypto' | 'Anti-Crypto';
}

interface Statement {
  date: string;
  content: string;
  source: string;
}

// This would typically come from an API or database
const getPoliticianData = (id: string) => {
  // Mock data - replace with actual API call
  return {
    id: id,
    name: 'Cynthia Lummis',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
    nextElection: 'November 5th, 2024',
    currentOffice: 'United States Senator',
    location: 'Wyoming',
    rating: 'Rating Pending',
    website: 'https://www.lummis.senate.gov/',
    ratingExplanation: 'Rating is currently pending review.',
    statements: [
      {
        date: '2024-01-15',
        content: 'Statement on cryptocurrency regulation...',
        source: 'Senate Floor Speech'
      },
      // Add more statements
    ],
    bills: [
      {
        name: 'Responsible Financial Innovation Act',
        url: 'https://www.congress.gov/bill/117th-congress/senate-bill/4356',
        explanation: 'Creates regulatory framework for digital assets',
        explanationUrl: '/bill/s4356-analysis',
        vote: 'Yea',
        cryptoStance: 'Pro-Crypto'
      },
      // Add more bills
    ]
  };
};

const PoliticianProfile = () => {
  const { id } = useParams();
  const politician = getPoliticianData(id || '');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={politician.image}
              alt={politician.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold mb-6">{politician.name}</h1>
            <div className="grid gap-4">
              <div>
                <h3 className="text-gray-600 font-medium">Next Election</h3>
                <p>{politician.nextElection}</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Current Office</h3>
                <p>{politician.currentOffice}</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Location</h3>
                <p>{politician.location}</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Rating</h3>
                <p>{politician.rating}</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Website</h3>
                <a 
                  href={politician.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Rating Explanation</h2>
        <p className="text-gray-600">{politician.ratingExplanation}</p>
      </div>

      {/* Public Statements */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Public Statements on Crypto & Privacy</h2>
        <div className="space-y-6">
          {politician.statements.map((statement, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="text-sm text-gray-600 mb-2">{statement.date}</div>
              <p className="mb-2">{statement.content}</p>
              <div className="text-sm text-gray-600">Source: {statement.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Voting Record */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Voting Record on Crypto & Privacy Bills</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vote</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {politician.bills.map((bill, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <a 
                      href={bill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {bill.name}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={bill.explanationUrl}
                      className="text-gray-900 hover:text-blue-600"
                    >
                      {bill.explanation}
                    </a>
                  </td>
                  <td className="px-6 py-4">{bill.vote}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      bill.cryptoStance === 'Pro-Crypto' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.cryptoStance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoliticianProfile;