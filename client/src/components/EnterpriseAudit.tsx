import React, { createContext, useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, Eye, FileText, Download, Search, Filter, 
  Clock, User, Activity, AlertTriangle, CheckCircle,
  Database, Lock, Unlock, Edit, Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'authentication' | 'authorization' | 'data_access' | 'data_modification' | 'system' | 'security';
  status: 'success' | 'failure' | 'warning';
  metadata?: Record<string, any>;
  sessionId: string;
  location?: string;
}

interface AuditContextType {
  logAction: (action: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent' | 'sessionId'>) => void;
  getAuditLogs: (filters?: AuditFilters) => AuditLogEntry[];
  auditLogs: AuditLogEntry[];
}

interface AuditFilters {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  category?: string;
  severity?: string;
  status?: string;
  searchTerm?: string;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};

// Simulate browser fingerprinting for enterprise security
const getBrowserFingerprint = () => {
  return {
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
    userAgent: navigator.userAgent.substring(0, 100) + '...',
    sessionId: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
    location: 'Usine de Flins, France'
  };
};

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  const logAction = (action: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent' | 'sessionId'>) => {
    const fingerprint = getBrowserFingerprint();
    
    const logEntry: AuditLogEntry = {
      ...action,
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      timestamp: new Date(),
      ...fingerprint
    };

    setAuditLogs(prev => [logEntry, ...prev.slice(0, 999)]); // Keep last 1000 entries

    // In a real enterprise system, this would be sent to a secure audit service
    console.log('🔒 AUDIT LOG:', logEntry);
  };

  const getAuditLogs = (filters?: AuditFilters) => {
    let filtered = auditLogs;

    if (filters) {
      if (filters.startDate) {
        filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
      }
      if (filters.userId) {
        filtered = filtered.filter(log => log.userId === filters.userId);
      }
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(log => log.category === filters.category);
      }
      if (filters.severity && filters.severity !== 'all') {
        filtered = filtered.filter(log => log.severity === filters.severity);
      }
      if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(log => log.status === filters.status);
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(log => 
          log.action.toLowerCase().includes(term) ||
          log.details.toLowerCase().includes(term) ||
          log.resource.toLowerCase().includes(term)
        );
      }
    }

    return filtered;
  };

  // Initialize with some sample audit entries for demo
  useEffect(() => {
    const sampleLogs: AuditLogEntry[] = [
      {
        id: 'audit_init_1',
        timestamp: new Date(Date.now() - 3600000),
        userId: 'pierre.dupont',
        userName: 'Pierre Dupont',
        userRole: 'Supervisor',
        action: 'LOGIN',
        resource: 'Authentication System',
        details: 'Successful login from web interface',
        ipAddress: '192.168.1.45',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'low',
        category: 'authentication',
        status: 'success',
        sessionId: 'sess_demo_001',
        location: 'Usine de Flins, France'
      },
      {
        id: 'audit_init_2',
        timestamp: new Date(Date.now() - 1800000),
        userId: 'marie.laurent',
        userName: 'Marie Laurent',
        userRole: 'Operator',
        action: 'VIEW_DASHBOARD',
        resource: 'Production Dashboard',
        details: 'Consultation du tableau de bord production',
        ipAddress: '192.168.1.67',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'low',
        category: 'data_access',
        status: 'success',
        sessionId: 'sess_demo_002',
        location: 'Usine de Flins, France'
      },
      {
        id: 'audit_init_3',
        timestamp: new Date(Date.now() - 900000),
        userId: 'pierre.dupont',
        userName: 'Pierre Dupont',
        userRole: 'Supervisor',
        action: 'APPROVE_HANDOVER',
        resource: 'Shift Handover',
        resourceId: 'handover_001',
        details: 'Shift handover validation from morning to afternoon team',
        ipAddress: '192.168.1.45',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'medium',
        category: 'data_modification',
        status: 'success',
        sessionId: 'sess_demo_001',
        location: 'Usine de Flins, France'
      }
    ];

    setAuditLogs(sampleLogs);
  }, []);

  return (
    <AuditContext.Provider value={{
      logAction,
      getAuditLogs,
      auditLogs
    }}>
      {children}
    </AuditContext.Provider>
  );
};

// Enterprise Audit Viewer Component
export const AuditViewer: React.FC = () => {
  const { getAuditLogs } = useAudit();
  const [filters, setFilters] = useState<AuditFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = getAuditLogs({ ...filters, searchTerm });

  const getSeverityBadge = (severity: AuditLogEntry['severity']) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critique</Badge>;
      case 'high':
        return <Badge className="bg-orange-600">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600">Moyen</Badge>;
      default:
        return <Badge variant="outline">Faible</Badge>;
    }
  };

  const getStatusIcon = (status: AuditLogEntry['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failure':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: AuditLogEntry['category']) => {
    switch (category) {
      case 'authentication':
        return <Lock className="h-4 w-4 text-blue-600" />;
      case 'authorization':
        return <Shield className="h-4 w-4 text-purple-600" />;
      case 'data_access':
        return <Eye className="h-4 w-4 text-green-600" />;
      case 'data_modification':
        return <Edit className="h-4 w-4 text-orange-600" />;
      case 'security':
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  const exportAuditLogs = () => {
    const csvContent = [
      'Timestamp,User,Role,Action,Resource,Status,Severity,IP Address,Details',
      ...filteredLogs.map(log => 
        `"${format(log.timestamp, 'yyyy-MM-dd HH:mm:ss')}","${log.userName}","${log.userRole}","${log.action}","${log.resource}","${log.status}","${log.severity}","${log.ipAddress}","${log.details}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Secure Audit Log
          </h2>
          <p className="text-muted-foreground mt-1">
            Complete user action traceability - Enterprise compliance
          </p>
        </div>
        <Button onClick={exportAuditLogs} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Action, resource, details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category || 'all'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, category: value === 'all' ? undefined : value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                  <SelectItem value="authorization">Authorization</SelectItem>
                  <SelectItem value="data_access">Data Access</SelectItem>
                  <SelectItem value="data_modification">Modification</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select value={filters.severity || 'all'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, severity: value === 'all' ? undefined : value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={filters.status || 'all'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, status: value === 'all' ? undefined : value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Audit Entries ({filteredLogs.length})
            </span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              Real time
            </Badge>
          </CardTitle>
          <CardDescription>
            Secure and immutable system action history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No audit entries found</p>
              </div>
            ) : (
              filteredLogs.slice(0, 50).map((log) => (
                <div
                  key={log.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        {getCategoryIcon(log.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{log.action}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{log.resource}</span>
                          {getSeverityBadge(log.severity)}
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">
                          {log.details}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.userName} ({log.userRole})
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(log.timestamp, 'dd/MM/yyyy HH:mm:ss', { locale: fr })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            {log.ipAddress}
                          </div>
                          {log.location && (
                            <div>📍 {log.location}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredLogs.length > 50 && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Showing first 50 entries out of {filteredLogs.length} total
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};