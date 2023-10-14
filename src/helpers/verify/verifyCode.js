const generateVerifyCode = (min = 1000, max = 9999) => {
    return Math.floor(min + Math.random() * (max - min + 1));
};

module.exports = {
    generateVerifyCode,
};
