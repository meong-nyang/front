// input type이 number인 경우 오른쪽에 생기는 화살표 제거
export const NO_INPUT_NUMBER_SPINNER = `
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const NO_INPUT_DATE_DEFAULT_VALUE = `
    &::-webkit-datetime-edit-text {
        -webkit-appearance: none;
        display: none;
    }
    &::-webkit-datetime-edit-month-field{
        -webkit-appearance: none;
        display: none;
    }
    &::-webkit-datetime-edit-day-field {
        -webkit-appearance: none;
        display: none;
    }
    &::-webkit-datetime-edit-year-field {
        -webkit-appearance: none;
        display: none;
    }
`;