// ============================================
// XBlade Backoffice - API Endpoints
// ============================================

import apiClient from './client';
import type {
  PaginatedResponse,
  PaginationParams,
  DateRange,
  DashboardMetrics,
  ChartDataPoint,
  TradingPairDistribution,
  Trade,
  Order,
  Position,
  User,
  UserBalance,
  Referrer,
  Commission,
  ReferralConfig,
  Market,
  FundOverview,
  FundTransaction,
  FeeStatistics,
  Liquidation,
  Alert,
  RiskRule,
  Announcement,
  AdminLog,
  SystemConfig,
  CollateralConfig,
  TradingPair,
  TradeDirection,
  OrderStatus,
  PositionStatus,
  CommissionStatus,
  UserRiskStatus,
} from '@/lib/types';

// -------------------- Dashboard API --------------------

export const dashboardApi = {
  getOverview: () => apiClient.get<DashboardMetrics>('/dashboard/overview'),

  getCharts: (period: 'hour' | 'day' | 'week' | 'month') =>
    apiClient.get<{
      volume: ChartDataPoint[];
      users: ChartDataPoint[];
      fees: ChartDataPoint[];
    }>('/dashboard/charts', { period }),

  getPairDistribution: () =>
    apiClient.get<TradingPairDistribution[]>('/dashboard/pair-distribution'),

  getAlerts: () => apiClient.get<Alert[]>('/dashboard/alerts'),
};

// -------------------- Trading API --------------------

export const tradingApi = {
  // Trades
  getTrades: (params: PaginationParams & {
    tradingPair?: TradingPair;
    direction?: TradeDirection;
    userAddress?: string;
    dateRange?: DateRange;
    minAmount?: string;
    maxAmount?: string;
  }) => apiClient.get<PaginatedResponse<Trade>>('/trades', params as Record<string, string | number | boolean | undefined>),

  getTrade: (id: string) => apiClient.get<Trade>(`/trades/${id}`),

  exportTrades: (params: {
    format: 'csv' | 'xlsx';
    dateRange?: DateRange;
    tradingPair?: TradingPair;
  }) => apiClient.get<Blob>('/trades/export', params as Record<string, string | number | boolean | undefined>),

  // Orders
  getOrders: (params: PaginationParams & {
    status?: OrderStatus;
    tradingPair?: TradingPair;
    userAddress?: string;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<Order>>('/orders', params as Record<string, string | number | boolean | undefined>),

  getOrder: (id: string) => apiClient.get<Order>(`/orders/${id}`),

  // Positions
  getPositions: (params: PaginationParams & {
    status?: PositionStatus;
    tradingPair?: TradingPair;
    userAddress?: string;
    riskLevel?: 'safe' | 'warning' | 'danger';
  }) => apiClient.get<PaginatedResponse<Position>>('/positions', params as Record<string, string | number | boolean | undefined>),

  getPosition: (id: string) => apiClient.get<Position>(`/positions/${id}`),

  // Statistics
  getTradeStatistics: (params: {
    period: 'day' | 'week' | 'month';
    dateRange?: DateRange;
    tradingPair?: TradingPair;
  }) => apiClient.get<{
    volume: string;
    fees: string;
    tradeCount: number;
    growth: number;
  }>('/trades/statistics', params as Record<string, string | number | boolean | undefined>),
};

// -------------------- Users API --------------------

export const usersApi = {
  getUsers: (params: PaginationParams & {
    address?: string;
    riskStatus?: UserRiskStatus;
    hasReferrer?: boolean;
    dateRange?: DateRange;
    minBalance?: string;
    maxBalance?: string;
  }) => apiClient.get<PaginatedResponse<User>>('/users', params as Record<string, string | number | boolean | undefined>),

  getUser: (address: string) => apiClient.get<User>(`/users/${address}`),

  getUserBalances: (address: string) =>
    apiClient.get<UserBalance[]>(`/users/${address}/balances`),

  getUserTrades: (address: string, params: PaginationParams) =>
    apiClient.get<PaginatedResponse<Trade>>(`/users/${address}/trades`, params as Record<string, string | number | boolean | undefined>),

  getUserOrders: (address: string, params: PaginationParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/users/${address}/orders`, params as Record<string, string | number | boolean | undefined>),

  getUserPositions: (address: string, params: PaginationParams) =>
    apiClient.get<PaginatedResponse<Position>>(`/users/${address}/positions`, params as Record<string, string | number | boolean | undefined>),

  getUserReferrals: (address: string, params: PaginationParams) =>
    apiClient.get<PaginatedResponse<User>>(`/users/${address}/referrals`, params as Record<string, string | number | boolean | undefined>),

  // Risk Control
  updateRiskStatus: (address: string, status: UserRiskStatus) =>
    apiClient.post<User>(`/users/${address}/risk`, { status }),

  forceClosePosition: (address: string, positionId: string) =>
    apiClient.post<void>(`/users/${address}/positions/${positionId}/close`),
};

// -------------------- Referral API --------------------

export const referralApi = {
  getOverview: () =>
    apiClient.get<{
      totalReferrers: number;
      totalReferred: number;
      totalCommissionPaid: string;
      pendingCommission: string;
      monthlyCommission: string;
    }>('/referrals/overview'),

  getReferrers: (params: PaginationParams & {
    address?: string;
    minVolume?: string;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<Referrer>>('/referrals', params as Record<string, string | number | boolean | undefined>),

  getReferrer: (address: string) =>
    apiClient.get<Referrer>(`/referrals/${address}`),

  getReferrerCommissions: (address: string, params: PaginationParams) =>
    apiClient.get<PaginatedResponse<Commission>>(`/referrals/${address}/commissions`, params as Record<string, string | number | boolean | undefined>),

  getCommissions: (params: PaginationParams & {
    referrerAddress?: string;
    sourceUserAddress?: string;
    status?: CommissionStatus;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<Commission>>('/commissions', params as Record<string, string | number | boolean | undefined>),

  getCommissionStats: (params: {
    period: 'day' | 'week' | 'month';
    dateRange?: DateRange;
  }) => apiClient.get<{
    totalPaid: string;
    totalPending: string;
    byReferrer: { address: string; amount: string }[];
  }>('/commissions/stats', params as Record<string, string | number | boolean | undefined>),

  // Config
  getConfig: () => apiClient.get<ReferralConfig>('/referral/config'),

  updateConfig: (config: Partial<ReferralConfig>) =>
    apiClient.put<ReferralConfig>('/referral/config', config),
};

// -------------------- Markets API --------------------

export const marketsApi = {
  getMarkets: () => apiClient.get<Market[]>('/markets'),

  getMarket: (symbol: string) => apiClient.get<Market>(`/markets/${symbol}`),

  createMarket: (market: Partial<Market>) =>
    apiClient.post<Market>('/markets', market),

  updateMarket: (symbol: string, updates: Partial<Market>) =>
    apiClient.put<Market>(`/markets/${symbol}`, updates),

  updateMarketFees: (symbol: string, fees: { makerFeeRate: string; takerFeeRate: string }) =>
    apiClient.put<Market>(`/markets/${symbol}/fees`, fees),

  updateMarketStatus: (symbol: string, status: 'active' | 'inactive') =>
    apiClient.put<Market>(`/markets/${symbol}/status`, { status }),

  deleteMarket: (symbol: string) =>
    apiClient.delete<void>(`/markets/${symbol}`),
};

// -------------------- Funds API --------------------

export const fundsApi = {
  getOverview: () => apiClient.get<FundOverview>('/funds/overview'),

  getDeposits: (params: PaginationParams & {
    userAddress?: string;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<FundTransaction>>('/funds/deposits', params as Record<string, string | number | boolean | undefined>),

  getWithdrawals: (params: PaginationParams & {
    userAddress?: string;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<FundTransaction>>('/funds/withdrawals', params as Record<string, string | number | boolean | undefined>),

  getFeeStatistics: (params: {
    period: 'day' | 'week' | 'month';
    dateRange?: DateRange;
    tradingPair?: TradingPair;
  }) => apiClient.get<FeeStatistics[]>('/funds/fees', params as Record<string, string | number | boolean | undefined>),
};

// -------------------- Risk API --------------------

export const riskApi = {
  getLiquidationMonitor: () =>
    apiClient.get<Position[]>('/risk/liquidations/monitor'),

  getLiquidationRecords: (params: PaginationParams & {
    userAddress?: string;
    tradingPair?: TradingPair;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<Liquidation>>('/risk/liquidations', params as Record<string, string | number | boolean | undefined>),

  getAlerts: (params: PaginationParams & {
    type?: string;
    priority?: string;
    resolved?: boolean;
  }) => apiClient.get<PaginatedResponse<Alert>>('/risk/alerts', params as Record<string, string | number | boolean | undefined>),

  resolveAlert: (id: string) =>
    apiClient.post<Alert>(`/risk/alerts/${id}/resolve`),

  getRules: () => apiClient.get<RiskRule[]>('/risk/config'),

  updateRule: (id: string, updates: Partial<RiskRule>) =>
    apiClient.put<RiskRule>(`/risk/config/${id}`, updates),
};

// -------------------- Operations API --------------------

export const operationsApi = {
  // Announcements
  getAnnouncements: (params: PaginationParams & {
    status?: string;
    type?: string;
  }) => apiClient.get<PaginatedResponse<Announcement>>('/announcements', params as Record<string, string | number | boolean | undefined>),

  getAnnouncement: (id: string) =>
    apiClient.get<Announcement>(`/announcements/${id}`),

  createAnnouncement: (announcement: Partial<Announcement>) =>
    apiClient.post<Announcement>('/announcements', announcement),

  updateAnnouncement: (id: string, updates: Partial<Announcement>) =>
    apiClient.put<Announcement>(`/announcements/${id}`, updates),

  deleteAnnouncement: (id: string) =>
    apiClient.delete<void>(`/announcements/${id}`),

  // Logs
  getLogs: (params: PaginationParams & {
    adminAddress?: string;
    action?: string;
    dateRange?: DateRange;
  }) => apiClient.get<PaginatedResponse<AdminLog>>('/logs', params as Record<string, string | number | boolean | undefined>),
};

// -------------------- Settings API --------------------

export const settingsApi = {
  getConfig: () => apiClient.get<SystemConfig>('/config'),

  updateConfig: (config: Partial<SystemConfig>) =>
    apiClient.put<SystemConfig>('/config', config),

  getCollateralConfig: () =>
    apiClient.get<CollateralConfig>('/config/collateral'),

  updateCollateralConfig: (config: Partial<CollateralConfig>) =>
    apiClient.put<CollateralConfig>('/config/collateral', config),
};
