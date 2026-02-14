import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-account-modal',
  imports: [],
  templateUrl: './delete-account-modal.component.html',
})
export class DeleteAccountModalComponent {
  isOpen = input<boolean>(false);

  confirm = output<void>();
  cancelled = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
