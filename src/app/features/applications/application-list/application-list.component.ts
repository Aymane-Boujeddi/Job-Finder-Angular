import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  loadApplications,
  removeApplication,
  updateApplication,
} from '../store/applications.actions';
import { selectAllApplications } from '../store/applications.selector';
import { Status } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-list',
  imports: [DatePipe],
  templateUrl: './application-list.component.html',
})
export class ApplicationListComponent implements OnInit {
  private readonly store = inject(Store);

  statusOptions = [
    { label: 'En attente', value: Status.EN_ATTENTE },
    { label: 'Accepté', value: Status.ACCEPTE },
    { label: 'Refusé', value: Status.REFUSE }
  ]; 

  applications = this.store.selectSignal(selectAllApplications);

  ngOnInit(): void {
    this.store.dispatch(loadApplications());
  }
  onStatusChange(id: number, status: string): void {
    this.store.dispatch(updateApplication({ id, changes: { status: this.applicationsStatus(status)} }));
  }

  onDelete(id: number): void {
    this.store.dispatch(removeApplication({ id }));
  }

  private applicationsStatus(status: string): Status  {
    if (status == Status.ACCEPTE) {
      return Status.ACCEPTE;
    } else if (status == Status.EN_ATTENTE) {
      return Status.EN_ATTENTE;
    } 

      return Status.REFUSE;
    
  }
}
