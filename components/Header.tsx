import React, { useState } from 'react';
import MenuIcon from './icons/MenuIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (lang: 'vi' | 'en') => {
        setLanguage(lang);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-sm hover:bg-gray-600"
            >
                <span className="text-gray-300 font-medium">{language === 'vi' ? 'VI' : 'EN'}</span>
                 <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-md shadow-lg z-10 border border-gray-600">
                    <a href="#" onClick={() => handleLanguageChange('vi')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">{t('vietnamese')}</a>
                    <a href="#" onClick={() => handleLanguageChange('en')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">{t('english')}</a>
                </div>
            )}
        </div>
    )
}


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-400 md:hidden mr-4">
          <MenuIcon />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-white">{t('headerTitle')}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-green-900/50 border border-green-500 rounded-full px-3 py-1 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
          <span className="text-green-300 font-medium">{t('paperTrading')}</span>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
