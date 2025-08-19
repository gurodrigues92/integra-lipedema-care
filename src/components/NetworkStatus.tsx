import { useEffect, useState } from 'react';
import { Wifi, WifiOff, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

type NetworkSpeed = 'slow' | 'medium' | 'fast';
type ConnectionType = '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

interface NetworkInfo {
  isOnline: boolean;
  speed: NetworkSpeed;
  type: ConnectionType;
  saveData: boolean;
}

const NetworkStatus = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isOnline: navigator.onLine,
    speed: 'fast',
    type: 'unknown',
    saveData: false
  });

  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  const getConnectionType = (): ConnectionType => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (!connection) return 'unknown';
    
    const type = connection.effectiveType || connection.type;
    
    switch (type) {
      case 'slow-2g':
      case '2g':
        return '2g';
      case '3g':
        return '3g';
      case '4g':
        return '4g';
      case '5g':
        return '5g';
      default:
        return connection.type === 'wifi' ? 'wifi' : 'unknown';
    }
  };

  const getNetworkSpeed = (): NetworkSpeed => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (!connection) return 'fast';
    
    const effectiveType = connection.effectiveType;
    
    switch (effectiveType) {
      case 'slow-2g':
        return 'slow';
      case '2g':
      case '3g':
        return 'medium';
      case '4g':
      case '5g':
      default:
        return 'fast';
    }
  };

  const getSaveDataPreference = (): boolean => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection?.saveData || false;
  };

  useEffect(() => {
    const updateNetworkInfo = () => {
      const newNetworkInfo: NetworkInfo = {
        isOnline: navigator.onLine,
        speed: getNetworkSpeed(),
        type: getConnectionType(),
        saveData: getSaveDataPreference()
      };
      
      setNetworkInfo(prev => {
        // Show toast when connection changes
        if (prev.isOnline !== newNetworkInfo.isOnline) {
          if (newNetworkInfo.isOnline) {
            toast.success('Conexão restaurada!', {
              description: 'Você está online novamente'
            });
            setShowOfflineMessage(false);
          } else {
            toast.error('Sem conexão', {
              description: 'Verifique sua conexão com a internet'
            });
            setShowOfflineMessage(true);
          }
        }
        
        // Notify about slow connection
        if (newNetworkInfo.isOnline && newNetworkInfo.speed === 'slow' && prev.speed !== 'slow') {
          toast.warning('Conexão lenta detectada', {
            description: 'Carregamento pode ser mais lento'
          });
        }
        
        return newNetworkInfo;
      });
    };

    // Initial check
    updateNetworkInfo();

    // Listen for connection changes
    window.addEventListener('online', updateNetworkInfo);
    window.addEventListener('offline', updateNetworkInfo);

    // Listen for connection type changes
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      window.removeEventListener('online', updateNetworkInfo);
      window.removeEventListener('offline', updateNetworkInfo);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  // Apply data-saving attributes based on network conditions
  useEffect(() => {
    const shouldSaveData = !networkInfo.isOnline || networkInfo.speed === 'slow' || networkInfo.saveData;
    
    document.documentElement.setAttribute('data-save-data', shouldSaveData.toString());
    document.documentElement.setAttribute('data-connection-speed', networkInfo.speed);
    document.documentElement.setAttribute('data-connection-type', networkInfo.type);
  }, [networkInfo]);

  if (!showOfflineMessage) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 z-50 animate-slide-down">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
        {networkInfo.isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Conexão restaurada</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Sem conexão à internet</span>
          </>
        )}
        
        {networkInfo.type !== 'unknown' && (
          <span className="ml-2 px-2 py-1 bg-white/20 rounded text-xs">
            {networkInfo.type.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;