import React from "react";
import { ChevronLeft, Menu, X, LucideIcon } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  menuOpen?: boolean;
  rightAction?: {
    icon: LucideIcon;
    onClick: () => void;
    label?: string;
  };
  variant?: "light" | "dark" | "transparent";
  className?: string;
}

const variantStyles = {
  light: "bg-white text-gray-900 border-b border-gray-200",
  dark: "bg-gray-900 text-white",
  transparent: "bg-transparent text-white",
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showMenu = false,
  onMenuToggle,
  menuOpen = false,
  rightAction,
  variant = "transparent",
  className = "",
}) => {
  return (
    <header
      className={`sticky top-0 z-40 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
        {/* Left side */}
        <div className="flex items-center gap-2 min-w-0">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              aria-label="Retour"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {title && (
            <h1 className="text-lg md:text-2xl font-bold truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {rightAction && (
            <button
              onClick={rightAction.onClick}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={rightAction.label || "Action"}
            >
              <rightAction.icon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {showMenu && onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

interface SimpleHeaderProps {
  title: string;
  onBack: () => void;
  className?: string;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  title,
  onBack,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 md:mb-8 ${className}`}>
      <button
        onClick={onBack}
        className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
        aria-label="Retour"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
      </button>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      <div className="w-10 md:w-12" />
    </div>
  );
};

export default Header;
