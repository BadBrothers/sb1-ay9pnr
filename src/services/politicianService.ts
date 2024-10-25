import { Politician } from '../types/politician';

// This would typically come from an API
export const politicians: Politician[] = [
  // Senate
  {
    id: 'cynthia-lummis',
    name: 'Cynthia Lummis',
    position: 'Senator',
    state: 'WY',
    district: null,
    party: 'Republican',
    nextElection: '2026',
    rating: 'Rating Pending',
    website: 'https://www.lummis.senate.gov/',
    imageUrl: 'https://www.congress.gov/img/member/l000571_200.jpg',
    statements: []
  },
  {
    id: 'ted-cruz',
    name: 'Ted Cruz',
    position: 'Senator',
    state: 'TX',
    district: null,
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://www.cruz.senate.gov/',
    imageUrl: 'https://www.congress.gov/img/member/c001098_200.jpg',
    statements: []
  },
  {
    id: 'kirsten-gillibrand',
    name: 'Kirsten Gillibrand',
    position: 'Senator',
    state: 'NY',
    district: null,
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://www.gillibrand.senate.gov/',
    imageUrl: 'https://www.congress.gov/img/member/g000555_200.jpg',
    statements: []
  },
  {
    id: 'bill-hagerty',
    name: 'Bill Hagerty',
    position: 'Senator',
    state: 'TN',
    district: null,
    party: 'Republican',
    nextElection: '2026',
    rating: 'Rating Pending',
    website: 'https://www.hagerty.senate.gov/',
    imageUrl: 'https://www.congress.gov/img/member/h001089_200.jpg',
    statements: []
  },
  {
    id: 'thom-tillis',
    name: 'Thom Tillis',
    position: 'Senator',
    state: 'NC',
    district: null,
    party: 'Republican',
    nextElection: '2026',
    rating: 'Rating Pending',
    website: 'https://www.tillis.senate.gov/',
    imageUrl: 'https://www.congress.gov/img/member/t000476_200.jpg',
    statements: []
  },

  // House Representatives
  {
    id: 'tom-emmer',
    name: 'Tom Emmer',
    position: 'Representative',
    state: 'MN',
    district: '6',
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://emmer.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/e000294_200.jpg',
    statements: []
  },
  {
    id: 'ritchie-torres',
    name: 'Ritchie Torres',
    position: 'Representative',
    state: 'NY',
    district: '15',
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://torres.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/t000486_200.jpg',
    statements: []
  },
  {
    id: 'patrick-mchenry',
    name: 'Patrick McHenry',
    position: 'Representative',
    state: 'NC',
    district: '10',
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://mchenry.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/m001156_200.jpg',
    statements: []
  },
  {
    id: 'warren-davidson',
    name: 'Warren Davidson',
    position: 'Representative',
    state: 'OH',
    district: '8',
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://davidson.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/d000626_200.jpg',
    statements: []
  },
  {
    id: 'josh-gottheimer',
    name: 'Josh Gottheimer',
    position: 'Representative',
    state: 'NJ',
    district: '5',
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://gottheimer.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/g000583_200.jpg',
    statements: []
  },
  {
    id: 'ro-khanna',
    name: 'Ro Khanna',
    position: 'Representative',
    state: 'CA',
    district: '17',
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://khanna.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/k000389_200.jpg',
    statements: []
  },
  {
    id: 'french-hill',
    name: 'French Hill',
    position: 'Representative',
    state: 'AR',
    district: '2',
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://hill.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/h001072_200.jpg',
    statements: []
  },
  {
    id: 'dusty-johnson',
    name: 'Dusty Johnson',
    position: 'Representative',
    state: 'SD',
    district: 'At-Large',
    party: 'Republican',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://dustyjohnson.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/j000301_200.jpg',
    statements: []
  },
  {
    id: 'jake-auchincloss',
    name: 'Jake Auchincloss',
    position: 'Representative',
    state: 'MA',
    district: '4',
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://auchincloss.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/a000148_200.jpg',
    statements: []
  },
  {
    id: 'wiley-nickel',
    name: 'Wiley Nickel',
    position: 'Representative',
    state: 'NC',
    district: '13',
    party: 'Democratic',
    nextElection: '2024',
    rating: 'Rating Pending',
    website: 'https://nickel.house.gov/',
    imageUrl: 'https://www.congress.gov/img/member/n000195_200.jpg',
    statements: []
  }
];

export const getPolitician = (id: string): Politician | undefined => {
  return politicians.find(p => p.id === id);
};

export const getAllPoliticians = (): Politician[] => {
  return politicians;
};