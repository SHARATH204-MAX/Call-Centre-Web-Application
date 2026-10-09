import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-xs transition-all ${
        hoverable ? "hover:border-[#1d9e75]/50 hover:shadow-md cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
