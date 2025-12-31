// ============================================
// XBlade Backoffice - Type Definitions
// ============================================

// -------------------- Common Types --------------------

export type UUID = string;
export type Address = string; // Ethereum wallet address
export type Timestamp = string; // ISO 8601 format

export type PaginationParams = {
  page: number;
  pageSize: number;
  total?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type SortOrder = 'asc' | 'desc';

export type DateRange = {
  startDate: string;
  endDate: string;
};

// -------------------- Admin & Auth Types --------------------

export type AdminRole = 'super_admin' | 'operator' | 'risk_manager' | 'finance' | 'viewer';

export type AdminStatus = 'active' | 'inactive' | 'suspended';

export type Admin = {
  id: UUID;
  address: Address;
  role: AdminRole;
  name?: string;
  status: AdminStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// -------------------- Trading Types --------------------

export type TradingPair = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | string;

export type TradeDirection = 'Buy' | 'Sell';

export type Trade = {
  id: UUID;
  tradingPair: TradingPair;
  direction: TradeDirection;
  price: string;
  quantity: string;
  amount: string; // price * quantity in USD
  makerAddress: Address;
  takerAddress: Address;
  makerFee: string;
  takerFee: string;
  createdAt: Timestamp;
};

export type OrderType = 'Limit' | 'Market';

export type OrderStatus = 'Pending' | 'Open' | 'PartiallyFilled' | 'Filled' | 'Cancelled';

export type Order = {
  id: UUID;
  userAddress: Address;
  tradingPair: TradingPair;
  orderType: OrderType;
  direction: TradeDirection;
  price: string;
  markPrice: string;
  quantity: string;
  filledQuantity: string;
  leverage: number;
  status: OrderStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type PositionDirection = 'Long' | 'Short';

export type PositionStatus = 'Open' | 'Closed' | 'Liquidated';

export type RiskLevel = 'safe' | 'warning' | 'danger';

export type Position = {
  id: UUID;
  userAddress: Address;
  tradingPair: TradingPair;
  direction: PositionDirection;
  size: string; // USD value
  entryPrice: string;
  markPrice: string;
  unrealizedPnl: string;
  realizedPnl: string;
  margin: string;
  leverage: number;
  liquidationPrice: string;
  marginRate: string;
  status: PositionStatus;
  riskLevel: RiskLevel;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// -------------------- User Types --------------------

export type UserRiskStatus = 'normal' | 'high_risk' | 'blacklisted';

export type User = {
  address: Address;
  registeredAt: Timestamp;
  totalBalance: string;
  availableBalance: string;
  frozenBalance: string;
  totalVolume: string;
  totalFees: string;
  referrerAddress?: Address;
  referralCode: string;
  referralCount: number;
  riskStatus: UserRiskStatus;
};

export type UserBalance = {
  token: string;
  available: string;
  frozen: string;
  total: string;
};

// -------------------- Referral Types --------------------

export type CommissionStatus = 'Pending' | 'Settled' | 'Claimed';

export type Commission = {
  id: UUID;
  referrerAddress: Address;
  sourceUserAddress: Address;
  tradeId: UUID;
  tradeAmount: string;
  tradeFee: string;
  commissionRate: string;
  commissionAmount: string;
  status: CommissionStatus;
  createdAt: Timestamp;
  settledAt?: Timestamp;
};

export type Referrer = {
  address: Address;
  referralCode: string;
  directReferrals: number;
  teamSize: number;
  teamVolume: string;
  totalCommission: string;
  pendingCommission: string;
  claimedCommission: string;
  registeredAt: Timestamp;
};

export type ReferralConfig = {
  defaultCommissionRate: string;
  secondTierRate?: string;
  minSettlementAmount: string;
  settlementPeriod: 'daily' | 'weekly';
  lockPeriodDays: number;
};

export type VIPTier = {
  tier: number;
  name: string;
  minVolume: string;
  commissionRate: string;
};

// -------------------- Market Types --------------------

export type MarketStatus = 'active' | 'inactive' | 'maintenance';

export type PriceSource = 'Hyperliquid' | 'Binance' | 'Chainlink';

export type Market = {
  symbol: TradingPair;
  baseAsset: string;
  quoteAsset: string;
  status: MarketStatus;
  maxLeverage: number;
  minLeverage: number;
  makerFeeRate: string;
  takerFeeRate: string;
  minOrderSize: string;
  maxOrderSize: string;
  maxPositionSize: string;
  pricePrecision: number;
  sizePrecision: number;
  initialMarginRate: string;
  maintenanceMarginRate: string;
  fundingInterval: number; // seconds
  maxFundingRate: string;
  minFundingRate: string;
  liquidationThreshold: string;
  adlEnabled: boolean;
  priceDeviationProtection: string;
  priceSource: PriceSource;
  volume24h: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// -------------------- Fund Types --------------------

export type TransactionType = 'Deposit' | 'Withdrawal';

export type TransactionStatus = 'Pending' | 'Confirmed' | 'Failed';

export type FundTransaction = {
  id: UUID;
  type: TransactionType;
  userAddress: Address;
  amount: string;
  token: string;
  txHash: string;
  status: TransactionStatus;
  createdAt: Timestamp;
};

export type FundOverview = {
  totalBalance: string;
  availableBalance: string;
  frozenBalance: string;
  marginOccupied: string;
  deposits24h: string;
  withdrawals24h: string;
};

export type FeeStatistics = {
  date: string;
  tradingPair: TradingPair;
  volume: string;
  makerFees: string;
  takerFees: string;
  totalFees: string;
  referralPayout: string;
  netIncome: string;
};

// -------------------- Risk Types --------------------

export type LiquidationType = 'SystemLiquidation' | 'ADL';

export type Liquidation = {
  id: UUID;
  userAddress: Address;
  tradingPair: TradingPair;
  direction: PositionDirection;
  quantity: string;
  price: string;
  lossAmount: string;
  type: LiquidationType;
  createdAt: Timestamp;
};

export type AlertPriority = 'low' | 'medium' | 'high' | 'critical';

export type AlertType =
  | 'large_trade'
  | 'liquidation_warning'
  | 'price_deviation'
  | 'system_error'
  | 'frequent_cancellation'
  | 'concentrated_position'
  | 'self_trade';

export type Alert = {
  id: UUID;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  description: string;
  targetType?: string;
  targetId?: string;
  isResolved: boolean;
  createdAt: Timestamp;
  resolvedAt?: Timestamp;
};

export type RiskRule = {
  id: UUID;
  name: string;
  type: AlertType;
  threshold: string;
  enabled: boolean;
  alertMethod: ('notification' | 'email' | 'webhook')[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// -------------------- Operations Types --------------------

export type AnnouncementType = 'system' | 'activity' | 'maintenance';

export type AnnouncementStatus = 'draft' | 'published' | 'archived';

export type Announcement = {
  id: UUID;
  title: string;
  content: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  isPinned: boolean;
  publishedAt?: Timestamp;
  expiresAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type AdminLog = {
  id: UUID;
  adminAddress: Address;
  action: string;
  targetType?: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress: string;
  createdAt: Timestamp;
};

// -------------------- System Config Types --------------------

export type SystemConfig = {
  platformName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  tradingEnabled: boolean;
  depositsEnabled: boolean;
  withdrawalsEnabled: boolean;
};

export type CollateralConfig = {
  token: string;
  tokenAddress: Address;
  minDeposit: string;
  minWithdrawal: string;
  withdrawalFee: string;
};

// -------------------- Dashboard Types --------------------

export type DashboardMetrics = {
  volume24h: string;
  fees24h: string;
  activeUsers24h: number;
  totalPositionValue: string;
  totalBalance: string;
  pendingCommission: string;
};

export type ChartDataPoint = {
  timestamp: string;
  value: number;
};

export type TradingPairDistribution = {
  pair: TradingPair;
  volume: string;
  percentage: number;
};
