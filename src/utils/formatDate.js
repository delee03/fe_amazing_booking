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
};

export default formatDate;
