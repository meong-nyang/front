import { atom } from "recoil";

export const currentLocationAtom = atom({
    key: "currentLocation",
    default: {
        selectedMenu: "대시보드",
        locationName: "대시보드"
    }
});