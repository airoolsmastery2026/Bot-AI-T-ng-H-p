import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'positive' | 'negative' }> = ({ title, value, change, changeType }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <div className="flex items-baseline mt-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
        {change && (
            <span className={`ml-2 text-sm font-medium ${changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
                {change}
            </span>
        )}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [pnl, setPnl] = useState(1256.78);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setPnl(prevPnl => prevPnl + (Math.random() - 0.5) * 50);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">{t('dashboardTitle')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title={t('totalPnl')} 
            value={`$${pnl.toFixed(2)}`}
            change="+2.5%"
            changeType={pnl > 1200 ? 'positive' : 'negative'}
        />
        <StatCard title={t('allocatedCapital')} value="$8,500.00" />
        <StatCard title={t('activeBots')} value="3 / 5" />
        <StatCard title={t('winRate24h')} value="68%" change="+1.2%" changeType="positive"/>
      </div>
      
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">{t('recentActivity')}</h3>
        <ul className="space-y-4">
            <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                <p className="text-sm">
                    <span className="font-bold text-primary">[AI Brain]</span> {t('activity_ai_brain_increase', { botName: 'Grid Bot (ETH/USDT)', percentage: 15 })}
                </p>
                <span className="text-xs text-gray-400">{t('minutesAgo', { count: 2 })}</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                <p className="text-sm">
                    <span className="font-bold text-success">[DCA Bot]</span> {t('activity_dca_buy', { amount: 0.001, coin: 'BTC', pair: 'BTC/USDT' })}
                </p>
                <span className="text-xs text-gray-400">{t('minutesAgo', { count: 15 })}</span>
            </li>
             <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                <p className="text-sm">
                    <span className="font-bold text-danger">[Risk]</span> {t('activity_risk_pause', { botName: 'Scalping Bot' })}
                </p>
                <span className="text-xs text-gray-400">{t('minutesAgo', { count: 45 })}</span>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
