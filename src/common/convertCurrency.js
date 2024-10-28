export const convertCurrency = (price, currency = "VND") => {
    price = parseInt(price);
    let quyDoi = 0;
    if (isNaN(price)) {
        return "0 VND";
    }
    if (price < 0) {
        return "0 VND";
    }
    if (price < 10000) {
        quyDoi = price * 25000;
    }
    quyDoi = price * 1;
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
