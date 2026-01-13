import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    // Signal to track auth state reactively
    isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
    currentUser = signal<string | null>(localStorage.getItem('username'));
    sessionTimeLeft = signal<number>(0); // In seconds
    private timerHandle: any;

    private apiUrl = 'http://localhost:3000/api/auth';

    constructor() {
        if (this.isAuthenticated()) {
            this.startSessionTimer();
        }
    }

    login(credentials: { username: string; password: string }): Observable<boolean> {
        return this.http.post<{ token: string; username: string }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                localStorage.setItem('sessionStart', Date.now().toString());
                this.isAuthenticated.set(true);
                this.currentUser.set(response.username);
                this.startSessionTimer();
            }),
            map(() => true),
            catchError(error => {
                console.error('Login failed', error);
                return of(false);
            })
        );
    }

    private startSessionTimer() {
        if (this.timerHandle) clearInterval(this.timerHandle);

        const SESSION_LIMIT = 10 * 60; // 10 minutes in seconds
        const sessionStart = parseInt(localStorage.getItem('sessionStart') || Date.now().toString());

        const tick = () => {
            const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
            const remaining = SESSION_LIMIT - elapsed;

            if (remaining <= 0) {
                this.sessionTimeLeft.set(0);
                this.logout();
                clearInterval(this.timerHandle);
            } else {
                this.sessionTimeLeft.set(remaining);
            }
        };

        tick();
        this.timerHandle = setInterval(tick, 1000);
    }

    refreshSession() {
        localStorage.setItem('sessionStart', Date.now().toString());
        this.startSessionTimer();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('sessionStart');
        if (this.timerHandle) clearInterval(this.timerHandle);
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        this.sessionTimeLeft.set(0);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
