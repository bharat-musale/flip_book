import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const onDownloadPDF = (cert) => {
  const element = document.getElementById("certificate-section");

  if (!element) {
    console.error("Element not found!");
    return;
  }

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm for A4
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm for A4

    const maxWidth = pageWidth - 40; // 20mm margin on each side
    const imgWidth = maxWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2; // center vertically (optional)

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`${cert.recordName || "certificate"}.pdf`);
  });
};

export default onDownloadPDF;
