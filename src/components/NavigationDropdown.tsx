import { useEffect, useRef, useState } from "react";

interface NavigationDropdownProps {
  title: string;
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function NavigationDropdown({ title, items }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group">
        <span>{title}</span>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="py-1">
            {items.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-150">
                    <i className={`fas ${getIconForCategory(item.label)} text-gray-600 text-sm`}></i>
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <i className="fas fa-arrow-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-150"></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getIconForCategory(label: string): string {
  switch (label.toLowerCase()) {
    case 'mens':
      return 'fa-user-tie';
    case 'womens':
      return 'fa-user-alt';
    case 'kids':
      return 'fa-child';
    case 'babies':
      return 'fa-baby';
    default:
      return 'fa-tag';
  }
}
