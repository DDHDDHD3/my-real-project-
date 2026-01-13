
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { MonitoringService } from './services/monitoring.service';

import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent]
})
export class AppComponent {
  // Initialize the theme service to apply the theme on app load.
  private themeService = inject(ThemeService);
  // Temporarily disabled MonitoringService (may cause crash without valid connection string)
  // private monitoringService = inject(MonitoringService);
}
