import { Component, Output, EventEmitter, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filters',
  imports: [FormsModule],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent {
  keyword = '';
  location = '';

  search = output<{keyword: string, location: string}>();

  onSearch(): void {
    this.search.emit({ keyword: this.keyword, location: this.location });
  }
}
