import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCommitteeData, formatCurrency } from '../services/fecApi';

const PACProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useCommitteeData(id || '');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Error Loading PAC Data</h2>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { details, financials, independentExpenditures } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
        <p className="text-gray-600">FEC Committee ID: {details.committee_id}</p>
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-gray-600">Total Raised</div>
            <div className="text-2xl font-bold">
              {formatCurrency(financials.total_receipts || 0)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Spent</div>
            <div className="text-2xl font-bold">
              {formatCurrency(financials.total_disbursements || 0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Transfers: {formatCurrency(financials.transfers_to_other_authorized_committee || 0)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Cash on Hand</div>
            <div className="text-2xl font-bold">
              {formatCurrency(financials.cash_on_hand_end_period || 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Rating</h2>
        <div className="text-gray-600">Rating Pending</div>
      </div>

      {/* Independent Expenditures */}
      {independentExpenditures && independentExpenditures.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Independent Expenditures by Candidate</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State/District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Support/Oppose
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {independentExpenditures.map((exp: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/politician/${exp.candidate_id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {exp.candidate_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exp.party}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exp.state} {exp.office === 'H' ? `${exp.district}` : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        exp.support_oppose_indicator === 'SUPPORT' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {exp.support_oppose_indicator}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {formatCurrency(exp.total_amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Donors */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Top Donors</h2>
        <p className="text-gray-600">Donor information will be updated daily.</p>
      </div>
    </div>
  );
};

export default PACProfile;