import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    // State lưu giá trị đã debounced
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Thiết lập một timer
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Dọn dẹp timer khi giá trị hoặc delay thay đổi
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
