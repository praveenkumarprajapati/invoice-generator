"use client";

import { useDispatch } from "react-redux";
import { MyInfoService } from "../services/myInfo";
import { useEffect } from "react";
import { updateMyInfo } from "../myinfoSlice";
import { InvoiceService } from "../services/invoices";
import { syncInvoices } from "../invoices/invoiceSlice";

const SyncLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const myInfo = MyInfoService.getMyInfo();
    const invoices = InvoiceService.get();
    console.log(invoices, 'Sync comp')
    dispatch(updateMyInfo(myInfo));
    dispatch(syncInvoices(invoices));
  }, [dispatch]);

  return null;
};

export { SyncLocalStorage };
