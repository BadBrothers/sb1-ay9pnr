import { Bill, BillDetails } from '../types/bill';

const bills: Record<string, BillDetails> = {
  'financial-innovation-act': {
    id: 'financial-innovation-act',
    title: 'Financial Innovation and Technology for the 21st Century Act',
    summary: 'To provide for the regulation of digital assets, and for other purposes.',
    fullText: 'https://www.congress.gov/bill/117th-congress/house-bill/4763/text',
    status: 'In Committee',
    introducedDate: '2023-07-19',
    sponsors: ['Patrick McHenry', 'Glenn Thompson'],
    analysis: `This comprehensive legislation aims to create a clear regulatory framework for digital assets, 
              establishing jurisdictional boundaries between the SEC and CFTC while promoting innovation in the financial sector.
              The bill seeks to provide clarity on digital asset classification and regulatory oversight.`,
    coverage: [
      {
        source: 'CoinDesk',
        title: 'House Financial Services Committee Advances Major Crypto Bill',
        url: 'https://www.coindesk.com/policy/2023/07/19/house-financial-services-committee-advances-major-crypto-bill/',
        date: '2023-07-19'
      },
      {
        source: 'Bloomberg',
        title: 'Crypto Industry Gets Boost as House Panel Advances Regulatory Bill',
        url: 'https://www.bloomberg.com/news/articles/2023-07-19/',
        date: '2023-07-19'
      }
    ]
  },
  'digital-asset-aml-act': {
    id: 'digital-asset-aml-act',
    title: 'Digital Asset Anti-Money Laundering Act',
    summary: 'To strengthen digital asset anti-money laundering regulations.',
    fullText: 'https://www.congress.gov/bill/118th-congress/senate-bill/2860/text',
    status: 'In Committee',
    introducedDate: '2023-09-14',
    sponsors: ['Elizabeth Warren', 'Roger Marshall'],
    analysis: `This legislation proposes to extend traditional banking anti-money laundering requirements 
              to the cryptocurrency industry. It would require digital asset wallet providers and miners 
              to implement know-your-customer (KYC) requirements and suspicious activity reporting.`,
    coverage: [
      {
        source: 'CoinDesk',
        title: 'Sen. Warren Introduces Updated Crypto AML Bill',
        url: 'https://www.coindesk.com/policy/2023/09/14/sen-warren-introduces-crypto-aml-bill/',
        date: '2023-09-14'
      },
      {
        source: 'The Block',
        title: "Warren's Latest Crypto Bill Targets DeFi, Mining, and Self-Custody",
        url: 'https://www.theblock.co/post/2023/09/14/',
        date: '2023-09-14'
      }
    ]
  }
};

export const getBillDetails = (billId: string): BillDetails | null => {
  return bills[billId] || null;
};

export const getAllBills = (): Bill[] => {
  return Object.values(bills).map(({ id, title, summary, status }) => ({
    id,
    title,
    summary,
    status
  }));
};