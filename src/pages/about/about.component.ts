
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';

declare var html2pdf: any;

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  dataService = inject(DataService);

  downloadPDF() {
    const element = document.getElementById('resume-container');
    const opt = {
      margin: 0.2,
      filename: 'Abdullahi_Isse_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Temporarily hide elements with .no-print
    const noPrintElements = document.querySelectorAll('.no-print');
    noPrintElements.forEach((el: any) => el.style.display = 'none');

    html2pdf().from(element).set(opt).save().then(() => {
      // Restore elements
      noPrintElements.forEach((el: any) => el.style.display = '');
    });
  }
}
