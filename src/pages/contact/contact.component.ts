
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  dataService = inject(DataService);
  private notificationService = inject(NotificationService);

  submitForm(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    this.dataService.sendMessage(data).subscribe({
      next: () => {
        this.notificationService.success('Thank you for your message! It has been sent to Abdullahi.');
        form.reset();
      },
      error: (err) => {
        console.error('Failed to send message', err);
        this.notificationService.error('Oops! Something went wrong. Please try again later.');
      }
    });
  }
}
