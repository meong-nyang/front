// 전화번호 형식으로 자동 변형
export const changeFormatToPhoneNumber = (phoneNumber) => {
    const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
        .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    return numbers;
};

// 숫자만 입력받음
export const onlyNumber = (value) => {
    return value?.toString().replace(/[^0-9]/g, '');
}

export const convertToNumericValue = (value) => {
    return value?.toString().replace(/[^0-9]/g, '');
}

export const convertToCommaValue = (value) => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}