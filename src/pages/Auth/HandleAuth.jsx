import { jwtDecode } from "jwt-decode";
import { getTokeStorage, setLocalStorage } from "../../utils/localStorage";

// Hàm để kiểm tra quyền truy cập của admin
export const HandleAuth = () => {
    try {
        // Lấy token từ localStorage
        const token = getTokeStorage("token" || "");
        if (!token) {
            return false; // Nếu không có token, trả về false (không được truy cập)
        }

        // Giải mã token
        const decoded = jwtDecode(token);
        console.log(decoded);
        // Kiểm tra trường role
        if (decoded.role && decoded.role === "ADMIN") {
            setLocalStorage("adminInfo", decoded);
            return true; // Nếu role là ADMIN, cho phép truy cập
        } else {
            return false; // Ngược lại, không cho phép
        }
    } catch (error) {
        console.error("Sai token:", error);
        return false; // Nếu token không hợp lệ, trả về false
    }
};
