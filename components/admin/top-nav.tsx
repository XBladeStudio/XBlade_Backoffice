"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronRight, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

// Path to title mapping
const pathTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/trading/trades": "Trade Records",
  "/trading/orders": "Order Management",
  "/trading/positions": "Position Monitoring",
  "/trading/statistics": "Trade Statistics",
  "/users": "User List",
  "/users/risk": "Risk Control",
  "/referral/overview": "Referral Overview",
  "/referral/referrers": "Referrer List",
  "/referral/commissions": "Commission Details",
  "/referral/config": "Commission Config",
  "/referral/reports": "Financial Reports",
  "/markets": "Market List",
  "/funds/overview": "Fund Overview",
  "/funds/deposits": "Deposit/Withdrawal",
  "/funds/fees": "Fee Statistics",
  "/risk/liquidations": "Liquidation Monitor",
  "/risk/records": "Liquidation Records",
  "/risk/anomalies": "Anomaly Detection",
  "/risk/rules": "Risk Rules",
  "/operations/announcements": "Announcements",
  "/operations/export": "Data Export",
  "/operations/logs": "Operation Logs",
  "/settings": "System Config",
};

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "XBlade", href: "/dashboard" },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const title = pathTitles[currentPath];
    if (title) {
      breadcrumbs.push({
        label: title,
        href: index < segments.length - 1 ? currentPath : undefined,
      });
    }
  });

  return breadcrumbs;
}

export default function TopNav() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      {/* Breadcrumbs */}
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[400px]">
        {breadcrumbs.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-80 bg-background border-border"
          >
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-sm">Notifications</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      High
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      2 min ago
                    </span>
                  </div>
                  <p className="text-sm">
                    Liquidation warning: Position margin rate below 5%
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Medium
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      15 min ago
                    </span>
                  </div>
                  <p className="text-sm">
                    Large trade detected: $500,000 BTCUSDT
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F1F23] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Super Admin
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 bg-background border-border"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium">0x1234...5678</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
