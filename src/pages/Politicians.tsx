import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { getAllPoliticians } from '../services/politicianService';

const Politicians = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [partyFilter, setPartyFilter] = useState('');

  const politicians = getAllPoliticians();
  
  const filteredPoliticians = politicians.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.state.toLowerCase().includes(search.toLowerCase());
    const matchesParty = !partyFilter || p.party.toLowerCase() === partyFilter.toLowerCase();
    const matchesPosition = filter === 'all' || 
                           (filter === 'president' && p.position.includes('President')) ||
                           (filter === 'senate' && p.position === 'Senator') ||
                           (filter === 'house' && p.position === 'Representative');
    return matchesSearch && matchesParty && matchesPosition;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Politician Crypto Ratings</h1>
        <p className="text-gray-600">
          Track and analyze politicians' stances on cryptocurrency legislation and regulation.
        </p>
      </div>

      {/* Position Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', name: 'All' },
              { id: 'president', name: 'Presidential' },
              { id: 'senate', name: 'Senate' },
              { id: 'house', name: 'House' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`${
                  filter === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search politicians..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={partyFilter}
            onChange={(e) => setPartyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">All Parties</option>
            <option value="democratic">Democratic</option>
            <option value="republican">Republican</option>
            <option value="independent">Independent</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="h-5 w-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Politicians Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoliticians.map((politician) => (
          <div key={politician.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={politician.imageUrl}
                  alt={politician.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{politician.name}</h3>
                  <p className="text-gray-600">
                    {politician.position}
                    {politician.district ? ` - ${politician.state}, ${politician.district}` : ` - ${politician.state}`}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Party:</span>
                  <span className={`font-medium ${
                    politician.party === 'Democratic' ? 'text-blue-600' :
                    politician.party === 'Republican' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {politician.party}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{politician.rating}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t">
              <Link 
                to={`/politician/${politician.id}`}
                className="block text-center text-black hover:text-gray-700 font-medium"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Politicians;