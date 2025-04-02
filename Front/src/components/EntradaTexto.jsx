import React from "react";

const InputField = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-800 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;
