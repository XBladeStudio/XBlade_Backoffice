"use client";

import type React from "react";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Package,
  BarChart3,
  Users,
  Shield,
  Gift,
  UserPlus,
  Coins,
  FileBarChart,
  DollarSign,
  Wallet,
  Receipt,
  PieChart,
  AlertTriangle,
  ShieldAlert,
  FileWarning,
  Settings2,
  Globe,
  Megaphone,
  Download,
  FileSearch,
  HelpCircle,
  Menu,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItemProps = {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
};

type NavSectionProps = {
  title: string;
  id: string;
  children: React.ReactNode;
  expandedSections: string[];
  toggleSection: (section: string) => void;
};

function NavItem({ href, icon: Icon, children, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      }`}
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  );
}

function NavSection({
  title,
  id,
  children,
  expandedSections,
  toggleSection,
}: NavSectionProps) {
  const isExpanded = expandedSections.includes(id);

  return (
    <div>
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        {title}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      {isExpanded && <div className="space-y-1">{children}</div>}
    </div>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "trading",
    "users",
    "referral",
    "markets",
    "funds",
    "risk",
    "operations",
  ]);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function toggleSection(section: string) {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                XBlade Admin
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="/dashboard"
                    icon={LayoutDashboard}
                    onClick={handleNavigation}
                  >
                    Dashboard
                  </NavItem>
                </div>
              </div>

              {/* Trading Management */}
              <NavSection
                title="Trading Management"
                id="trading"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/trading/trades"
                  icon={FileText}
                  onClick={handleNavigation}
                >
                  Trade Records
                </NavItem>
                <NavItem
                  href="/trading/orders"
                  icon={Package}
                  onClick={handleNavigation}
                >
                  Order Management
                </NavItem>
                <NavItem
                  href="/trading/positions"
                  icon={TrendingUp}
                  onClick={handleNavigation}
                >
                  Position Monitoring
                </NavItem>
                <NavItem
                  href="/trading/statistics"
                  icon={BarChart3}
                  onClick={handleNavigation}
                >
                  Trade Statistics
                </NavItem>
              </NavSection>

              {/* User Management */}
              <NavSection
                title="User Management"
                id="users"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem href="/users" icon={Users} onClick={handleNavigation}>
                  User List
                </NavItem>
                <NavItem
                  href="/users/risk"
                  icon={Shield}
                  onClick={handleNavigation}
                >
                  Risk Control
                </NavItem>
              </NavSection>

              {/* Referral & Commission */}
              <NavSection
                title="Referral & Commission"
                id="referral"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/referral/overview"
                  icon={Gift}
                  onClick={handleNavigation}
                >
                  Referral Overview
                </NavItem>
                <NavItem
                  href="/referral/referrers"
                  icon={UserPlus}
                  onClick={handleNavigation}
                >
                  Referrer List
                </NavItem>
                <NavItem
                  href="/referral/commissions"
                  icon={Coins}
                  onClick={handleNavigation}
                >
                  Commission Details
                </NavItem>
                <NavItem
                  href="/referral/config"
                  icon={Settings2}
                  onClick={handleNavigation}
                >
                  Commission Config
                </NavItem>
                <NavItem
                  href="/referral/reports"
                  icon={FileBarChart}
                  onClick={handleNavigation}
                >
                  Financial Reports
                </NavItem>
              </NavSection>

              {/* Market Management */}
              <NavSection
                title="Market Management"
                id="markets"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/markets"
                  icon={PieChart}
                  onClick={handleNavigation}
                >
                  Market List
                </NavItem>
              </NavSection>

              {/* Fund Management */}
              <NavSection
                title="Fund Management"
                id="funds"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/funds/overview"
                  icon={DollarSign}
                  onClick={handleNavigation}
                >
                  Fund Overview
                </NavItem>
                <NavItem
                  href="/funds/deposits"
                  icon={Wallet}
                  onClick={handleNavigation}
                >
                  Deposit/Withdrawal
                </NavItem>
                <NavItem
                  href="/funds/fees"
                  icon={Receipt}
                  onClick={handleNavigation}
                >
                  Fee Statistics
                </NavItem>
              </NavSection>

              {/* Risk Management */}
              <NavSection
                title="Risk Management"
                id="risk"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/risk/liquidations"
                  icon={AlertTriangle}
                  onClick={handleNavigation}
                >
                  Liquidation Monitor
                </NavItem>
                <NavItem
                  href="/risk/records"
                  icon={FileWarning}
                  onClick={handleNavigation}
                >
                  Liquidation Records
                </NavItem>
                <NavItem
                  href="/risk/anomalies"
                  icon={ShieldAlert}
                  onClick={handleNavigation}
                >
                  Anomaly Detection
                </NavItem>
                <NavItem
                  href="/risk/rules"
                  icon={Settings2}
                  onClick={handleNavigation}
                >
                  Risk Rules
                </NavItem>
              </NavSection>

              {/* Operation Tools */}
              <NavSection
                title="Operation Tools"
                id="operations"
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              >
                <NavItem
                  href="/operations/announcements"
                  icon={Megaphone}
                  onClick={handleNavigation}
                >
                  Announcements
                </NavItem>
                <NavItem
                  href="/operations/export"
                  icon={Download}
                  onClick={handleNavigation}
                >
                  Data Export
                </NavItem>
                <NavItem
                  href="/operations/logs"
                  icon={FileSearch}
                  onClick={handleNavigation}
                >
                  Operation Logs
                </NavItem>
              </NavSection>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem
                href="/settings"
                icon={Globe}
                onClick={handleNavigation}
              >
                System Config
              </NavItem>
              <NavItem href="/help" icon={HelpCircle} onClick={handleNavigation}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
