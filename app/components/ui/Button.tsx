import React from "react";
import { LucideIcon } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white hover:shadow-2xl hover:shadow-orange-600/60 hover:scale-[1.02] active:scale-[0.98] font-bold border-2 border-orange-700/30",
  secondary:
    "bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:shadow-xl hover:shadow-gray-600/50 border-2 border-gray-700/30",
  success:
    "bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white hover:shadow-2xl hover:shadow-green-600/60 hover:scale-[1.02] active:scale-[0.98] font-bold border-2 border-green-700/30",
  danger:
    "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white hover:shadow-2xl hover:shadow-red-600/60 hover:scale-[1.02] active:scale-[0.98] font-bold border-2 border-red-700/30",
  warning:
    "bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-yellow-600/60 hover:scale-[1.02] active:scale-[0.98] font-black border-2 border-amber-700/30",
  ghost:
    "bg-white/20 backdrop-blur-sm text-gray-900 hover:bg-white/30 hover:shadow-lg border-2 border-white/40",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-2 px-4 text-sm rounded-lg",
  md: "py-3 px-6 text-base rounded-xl",
  lg: "py-4 px-8 text-lg rounded-2xl",
  xl: "py-5 px-10 text-xl rounded-2xl",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "font-bold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle =
    disabled || loading
      ? "opacity-60 cursor-not-allowed hover:scale-100 grayscale"
      : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`;

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
