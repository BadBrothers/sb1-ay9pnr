import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, DollarSign, Users } from 'lucide-react';
import { TRACKED_COMMITTEES, useCommitteeData, formatCurrency } from '../services/fecApi';

const SuperPACs = () => {
  const fairShake = useCommitteeData(TRACKED_COMMITTEES.FAIR_SHAKE);
  const standWithCrypto = useCommitteeData(TRACKED_COMMITTEES.STAND_WITH_CRYPTO);
  const defendAmericanJobs = useCommitteeData(TRACKED_COMMITTEES.DEFEND_AMERICAN_JOBS);
  const protectProgress = useCommitteeData(TRACKED_COMMITTEES.PROTECT_PROGRESS);

  const totalFundsRaised = React.useMemo(() => {
    return [fairShake, standWithCrypto, defendAmericanJobs, protectProgress]
      .reduce((total, { data }) => {
        if (!data?.financials?.total_receipts) return total;
        return total + data.financials.total_receipts;
      }, 0);
  }, [fairShake, standWithCrypto, defendAmericanJobs, protectProgress]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Crypto SuperPAC Tracker</h1>
        <p className="text-gray-600">
          Monitor cryptocurrency-focused SuperPACs and their influence on policy making.
        </p>
      </div>

      {/* Search and Stats */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search SuperPACs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Funds Raised</div>
                <div className="text-2xl font-bold">{formatCurrency(totalFundsRaised)}</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active PACs</div>
                <div className="text-2xl font-bold">4</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">2024 Election Cycle</div>
                <div className="text-2xl font-bold">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SuperPACs List */}
      <div className="space-y-6">
        {[
          { hook: fairShake, id: TRACKED_COMMITTEES.FAIR_SHAKE, name: "Fair Shake" },
          { hook: standWithCrypto, id: TRACKED_COMMITTEES.STAND_WITH_CRYPTO, name: "Stand With Crypto" },
          { hook: defendAmericanJobs, id: TRACKED_COMMITTEES.DEFEND_AMERICAN_JOBS, name: "Defend American Jobs" },
          { hook: protectProgress, id: TRACKED_COMMITTEES.PROTECT_PROGRESS, name: "Protect Progress" }
        ].map(({ hook: { data, loading, error }, id, name }) => {
          if (loading) return (
            <div key={id} className="animate-pulse bg-gray-100 h-48 rounded-lg"></div>
          );
          
          if (error || !data) return null;

          return (
            <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{data.details.name}</h3>
                    <p className="text-gray-600">Rating Pending</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Total Raised</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(data.financials.total_receipts || 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(data.financials.total_disbursements || 0)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Transfers: {formatCurrency(data.financials.transfers_to_other_authorized_committee || 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Individual Contributions</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(data.financials.individual_contributions || 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Cash on Hand</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(data.financials.cash_on_hand_end_period || 0)}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Recent Independent Expenditures</h4>
                  <div className="space-y-2">
                    {data.independentExpenditures.slice(0, 3).map((exp: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{exp.candidate_name}</span>
                        <span className={exp.support_oppose_indicator === 'SUPPORT' ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(exp.total_amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link 
                  to={`/pac/${id}`}
                  className="text-black hover:text-gray-700 font-medium"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperPACs;