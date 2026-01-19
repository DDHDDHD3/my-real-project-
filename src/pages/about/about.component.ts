
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
    // Get the resume container element
    const element = document.getElementById('resume-container');
    if (!element) {
      console.error('Resume container not found');
      return;
    }

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Hide no-print elements in the clone
    const noPrintElements = clone.querySelectorAll('.no-print');
    noPrintElements.forEach((el: any) => {
      el.style.display = 'none';
    });

    // Apply print styles to the clone
    clone.style.background = 'white';
    clone.style.maxWidth = '100%';
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.borderRadius = '0';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';

    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: 'Abdullahi_Isse_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Generate PDF
    html2pdf().from(clone).set(opt).save();
  }
}
