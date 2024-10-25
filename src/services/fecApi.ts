import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'vdZ0BrX6LGmqucuv59awlXdQxbIRH43NqdFCvGYp';
const BASE_URL = 'https://api.open.fec.gov/v1';

export const TRACKED_COMMITTEES = {
  FAIR_SHAKE: 'C00835959',
  STAND_WITH_CRYPTO: 'C00876631',
  DEFEND_AMERICAN_JOBS: 'C00836221',
  PROTECT_PROGRESS: 'C00848440'
} as const;

// Cache storage
let cache: Record<string, {
  data: any;
  timestamp: number;
}> = {};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const getCachedData = (key: string) => {
  const cached = cache[key];
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    delete cache[key];
    return null;
  }
  
  return cached.data;
};

const setCachedData = (key: string, data: any) => {
  cache[key] = {
    data,
    timestamp: Date.now()
  };
};

const fetchIndependentExpenditures = async (committeeId: string) => {
  const cacheKey = `expenditures-${committeeId}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/schedules/schedule_e`, {
      params: {
        api_key: API_KEY,
        committee_id: committeeId,
        two_year_transaction_period: 2024,
        per_page: 100,
        sort: '-expenditure_date'
      }
    });

    // Process and aggregate expenditures by candidate
    const expenditures = response.data.results.reduce((acc: any, curr: any) => {
      const key = curr.candidate_id;
      if (!acc[key]) {
        acc[key] = {
          candidate_id: curr.candidate_id,
          candidate_name: curr.candidate_name,
          support_oppose_indicator: curr.support_oppose_indicator,
          total_amount: 0,
          state: curr.candidate_state,
          office: curr.candidate_office,
          district: curr.candidate_district,
          party: curr.candidate_party
        };
      }
      acc[key].total_amount += parseFloat(curr.expenditure_amount);
      return acc;
    }, {});

    const result = Object.values(expenditures).sort((a: any, b: any) => 
      a.candidate_name.localeCompare(b.candidate_name)
    );

    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching independent expenditures:', error);
    return [];
  }
};

export const useCommitteeData = (committeeId: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = `committee-${committeeId}`;
        const cached = getCachedData(cacheKey);
        
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        const [detailsRes, financialsRes, expenditures] = await Promise.all([
          axios.get(`${BASE_URL}/committee/${committeeId}`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${BASE_URL}/committee/${committeeId}/totals`, {
            params: { 
              api_key: API_KEY,
              cycle: 2024
            }
          }),
          fetchIndependentExpenditures(committeeId)
        ]);

        const combinedData = {
          details: detailsRes.data.results[0],
          financials: financialsRes.data.results[0],
          independentExpenditures: expenditures
        };

        setCachedData(cacheKey, combinedData);
        setData(combinedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [committeeId]);

  return { data, loading, error };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};