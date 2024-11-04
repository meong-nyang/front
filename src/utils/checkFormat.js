export const isNumber = (value) => {
    return /^[\d]+$/g.test(value);
}

export const onlyNumber = (value) => {
    return value.toString().replace(/[^0-9]/g, '');
}