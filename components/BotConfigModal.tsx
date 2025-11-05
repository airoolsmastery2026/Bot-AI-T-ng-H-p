import React, { useState, useEffect } from 'react';
import { Bot, BotStrategy, DCAConfig, GridConfig, RSIConfig, ScalpingConfig } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface BotConfigModalProps {
  bot: Bot;
  onClose: () => void;
  onSave: (updatedBot: Bot) => void;
}

const InputField: React.FC<{ label: string; id: string; type: string; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; step?: string; min?: string; }> = 
({ label, id, type, value, onChange, step, min }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            step={step}
            min={min}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; value: any; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> =
({ label, id, value, onChange, children }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        >
            {children}
        </select>
    </div>
);


const BotConfigModal: React.FC<BotConfigModalProps> = ({ bot, onClose, onSave }) => {
    const [config, setConfig] = useState(bot.config);
    const { t } = useTranslation();

    useEffect(() => {
        setConfig(bot.config);
    }, [bot]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConfig(prevConfig => ({
            ...prevConfig,
            [name]: e.target.type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSave = () => {
        onSave({ ...bot, config });
    };

    const renderConfigFields = () => {
        switch (bot.strategy) {
            case BotStrategy.DCA:
                const dcaConfig = config as DCAConfig;
                const freqOptions = ['freq_1h', 'freq_4h', 'freq_1d', 'freq_1w'];
                return (
                    <>
                        <InputField label={t('investmentAmount')} id="investment" type="number" value={dcaConfig.investment} onChange={handleChange} min="0" />
                        <SelectField label={t('frequency')} id="frequency" value={dcaConfig.frequency} onChange={handleChange}>
                            {freqOptions.map(freq => <option key={freq} value={freq}>{t(freq)}</option>)}
                        </SelectField>
                    </>
                );
            case BotStrategy.Grid:
                const gridConfig = config as GridConfig;
                return (
                    <>
                        <InputField label={t('lowerPrice')} id="lowerPrice" type="number" value={gridConfig.lowerPrice} onChange={handleChange} min="0" />
                        <InputField label={t('upperPrice')} id="upperPrice" type="number" value={gridConfig.upperPrice} onChange={handleChange} min="0" />
                        <InputField label={t('gridCount')} id="grids" type="number" value={gridConfig.grids} onChange={handleChange} min="2" />
                    </>
                );
            case BotStrategy.RSI:
                const rsiConfig = config as RSIConfig;
                return (
                    <>
                        <InputField label={t('rsiOversold')} id="oversold" type="number" value={rsiConfig.oversold} onChange={handleChange} min="0" max="100" />
                        <InputField label={t('rsiOverbought')} id="overbought" type="number" value={rsiConfig.overbought} onChange={handleChange} min="0" max="100" />
                        <InputField label={t('orderSize')} id="orderSize" type="number" value={rsiConfig.orderSize} onChange={handleChange} min="0" />
                    </>
                );
             case BotStrategy.Scalping:
                const scalpConfig = config as ScalpingConfig;
                return (
                    <>
                        <InputField label={t('takeProfit')} id="takeProfit" type="number" value={scalpConfig.takeProfit} onChange={handleChange} min="0" step="0.1" />
                        <InputField label={t('stopLoss')} id="stopLoss" type="number" value={scalpConfig.stopLoss} onChange={handleChange} min="0" step="0.1" />
                    </>
                );
            default:
                return <p className="text-gray-400">{t('noConfig')}</p>;
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{t('settingsFor', {botName: bot.name, strategy: bot.strategy})}</h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {renderConfigFields()}
                </div>
            </div>
            <div className="flex items-center p-4 border-t border-gray-700 rounded-b justify-end space-x-2">
                <button onClick={onClose} type="button" className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{t('cancel')}</button>
                <button onClick={handleSave} type="button" className="text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{t('saveChanges')}</button>
            </div>
        </div>
    </div>
  );
};

export default BotConfigModal;
