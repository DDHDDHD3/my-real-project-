import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden bg-white dark:bg-gray-950">
      <!-- Animated Background Blobs -->
      <div class="absolute top-0 -left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute top-0 -right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob delay-700"></div>
      <div class="absolute -bottom-20 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob delay-1000"></div>

      <div class="max-w-md w-full relative z-10 animate-scale-in">
        <div class="bg-white/70 dark:bg-gray-900/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-blue-500/10 border border-white/40 dark:border-gray-800/50 space-y-12 transition-all hover:shadow-blue-500/20">
          
          <div class="text-center space-y-3">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mx-auto mb-8 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 class="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Admin Portal</h2>
            <p class="text-gray-500 dark:text-gray-400 font-medium">Verify your identity to continue.</p>
          </div>

          <form (ngSubmit)="onSubmit()" class="space-y-8">
            <div class="space-y-6">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Secure Username</label>
                <div class="relative group">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </span>
                  <input type="text" [(ngModel)]="username" name="username" required
                    class="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800/40 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                    placeholder="Username">
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Access Key</label>
                <div class="relative group">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input type="password" [(ngModel)]="password" name="password" required
                    class="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800/40 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                    placeholder="••••••••">
                </div>
              </div>
            </div>

            <button type="submit" [disabled]="loading"
              class="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-[2rem] shadow-2xl shadow-blue-500/40 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-4 group">
              @if (loading) {
                <svg class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="tracking-widest uppercase text-xs">Verifying...</span>
              } @else {
                <span class="tracking-widest uppercase text-xs">Unlock Dashboard</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              }
            </button>
          </form>

          @if (authService.debugInfo()) {
            <div class="mt-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono break-all">
              <p class="font-black uppercase mb-2">Technical Debug Info:</p>
              {{ authService.debugInfo() }}
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  public authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  onSubmit() {
    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      this.notificationService.error('Please enter both username and access key.');
      return;
    }

    this.authService.debugInfo.set('');
    this.loading = true;

    this.authService.login({
      username: trimmedUsername,
      password: trimmedPassword
    }).subscribe({
      next: (success) => {
        if (success) {
          this.notificationService.success('Welcome back, Admin!');
          this.router.navigate(['/admin']);
        } else {
          this.notificationService.error('Invalid credentials. Please try again.');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Login submit error:', err);
        this.notificationService.error('Authentication failed. Please check your connection.');
        this.loading = false;
      }
    });
  }
}
