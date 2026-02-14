export interface Application {
  id?: number;
  userId: string;
  offerId: string;
  apiSource: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: Status;
  notes: string;
  dateAdded: string;
}

export enum Status{
  EN_ATTENTE = 'en_attente',
  ACCEPTE = 'accepte',
  REFUSE = 'refuse',
}
