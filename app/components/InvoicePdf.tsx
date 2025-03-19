"use client";
import Image from "next/image";
import { Invoice } from "../types/invoice";

const InvoicePdf = ({ invoice }: { invoice: Invoice }) => {
  if (!invoice) {
    return <div className="text-center text-red-500 font-semibold">Invoice not found</div>;
  }

  const hasSGST = invoice.products.some((product) => product.sgst > 0);
  const hasCGST = invoice.products.some((product) => product.cgst > 0);

  let grandTotal = 0;
  let subtotal = 0;
  let tax = 0;

  return (
    <div className="m-auto p-4 md:w-[950px] ">
      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="w-fit px-3 flex justify-center items-center border border-zinc-300 hover:border-zinc-400 cursor-pointer bg-zinc-200 hover:bg-zinc-300 text-gray-900 py-2 mt-4 rounded-md transition duration-200"
      >
        <Image src="/icons/print.svg" alt="print icon" width={22} height={22} />
        <span>Print</span>
      </button>
      <div className="printableArea mx-auto w-full md:w-full md:max-w-[900px] p-4 pt-0">
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-10 text-right">
            <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>
          </div>

          {/* Invoice Details */}
          <div className="flex justify-between text-gray-700 text-sm md:text-base">
            <div>
              <p className="font-semibold">Invoice No: {invoice.invoiceNumber}</p>
              <p>Date: {invoice.date}</p>
            </div>
          </div>

          {/* Bill To & Ship To */}
          <div className="flex flex-col sm:flex-row border border-gray-300 rounded-md mt-4">
            <div className="border-r border-gray-300 p-4 w-full ">
              <h3 className="font-semibold text-gray-700 mb-2">Bill To</h3>
              <p>{invoice.billTo?.name}</p>
              <p>{invoice.billTo?.address}</p>
              <p className="text-gray-600">GSTIN: {invoice.billTo?.gstin || "--"}</p>
            </div>
            <div className="p-4 w-full">
              <h3 className="font-semibold text-gray-700 mb-2">Pay To</h3>
              <p>{invoice.payTo.name}</p>
              <p>{invoice.payTo.address}</p>
              <p className="text-gray-600">GSTIN: {invoice.payTo.gstin || "--"}</p>
            </div>
          </div>

          {/* Products Table */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full mt-2 border-collapse border border-gray-300">
                <thead className="bg-gray-50 text-gray-700">
                  <tr className="text-sm md:text-base">
                    <th className="px-4 py-2 border border-gray-300">Sr No</th>
                    <th className="px-4 py-2 border border-gray-300">Description</th>
                    <th className="px-4 py-2 border border-gray-300">Unit Price</th>
                    <th className="px-4 py-2 border border-gray-300">Quantity</th>
                    {hasSGST && <th className="px-4 py-2 border border-gray-300">SGST (%)</th>}
                    {hasCGST && <th className="px-4 py-2 border border-gray-300">CGST (%)</th>}
                    <th className="px-4 py-2 border border-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.products.map((product, i) => {
                    const sgst = (product.perUnitPrice * product.sgst) / 100;
                    const cgst = (product.perUnitPrice * product.cgst) / 100;
                    tax += sgst + cgst;
                    subtotal += product.perUnitPrice * product.quantity;
                    const total = product.perUnitPrice * product.quantity + sgst + cgst;
                    grandTotal += total;

                    return (
                      <tr key={product.id} className="text-gray-700 text-sm md:text-base hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-300 text-center">{i + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">{product.name}</td>
                        <td className="px-4 py-2 border border-gray-300 text-right">₹{product.perUnitPrice}</td>
                        <td className="px-4 py-2 border border-gray-300 text-center">{product.quantity}</td>
                        {hasSGST && <td className="px-4 py-2 border border-gray-300 text-center">{product.sgst}%</td>}
                        {hasCGST && <td className="px-4 py-2 border border-gray-300 text-center">{product.cgst}%</td>}
                        <td className="px-4 py-2 border border-gray-300 text-right font-semibold">₹{total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t mt-6 p-4 bg-gray-50">
            <div className="flex justify-between p-2 text-gray-800 font-semibold">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-2 text-gray-700">
              <span>Tax:</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-2 text-lg font-bold text-gray-900 border-t mt-2 pt-2">
              <span>Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
