"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
  buttonClassName?: string;
  placeholder?: string;
}

export function Dropdown({
  items,
  selectedId,
  onSelect,
  className,
  buttonClassName,
  placeholder = "Select option",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-between w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-800 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500",
          buttonClassName
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedItem?.icon}
          <span>{selectedItem ? selectedItem.label : placeholder}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform duration-200 ml-2",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-1 max-h-64 w-56 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 py-1 shadow-xl focus:outline-none scrollbar-thin">
          {items.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-xs sm:text-sm text-left transition-colors",
                  isSelected
                    ? "bg-blue-600/20 text-blue-400 font-medium"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
