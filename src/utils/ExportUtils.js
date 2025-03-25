import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export const exportToPDF = (data, fileName = 'visitor_report.pdf') => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Check In Reports', 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [['Visit ID', 'Name', 'Company', 'Person To Visit', 'Purpose', 'Check-In Time', 'Check-Out Time']],
    body: data.map(row => [
      row.visit_id,
      row.visitor_name,
      row.company,
      row.person_to_visit,
      row.purpose,
      row.check_in_time,
      row.check_out_time
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    }
  });

  doc.save(fileName);
};

export const exportToExcel = (data, fileName = 'visitor_report.xlsx') => {
  const formattedData = data.map(row => ({
    'Visit ID': row.visit_id,
    'Name': row.visitor_name,
    'Company': row.company,
    'Person To Visit': row.person_to_visit,
    'Purpose': row.purpose,
    'Check-In Time': row.check_in_time,
    'Check-Out Time': row.check_out_time,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitor Report');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, fileName);
};
