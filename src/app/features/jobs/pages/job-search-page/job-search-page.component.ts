import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { JobOffer } from '../../../../core/models/job.model';
import { JobService } from '../../../../core/services/job.service';

@Component({
  selector: 'app-job-search-page',
  imports: [SearchFiltersComponent, SearchResultsComponent, LoaderComponent],
  templateUrl: './job-search-page.component.html',
})
export class JobSearchPageComponent implements OnInit {
  private jobService = inject(JobService);

  isLoading = signal<boolean>(false);
  jobs = signal<JobOffer[]>([]);
  pageCount = signal(0);
  keyword  = signal<string>('');
  location = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  
  
  
  ngOnInit(): void {
    this.search();

  }

 onSearch(event : {keyword: string, location: string}) {
   this.keyword.set(event.keyword);
   this.location.set(event.location);
  //  console.log(this.keyword());
    this.currentPage.set(1); 
    this.search();
  }


  search(){
    this.isLoading.set(true);
    this.jobService.searchJobs(this.keyword(),this.location(),this.currentPage()).subscribe({
      next : (data) => {
        this.jobs.set(data.jobs);
        // console.log(this.jobs());
        this.totalPages.set(data.pageCount);
        this.isLoading.set(false);
      },
      error : (err) => {
        this.isLoading.set(false);
      }
    });
  }

  nextPage() {
    // console.log("next page");
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.search();
      window.scrollTo(0, 0);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.search();
      window.scrollTo(0, 0);
    }
  }

}
