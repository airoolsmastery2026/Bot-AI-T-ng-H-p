export enum BotStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Error = 'ERROR',
}

export enum BotStrategy {
  DCA = 'DCA',
  Grid = 'GRID',
  RSI = 'RSI',
  Arbitrage = 'ARBITRAGE',
  Scalping = 'SCALPING',
}

export interface DCAConfig {
  investment: number;
  frequency: 'freq_1h' | 'freq_4h' | 'freq_1d' | 'freq_1w';
}

export interface GridConfig {
  lowerPrice: number;
  upperPrice: number;
  grids: number;
}

export interface RSIConfig {
  oversold: number;
  overbought: number;
  orderSize: number;
}
export interface ArbitrageConfig {}

export interface ScalpingConfig {
    takeProfit: number; // percent
    stopLoss: number; // percent
}

export interface Bot {
  id: string;
  name: string;
  strategy: BotStrategy;
  symbol: string;
  status: BotStatus;
  pnl: number;
  capitalAllocation: number;
  config: DCAConfig | GridConfig | RSIConfig | ArbitrageConfig | ScalpingConfig;
}

export enum SystemStatus {
  Online = 'ONLINE',
  Degraded = 'DEGRADED',
  Offline = 'OFFLINE',
}

export interface SystemComponent {
  id: string;
  name: string;
  status: SystemStatus;
  description: string;
}

export enum Page {
    Dashboard = 'DASHBOARD',
    Bots = 'BOTS',
    AIBrain = 'AI_BRAIN',
    SystemHealth = 'SYSTEM_HEALTH',
    MarketAnalysis = 'MARKET_ANALYSIS',
}
