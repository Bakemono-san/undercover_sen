import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  variant?: "default" | "game" | "centered";
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variantStyles = {
    default: "max-w-md md:max-w-xl lg:max-w-3xl",
    game: "max-w-md md:max-w-2xl lg:max-w-4xl",
    centered:
      "max-w-md md:max-w-xl lg:max-w-2xl flex items-center justify-center min-h-screen",
  };

  return (
    <div
      className={`mx-auto px-4 py-6 md:py-8 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

interface PageContainerProps {
  children: React.ReactNode;
  background?:
    | "light"
    | "dark"
    | "gradient-warm"
    | "gradient-cool"
    | "gradient-dark";
  className?: string;
}

const backgroundStyles = {
  light: "bg-gray-50",
  dark: "bg-gray-900",
  "gradient-warm": "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50",
  "gradient-cool":
    "bg-gradient-to-br from-green-900 via-emerald-800 to-green-900",
  "gradient-dark": "bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900",
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  background = "gradient-warm",
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen ${backgroundStyles[background]} ${className}`}
    >
      {children}
    </div>
  );
};

interface GridContainerProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const gapStyles = {
  sm: "gap-2 md:gap-3",
  md: "gap-3 md:gap-4",
  lg: "gap-4 md:gap-6",
};

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  columns = 2,
  gap = "md",
  className = "",
}) => {
  return (
    <div
      className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
