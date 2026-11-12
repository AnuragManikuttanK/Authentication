
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const validateRegister = (form) => {

    const errors = {};

    if (!form.username.trim()) {
        errors.username = 'Username is required';
    } 
    else if (
        form.username.length < 3 ||
        form.username.length > 20
    ) {
        errors.username = 'Username must be 3-20 characters';
    }

    if (!form.email.trim()) {
        errors.email = 'Email is required';
    } 
    else if (!emailRegex.test(form.email)) {
        errors.email = 'Invalid email format';
    }

    if (!form.password) {
        errors.password = 'Password is required';
    } 
    else if (form.password.length < 6) {
        errors.password = 'Password must be 6 characters';
    }

    if (!form.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } 
    else if (form.fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters';
    }

    return errors;
};


export const validateLogin = (form) => {

    const errors = {};

    if (!form.email.trim()) {
        errors.email = 'Email is required';
    } 
    else if (!emailRegex.test(form.email)) {
        errors.email = 'Invalid email format';
    }

    if (!form.password) {
        errors.password = 'Password is required';
    }

    return errors;
};
