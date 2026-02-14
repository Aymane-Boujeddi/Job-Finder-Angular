import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobResponse, USAJobsResponse } from '../models/job.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environement } from '../../environements/environment.local';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly apiUrl  = environement.apiUrl;

  private readonly httpClient = inject(HttpClient);
  private readonly authService  = inject(AuthService);
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
      params = params.set('PositionTitle' , keyword);
    }
    if(location){
      params = params.set('LocationName', location);
    }

    // console.log(this.authService.currentUser());

   return this.httpClient.get<USAJobsResponse>(`${this.apiUrl}`, {params}).pipe(
        map((response) => {
          const items = response.SearchResult.SearchResultItems || [];
          const jobsItems =  items.map((item) => {
            const info = item.MatchedObjectDescriptor;
            const itemId = item.MatchedObjectId;
            // console.log(info);
            const salaryArr = info.PositionRemuneration?.[0];
            
            return {
              id : itemId,
              title : info.PositionTitle,
              company : info.OrganizationName,
              url : info.PositionURI,
              date : info.PublicationStartDate,
              description: info.UserArea?.Details?.JobSummary || "No description for this job offer",
              location: info.PositionLocationDisplay || 'Multiple Locations',
              salary : salaryArr ? `${salaryArr.MinimumRange}$ - ${salaryArr.MaximumRange}$ ${salaryArr.Description}` : "No Salary in this offer",
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
    