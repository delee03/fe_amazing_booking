import React from "react";

const InputCustom = ({
  label,
  placehoder,
  name,
  onChange,
  value,
  error,
  id,
  pointer = "pointer-events-auto",
  onBlur,
  classWrapper = "",
  touched,
  typeInput = "text",
}) => {
  return (
    <div className={`${classWrapper} mb-2`}>
      <label
        htmlFor={id}
        className="block mb-2 ml-1 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        className={`${pointer} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 `}
        type={typeInput}
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placehoder}
      />
      {error && touched ? <p className=" text-red-500 mt-0">{error}</p> : null}
    </div>
  );
};

export default InputCustom;
