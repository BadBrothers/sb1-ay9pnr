import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, DollarSign } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-secondary text-primary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80"
            alt="Cryptocurrency background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ungovernable Crypto
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
              Track how politicians and SuperPACs shape cryptocurrency legislation. Knowledge is power.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/politicians" className="inline-block bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                View Politicians
              </Link>
              <Link to="/superpacs" className="inline-block bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                Explore SuperPACs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Politician Ratings</h3>
            <p className="text-gray-600">
              Comprehensive scoring system based on voting records, public statements, and policy positions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">SuperPAC Tracking</h3>
            <p className="text-gray-600">
              Monitor cryptocurrency-focused SuperPACs and their influence on policy decisions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Campaign Finance</h3>
            <p className="text-gray-600">
              Real-time FEC data analysis showing the flow of crypto-related campaign contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="bg-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Our Rating Methodology</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Our rating system will individually evaluate each politician based upon their adherence to core crypto values. 
            This includes individuals rights to self custody, and their basic natural rights to voluntarily transact with 
            other individuals without interference from the state while maintaining their privacy. As we update candidates 
            please reach out on our twitter if their is a specific politician you want ranked!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;