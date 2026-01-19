
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
<div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 40px; background: white; width: 800px; min-height: 1000px; box-sizing: border-box;">
  <div style="text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="font-size: 32px; font-weight: bold; color: #1e40af; margin: 0; text-transform: uppercase; letter-spacing: 1px;">${correctName}</h1>
    <h2 style="font-size: 18px; color: #3b82f6; font-weight: bold; margin: 8px 0;">${correctRole}</h2>
    <p style="font-size: 14px; color: #4b5563; margin: 0;">
      ${address} &nbsp;|&nbsp; ${phone} &nbsp;|&nbsp; ${email}
    </p>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Professional Objective</div>
    <p style="font-size: 14px; text-align: justify; margin: 0; color: #333;">Highly motivated Information Technology Professional with a strong foundation in modern web technologies and a dedicated focus on creating high-quality software that provides real value to users. Specialized in digital systems and data administration with a passion for building user-centric applications.</p>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Work Experience</div>
    
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 16px; color: #000;">Sales Assistant</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 14px; margin-bottom: 5px;">Qabas Alhoda &nbsp;|&nbsp; Jan 2025 &ndash; June 2025</div>
      <ul style="margin: 5px 0; padding-left: 20px; color: #444;">
        <li style="font-size: 14px; margin-bottom: 3px;">Maintained accurate financial records and payments for student enrollments.</li>
        <li style="font-size: 14px; margin-bottom: 3px;">Developed and implemented an online grading tracking system to streamline performance monitoring.</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 16px; color: #000;">System Management</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 14px; margin-bottom: 5px;">Freelance &nbsp;|&nbsp; Jan 2024 &ndash; Dec 2024</div>
      <ul style="margin: 5px 0; padding-left: 20px; color: #444;">
        <li style="font-size: 14px; margin-bottom: 3px;">Managed registration databases and high-volume data tracking for various clients.</li>
        <li style="font-size: 14px; margin-bottom: 3px;">Implemented UI/UX improvements for digital educational and marketing materials.</li>
      </ul>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Education</div>
    <div style="margin-bottom: 12px;">
      <div style="font-weight: bold; font-size: 16px; color: #000;">City University of Mogadishu</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 14px;">Bachelor of Information Technology &nbsp;|&nbsp; 2021 &ndash; 2025</div>
    </div>
    <div style="margin-bottom: 12px;">
      <div style="font-weight: bold; font-size: 16px; color: #000;">Tabaarak ICT Solution</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 14px;">Certified MEAN Stack Web Development Professional &nbsp;|&nbsp; 2025</div>
    </div>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Core Skills</div>
    <p style="font-size: 14px; margin: 0; color: #333; line-height: 1.6;">
      <strong style="color: #1e40af;">Technical:</strong> IT Support, Full Stack Development (MEAN Stack), Digital Systems, Data Administration. <br>
      <strong style="color: #1e40af;">Creative:</strong> UI/UX Design, Remittance System Design, Graphic Material Optimization. <br>
      <strong style="color: #1e40af;">Soft Skills:</strong> Problem Solving, Communication, Team Collaboration, Analytical Thinking.
    </p>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Personal Information</div>
    <table style="width: 100%; border: none; font-size: 14px; color: #333;">
      <tr>
        <td style="width: 33%;"><strong style="color: #1e40af;">Date of Birth:</strong> 11 Sept 1999</td>
        <td style="width: 33%;"><strong style="color: #1e40af;">Marital Status:</strong> Single</td>
        <td style="width: 33%;"><strong style="color: #1e40af;">Nationality:</strong> Somali</td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 10px;">
    <div style="font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1e40af; padding: 6px 15px; margin-bottom: 12px; text-transform: uppercase;">Professional Reference</div>
    <div>
      <div style="font-weight: bold; font-size: 16px; color: #000;">Zakria Mahmud Elmi</div>
      <div style="color: #2563eb; font-weight: bold; font-size: 14px;">IT Manager &nbsp;|&nbsp; City University of Mogadishu</div>
      <p style="margin: 5px 0; font-size: 14px; color: #333;">Email: Zakariamacalin123@gmail.com &nbsp;|&nbsp; Phone: +252 61 7654470</p>
    </div>
  </div>
</div>
    `;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.innerHTML = pdfHtml;
    document.body.appendChild(container);

    const opt = {
      margin: 0,
      filename: 'Abdullahi_Isse_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(container).set(opt).save().then(() => {
      document.body.removeChild(container);
    });
  }
}
