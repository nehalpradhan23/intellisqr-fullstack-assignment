import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string; // Optional label
  registerResult: UseFormRegisterReturn; // Props returned by RHF's register
  error?: FieldError; // Error object from RHF
  containerClassName?: string; // Optional class for the container div
}

const InputBox: React.FC<InputProps> = ({
  id,
  label,
  type = "text", // Default type to text
  registerResult,
  error,
  containerClassName = "", // Default to no extra class
  className = "", // Allow passing input specific classes
  ...rest // Pass down other input props like placeholder, etc.
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputClasses = `
    mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
    sm:text-sm outline-none focus:ring-blue-500 focus:border-blue-500
    ${className}
    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
  `;

  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className="relative flex items-center">
        {/* {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )} */}
        <input
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...registerResult} // Spread the registration props (name, onChange, onBlur, ref)
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          {...rest} // Spread placeholder, etc.
          autoComplete="new-password"
        />
        {type === "password" && (
          <span
            className="absolute mt-1 right-3 text-sm cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </span>
        )}
      </div>
      {error && (
        <p className={errorClasses} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputBox;
