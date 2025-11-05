
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Bots from './components/Bots';
import AIBrain from './components/AIBrain';
import SystemHealth from './components/SystemHealth';
import MarketAnalysis from './components/MarketAnalysis';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Bots:
        return <Bots />;
      case Page.AIBrain:
        return <AIBrain />;
      case Page.SystemHealth:
        return <SystemHealth />;
      case Page.MarketAnalysis:
        return <MarketAnalysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 md:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
