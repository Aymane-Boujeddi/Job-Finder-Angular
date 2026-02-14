import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileFormComponent } from '../../profile-form/profile-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { DeleteAccountModalComponent } from '../../delete-account-modal/delete-account-modal.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileFormComponent, DeleteAccountModalComponent],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  private readonly authService = inject(AuthService);

  user = signal<User | null>(null);
  passwordErrorMessage = signal<string | null>(null);
  passwordSuccessMessage = signal<string | null>(null);
  informationErrorMessage = signal<string | null>(null);
  informationSuccessMessage = signal<string | null>(null);
  showDeleteModal = signal<boolean>(false);

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    this.user.set(currentUser);
  }

  onProfileUpdate(data: { nom: string; prenom: string; email: string }): void {
    this.authService.profileUpdate(data).subscribe({
      next: () => {
        this.user.set(this.authService.currentUser());
        this.informationSuccessMessage.set('Profile updated successfully!');
        this.informationErrorMessage.set(null);
      },
      error: (error) => {
        this.informationErrorMessage.set(error.message || 'Failed to update profile');
        this.informationSuccessMessage.set(null);
      },
    });
  }

  onPasswordUpdate(data: { oldPassword: string; newPassword: string }): void {
    this.authService.passwordUpdate(data.oldPassword, data.newPassword).subscribe({
      next: () => {
        this.passwordSuccessMessage.set('Password updated successfully!');
        this.passwordErrorMessage.set(null);
      },
      error: (error) => {
        this.passwordErrorMessage.set(error.message || 'Failed to update password');
        this.passwordSuccessMessage.set(null);
      },
    });
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
  }

  confirmDeleteAccount(): void {
    this.authService.deleteAccount().subscribe({
      next: () => {
        this.closeDeleteModal();
        // User will be logged out and redirected by the service
      },
      error: (error) => {
        this.closeDeleteModal();
        this.informationErrorMessage.set(error.message || 'Failed to delete account');
      },
    });
  }
}
