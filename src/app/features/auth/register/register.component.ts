import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  registrationError = signal<string | null>(null);

  registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
 
    if (errors['required']) return `${controlName} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) {
      return `${controlName} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    
    return 'Invalid field';
  }

  onSubmit(): void {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData = this.registerForm.getRawValue();
    
    this.authService.register(userData as User).subscribe({
      next: (response) => {

        this.registrationError.set(null);
      },
      error: (error) => {
        this.registrationError.set(error.message || 'Registration failed. Please try again.');
      }
    });
  }
}
