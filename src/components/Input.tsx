import React, { ReactNode } from "react";

export default function Input({
  label,
  placeholder,
  type = "text",
  id,
  onChange,
  value,
  name,
  disabled = false,
  required = false,
}: {
  label?: ReactNode;
  placeholder: string;
  type?: "text" | "email" | "password";
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div className="min-w-max w-full flex flex-col bg-active text-white py-3 px-5 rounded-3xl focus-within:border-primary  border-active bg-white/10 border border-white/10 backdrop-blur-lg">
      {label && (
        <label
          htmlFor={id}
          className="text-[#999] text-base font-medium text-start mb-1"
        >
          {label}
        </label>
      )}
      <input
        required={required}
        type={type}
        id={id}
        placeholder={placeholder}
        className="text-sm font-medium outline-none bg-transparent"
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
}
