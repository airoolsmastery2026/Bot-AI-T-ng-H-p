import React from 'react';
import { SystemComponent, SystemStatus } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

const components: SystemComponent[] = [
  { id: '1', name: 'Data Layer (Market Ingest)', status: SystemStatus.Online, description: 'Nhận dữ liệu từ WebSocket và REST feeds.' },
  { id: '2', name: 'AI Brain (Decision Engine)', status: SystemStatus.Online, description: 'Phân tích và ra quyết định chiến lược.' },
  { id: '3', name: 'Orchestrator', status: SystemStatus.Online, description: 'Điều phối và quản lý luồng lệnh.' },
  { id: '4', name: 'Bot Workers', status: SystemStatus.Online, description: 'Các bot con thực thi chiến lược.' },
  { id: '5', name: 'Execution Layer (Binance)', status: SystemStatus.Degraded, description: 'Giao tiếp với sàn, có độ trễ nhẹ.' },
  { id: '6', name: 'Risk & Compliance Module', status: SystemStatus.Online, description: 'Kiểm tra và quản lý rủi ro.' },
  { id: '7', name: 'Secure Vault', status: SystemStatus.Online, description: 'Lưu trữ API keys an toàn.' },
  { id: '8', name: 'Monitoring & Alerting', status: SystemStatus.Offline, description: 'Hệ thống giám sát đang gặp sự cố.' },
];

const getStatusIndicator = (status: SystemStatus) => {
  switch (status) {
    case SystemStatus.Online:
      return 'bg-success';
    case SystemStatus.Degraded:
      return 'bg-warning';
    case SystemStatus.Offline:
      return 'bg-danger';
    default:
      return 'bg-gray-500';
  }
};

const SystemHealth: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">{t('systemHealthTitle')}</h2>
      <div className="space-y-4">
        {components.map((component) => (
          <div key={component.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{component.name}</h3>
              <p className="text-sm text-gray-400">{component.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-4 w-4 rounded-full ${getStatusIndicator(component.status)}`}></div>
              <span className="font-medium text-white">{t(component.status)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;
