// 전화번호 형식으로 자동 변형
export const changeFormatToPhoneNumber = (phoneNumber) => {
    const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
        .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    return numbers;
};