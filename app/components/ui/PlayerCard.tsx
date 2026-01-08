import React from "react";
import { Player } from "../../types/game";
import {
  getRoleIcon,
  getRoleColor,
  getRoleLabel,
} from "../../utils/gameHelpers";
import { Trash2, Edit2 } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  index?: number;
  onEdit?: (id: number, name: string) => void;
  onDelete?: (id: number) => void;
  showRole?: boolean;
  showWord?: boolean;
  editable?: boolean;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  onEdit,
  onDelete,
  showRole = false,
  showWord = false,
  editable = false,
  compact = false,
  onClick,
  className = "",
}) => {
  const RoleIconComponent = player.role ? getRoleIcon(player.role) : null;

  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 bg-orange-50 rounded-xl p-3 transition-all hover:bg-orange-100 ${onClick ? "cursor-pointer" : ""} ${className}`}
        onClick={onClick}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
          {index !== undefined ? index + 1 : player.id}
        </div>
        {editable ? (
          <input
            type="text"
            value={player.name}
            onChange={(e) => onEdit && onEdit(player.id, e.target.value)}
            className="flex-1 bg-white border-2 border-orange-200 rounded-lg px-3 py-2 font-medium focus:border-orange-400 focus:outline-none text-sm md:text-base"
            placeholder="Nom du joueur"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="flex-1 font-medium text-gray-900 text-sm md:text-base">
            {player.name}
          </span>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(player.id);
            }}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg transition-all ${onClick ? "cursor-pointer hover:shadow-xl hover:scale-[1.02]" : ""} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 ${player.role ? getRoleColor(player.role) : "bg-gradient-to-br from-orange-400 to-amber-500"} rounded-full flex items-center justify-center text-white shadow-lg`}
          >
            {RoleIconComponent ? (
              <RoleIconComponent className="w-6 h-6 md:w-8 md:h-8" />
            ) : (
              <span className="font-bold text-lg md:text-xl">
                {index !== undefined ? index + 1 : player.id}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {editable ? (
              <input
                type="text"
                value={player.name}
                onChange={(e) => onEdit && onEdit(player.id, e.target.value)}
                className="w-full bg-orange-50 border-2 border-orange-200 rounded-lg px-3 py-2 font-semibold focus:border-orange-400 focus:outline-none text-base md:text-lg"
                placeholder="Nom du joueur"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div>
                <h4 className="font-bold text-gray-900 text-base md:text-lg truncate">
                  {player.name}
                </h4>
                {showRole && player.role && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {getRoleLabel(player.role)}
                  </p>
                )}
              </div>
            )}

            {showWord && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Mot secret :</p>
                <p className="text-sm md:text-base font-bold text-orange-600">
                  {player.word || "???"}
                </p>
              </div>
            )}

            {player.eliminated && (
              <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                ÉLIMINÉ
              </span>
            )}
          </div>
        </div>

        {(onEdit || onDelete) && !editable && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(player.id, player.name);
                }}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(player.id);
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {player.votes !== undefined && player.votes > 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {player.votes}
          </div>
          <span>vote{player.votes > 1 ? "s" : ""}</span>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
