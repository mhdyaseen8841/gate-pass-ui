import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export const exportToPDF = ({ data, headers, title = 'Report', fileName = 'report.pdf' }) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  
  autoTable(doc, {
    startY: 25,
    head: [headers],
    body: data.map(row => headers.map(header => row[header] || '')), // Dynamically map headers
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

export const exportToExcel = ({ data, headers, title = 'Report', fileName = 'report.xlsx' }) => {
  const formattedData = data.map(row => {
    let formattedRow = {};
    headers.forEach(header => {
      formattedRow[header] = row[header] || '';
    });
    return formattedRow;
  });
  
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, fileName);
};