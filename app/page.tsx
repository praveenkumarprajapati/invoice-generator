"use client";
import { useDispatch, useSelector } from "react-redux";
import { myInfoSelector, updateMyInfo } from "./myinfoSlice";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "./components/Tooltip";
import { Input } from "./components/Input";
import { showNotification } from "./slices/notificationSlice";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function Home() {
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();

  const [myInfoState, setMyInfoState] = useState(myInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleMyInfoChange = (key: string, value: string) => {
    setMyInfoState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateMyInfo(myInfoState));
    dispatch(
      showNotification({
        message: "Master data updated successfully!",
        type: "success",
        duration: 5000,
      })
    );
    setIsSaving(false);
  };

  const debounce = _.debounce(handleSave, 1000);

  useEffect(() => {
    setIsSaving(true);
    debounce();
    return () => debounce.cancel();
  }, [myInfoState]);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">Invoice Generator</h1>

      {/* My Information Card */}
      <div className="mt-6 p-6 w-11/12 md:w-full max-w-xl bg-white rounded-lg shadow-lg">
        <h2 className="text-xl flex items-center gap-2 font-semibold text-gray-800 mb-4 border-b pb-2">
          <span>Master Data</span>
          <Tooltip text="We will use this information to prefill form.">
            <Image
              className="cursor-pointer"
              alt="info"
              src="/icons/info.svg"
              width={25}
              height={25}
            />
          </Tooltip>
        </h2>

        <div className="space-y-4">
          {/* Name */}

          <Input
            onChange={(value) => handleMyInfoChange("name", value)}
            value={myInfoState.name || ""}
            name="description"
            placeholder="Organization name"
            type="text"
          />

          {/* Address */}

          <Input
            onChange={(value) => handleMyInfoChange("address", value)}
            value={myInfoState.address || ""}
            name="address"
            maxLines={3}
            placeholder="Enter your address"
            type="textarea"
          />

          {/* GSTIN */}

          <Input
            onChange={(value) => handleMyInfoChange("gstin", value)}
            value={myInfoState.gstin || ""}
            name="gstin"
            placeholder="Enter GSTIN"
            type="text"
          />

          {/* show message that autosaving */}
          {isSaving && (
            <div className="text-sm text-gray-500">
              <span className="animate-pulse">Saving...</span>
            </div>
          )}
        </div>
      </div>

      {/* View Invoices Link */}
      <div className="flex gap-2 mt-6 w-11/12 sm:w-xl">
        <Link className="btn btn-outline" href="/invoices">
          View My Invoices
        </Link>

        <Link className="btn btn-primary" href="/invoices/new">
          <Image
            color="#000"
            src="icons/plus.svg"
            alt="plus"
            width={22}
            height={22}
          />{" "}
          Create Invoice
        </Link>
      </div>
    </div>
  );
}
