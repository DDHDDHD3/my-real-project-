
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
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;

    // Helper to add text
    const addText = (text: string, size: number, style: string, color: number[] = [0, 0, 0], align: string = 'left') => {
      doc.setFontSize(size);
      doc.setFont('helvetica', style);
      doc.setTextColor(color[0], color[1], color[2]);
      if (align === 'center') {
        doc.text(text, pageWidth / 2, yPos, { align: 'center' });
      } else {
        doc.text(text, margin, yPos);
      }
    };

    // Helper for blue header bars
    const addSectionHeader = (title: string) => {
      doc.setFillColor(30, 64, 175);
      doc.rect(margin, yPos - 4, contentWidth, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 3, yPos + 1);
      yPos += 10;
    };

    // Header
    addText('ABDULLAHI MUSE ISSE', 20, 'bold', [30, 64, 175], 'center');
    yPos += 6;
    addText('Information Technology Professional', 12, 'bold', [59, 130, 246], 'center');
    yPos += 5;
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    doc.text('Mogadishu, Somalia  |  +252 61 4163362  |  abdallaise877@gmail.com', pageWidth / 2, yPos, { align: 'center' });

    // Blue line
    yPos += 3;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Professional Objective
    addSectionHeader('Professional Objective');
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    const objectiveText = 'Highly motivated Information Technology Professional with a strong foundation in modern web technologies and a dedicated focus on creating high-quality software that provides real value to users. Specialized in digital systems and data administration with a passion for building user-centric applications.';
    const splitObjective = doc.splitTextToSize(objectiveText, contentWidth);
    doc.text(splitObjective, margin, yPos);
    yPos += splitObjective.length * 4 + 5;

    // Work Experience
    addSectionHeader('Work Experience');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text('Sales Assistant', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Qabas Alhoda  |  Jan 2025 – June 2025', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    doc.text('• Maintained accurate financial records and payments for student enrollments.', margin + 2, yPos);
    yPos += 4;
    doc.text('• Developed and implemented an online grading tracking system.', margin + 2, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text('System Management', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Freelance  |  Jan 2024 – Dec 2024', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    doc.text('• Managed registration databases and high-volume data tracking.', margin + 2, yPos);
    yPos += 4;
    doc.text('• Implemented UI/UX improvements for digital materials.', margin + 2, yPos);
    yPos += 7;

    // Education
    addSectionHeader('Education');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text('City University of Mogadishu', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Bachelor of Information Technology  |  2021 – 2025', margin, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text('Tabaarak ICT Solution', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Certified MEAN Stack Web Development Professional  |  2025', margin, yPos);
    yPos += 7;

    // Core Skills
    addSectionHeader('Core Skills');
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical: ', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('IT Support, Full Stack Development (MEAN Stack), Digital Systems, Data Administration', margin + 20, yPos);
    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Creative: ', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('UI/UX Design, Remittance System Design, Graphic Material Optimization', margin + 18, yPos);
    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Soft Skills: ', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Problem Solving, Communication, Team Collaboration, Analytical Thinking', margin + 21, yPos);
    yPos += 7;

    // Personal Information
    addSectionHeader('Personal Information');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Date of Birth: ', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('11 Sept 1999', margin + 30, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text('Marital Status: ', margin + 70, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Single', margin + 100, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text('Nationality: ', margin + 130, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Somali', margin + 157, yPos);
    yPos += 7;

    // Professional Reference
    addSectionHeader('Professional Reference');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text('Zakria Mahmud Elmi', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('IT Manager  |  City University of Mogadishu', margin, yPos);
    yPos += 4;
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    doc.text('Email: Zakariamacalin123@gmail.com  |  Phone: +252 61 7654470', margin, yPos);

    // Save the PDF
    doc.save('Abdullahi_Isse_Resume.pdf');
  }
}
