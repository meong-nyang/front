import { atom } from "recoil";

export const currentLocationAtom = atom({
    key: "currentLocation",
    default: {
        selectedMenuId: 1,
        currentLocation: ""
    }
});