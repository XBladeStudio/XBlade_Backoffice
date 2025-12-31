"use client"

import type React from "react"

import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Package,
  BarChart3,
  Users,
  UserCog,
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
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["trading", "users", "referral"])

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function toggleSection(section: string) {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  function NavSection({
    title,
    id,
    children,
  }: {
    title: string
    id: string
    children: React.ReactNode
  }) {
    const isExpanded = expandedSections.includes(id)
    return (
      <div>
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {title}
          <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        {isExpanded && <div className="space-y-1">{children}</div>}
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link href="#" className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Renance Admin</span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={LayoutDashboard}>
                    Dashboard
                  </NavItem>
                </div>
              </div>

              <NavSection title="Trading Management" id="trading">
                <NavItem href="#" icon={FileText}>
                  Trade Records
                </NavItem>
                <NavItem href="#" icon={Package}>
                  Order Management
                </NavItem>
                <NavItem href="#" icon={TrendingUp}>
                  Position Monitoring
                </NavItem>
                <NavItem href="#" icon={BarChart3}>
                  Trade Statistics
                </NavItem>
              </NavSection>

              <NavSection title="User Management" id="users">
                <NavItem href="#" icon={Users}>
                  User List
                </NavItem>
                <NavItem href="#" icon={UserCog}>
                  User Details
                </NavItem>
                <NavItem href="#" icon={Shield}>
                  Risk Control
                </NavItem>
              </NavSection>

              <NavSection title="Referral & Commission" id="referral">
                <NavItem href="#" icon={Gift}>
                  Referral Overview
                </NavItem>
                <NavItem href="#" icon={UserPlus}>
                  Referrer List
                </NavItem>
                <NavItem href="#" icon={Coins}>
                  Commission Details
                </NavItem>
                <NavItem href="#" icon={Settings2}>
                  Commission Config
                </NavItem>
                <NavItem href="#" icon={FileBarChart}>
                  Financial Reports
                </NavItem>
              </NavSection>

              <NavSection title="Market Management" id="markets">
                <NavItem href="#" icon={PieChart}>
                  Market List
                </NavItem>
                <NavItem href="#" icon={Settings2}>
                  Market Config
                </NavItem>
              </NavSection>

              <NavSection title="Fund Management" id="funds">
                <NavItem href="#" icon={DollarSign}>
                  Fund Overview
                </NavItem>
                <NavItem href="#" icon={Wallet}>
                  Deposit/Withdrawal
                </NavItem>
                <NavItem href="#" icon={Receipt}>
                  Fee Statistics
                </NavItem>
              </NavSection>

              <NavSection title="Risk Management" id="risk">
                <NavItem href="#" icon={AlertTriangle}>
                  Liquidation Monitor
                </NavItem>
                <NavItem href="#" icon={FileWarning}>
                  Liquidation Records
                </NavItem>
                <NavItem href="#" icon={ShieldAlert}>
                  Anomaly Detection
                </NavItem>
                <NavItem href="#" icon={Settings2}>
                  Risk Rules
                </NavItem>
              </NavSection>

              <NavSection title="Operation Tools" id="operations">
                <NavItem href="#" icon={Megaphone}>
                  Announcements
                </NavItem>
                <NavItem href="#" icon={Download}>
                  Data Export
                </NavItem>
                <NavItem href="#" icon={FileSearch}>
                  Operation Logs
                </NavItem>
              </NavSection>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Globe}>
                System Config
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
