export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isNumber(str) {
    return !isNaN(str) && str.trim() !== '';
}

export function isPositiveNumber(str) {
    if (!isNaN(str) && str.trim() !== '') {
        return Number(str) >= 0;
    }
    return false;
}

export function isPositiveInteger(str) {
    const number = Number(str);
    if (Number.isInteger(number)) {
        return number >= 0 ? true : false;
    }
    return false;
}

export function isBlank(str) {
    return !str || str.trim() === '';
};

export function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}