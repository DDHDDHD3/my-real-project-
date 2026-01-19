
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
    const correctName = 'ABDULLAHI MUSE ISSE';
    const correctRole = 'Information Technology Professional';
    const email = 'abdallaise877@gmail.com';
    const phone = '+252 61 4163362';
    const address = 'Mogadishu, Somalia';

    // Create temporary container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.width = '210mm';
    container.style.background = 'white';

    container.innerHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 20px; background: white;">
        <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 15px;">
          <h1 style="font-size: 24pt; font-weight: bold; color: #1e40af; margin: 0; text-transform: uppercase;">${correctName}</h1>
          <p style="font-size: 13pt; color: #3b82f6; font-weight: bold; margin: 5px 0;">${correctRole}</p>
          <p style="font-size: 9pt; color: #4b5563; margin: 0;">${address} | ${phone} | ${email}</p>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Professional Objective</div>
          <p style="font-size: 9.5pt; text-align: justify; margin: 0; line-height: 1.3;">Highly motivated Information Technology Professional with a strong foundation in modern web technologies and a dedicated focus on creating high-quality software that provides real value to users. Specialized in digital systems and data administration with a passion for building user-centric applications.</p>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Work Experience</div>
          
          <div style="margin-bottom: 10px;">
            <div style="font-weight: bold; font-size: 10.5pt; color: #111;">Sales Assistant</div>
            <div style="color: #2563eb; font-weight: bold; font-size: 9pt; margin-bottom: 3px;">Qabas Alhoda | Jan 2025 – June 2025</div>
            <ul style="margin: 3px 0; padding-left: 18px; font-size: 9pt; line-height: 1.2;">
              <li>Maintained accurate financial records and payments for student enrollments.</li>
              <li>Developed and implemented an online grading tracking system to streamline performance monitoring.</li>
            </ul>
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-weight: bold; font-size: 10.5pt; color: #111;">System Management</div>
            <div style="color: #2563eb; font-weight: bold; font-size: 9pt; margin-bottom: 3px;">Freelance | Jan 2024 – Dec 2024</div>
            <ul style="margin: 3px 0; padding-left: 18px; font-size: 9pt; line-height: 1.2;">
              <li>Managed registration databases and high-volume data tracking for various clients.</li>
              <li>Implemented UI/UX improvements for digital educational and marketing materials.</li>
            </ul>
          </div>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Education</div>
          <div style="margin-bottom: 8px;">
            <div style="font-weight: bold; font-size: 10.5pt; color: #111;">City University of Mogadishu</div>
            <div style="color: #2563eb; font-weight: bold; font-size: 9pt;">Bachelor of Information Technology | 2021 – 2025</div>
          </div>
          <div style="margin-bottom: 8px;">
            <div style="font-weight: bold; font-size: 10.5pt; color: #111;">Tabaarak ICT Solution</div>
            <div style="color: #2563eb; font-weight: bold; font-size: 9pt;">Certified MEAN Stack Web Development Professional | 2025</div>
          </div>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Core Skills</div>
          <p style="font-size: 9.5pt; margin: 0; line-height: 1.3;"><strong>Technical:</strong> IT Support, Full Stack Development (MEAN Stack), Digital Systems, Data Administration.<br><strong>Creative:</strong> UI/UX Design, Remittance System Design, Graphic Material Optimization.<br><strong>Soft Skills:</strong> Problem Solving, Communication, Team Collaboration, Analytical Thinking.</p>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Personal Information</div>
          <table style="width: 100%; border: none; font-size: 9.5pt;">
            <tr>
              <td style="width: 33%;"><strong>Date of Birth:</strong> 11 Sept 1999</td>
              <td style="width: 33%;"><strong>Marital Status:</strong> Single</td>
              <td style="width: 33%;"><strong>Nationality:</strong> Somali</td>
            </tr>
          </table>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 11pt; font-weight: bold; color: white; background-color: #1e40af; padding: 4px 8px; margin-bottom: 8px; text-transform: uppercase;">Professional Reference</div>
          <div>
            <div style="font-weight: bold; font-size: 10.5pt; color: #111;">Zakria Mahmud Elmi</div>
            <div style="color: #2563eb; font-weight: bold; font-size: 9pt;">IT Manager | City University of Mogadishu</div>
            <p style="margin: 2px 0; font-size: 9.5pt;">Email: Zakariamacalin123@gmail.com | Phone: +252 61 7654470</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: 'Abdullahi_Isse_Resume.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
        windowHeight: 1123
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(container).save().then(() => {
      document.body.removeChild(container);
    });
  }
}
