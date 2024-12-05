const formatDate = {
    formatDateAndTime: (date) => {
        const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
    },
    formatDayOnly: (date) => {
        const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
    },
    //hàm chuyển ngược từ dạng DD/MM/YYYY sang dạng Date ISOString
    formatDateToISO: (dateString) => {
        const dateArr = dateString.split("/");
        const date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        return date.toISOString();
    },
};

export default formatDate;
