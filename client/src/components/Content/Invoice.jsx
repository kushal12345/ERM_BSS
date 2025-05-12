import React from 'react'
import { useState } from 'react';
import InvoiceAdd from './Invoice/InvoiceAdd';
import InvoiceEdit from './Invoice/InvoiceEdit';
import Invoiceview from './Invoice/Invoiceview';
import InvoicePreview from './Invoice/InvoicePreview';


const Invoice = () => {
    const [page, setPage] = useState("");

    const renderpage = () => {
        switch (page) {
                case "invoiceadd":
                    return <InvoiceAdd setPage={setPage} />;
                case "invoiceedit":
                    return <InvoiceEdit setPage={setPage} />;
                case "invoiceview":
                    return <Invoiceview setPage={setPage} />;      
                case "invoicepreview":
                    return <InvoicePreview setPage={setPage} />;
                default:
                    return <Invoiceview setPage={setPage} />;
            };
    }
   


  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
        {renderpage()}
    </div>
  )
}

export default Invoice