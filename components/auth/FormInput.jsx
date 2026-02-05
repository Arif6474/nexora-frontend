import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Reusable form input component for authentication forms.
 * 
 * @param {Object} props
 * @param {string} props.type - Input type (text, email, password)
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {string} props.error - Error message
 * @param {boolean} props.isPassword - Whether the input is a password type (to enable visibility toggle)
 * @param {string} props.className - Additional classes for the container
 */
const FormInput = ({
    type = "text",
    placeholder,
    value,
    onChange,
    icon: Icon,
    error,
    isPassword = false,
    className = ""
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`relative group ${className}`}>
            {Icon && (
                <Icon
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? "text-red-400" : "text-stone-300 group-focus-within:text-emerald-600"
                        }`}
                />
            )}
            <input
                type={inputType}
                placeholder={placeholder}
                className={`w-full ${Icon ? "pl-12" : "px-4"} ${isPassword ? "pr-12" : "pr-4"
                    } py-4 bg-stone-50 border-2 rounded-2xl outline-none font-bold text-stone-900 transition-all placeholder:text-stone-200 ${error
                        ? "border-red-100 bg-red-50/30"
                        : "border-transparent focus:border-emerald-600/20 focus:bg-white"
                    }`}
                value={value}
                onChange={onChange}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-900 transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
            {error && (
                <p className="absolute left-4 -bottom-5 text-[10px] font-black text-red-500 uppercase tracking-widest">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
