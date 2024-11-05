import { atom } from "recoil";

export const orderProuctListAtom = atom({
    key: "orderListAtom",
    default : [{
        productId: 0, //상품아이디
        productName: "", //상품명
        productCount: 1, //상품개수
        productPrice: 0, //상품가격
        productTotal: 0, //상품 총가격
    }]
});