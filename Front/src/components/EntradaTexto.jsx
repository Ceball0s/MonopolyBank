import React from "react";

const InputField = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4 px-15 py-15">
      <label className="block text-lg font-medium text-gray-800" >{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "2px solid #ccc",
          borderRadius: "5px",
          marginTop: "5px"
        }}
      />
    </div>
  );
};

export default InputField;
