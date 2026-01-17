
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const InvoiceSample = ({ showModal, onClose }) => {
  const [invoiceData, setInvoiceData] = useState({
    companyName: "BAUDDHANATH SECURITY SERVICES PVT. LTD.",
    companyAddress: "Machhapokhari-16, Kathmandu, Nepal",
    companyPhone: "Phone: 01-4961313, 9851017622",
    companyEmail: "Email: bauddhanath.services2019@gmail.com",
    clientName: "Ghanesh Hospital",
    billNo: "10",
    month: "1 Dec to 31 Dec 2007",
    date: new Date().toLocaleDateString(),
    items: [
      {
        sno: 1,
        description:
          "Security supervisor @5000/- per month\nNo. of security supervisor (1)",
        attendance: 28,
        amount: 4516,
      },
      {
        sno: 2,
        description:
          "Security guard @4100/- per month\nNo. of security Guard(4)",
        attendance: 118,
        amount: 15606,
      },
    ],
  });

  const calculateTotal = () =>
    invoiceData.items.reduce((sum, i) => sum + i.amount, 0);

  const amountInWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if ((num = num.toString()).length > 9) return "Overflow";
    const n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          " Only"
        : "";
    return str;
  };

 const downloadInvoice = () => {
  const doc = new jsPDF();

  // === HEADER ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(200, 30, 30);
  doc.text(invoiceData.companyName, 105, 15, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(50);
  doc.text(invoiceData.companyAddress, 105, 21, { align: "center" });
  doc.text(invoiceData.companyPhone, 105, 26, { align: "center" });
  doc.text(invoiceData.companyEmail, 105, 31, { align: "center" });

  // Divider line
  doc.setDrawColor(150);
  doc.setLineWidth(0.5);
  doc.line(10, 34, 200, 34);

  // === BILL INFO ===
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Bill No: ${invoiceData.billNo}`, 10, 42);
  doc.text(`Date: ${invoiceData.date}`, 160, 42);
  doc.text(`Client Name: ${invoiceData.clientName}`, 10, 50);
  doc.text(`Bill Period: ${invoiceData.month}`, 10, 56);

  // === TABLE ===
  const tableColumn = ["S.No", "Particulars", "Attendance", "Amount (Rs)"];
  const tableRows = invoiceData.items.map((item) => [
    item.sno,
    item.description,
    item.attendance,
    item.amount.toLocaleString(),
  ]);

  const total = calculateTotal();
  tableRows.push(["", "Total", "", total.toLocaleString()]);
  tableRows.push(["", "Grand Total", "", total.toLocaleString()]);

 autoTable(doc, {
  startY: 65,
  head: [tableColumn],
  body: tableRows,
  theme: "grid",
  styles: {
    fontSize: 10,
    cellPadding: 3,
    halign: "center",
    valign: "middle",
    lineColor: [0, 0, 0],
    lineWidth: 0.1,
  },
  columnStyles: {
    1: { halign: "left" },
    3: { halign: "right" },
  },
  headStyles: {
    fillColor: [230, 230, 230],
    textColor: 20,
    fontStyle: "bold",
  },
  bodyStyles: {
    textColor: [0, 0, 0],
  },
});

  // === FOOTER TEXT ===
const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(`(Amount in Words: ${amountInWords(total)})`, 10, finalY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Authorized Signatory", 10, finalY + 25, { align: "left" });
  doc.text(`For ${invoiceData.companyName}`, 10, finalY + 31, { align: "left" });

  // Optional footer line
  doc.setDrawColor(180);
  doc.line(10, 285, 200, 285);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("This is a system-generated invoice.", 105, 290, { align: "center" });

  // Save file
  doc.save(`${invoiceData.clientName}_Invoice.pdf`);
};
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 w-[700px] p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Invoice Preview
        </h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={downloadInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
          <p className="font-bold text-xl text-center text-red-600 m-0 p-0">
            {invoiceData.companyName}
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300 m-0 p-0">
            {invoiceData.companyAddress}
          </p>

          <p className="text-center text-gray-600 dark:text-gray-300 m-0 p-0">
            {invoiceData.companyPhone}
          </p>

          <p className="text-center text-gray-600 dark:text-gray-300 m-0 p-0 ">
            {invoiceData.companyEmail}
          </p>
          
          <div className="flex justify-between mt-2">
            <div>
              <strong>Bill No:</strong> {invoiceData.billNo}
            </div>
            <div>
              <strong>Date:</strong> {invoiceData.date}
            </div>
          </div>
          
          <p>
            <strong>Client:</strong> {invoiceData.clientName}
          </p>
     

          <table className="w-full mt-4 border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="border px-2 py-1">S.No</th>
                <th className="border px-2 py-1">Particular</th>
                <th className="border px-2 py-1">Attendance</th>
                <th className="border px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.sno}>
                  <td className="border px-2 py-1">{item.sno}</td>
                  <td className="border px-2 py-1 whitespace-pre-line">
                    {item.description}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {item.attendance}
                  </td>
                  <td className="border px-2 py-1 text-right">
                    Rs.{item.amount}/-
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td className="border px-2 py-1 font-semibold">Total</td>
                <td></td>
                <td className="border px-2 py-1 text-right font-semibold">
                  Rs.{calculateTotal()}/-
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="border px-2 py-1 font-semibold">Grand Total</td>
                <td></td>
                <td className="border px-2 py-1 text-right font-semibold">
                  Rs.{calculateTotal()}/-
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 italic text-sm">
            (Rupees – {amountInWords(calculateTotal())})
          </p>
          <div className="mt-6 text-left">
            <p className="font-semibold">Authorized Signatory</p>
            <p className="text-sm">
              (On behalf of {invoiceData.companyName})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSample;
