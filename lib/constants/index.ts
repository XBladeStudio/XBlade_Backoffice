// ============================================
// XBlade Backoffice - Constants
// ============================================

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
export const ADMIN_API_PREFIX = '/admin';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Trading Pairs
export const TRADING_PAIRS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'] as const;

// Risk Levels
export const RISK_LEVELS = {
  SAFE: { min: 10, color: 'green', label: 'Safe' },
  WARNING: { min: 5, max: 10, color: 'yellow', label: 'Warning' },
  DANGER: { max: 5, color: 'red', label: 'Danger' },
} as const;

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  Pending: 'gray',
  Open: 'blue',
  PartiallyFilled: 'yellow',
  Filled: 'green',
  Cancelled: 'red',
} as const;

// Position Status Colors
export const POSITION_STATUS_COLORS = {
  Open: 'blue',
  Closed: 'gray',
  Liquidated: 'red',
} as const;

// User Risk Status Colors
export const USER_RISK_STATUS_COLORS = {
  normal: 'green',
  high_risk: 'yellow',
  blacklisted: 'red',
} as const;

// Commission Status Colors
export const COMMISSION_STATUS_COLORS = {
  Pending: 'yellow',
  Settled: 'blue',
  Claimed: 'green',
} as const;

// Alert Priority Colors
export const ALERT_PRIORITY_COLORS = {
  low: 'gray',
  medium: 'yellow',
  high: 'orange',
  critical: 'red',
} as const;

// Admin Roles
export const ADMIN_ROLES = {
  super_admin: { label: 'Super Admin', color: 'purple' },
  operator: { label: 'Operator', color: 'blue' },
  risk_manager: { label: 'Risk Manager', color: 'orange' },
  finance: { label: 'Finance', color: 'green' },
  viewer: { label: 'Viewer', color: 'gray' },
} as const;

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

// Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  REALTIME: 5000, // 5 seconds for liquidation monitoring
  FREQUENT: 30000, // 30 seconds for dashboard metrics
  NORMAL: 60000, // 1 minute for general data
  SLOW: 300000, // 5 minutes for reports
} as const;

// Export Formats
export const EXPORT_FORMATS = ['csv', 'xlsx'] as const;

// Sidebar Navigation Structure
export const NAV_ITEMS = {
  dashboard: {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  trading: {
    title: 'Trading Management',
    items: [
      { title: 'Trade Records', href: '/trading/trades', icon: 'FileText' },
      { title: 'Order Management', href: '/trading/orders', icon: 'Package' },
      { title: 'Position Monitoring', href: '/trading/positions', icon: 'TrendingUp' },
      { title: 'Trade Statistics', href: '/trading/statistics', icon: 'BarChart3' },
    ],
  },
  users: {
    title: 'User Management',
    items: [
      { title: 'User List', href: '/users', icon: 'Users' },
      { title: 'Risk Control', href: '/users/risk', icon: 'Shield' },
    ],
  },
  referral: {
    title: 'Referral & Commission',
    items: [
      { title: 'Referral Overview', href: '/referral/overview', icon: 'Gift' },
      { title: 'Referrer List', href: '/referral/referrers', icon: 'UserPlus' },
      { title: 'Commission Details', href: '/referral/commissions', icon: 'Coins' },
      { title: 'Commission Config', href: '/referral/config', icon: 'Settings2' },
      { title: 'Financial Reports', href: '/referral/reports', icon: 'FileBarChart' },
    ],
  },
  markets: {
    title: 'Market Management',
    items: [
      { title: 'Market List', href: '/markets', icon: 'PieChart' },
    ],
  },
  funds: {
    title: 'Fund Management',
    items: [
      { title: 'Fund Overview', href: '/funds/overview', icon: 'DollarSign' },
      { title: 'Deposit/Withdrawal', href: '/funds/deposits', icon: 'Wallet' },
      { title: 'Fee Statistics', href: '/funds/fees', icon: 'Receipt' },
    ],
  },
  risk: {
    title: 'Risk Management',
    items: [
      { title: 'Liquidation Monitor', href: '/risk/liquidations', icon: 'AlertTriangle' },
      { title: 'Liquidation Records', href: '/risk/records', icon: 'FileWarning' },
      { title: 'Anomaly Detection', href: '/risk/anomalies', icon: 'ShieldAlert' },
      { title: 'Risk Rules', href: '/risk/rules', icon: 'Settings2' },
    ],
  },
  operations: {
    title: 'Operation Tools',
    items: [
      { title: 'Announcements', href: '/operations/announcements', icon: 'Megaphone' },
      { title: 'Data Export', href: '/operations/export', icon: 'Download' },
      { title: 'Operation Logs', href: '/operations/logs', icon: 'FileSearch' },
    ],
  },
  settings: {
    title: 'System Config',
    href: '/settings',
    icon: 'Globe',
  },
} as const;

// Permission Matrix
export const PERMISSIONS = {
  dashboard: ['super_admin', 'operator', 'risk_manager', 'finance', 'viewer'],
  'trading:read': ['super_admin', 'operator', 'risk_manager', 'finance'],
  'users:read': ['super_admin', 'operator', 'risk_manager'],
  'users:risk': ['super_admin', 'risk_manager'],
  'referral:read': ['super_admin', 'operator', 'finance'],
  'referral:config': ['super_admin'],
  'markets:read': ['super_admin', 'operator', 'risk_manager', 'finance'],
  'markets:write': ['super_admin'],
  'funds:read': ['super_admin', 'finance'],
  'risk:read': ['super_admin', 'risk_manager'],
  'risk:write': ['super_admin', 'risk_manager'],
  'operations:read': ['super_admin', 'operator'],
  'operations:write': ['super_admin', 'operator'],
  'settings:read': ['super_admin'],
  'settings:write': ['super_admin'],
  'logs:read': ['super_admin'],
  'export:all': ['super_admin', 'operator', 'risk_manager', 'finance'],
} as const;
