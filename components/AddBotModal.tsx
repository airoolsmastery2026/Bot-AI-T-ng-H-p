import React, { useState } from 'react';
import { BotStrategy } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface AddBotModalProps {
  onClose: () => void;
  onAdd: (newBot: { name: string; symbol: string; strategy: BotStrategy }) => void;
}

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = 
({ label, id, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        <input
            type="text"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            required
        />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> =
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

const AddBotModal: React.FC<AddBotModalProps> = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [strategy, setStrategy] = useState<BotStrategy>(BotStrategy.DCA);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !symbol.trim()) {
            alert(t('error_fillFields'));
            return;
        }
        onAdd({ name, symbol: symbol.toUpperCase(), strategy });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h3 className="text-xl font-semibold text-white">{t('addNewBot')}</h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <InputField label={t('botName')} id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('botNamePlaceholder')} />
                            <InputField label={t('tradingPair')} id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder={t('tradingPairPlaceholder')} />
                            <SelectField label={t('strategy')} id="strategy" value={strategy} onChange={(e) => setStrategy(e.target.value as BotStrategy)}>
                                {Object.values(BotStrategy).map(s => <option key={s} value={s}>{t(s)}</option>)}
                            </SelectField>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-700 rounded-b justify-end space-x-2">
                        <button onClick={onClose} type="button" className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{t('cancel')}</button>
                        <button type="submit" className="text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{t('createBot')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBotModal;
