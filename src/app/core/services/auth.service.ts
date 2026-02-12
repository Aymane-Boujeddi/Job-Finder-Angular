import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, switchMap, tap, throwError, map, take } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/users';
  private router = inject(Router);
  private storageService = inject(StorageService);

  currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const storedUser = this.storageService.get('user');
    if (storedUser) {
      this.getUser(storedUser.email);
    }
  }

  register(user: User): Observable<User> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?email=${user.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          return throwError(() => new Error('Email already exists'));
        }
        return this.httpClient.post<User>(this.baseUrl, user);
      }),
      tap((newUser) => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }),
    );
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      switchMap((users) => {
        if (users.length === 0 || users[0].password !== password) {
          return throwError(() => new Error('Invalid credentials'));
        }
        return of(users[0]);
      }),
      tap((user) => {
        this.currentUser.set(user);
        this.storageService.set('user', this.userWithoutPassword(user));
        this.router.navigate(['/']);
      }),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.storageService.remove('user');
    this.router.navigate(['/login']);
  }

  getUser(email: string): void {
    this.httpClient
      .get<User[]>(`${this.baseUrl}?email=${email}`)
      .pipe(
        map((users) => (users.length > 0 ? users[0] : null)),
        take(1),
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.currentUser.set(user);
            this.storageService.set('user', this.userWithoutPassword(user));
          }
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
  userWithoutPassword(user: User): User {
    const { password, ...userStorage } = user;
    return userStorage;
  }

  profileUpdate(updatedData: Partial<User>): Observable<User> {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return throwError(() => new Error('User not authenticated'));
    }

    return this.httpClient.patch<User>(`${this.baseUrl}/${currentUser.id}`, updatedData).pipe(
      tap((updatedUser) => {
        this.currentUser.set(updatedUser);
        this.storageService.set('user', this.userWithoutPassword(updatedUser));
      }),
    );
  }

  passwordUpdate(oldPassword: string, newPassword: string): Observable<User> {
    const currentUser = this.currentUser();
    if (!currentUser || !currentUser.id) {
      return throwError(() => new Error('User not authenticated'));
    }

    if (currentUser.password !== oldPassword) {
      return throwError(() => new Error('Old password is incorrect'));
    }

    return this.httpClient
      .patch<User>(`${this.baseUrl}/${currentUser.id}`, { password: newPassword })
      .pipe(
        tap((updatedUser) => {
          this.currentUser.set(updatedUser);
          this.storageService.set('user', this.userWithoutPassword(updatedUser));
        }),
      );
  }
}
