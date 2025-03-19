"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Invoice } from "../types/invoice";
import { invoicesSelector } from "./invoiceSlice";

export default function Invoices() {
  const invoices: Invoice[] = useSelector(invoicesSelector);

  console.log(invoices);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Invoices</h1>
        <Link className="px-5 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition" href="/invoices/new">
          + Create New Invoice
        </Link>
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border border-gray-300 text-left">Seller Name</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Customer Name</th>
              <th className="px-4 py-3 border border-gray-300 text-center">Total Products</th>
              <th className="px-4 py-3 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={invoice.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-200 transition`}>
                  <td className="px-4 py-3 border border-gray-300">{invoice.payTo.name}</td>
                  <td className="px-4 py-3 border border-gray-300">{invoice.billTo?.name}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{invoice.products.length}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">
                    <Link className="px-3 py-1 text-blue-600 font-medium hover:underline" href={`/invoices/${invoice.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-gray-600">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
