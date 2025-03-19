"use client";
import { useDispatch, useSelector } from "react-redux";
import { myInfoSelector, updateMyInfo } from "./myinfoSlice";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "./components/Tooltip";
import { Input } from "./components/Input";

export default function Home() {
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">Invoice Generator</h1>

      {/* My Information Card */}
      <div className="mt-6 p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <h2 className="text-xl flex items-center gap-2 font-semibold text-gray-800 mb-4 border-b pb-2">
          <span>Master Data</span>
          <Tooltip text="We will use this information to prefill form.">
            <Image className="cursor-pointer" alt="info" src="/icons/info.svg" width={25} height={25} />
          </Tooltip>
        </h2>

        <div className="space-y-4">
          {/* Name */}

          <Input
            onChange={(value) => dispatch(updateMyInfo({ name: value }))}
            value={myInfo.name || ""}
            name="name"
            placeholder="Organization name"
            type="text"
          />

          {/* Address */}

          <Input
            onChange={(value) => dispatch(updateMyInfo({ address: value }))}
            value={myInfo.address || ""}
            name="address"
            placeholder="Enter your address"
            type="text"
          />

          {/* GSTIN */}

          <Input
            onChange={(value) => dispatch(updateMyInfo({ gstin: value }))}
            value={myInfo.gstin || ""}
            name="gstin"
            placeholder="Enter GSTIN"
            type="text"
          />
        </div>
      </div>

      {/* View Invoices Link */}
      <Link className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition" href="/invoices">
        View My Invoices
      </Link>
    </div>
  );
}
