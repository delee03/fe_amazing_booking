import React from "react";

const ButtonCustom = ({
    content,
    type = "button",
    onClick,
    bgColor = "bg-blue-500",
    bgHover = "hover:bg-blue-700 ",
}) => {
    return (
        <button
            type={type}
            className={`py-2 my-4 pb-3 w-full  me-4 px-5 text-white rounded-md ${bgColor} ${bgHover} `}
            onClick={onClick}
        >
            {content}
        </button>
    );
};

export default ButtonCustom;
