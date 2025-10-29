import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Bell, Settings, LogOut, User, Shield, Factory, Clock, 
  Wifi, WifiOff, AlertTriangle, CheckCircle, Menu
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useLocation } from 'wouter';
import { useNotifications, NotificationCenter } from './EnterpriseNotifications';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnterpriseHeaderProps {
  userName?: string;
  userRole?: string;
  userDepartment?: string;
}

export const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({
  userName = "Pierre Dupont",
  userRole = "Supervisor", 
  userDepartment = "Production Clio V"
}) => {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const { t } = useLanguage();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLocation('/');
  };

  const getShiftInfo = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 14) {
      return { name: "Morning Team", time: "06:00 - 14:00", status: "active" };
    } else if (hour >= 14 && hour < 22) {
      return { name: "Afternoon Team", time: "14:00 - 22:00", status: "active" };
    } else {
      return { name: "Night Team", time: "22:00 - 06:00", status: "active" };
    }
  };

  const shiftInfo = getShiftInfo();
  const timeUntilShiftEnd = () => {
    const hour = currentTime.getHours();
    let endHour;
    if (hour >= 6 && hour < 14) endHour = 14;
    else if (hour >= 14 && hour < 22) endHour = 22;
    else endHour = hour < 6 ? 6 : 6 + 24;
    
    const minutesLeft = (endHour - hour) * 60 - currentTime.getMinutes();
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsLeft = minutesLeft % 60;
    
    return `${hoursLeft}h ${minsLeft}min`;
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm"
      >
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu + Company Branding & System Status */}
          <div className="flex items-center gap-6">
            {/* Mobile Sidebar Trigger */}
            <div className="lg:hidden">
              <SidebarTrigger>
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            </div>
            
            <div className="flex items-center gap-3">
              <Factory className="h-8 w-8 text-blue-600" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Renault Digital Factory</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Usine de Flins</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {isOnline ? (
                      <>
                        <Wifi className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">Connected</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-red-600" />
                        <span className="text-red-600">Hors ligne</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* System Health Indicators */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Systems OK</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Production Active
              </Badge>
            </div>
          </div>

          {/* Center: Current Shift & Time */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-gray-900">
                {format(currentTime, 'HH:mm:ss')}
              </div>
              <div className="text-xs text-gray-600">
                {format(currentTime, 'EEEE dd MMMM yyyy', { locale: fr })}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">{shiftInfo.name}</span>
              </div>
              <div className="text-xs text-blue-700">
                {shiftInfo.time} • Fin dans {timeUntilShiftEnd()}
              </div>
            </div>
          </div>

          {/* Right: Notifications & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher - Hidden on small screens */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotificationCenterOpen(true)}
              className="relative p-2"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.div>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-2 sm:pr-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">{userName}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      {userRole === 'Supervisor' ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {userRole} • {userDepartment}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div>
                    <div className="font-medium">{userName}</div>
                    <div className="text-sm text-gray-600 font-normal">
                      {userRole} - {userDepartment}
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('header.profile')}</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('header.settings')}</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Safety</span>
                </DropdownMenuItem>
                
                {/* Language Switcher for Mobile */}
                <div className="sm:hidden">
                  <DropdownMenuSeparator />
                  <div className="px-2 py-2">
                    <LanguageSwitcher />
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('header.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Shift Info */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          <div className="bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{shiftInfo.name}</span>
            </div>
            <div className="text-xs text-blue-700">
              Fin dans {timeUntilShiftEnd()}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-mono font-bold text-gray-900">
              {format(currentTime, 'HH:mm')}
            </div>
            <div className="text-xs text-gray-600">
              {format(currentTime, 'dd/MM/yyyy')}
            </div>
          </div>
        </div>
      </motion.header>

      <NotificationCenter 
        isOpen={notificationCenterOpen} 
        onClose={() => setNotificationCenterOpen(false)} 
      />
    </>
  );
};