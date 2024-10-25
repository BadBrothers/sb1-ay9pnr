export interface Bill {
  id: string;
  title: string;
  summary: string;
  status: string;
}

export interface BillDetails extends Bill {
  fullText: string;
  introducedDate: string;
  sponsors: string[];
  analysis: string;
  coverage: {
    source: string;
    title: string;
    url: string;
    date: string;
  }[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}