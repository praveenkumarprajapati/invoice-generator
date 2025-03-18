"use client";
import InvoicePdf from "@/app/components/InvoicePdf";
import { Invoice } from "@/app/types/invoice";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { invoicesSelector } from "../invoiceSlice";
const Page = () => {
  // Extract id from the URL
  const { id } = useParams();
  const invoices = useSelector(invoicesSelector);
  const invoice: Invoice = invoices.find((invoice) => invoice.id === id) as Invoice;
  if (!invoice) {
    return <div>Invoice not Found</div>;
  }
  return <InvoicePdf invoice={invoice} />;
};

export default Page;
