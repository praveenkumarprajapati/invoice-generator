"use client";

import { useDispatch } from "react-redux";
import { MyInfoService } from "../services/myInfo";
import { useEffect } from "react";
import { updateMyInfo } from "../myinfoSlice";

const SyncLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const myInfo = MyInfoService.getMyInfo();
    dispatch(updateMyInfo(myInfo));
  }, [dispatch]);

  return null;
};

export { SyncLocalStorage };
