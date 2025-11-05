import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from '../contexts/LanguageContext';

const COLORS = ['#00aaff', '#00e676', '#ffc400', '#4a4a4a'];

const AIBrain: React.FC = () => {
  const { t } = useTranslation();

  const data = [
    { name: 'Grid Runner (ETH)', value: 45 },
    { name: 'DCA Master (BTC)', value: 30 },
    { name: 'RSI Momentum (SOL)', value: 15 },
    { name: t('reserved'), value: 10 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">{t('aiBrainTitle')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">{t('capitalAllocationByStrategy')}</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }}
                  itemStyle={{ color: '#a0a0a0' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">{t('recentDecisions')}</h3>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-700/50 rounded-md">
                <p className="text-sm font-medium text-white">{t('decision_grid_increase')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('reason_grid_increase')}</p>
                <p className="text-xs font-mono text-primary mt-2">{t('confidence')}: 85%</p>
            </li>
            <li className="p-4 bg-gray-700/50 rounded-md">
                <p className="text-sm font-medium text-white">{t('decision_momentum_decrease')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('reason_momentum_decrease')}</p>
                <p className="text-xs font-mono text-primary mt-2">{t('confidence')}: 72%</p>
            </li>
            <li className="p-4 bg-gray-700/50 rounded-md">
                <p className="text-sm font-medium text-white">{t('decision_dca_maintain')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('reason_dca_maintain')}</p>
                <p className="text-xs font-mono text-primary mt-2">{t('confidence')}: 95%</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIBrain;
