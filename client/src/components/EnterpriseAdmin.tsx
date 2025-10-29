import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AuditViewer } from './EnterpriseAudit';
import { AIInsightsDashboard } from './AIInsights';
import { EnterpriseExportPanel } from './EnterpriseExport';
import { 
  Settings, Shield, Brain, Database, Users, Globe, 
  Zap, Activity, BarChart3, Lock, Cpu, Network,
  CheckCircle, AlertTriangle, TrendingUp
} from 'lucide-react';

// Sample data for export demo
const sampleExportData = {
  title: 'Production Performance Report',
  subtitle: 'Complete analysis of production KPIs - Week 43',
  data: [
    { Model: 'Clio V', Production: 5945, Target: 5950, OEE: '94.2%', Quality: '99.1%' },
    { Model: 'Megane E-Tech', Production: 2940, Target: 2940, OEE: '96.8%', Quality: '98.7%' },
    { Model: 'Captur', Production: 2625, Target: 2660, OEE: '88.5%', Quality: '99.3%' },
    { Model: 'Arkana', Production: 1750, Target: 1750, OEE: '91.2%', Quality: '98.9%' }
  ],
  metadata: {
    'Period': 'Week 43 - October 2025',
    'Plant': 'Renault Flins',
    'Manager': 'Pierre Dupont',
    'Total vehicles': '13,260'
  }
};

const EnterpriseSystemStatus = () => {
  const systemMetrics = {
    uptime: 99.8,
    activeUsers: 247,
    dataProcessed: '2.4TB',
    alertsToday: 12,
    apiCalls: 156789,
    performance: 94.5
  };

  const integrations = [
    { name: 'SAP ERP', status: 'connected', lastSync: '2 min' },
    { name: 'MES System', status: 'connected', lastSync: '1 min' },
    { name: 'SCADA', status: 'connected', lastSync: '30 sec' },
    { name: 'Active Directory', status: 'connected', lastSync: '5 min' },
    { name: 'QMS Quality', status: 'warning', lastSync: '15 min' },
    { name: 'GMAO Maintenance', status: 'connected', lastSync: '3 min' }
  ];

  return (
    <div className="space-y-6">
      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</div>
            <div className="text-xs text-muted-foreground">Availability</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{systemMetrics.activeUsers}</div>
            <div className="text-xs text-muted-foreground">Utilisateurs actifs</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{systemMetrics.dataProcessed}</div>
            <div className="text-xs text-muted-foreground">Data/day</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{systemMetrics.alertsToday}</div>
            <div className="text-xs text-muted-foreground">Today's alerts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Network className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-600">{systemMetrics.apiCalls.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">API Calls</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{systemMetrics.performance}%</div>
            <div className="text-xs text-muted-foreground">Performance</div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-600" />
            Enterprise Integration Status
          </CardTitle>
          <CardDescription>
            Real-time connections with Renault systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'connected' ? 'bg-green-500' :
                    integration.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium">{integration.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Sync: {integration.lastSync}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EnterpriseAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Settings className="h-8 w-8 text-blue-600" />
          Centre d'Administration Entreprise
        </h1>
        <p className="text-muted-foreground">
          Advanced management of Renault Digital Factory shift handover system
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI & Analytics
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Audit
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Export
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EnterpriseSystemStatus />
        </TabsContent>

        <TabsContent value="ai">
          <AIInsightsDashboard />
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  System Security
                </CardTitle>
                <CardDescription>
                  Enterprise security controls and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Authentification</div>
                    <div className="text-sm text-green-600">Secure</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Encryption</div>
                    <div className="text-sm text-green-600">AES-256</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">RBAC</div>
                    <div className="text-sm text-green-600">Active</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Compliance</div>
                    <div className="text-sm text-green-600">ISO 27001</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Two-Factor Authentication</span>
                    <Badge variant="default">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Session Expiration</span>
                    <Badge variant="outline">8 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Password Complexity</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Data Encryption</span>
                    <Badge variant="default">End-to-end</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <AuditViewer />
        </TabsContent>

        <TabsContent value="export">
          <EnterpriseExportPanel 
            data={sampleExportData} 
            availableFormats={['csv', 'excel', 'pdf']}
          />
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-600" />
                  API Enterprise & Webhooks
                </CardTitle>
                <CardDescription>
                  Integrations and connectivity with the Renault ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Available API Endpoints</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <code className="text-sm">GET /api/production/metrics</code>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <code className="text-sm">POST /api/shifts/handover</code>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <code className="text-sm">GET /api/quality/reports</code>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <code className="text-sm">POST /api/maintenance/alerts</code>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Configured Webhooks</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Production Alerts</div>
                        <div className="text-sm text-muted-foreground">production-alerts.renault.com</div>
                        <Badge variant="outline" className="text-green-600 mt-1">✓ Active</Badge>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Quality Notifications</div>
                        <div className="text-sm text-muted-foreground">quality-system.renault.com</div>
                        <Badge variant="outline" className="text-green-600 mt-1">✓ Active</Badge>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">CMMS Maintenance</div>
                        <div className="text-sm text-muted-foreground">maintenance.renault.com</div>
                        <Badge variant="outline" className="text-orange-600 mt-1">⚠ Test</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation API</CardTitle>
                <CardDescription>
                  Accès développeur et documentation technique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Documentation Swagger
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Schémas de Données
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Webhooks Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};