export const convertCurrency = (price, currency = "VND") => {
    price = parseInt(price);
    let quyDoi = price * 25000;
    if (currency === "VND") {
        return quyDoi.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    } else {
        return price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }
};
