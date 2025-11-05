import React, { useState, useEffect } from 'react';
import { Bot, BotStatus, BotStrategy } from '../types';
import BotConfigModal from './BotConfigModal';
import AddBotModal from './AddBotModal';
import { useTranslation } from '../contexts/LanguageContext';

const initialBots: Bot[] = [
  { id: '1', name: 'DCA Master', strategy: BotStrategy.DCA, symbol: 'BTC/USDT', status: BotStatus.Active, pnl: 450.21, capitalAllocation: 30, config: { investment: 100, frequency: 'freq_1d' } },
  { id: '2', name: 'Grid Runner', strategy: BotStrategy.Grid, symbol: 'ETH/USDT', status: BotStatus.Active, pnl: 731.55, capitalAllocation: 45, config: { lowerPrice: 2800, upperPrice: 3500, grids: 20 } },
  { id: '3', name: 'RSI Momentum', strategy: BotStrategy.RSI, symbol: 'SOL/USDT', status: BotStatus.Active, pnl: 75.02, capitalAllocation: 15, config: { oversold: 30, overbought: 70, orderSize: 5 } },
  { id: '4', name: 'Arbitrage Finder', strategy: BotStrategy.Arbitrage, symbol: 'Multiple', status: BotStatus.Inactive, pnl: 0, capitalAllocation: 0, config: {} },
  { id: '5', name: 'Scalp Pro', strategy: BotStrategy.Scalping, symbol: 'BNB/USDT', status: BotStatus.Error, pnl: -120.80, capitalAllocation: 10, config: { takeProfit: 0.5, stopLoss: 0.3 } },
];

const getStatusColor = (status: BotStatus) => {
  switch (status) {
    case BotStatus.Active:
      return 'bg-success text-green-900';
    case BotStatus.Inactive:
      return 'bg-gray-600 text-gray-200';
    case BotStatus.Error:
      return 'bg-danger text-white';
    default:
      return 'bg-gray-500';
  }
};

const BotRow: React.FC<{ bot: Bot; onSettingsClick: (bot: Bot) => void }> = ({ bot, onSettingsClick }) => {
  const [currentBot, setCurrentBot] = useState(bot);
  const { t } = useTranslation();

  const toggleStatus = () => {
    setCurrentBot(prev => ({
        ...prev,
        status: prev.status === BotStatus.Active ? BotStatus.Inactive : BotStatus.Active
    }));
  };

  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
      <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{currentBot.name}</td>
      <td className="px-6 py-4">{t(currentBot.strategy)}</td>
      <td className="px-6 py-4">{currentBot.symbol}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(currentBot.status)}`}>
          {t(currentBot.status)}
        </span>
      </td>
      <td className={`px-6 py-4 font-mono ${currentBot.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
        ${currentBot.pnl.toFixed(2)}
      </td>
      <td className="px-6 py-4">{currentBot.capitalAllocation}%</td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => onSettingsClick(currentBot)}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-600 hover:bg-gray-500 text-white"
            >
              {t('settings')}
            </button>
            <button 
              onClick={toggleStatus}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors w-20 ${
                currentBot.status === BotStatus.Active
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {currentBot.status === BotStatus.Active ? t('stop') : t('start')}
            </button>
        </div>
      </td>
    </tr>
  );
};


const Bots: React.FC = () => {
    const [bots, setBots] = useState<Bot[]>(initialBots);
    const [editingBot, setEditingBot] = useState<Bot | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            setBots(prevBots => prevBots.map(bot => {
                if (bot.status === BotStatus.Active) {
                    return { ...bot, pnl: bot.pnl + (Math.random() - 0.45) * 5 };
                }
                return bot;
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSaveConfig = (updatedBot: Bot) => {
        setBots(currentBots => currentBots.map(b => b.id === updatedBot.id ? updatedBot : b));
        setEditingBot(null);
    };

    const handleAddBot = (newBotData: { name: string; symbol: string; strategy: BotStrategy }) => {
        const getDefaultConfig = (strategy: BotStrategy): Bot['config'] => {
            switch (strategy) {
                case BotStrategy.DCA:
                    return { investment: 50, frequency: 'freq_1d' };
                case BotStrategy.Grid:
                    return { lowerPrice: 2000, upperPrice: 4000, grids: 10 };
                case BotStrategy.RSI:
                    return { oversold: 30, overbought: 70, orderSize: 1 };
                case BotStrategy.Scalping:
                    return { takeProfit: 0.5, stopLoss: 0.3 };
                case BotStrategy.Arbitrage:
                default:
                    return {};
            }
        };

        const newBot: Bot = {
            id: `bot-${Date.now()}`,
            ...newBotData,
            status: BotStatus.Inactive,
            pnl: 0,
            capitalAllocation: 0,
            config: getDefaultConfig(newBotData.strategy),
        };
        setBots(prevBots => [...prevBots, newBot]);
        setIsAddModalOpen(false);
    };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">{t('botsTitle')}</h2>
        <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>{t('addBot')}</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-700">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">{t('botName')}</th>
              <th scope="col" className="px-6 py-3">{t('strategy')}</th>
              <th scope="col" className="px-6 py-3">{t('tradingPair')}</th>
              <th scope="col" className="px-6 py-3">{t('status')}</th>
              <th scope="col" className="px-6 py-3">{t('pnl')}</th>
              <th scope="col" className="px-6 py-3">{t('capitalAllocation')}</th>
              <th scope="col" className="px-6 py-3 text-right">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((bot) => <BotRow key={bot.id} bot={bot} onSettingsClick={setEditingBot} />)}
          </tbody>
        </table>
      </div>
      {editingBot && (
        <BotConfigModal 
            bot={editingBot}
            onClose={() => setEditingBot(null)}
            onSave={handleSaveConfig}
        />
      )}
      {isAddModalOpen && (
        <AddBotModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddBot}
        />
      )}
    </div>
  );
};

export default Bots;
