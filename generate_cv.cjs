const fs = require('fs');
const path = require('path');

const correctName = 'ABDULLAHI MUSE ISSE';
const correctRole = 'Information Technology Professional';
const email = 'abdallaise877@gmail.com';
const phone = '+252 61 4163362';
const address = 'Mogadishu, Somalia';

const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset="utf-8">
<style>
  @page {
    size: 8.5in 11in;
    margin: 1in;
  }
  body { 
    font-family: 'Calibri', 'Arial', sans-serif; 
    line-height: 1.5; 
    color: #333;
  }
  .header { 
    text-align: center; 
    border-bottom: 2px solid #2563eb; 
    padding-bottom: 10px; 
    margin-bottom: 20px;
  }
  .name { 
    font-size: 24pt; 
    font-weight: bold; 
    color: #1e40af; 
    margin: 0;
  }
  .role { 
    font-size: 14pt; 
    color: #4b5563; 
    margin: 5px 0;
  }
  .contact { 
    font-size: 10pt; 
    color: #6b7280; 
  }
  .section { 
    margin-top: 20px; 
  }
  .section-title { 
    font-size: 13pt; 
    font-weight: bold; 
    color: #1e40af; 
    border-bottom: 1px solid #e5e7eb; 
    padding-bottom: 3px; 
    margin-bottom: 8px; 
    text-transform: uppercase;
  }
  .item { 
    margin-bottom: 12px; 
  }
  .item-header {
    display: table;
    width: 100%;
  }
  .item-title { 
    font-weight: bold; 
    font-size: 12pt; 
  }
  .item-date {
    text-align: right;
    font-style: italic;
    font-size: 10pt;
    color: #666;
  }
  .item-subtitle { 
    color: #2563eb; 
    font-weight: bold; 
    font-size: 10pt; 
    margin-top: 2px;
  }
  ul { 
    margin-top: 5px; 
    margin-bottom: 5px;
  }
  li { 
    margin-bottom: 2px; 
  }
  .skills-list {
    font-weight: bold;
  }
</style>
</head>
<body>
  <div class="header">
    <p class="name">${correctName}</p>
    <p class="role">${correctRole}</p>
    <p class="contact">
      ${address} &nbsp;|&nbsp; ${phone} &nbsp;|&nbsp; ${email}
    </p>
  </div>

  <div class="section">
    <div class="section-title">Professional Objective</div>
    <p>Highly motivated Information Technology Professional with a strong foundation in modern web technologies and a dedicated focus on creating high-quality software that provides real value to users.</p>
  </div>

  <div class="section">
    <div class="section-title">Work Experience</div>
    
    <div class="item">
      <div class="item-title">Sales Assistant</div>
      <div class="item-subtitle">Qabas Alhoda &nbsp;|&nbsp; Jan 2025 &ndash; June 2025</div>
      <ul>
        <li>Maintained accurate financial records and payments.</li>
        <li>Developed an online grading tracking system.</li>
      </ul>
    </div>

    <div class="item">
      <div class="item-title">System Management</div>
      <div class="item-subtitle">Freelance &nbsp;|&nbsp; 2024 &ndash; 2025</div>
      <ul>
        <li>Managed registration databases and data tracking.</li>
        <li>Implemented UI/UX improvements for digital materials.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="item">
      <div class="item-title">City University of Mogadishu</div>
      <div class="item-subtitle">IT Graduate &nbsp;|&nbsp; 2024 &ndash; 2025</div>
    </div>
    <div class="item">
      <div class="item-title">Tabaarak ICT Solution</div>
      <div class="item-subtitle">MEAN Stack Web Development &nbsp;|&nbsp; 2025</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Core Skills</div>
    <p class="skills-list">IT Support, Full Stack Dev, Remittance Systems, UI/UX Design</p>
  </div>

  <div class="section">
    <div class="section-title">Personal Information</div>
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 33%;"><strong>Date of Birth:</strong> 11 Sept 1999</td>
        <td style="width: 33%;"><strong>Marital Status:</strong> Single</td>
        <td style="width: 33%;"><strong>Nationality:</strong> Somali</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Reference</div>
    <div class="item">
      <div class="item-title">Zakria Mahmud Elmi</div>
      <div class="item-subtitle">IT Manager &nbsp;|&nbsp; City University</div>
      <p style="margin-top: 2px;">Email: Zakariamacalin123@gmail.com &nbsp;|&nbsp; Phone: +252 61 7654470</p>
    </div>
  </div>
</body>
</html>
`;

const cvDir = path.join(__dirname, 'public/assets/cv');
if (!fs.existsSync(cvDir)) {
    fs.mkdirSync(cvDir, { recursive: true });
}

fs.writeFileSync(path.join(cvDir, 'resume.doc'), content);
console.log('✅ Professional Word Resume (resume.doc) has been generated in public/assets/cv/');
