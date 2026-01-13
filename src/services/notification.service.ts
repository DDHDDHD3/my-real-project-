import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
    id: number;
    message: string;
    type: NotificationType;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications = signal<Notification[]>([]);
    private nextId = 0;

    show(message: string, type: NotificationType = 'success', duration = 5000) {
        const id = this.nextId++;
        this.notifications.update(n => [...n, { id, message, type }]);

        setTimeout(() => {
            this.notifications.update(n => n.filter(item => item.id !== id));
        }, duration);
    }

    success(message: string) { this.show(message, 'success'); }
    error(message: string) { this.show(message, 'error'); }
    info(message: string) { this.show(message, 'info'); }
}
