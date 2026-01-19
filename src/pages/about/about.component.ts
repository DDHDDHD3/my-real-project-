
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

    const pdfHtml = `
<div style="font-family: 'Arial', sans-serif; line-height: 1.4; color: #333; padding: 40px; background: white;">
  <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px;">
    <h1 style="font-size: 26pt; font-weight: bold; color: #1e40af; margin: 0; text-transform: uppercase;">${correctName}</h1>
    <p style="font-size: 14pt; color: #3b82f6; font-weight: bold; margin: 5px 0;">${correctRole}</p>
    <p style="font-size: 10pt; color: #4b5563;">
      ${address} &nbsp;|&nbsp; ${phone} &nbsp;|&nbsp; ${email}
    </p>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Professional Objective</div>
    <p style="font-size: 10.5pt; text-align: justify; margin: 0;">Highly motivated Information Technology Professional with a strong foundation in modern web technologies and a dedicated focus on creating high-quality software that provides real value to users. Specialized in digital systems and data administration with a passion for building user-centric applications.</p>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Work Experience</div>
    
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 12pt; color: #111;">Sales Assistant</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 10pt; margin-bottom: 5px;">Qabas Alhoda &nbsp;|&nbsp; Jan 2025 &ndash; June 2025</div>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li style="font-size: 10.5pt;">Maintained accurate financial records and payments for student enrollments.</li>
        <li style="font-size: 10.5pt;">Developed and implemented an online grading tracking system to streamline performance monitoring.</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 12pt; color: #111;">System Management</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 10pt; margin-bottom: 5px;">Freelance &nbsp;|&nbsp; Jan 2024 &ndash; Dec 2024</div>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li style="font-size: 10.5pt;">Managed registration databases and high-volume data tracking for various clients.</li>
        <li style="font-size: 10.5pt;">Implemented UI/UX improvements for digital educational and marketing materials.</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Education</div>
    <div style="margin-bottom: 10px;">
      <div style="font-weight: bold; font-size: 12pt; color: #111;">City University of Mogadishu</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 10pt;">Bachelor of Information Technology &nbsp;|&nbsp; 2021 &ndash; 2025</div>
    </div>
    <div style="margin-bottom: 10px;">
      <div style="font-weight: bold; font-size: 12pt; color: #111;">Tabaarak ICT Solution</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 10pt;">Certified MEAN Stack Web Development Professional &nbsp;|&nbsp; 2025</div>
    </div>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Core Skills</div>
    <p style="font-size: 10.5pt; margin: 0;">
      <strong>Technical:</strong> IT Support, Full Stack Development (MEAN Stack), Digital Systems, Data Administration. <br>
      <strong>Creative:</strong> UI/UX Design, Remittance System Design, Graphic Material Optimization. <br>
      <strong>Soft Skills:</strong> Problem Solving, Communication, Team Collaboration, Analytical Thinking.
    </p>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Personal Information</div>
    <table style="width: 100%; border: none; font-size: 10.5pt;">
      <tr>
        <td style="width: 33%;"><strong>Date of Birth:</strong> 11 Sept 1999</td>
        <td style="width: 33%;"><strong>Marital Status:</strong> Single</td>
        <td style="width: 33%;"><strong>Nationality:</strong> Somali</td>
      </tr>
    </table>
  </div>

  <div style="margin-top: 20px;">
    <div style="font-size: 13pt; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 5px 10px; margin-bottom: 10px; text-transform: uppercase;">Professional Reference</div>
    <div>
      <div style="font-weight: bold; font-size: 12pt; color: #111;">Zakria Mahmud Elmi</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 10pt;">IT Manager &nbsp;|&nbsp; City University of Mogadishu</div>
      <p style="margin: 2px 0; font-size: 10.5pt;">Email: Zakariamacalin123@gmail.com &nbsp;|&nbsp; Phone: +252 61 7654470</p>
    </div>
  </div>
</div>
    `;

    const container = document.createElement('div');
    container.innerHTML = pdfHtml;
    document.body.appendChild(container);

    const opt = {
      margin: 0,
      filename: 'Abdullahi_Isse_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(container).set(opt).save().then(() => {
      document.body.removeChild(container);
    });
  }
}
