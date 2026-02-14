export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  date: string;
  salary : string;
  url: string;
}

export interface JobResponse {
  jobs : JobOffer[];
  pageCount : number;
}

export interface USAJobsResponse {
  SearchResult: {
    
    SearchResultCountAll : number,
    SearchResultItems: Array<{
      MatchedObjectId: string;
      MatchedObjectDescriptor: {
        PositionID: string;
        PositionTitle: string;
        OrganizationName: string;
        PositionURI: string;
        PublicationStartDate: string;
        PositionLocationDisplay: string;
        PositionLocation: Array<{
          LocationName: string;
        }>;
        
        PositionRemuneration: Array<{
          MinimumRange: string;
          MaximumRange: string;
          RateIntervalCode: string; 
          Description : string;
        }>;

        UserArea: {
          Details: {
            JobSummary: string;
          };
        };
      };
    }>;
  };
}