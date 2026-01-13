import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      @for (n of service.notifications(); track n.id) {
        <div class="pointer-events-auto min-w-[300px] max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-slide-in-right overflow-hidden relative">
          <!-- Progress bar -->
          <div class="absolute bottom-0 left-0 h-1 bg-blue-500/20 w-full">
             <div class="h-full bg-blue-600 animate-shrink-width"></div>
          </div>
          
          <div [ngClass]="{
            'bg-green-100 text-green-600': n.type === 'success',
            'bg-red-100 text-red-600': n.type === 'error',
            'bg-blue-100 text-blue-600': n.type === 'info'
          }" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
            @if (n.type === 'success') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            } @else if (n.type === 'error') {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            } @else {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }
          </div>
          <div class="flex-1 pr-6">
            <p class="text-sm font-bold text-gray-900 leading-snug">{{ n.message }}</p>
          </div>
          <button (click)="remove(n.id)" class="text-gray-300 hover:text-gray-500 transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
    </div>
  `,
    styles: [`
    .animate-shrink-width {
      animation: shrink linear forwards;
      animation-duration: 5s;
    }
    @keyframes shrink { from { width: 100%; } to { width: 0%; } }
  `]
})
export class ToastComponent {
    service = inject(NotificationService);

    remove(id: number) {
        this.service.notifications.update(n => n.filter(item => item.id !== id));
    }
}
