
export interface Ticket {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'github' | 'website';
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
