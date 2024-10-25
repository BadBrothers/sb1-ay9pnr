export interface Politician {
  id: string;
  name: string;
  position: string;
  state: string;
  district: string | null;
  party: string;
  nextElection: string;
  rating: string;
  website: string;
  imageUrl: string;
  statements: PoliticianStatement[];
}

export interface PoliticianStatement {
  date: string;
  content: string;
  source: string;
  url: string;
}