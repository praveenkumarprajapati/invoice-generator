'use client'
import InvoicePdf from "@/app/components/InvoicePdf";
import { Invoice } from "@/app/types/invoice";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
const Page = () => {
    // Extract id from the URL
    const { id } = useParams();
    const invoices = useSelector((state: any) => state.invoices);

    const invoice: Invoice = invoices.find((invoice: any) => invoice.id === id);
    return (
        <InvoicePdf invoice={invoice} />
    )
}

export default Page;