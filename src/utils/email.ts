import * as XLSX from 'xlsx';

export const createExcelBlob = (data: any[]): Blob => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Véhicules');
  
  // Convert workbook to array buffer
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

export const downloadExcelFile = (data: any[], fileName: string): void => {
  const blob = createExcelBlob(data);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const createMailtoLink = (
  email: string,
  subject: string,
  body: string,
): string => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return mailtoLink;
};