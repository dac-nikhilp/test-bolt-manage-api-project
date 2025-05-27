export interface Gateway {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'Active' | 'Inactive';
  apiCount: number;
  lastSyncDate: Date;
}