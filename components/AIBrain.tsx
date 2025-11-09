
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from '../contexts/LanguageContext';
import { getAIAdvice } from '../services/geminiService';

const COLORS = ['#00aaff', '#00e676', '#ffc400', '#4a4a4a'];

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1.25 15.25c-.161 0-.323-.02-.483-.06-.505-.125-.808-.63-.683-1.135.226-.913.336-1.848.336-2.78s-.11-1.867-.336-2.78c-.125-.505.178-1.01.683-1.135.505-.125 1.01.178 1.135.683.25 1.011.375 2.05.375 3.097s-.125 2.086-.375 3.097c-.112.453-.474.717-.852.717zm-3.033-2.185c.298.43.218.995-.178 1.314-.4.32-1.05.23-1.315-.178-.853-1.31-1.282-2.76-1.282-4.22s.429-2.91 1.282-4.22c.265-.408.81-.595 1.315-.178.396.319.475.884.178 1.314-.627.96-1.002 2.05-1.002 3.083s.375 2.123 1.002 3.085zm3.566-6.065c.505.125.808.63.683 1.135-.226.913-.336 1.848-.336 2.78s.11 1.867.336 2.78c.125.505-.178 1.01-.683 1.135-.505-.125-1.01-.178-1.135-.683-.25-1.011-.375-2.05-.375-3.097s.125-2.086.375-3.097c.125-.505.63-.808 1.135-.683z"></path></svg>
    </div>
);


const AIBrain: React.FC = () => {
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const data = [
    { name: 'Grid Runner (ETH)', value: 45 },
    { name: 'DCA Master (BTC)', value: 30 },
    { name: 'RSI Momentum (SOL)', value: 15 },
    { name: t('reserved'), value: 10 },
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
        const aiResponse = await getAIAdvice(trimmedInput, language);
        setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : t('error_fetchAnalysis');
        setMessages([...newMessages, { sender: 'ai', text: `Error: ${errorMessage}` }]);
    } finally {
        setIsLoading(false);
    }
  }, [userInput, isLoading, messages, language, t]);

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
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col" style={{height: '472px'}}>
            <h3 className="text-xl font-semibold text-white mb-2">{t('aiBrainChatTitle')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('aiBrainChatDescription')}</p>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <BotIcon />}
                        <div className={`p-3 rounded-lg max-w-xs md:max-w-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>
                           <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && <UserIcon />}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <BotIcon />
                        <div className="p-3 rounded-lg bg-gray-700">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                 )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={t('askPlaceholder')}
                    className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AIBrain;
