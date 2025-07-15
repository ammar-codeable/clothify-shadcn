import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

interface MobileNavProps {
  clothingItems: Array<{ label: string; href: string }>;
  accessoriesItems: Array<{ label: string; href: string }>;
  bagsFootwearItems: Array<{ label: string; href: string }>;
  homeKitchenItems: Array<{ label: string; href: string }>;
}

interface DropdownState {
  [key: string]: boolean;
}

export function MobileNav({
  clothingItems,
  accessoriesItems,
  bagsFootwearItems,
  homeKitchenItems,
}: MobileNavProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [dropdownState, setDropdownState] = useState<DropdownState>({});

  const toggleDropdown = (key: string) => {
    setDropdownState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const MobileDropdown = ({ 
    title, 
    icon, 
    items, 
    dropdownKey 
  }: { 
    title: string; 
    icon: string; 
    items: Array<{ label: string; href: string }>; 
    dropdownKey: string;
  }) => (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-between p-2 h-auto"
        onClick={() => toggleDropdown(dropdownKey)}
      >
        <div className="flex items-center space-x-3">
          <i className={`${icon} text-gray-600`}></i>
          <span className="font-medium text-left">{title}</span>
        </div>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
          dropdownState[dropdownKey] ? 'rotate-180' : ''
        }`}></i>
      </Button>
      {dropdownState[dropdownKey] && (
        <div className="pl-8 space-y-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <i className="fas fa-bars text-xl"></i>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center space-x-2 text-left">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <i className="fas fa-store text-lg"></i>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopVerse
              </span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu for ShopVerse
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Account & Wishlist */}
            <div className="space-y-1 mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 px-2 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <i className="fas fa-user text-gray-600"></i>
                <span className="font-medium">Account</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-2 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <i className="fas fa-heart text-gray-600"></i>
                <span className="font-medium">Wishlist</span>
              </a>
            </div>

            <Separator className="my-4" />

            {/* Navigation Categories */}
            <div className="space-y-2">
              <MobileDropdown
                title="Clothing"
                icon="fas fa-tshirt"
                items={clothingItems}
                dropdownKey="clothing"
              />
              
              <MobileDropdown
                title="Accessories"
                icon="fas fa-ring"
                items={accessoriesItems}
                dropdownKey="accessories"
              />
              
              <MobileDropdown
                title="Bags & Footwear"
                icon="fas fa-shopping-bag"
                items={bagsFootwearItems}
                dropdownKey="bagsFootwear"
              />
              
              <MobileDropdown
                title="Home & Kitchen"
                icon="fas fa-home"
                items={homeKitchenItems}
                dropdownKey="homeKitchen"
              />

              <a
                href="/corporate-gifting"
                className="flex items-center space-x-3 px-2 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <i className="fas fa-briefcase text-gray-600"></i>
                <span className="font-medium">Corporate Gifting</span>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setShowMobileSearch(!showMobileSearch)}
      >
        <i className="fas fa-search text-lg"></i>
        <span className="sr-only">Toggle search</span>
      </Button>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3">
          <div className="relative w-full">
            <Input
              type="text"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              placeholder="Search for products, categories, or brands..."
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <i className="fas fa-search"></i>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
