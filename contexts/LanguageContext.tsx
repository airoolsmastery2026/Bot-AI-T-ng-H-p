import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';

type Language = 'vi' | 'en';
type Translations = { [key: string]: string };
type AllTranslations = { [key in Language]?: Translations };

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('vi');
    const [translations, setTranslations] = useState<AllTranslations>({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const [viResponse, enResponse] = await Promise.all([
                    fetch('./locales/vi.json'),
                    fetch('./locales/en.json')
                ]);
                const viData = await viResponse.json();
                const enData = await enResponse.json();
                setTranslations({ vi: viData, en: enData });
            } catch (error) {
                console.error("Failed to load translation files:", error);
                // In case of error, we can set empty objects to avoid crashes
                setTranslations({ vi: {}, en: {} });
            }
        };

        fetchTranslations();
    }, []);

    const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
        const langTranslations = translations[language];
        if (!langTranslations) {
            return key; // Return key if translations for the language are not loaded
        }
        
        let translation = langTranslations[key] || key;
        
        if (options) {
            Object.keys(options).forEach(optionKey => {
                translation = translation.replace(`{{${optionKey}}}`, String(options[optionKey]));
            });
        }
        return translation;
    }, [language, translations]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};