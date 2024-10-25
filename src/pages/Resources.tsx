import React from 'react';
import { ExternalLink, Youtube, BookOpen, Globe, Shield } from 'lucide-react';

const Resources = () => {
  const resources = {
    education: [
      {
        title: "Bitcoin.org - Getting Started",
        url: "https://bitcoin.org/en/getting-started",
        description: "Official Bitcoin educational resources for beginners",
        type: "website"
      },
      {
        title: "Andreas Antonopoulos - Introduction to Bitcoin",
        url: "https://www.youtube.com/watch?v=l1si5ZWLgy0",
        description: "Comprehensive introduction to Bitcoin and cryptocurrency",
        type: "video"
      }
    ],
    rights: [
      {
        title: "Electronic Frontier Foundation - Cryptocurrency",
        url: "https://www.eff.org/issues/cryptocurrency",
        description: "Digital rights and cryptocurrency advocacy",
        type: "website"
      },
      {
        title: "Coin Center",
        url: "https://www.coincenter.org/",
        description: "Cryptocurrency policy research and advocacy",
        type: "website"
      }
    ],
    politics: [
      {
        title: "FEC.gov - Campaign Finance Data",
        url: "https://www.fec.gov/data/",
        description: "Official source for campaign finance data",
        type: "website"
      },
      {
        title: "OpenSecrets - Cryptocurrency",
        url: "https://www.opensecrets.org/industries/background.php?cycle=2024&ind=B06",
        description: "Track money in politics related to cryptocurrency",
        type: "website"
      }
    ],
    privacy: [
      {
        title: "Privacy Tools",
        url: "https://www.privacytools.io/",
        description: "Encryption and privacy tools guide",
        type: "website"
      },
      {
        title: "Electronic Privacy Information Center",
        url: "https://epic.org/",
        description: "Privacy research and advocacy",
        type: "website"
      }
    ]
  };

  const ResourceCard = ({ title, url, description, type }: {
    title: string;
    url: string;
    description: string;
    type: string;
  }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {type === 'video' ? (
            <Youtube className="h-6 w-6 text-red-600" />
          ) : (
            <Globe className="h-6 w-6 text-blue-600" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
      </div>
    </a>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>
      
      {/* Education Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">Educational Resources</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.education.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>

      {/* Rights Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-semibold">Rights & Advocacy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.rights.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>

      {/* Politics Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-semibold">Political Resources</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.politics.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-semibold">Privacy Tools & Information</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.privacy.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;