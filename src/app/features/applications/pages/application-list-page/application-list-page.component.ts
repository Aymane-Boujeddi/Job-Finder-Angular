import { Component } from '@angular/core';
import { ApplicationListComponent } from '../../application-list/application-list.component';

@Component({
  selector: 'app-application-list-page',
  imports: [ApplicationListComponent],
  templateUrl: './application-list-page.component.html',
})
export class ApplicationListPageComponent {
  // TODO: Load applications on init via ApplicationService
}
