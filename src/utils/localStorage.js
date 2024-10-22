export function setLocalStorage(key, value) {
    //lưu dữ liệu xuống local caafn chuyen thanh string
    const data = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
}

export function getLocalStorage(key) {
    //lấy dữ liệu từ local lên
    const dataLocal = localStorage.getItem(key);
    //kiểm tra nếu dữ liệu != null thì parse nó ra object
    return dataLocal ? JSON.parse(dataLocal) : null;
}

export function getTokeStorage(key) {
    const dataLocal = localStorage.getItem(key);
    return dataLocal; // Trả về nguyên bản chuỗi vì token là JWT
}
