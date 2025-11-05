import React from 'react';
import { Page } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
  icon: React.ReactElement;
}> = ({ page, currentPage, onClick, icon }) => {
  const { t } = useTranslation();
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(page);
      }}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary/20 text-primary'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {React.cloneElement(icon, { className: 'h-5 w-5 mr-3' })}
      <span>{t(page)}</span>
    </a>
  );
};

// SVG Icon components
const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3V9H21V3H13ZM3 13V21H11V13H3ZM3 3V11H11V3H3ZM13 11V21H21V11H13Z"></path></svg>
);
const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.621-.358 1-1.06 1-1.855C14 1.763 13.237 1 12.245 1c-.993 0-1.755.763-1.755 1.755 0 .795.379 1.497 1 1.854V6H5c-1.103 0-2 .897-2 2v3.007c-.294.028-.726.145-.928.633a.999.999 0 0 0 .196 1.072l.153.126c.411.339.97.34.979.341H4v5c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-5h1.01c.009 0 .568-.002.979-.341l.153-.126a.999.999 0 0 0 .196-1.072ZM8 15c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1Zm8 0c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1Z"/></svg>
);
const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1.25 15.25c-.161 0-.323-.02-.483-.06-.505-.125-.808-.63-.683-1.135.226-.913.336-1.848.336-2.78s-.11-1.867-.336-2.78c-.125-.505.178-1.01.683-1.135.505-.125 1.01.178 1.135.683.25 1.011.375 2.05.375 3.097s-.125 2.086-.375 3.097c-.112.453-.474.717-.852.717zm-3.033-2.185c.298.43.218.995-.178 1.314-.4.32-1.05.23-1.315-.178-.853-1.31-1.282-2.76-1.282-4.22s.429-2.91 1.282-4.22c.265-.408.81-.595 1.315-.178.396.319.475.884.178 1.314-.627.96-1.002 2.05-1.002 3.083s.375 2.123 1.002 3.085zm3.566-6.065c.505.125.808.63.683 1.135-.226.913-.336 1.848-.336 2.78s.11 1.867.336 2.78c.125.505-.178 1.01-.683 1.135-.505-.125-1.01-.178-1.135-.683-.25-1.011-.375-2.05-.375-3.097s.125-2.086.375-3.097c.125-.505.63-.808 1.135-.683z"></path></svg>
);
const HealthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h2V7zm0 8h-2v2h2v-2z"></path></svg>
);
const AnalysisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7z"></path><path d="M12.25 7c-2.831 0-5.161 2.28-5.25 5.093H7v2h.016c.045.025.088.053.134.076.082.043.165.084.25.125.138.067.279.13.424.188.163.064.329.123.5.174.22.065.444.123.673.17.201.042.404.077.608.106.208.029.418.049.63.06.248.013.497.02.748.02.836 0 1.637-.14 2.378-.403.111-.04.22-.083.328-.127.135-.054.269-.11.4-.168.093-.04.185-.083.275-.127.131-.065.26-.134.385-.205.109-.062.216-.128.32-.196.12-.076.236-.157.348-.242.09-.068.176-.14.26-.215.093-.084.183-.17.268-.26.064-.067.126-.135.184-.205.076-.09.148-.184.216-.28.06-.083.117-.168.168-.255.064-.11.122-.224.175-.339.048-.103.09-.208.13-.314.045-.119.085-.24.12-.362.03-.102.056-.205.077-.309.028-.135.05-.272.066-.41.014-.119.022-.239.03-.358.003-.046.012-.09.012-.137h.001v-1.996h-.001c0-.036-.007-.07-.01-.106a4.343 4.343 0 0 0-.07-.582 4.345 4.345 0 0 0-.15-.573c-.05-.123-.104-.245-.164-.364-.066-.132-.138-.262-.215-.388-.08-.128-.166-.254-.257-.375-.095-.127-.195-.25-.3-.368-.107-.12-.22-.236-.336-.348-.114-.111-.233-.217-.355-.318-.12-.099-.245-.192-.373-.28-.12-.08-.243-.154-.368-.224-.136-.076-.275-.146-.416-.21-.13-.06-.263-.114-.397-.164-.131-.048-.264-.09-.398-.128-.16-.046-.322-.084-.486-.115-.155-.029-.31-.05-.466-.067a5.21 5.21 0 0 0-1.028-.063z"></path></svg>
);


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setOpen }) => {
    const { t } = useTranslation();

    const handleNavigation = (page: Page) => {
        setCurrentPage(page);
        if (window.innerWidth < 768) { // md breakpoint
            setOpen(false);
        }
    };
    
  const navItems = [
    { page: Page.Dashboard, icon: <DashboardIcon /> },
    { page: Page.Bots, icon: <BotIcon /> },
    { page: Page.AIBrain, icon: <BrainIcon /> },
    { page: Page.MarketAnalysis, icon: <AnalysisIcon /> },
    { page: Page.SystemHealth, icon: <HealthIcon /> },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-30 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setOpen(false)}></div>
      <aside
        className={`absolute md:relative flex-shrink-0 w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out z-40 h-full ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-white text-2xl font-bold">🤖 {t('tagline')}</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.page}
              page={item.page}
              currentPage={currentPage}
              onClick={handleNavigation}
              icon={item.icon}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
