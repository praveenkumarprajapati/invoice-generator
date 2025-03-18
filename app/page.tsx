"use client";
import { useDispatch, useSelector } from "react-redux";
import { myInfoSelector, updateMyInfo } from "./myinfoSlice";
import Link from "next/link";

export default function Home() {
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">Invoice Generator</h1>

      {/* My Information Card */}
      <div className="mt-6 p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">My Information</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => dispatch(updateMyInfo({ name: e.target.value }))}
              value={myInfo.name || ""}
              id="name"
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your name"
              type="text"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="address">
              Address
            </label>
            <input
              onChange={(e) => dispatch(updateMyInfo({ address: e.target.value }))}
              value={myInfo.address || ""}
              id="address"
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your address"
              type="text"
            />
          </div>

          {/* GSTIN */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="gstin">
              GSTIN
            </label>
            <input
              onChange={(e) => dispatch(updateMyInfo({ gstin: e.target.value }))}
              value={myInfo.gstin || ""}
              id="gstin"
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter GSTIN"
              type="text"
            />
          </div>
        </div>
      </div>

      {/* View Invoices Link */}
      <Link className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition" href="/invoices">
        View My Invoices
      </Link>
    </div>
  );
}
