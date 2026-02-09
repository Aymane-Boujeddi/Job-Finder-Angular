import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobResponse, USAJobsResponse } from '../models/job.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly apiUrl  = "https://data.usajobs.gov/api/Search";

  private readonly httpClient = inject(HttpClient);
  private readonly resultPerPage = 10;

  searchJobs(
    keyword: string,
    location: string,
    page: number,
  ): Observable<JobResponse> {

    let params = new HttpParams()
    .set('Page', page.toString())
    .set('SortField', 'opendate')
    .set('SortDirection', 'Desc')
    .set('ResultsPerPage', this.resultPerPage.toString());

    if(keyword){
      params = params.set('Keyword' , keyword);
    }
    if(location){
      params = params.set('LocationName', location);
    }


   return this.httpClient.get<USAJobsResponse>(this.apiUrl, {params}).pipe(
        map((response) => {
          const items = response.SearchResult.SearchResultItems || [];
          const jobsItems =  items.map((item) => {
            const info = item.MatchedObjectDescriptor;
            // console.log(info);
            
            return {
              id : info.PositionID,
              title : info.PositionTitle,
              company : info.OrganizationName,
              url : info.PositionURI,
              date : info.PublicationStartDate,
              description: info.UserArea?.Details?.JobSummary || "No description for this job offer",
              location: info.PositionLocationDisplay || 'Multiple Locations',
              minSalary: info.PositionRemuneration?.[0]?.MinimumRange || 'Salary not listed',
              maxSalary: info.PositionRemuneration?.[0]?.MaximumRange || 'Salary not listed',
            }
          });
          return {
            jobs : jobsItems,
            pageCount : Math.ceil(response.SearchResult.SearchResultCountAll / 10),
          }
        })
   );
  }
  
}
    