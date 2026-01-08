import React from "react";
import { LucideIcon, Users, Settings, Trophy } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick: () => void;
  badge?: string | number;
  color?: string;
}

interface MenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  isOpen,
  onClose,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className={`bg-white rounded-2xl shadow-xl mb-6 overflow-hidden animate-fadeIn ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 hover:bg-orange-50 transition-colors ${
            index < items.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className={`flex-shrink-0 ${item.color || "text-orange-600"}`}>
            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="font-semibold text-gray-900 text-sm md:text-base flex items-center gap-2">
              {item.label}
              {item.badge !== undefined && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-orange-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <div className="text-xs md:text-sm text-gray-500 truncate">
                {item.description}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

interface MenuItemButtonProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick: () => void;
  badge?: string | number;
  color?: string;
  className?: string;
}

export const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  icon: Icon,
  label,
  description,
  onClick,
  badge,
  color = "text-orange-600",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 hover:bg-orange-50 transition-colors border-b border-gray-100 ${className}`}
    >
      <div className={`flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="font-semibold text-gray-900 text-sm md:text-base flex items-center gap-2">
          {label}
          {badge !== undefined && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-orange-500 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <div className="text-xs md:text-sm text-gray-500 truncate">
            {description}
          </div>
        )}
      </div>
    </button>
  );
};

export default Menu;
