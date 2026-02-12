import React from "react";
import { PlayerRole } from "../../types/game";
import {
  getRoleIcon,
  getRoleColor,
  getRoleLabel,
  getRoleGradient,
} from "../../utils/gameHelpers";

interface RoleBadgeProps {
  role: PlayerRole;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showIcon?: boolean;
  variant?: "solid" | "gradient" | "outline";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "px-2 py-1 text-xs gap-1",
    icon: "w-3 h-3",
  },
  md: {
    container: "px-4 py-2 text-sm gap-2",
    icon: "w-4 h-4",
  },
  lg: {
    container: "px-6 py-3 text-base gap-2",
    icon: "w-5 h-5",
  },
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  size = "md",
  showLabel = true,
  showIcon = true,
  variant = "solid",
  className = "",
}) => {
  const IconComponent = getRoleIcon(role);
  const roleColor = getRoleColor(role);
  const roleGradient = getRoleGradient(role);
  const label = getRoleLabel(role);

  const variantStyles = {
    solid: roleColor,
    gradient: `bg-gradient-to-r ${roleGradient}`,
    outline: `border-2 ${roleColor.replace("bg-", "border-")} ${roleColor.replace("bg-", "text-")} bg-transparent`,
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${variantStyles[variant]} ${sizeStyles[size].container} ${className}`}
    >
      {showIcon && <IconComponent className={sizeStyles[size].icon} />}
      {showLabel && <span>{label}</span>}
    </div>
  );
};

interface RoleDescriptionProps {
  role: PlayerRole;
  word?: string;
  className?: string;
}

export const RoleDescription: React.FC<RoleDescriptionProps> = ({
  role,
  word,
  className = "",
}) => {
  const descriptions = {
    citizen: "Vous êtes un Citoyen. Trouvez les imposteurs !",
    undercover: "Vous êtes Undercover. Restez discret !",
    mrwhite: "Vous êtes Mr White. Devinez le mot !",
  };

  return (
    <div className={`text-center ${className}`}>
      <RoleBadge role={role} size="lg" className="mb-3" />
      <p className="text-orange-950 text-sm mb-4">{descriptions[role]}</p>
      {word !== undefined && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-xs text-orange-950 mb-1">Votre mot :</p>
          <p className="text-2xl md:text-3xl font-black text-orange-600">
            {word || "???"}
          </p>
          {!word && (
            <p className="text-xs text-orange-950 mt-2">
              Vous devez deviner le mot des citoyens
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RoleBadge;
