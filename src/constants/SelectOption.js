import { FaUser } from "react-icons/fa";
import { PiNoteFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";
export const PET_AGE_LIST = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "etc", label: "직접입력" },
];

export const MYPAGE_OPTION_LIST = [
    { icon: <FaUser /> , title: "회원정보", address: "info"},
    { icon: <RiLockPasswordFill /> , title: "비밀번호 변경", address: "pw"},
    { icon: <MdOutlinePets /> , title: "반려동물 정보", address: "pet"},
    { icon: <PiNoteFill /> , title: "주문 내역 조회", address: "orderlist"},
];

export const PAYMENT_STATUS_LIST = [
    "전체", "결제완료", "환불완료"
];

    