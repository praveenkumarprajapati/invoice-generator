"use client";
import { MyInfo } from "../types/myInfo";
import { localStorageHelper } from "./localstoragehelper";

export const MyInfoService = {
  getMyInfo: () => {
    const myInfo: MyInfo | null = localStorageHelper.get("myInfo");
    return myInfo;
  },
  setMyInfo: (myInfo: Partial<MyInfo>) => {
    localStorageHelper.set("myInfo", myInfo);
  },
  clearMyInfo: () => {
    localStorageHelper.remove("myInfo");
  },
};
