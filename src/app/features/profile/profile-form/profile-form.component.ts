import { Component, input, OnChanges, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnChanges {
  currentUser = input<User | null>(null);
  passwordErrorMessage = input<string | null>(null);
  passwordSuccessMessage = input<string | null>(null);
  informationErrorMessage = input<string | null>(null);
  informationSuccessMessage = input<string | null>(null);

  profileUpdate = output<{ nom: string; prenom: string; email: string }>();
  passwordUpdate = output<{ oldPassword: string; newPassword: string }>();

  profileForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnChanges(): void {
    const user = this.currentUser();
    if (user) {
      this.profileForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      });
    }
  }

  errorMessage(formControl: string): string {
    let control = this.profileForm.get(formControl);
    if (!control) {
      control = this.passwordForm.get(formControl);
    }

    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    const fieldLabels: { [key: string]: string } = {
      nom: 'Last name',
      prenom: 'First name',
      email: 'Email',
      oldPassword: 'Current password',
      newPassword: 'New password',
    };
    const fieldLabel = fieldLabels[formControl] || formControl;

    if (errors['required']) return `${fieldLabel} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) {
      return `${fieldLabel} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    return 'Invalid field';
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValue = this.profileForm.value;
    const updatedData = {
      nom: formValue.nom!,
      prenom: formValue.prenom!,
      email: formValue.email!,
    };

    this.profileUpdate.emit(updatedData);
  }

  passwordSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.value;
    this.passwordUpdate.emit({ oldPassword: oldPassword!, newPassword: newPassword! });
    this.passwordForm.reset();
    this.passwordForm.get('oldPassword')?.setErrors(null);
    this.passwordForm.get('newPassword')?.setErrors(null);
  }
}
