import React from "react";

export default function Input({
  type = "text",
  id,
  name,
  title,
  value,
  onChange,
  errors,
  onBlur,
  touched,
  style,
}) {
  return (
    <>
      <div >
        
        <input
          onBlur={onBlur}
          type={type}
          name={name}
          className={`${style} main-input`}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={name}
        />
        {touched[name] && errors[name] && (
          <p className=" text text-danger mb-0 text-end">{errors[name]}</p>
        )}
      </div>
    </>
  );
}
