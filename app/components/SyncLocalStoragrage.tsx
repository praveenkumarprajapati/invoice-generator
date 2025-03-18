"use client";

import { useDispatch, useSelector } from "react-redux";
import { MyInfoService } from "../services/myInfo";
import { MyInfo } from "../types/myInfo";
import { useEffect } from "react";
import { myInfoSelector, updateMyInfo } from "../myinfoSlice";

const SyncLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("getMyInfo");
    const myInfo = MyInfoService.getMyInfo();
    console.log(myInfo);
    dispatch(updateMyInfo(myInfo));
    console.log('updating store')
  }, []);

  return null;
};

export { SyncLocalStorage };
