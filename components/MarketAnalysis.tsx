import React, { useState, useCallback } from 'react';
import { getMarketAnalysis } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from '../contexts/LanguageContext';

const generatePriceData = (startPrice: number, numPoints: number) => {
    const data = [];
    let currentPrice = startPrice;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - numPoints);

    for (let i = 0; i < numPoints; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(currentPrice.toFixed(2)),
        });
        const volatility = currentPrice * 0.03;
        currentPrice += (Math.random() - 0.48) * volatility; 
        if (currentPrice <= 0) currentPrice = volatility;
    }
    return data;
};

const marketData = {
    'BTC/USDT': { data: generatePriceData(68000, 30), color: '#f7931a' },
    'ETH/USDT': { data: generatePriceData(3500, 30), color: '#8884d8' },
    'SOL/USDT': { data: generatePriceData(150, 30), color: '#00e676' },
};

type TradingPair = keyof typeof marketData;

const MarketAnalysis: React.FC = () => {
  const { t, language } = useTranslation();
  const [topic, setTopic] = useState<string>('BTC Halving');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<TradingPair>('BTC/USDT');

  const handleAnalysis = useCallback(async () => {
    if (!topic.trim()) {
      setError(t('error_enterTopic'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis('');
    try {
      const result = await getMarketAnalysis(topic, language);
      setAnalysis(result);
    } catch (e) {
      setError(t('error_fetchAnalysis'));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [topic, language, t]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">{t('marketAnalysisTitle')}</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <p className="text-gray-400 mb-4">
            {t('marketAnalysisDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t('marketAnalysisPlaceholder')}
              className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              onClick={handleAnalysis}
              disabled={isLoading}
              className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('processing')}
                </div>
              ) : t('analyze')}
            </button>
          </div>

          {error && <p className="text-danger mb-4">{error}</p>}

          {analysis && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('analysisResult')}</h3>
              <div className="prose prose-invert max-w-none bg-gray-900/50 p-4 rounded-md border border-gray-700">
                <pre className="whitespace-pre-wrap font-sans text-gray-300">{analysis}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
         <h2 className="text-3xl font-bold text-white mb-6">{t('priceChart')}</h2>
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex space-x-2 mb-4">
                {(Object.keys(marketData) as TradingPair[]).map(pair => (
                    <button key={pair} onClick={() => setSelectedPair(pair)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedPair === pair ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        {pair}
                    </button>
                ))}
            </div>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart data={marketData[selectedPair].data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                        <XAxis dataKey="date" stroke="#a0a0a0" fontSize={12} />
                        <YAxis stroke="#a0a0a0" fontSize={12} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #4a4a4a', color: '#a0a0a0' }}
                            labelStyle={{ color: 'white' }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, t('price')]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="price" name={selectedPair} stroke={marketData[selectedPair].color} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
