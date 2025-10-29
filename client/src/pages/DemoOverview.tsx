import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, Star, Zap, Shield, Brain, BarChart3, 
  Bell, Download, Users, Globe, Factory, Car,
  TrendingUp, Clock, AlertTriangle, Settings
} from 'lucide-react';

interface Feature {
  name: string;
  status: string;
  accuracy?: string;
  count?: string;
  feature?: string;
  logs?: string;
  compliance?: string;
  users?: string;
  monitoring?: string;
  charts?: string;
  frequency?: string;
  metrics?: string;
  library?: string;
  formats?: string;
  endpoints?: string;
  integrations?: string;
  latency?: string;
}

export const DemoOverview: React.FC = () => {
  const enterpriseFeatures = [
    {
      category: 'Intelligence Artificielle',
      icon: Brain,
      color: 'text-purple-600',
      features: [
        { name: 'Production Prediction', accuracy: '94.2%', status: 'Active' },
        { name: 'Predictive Quality Analysis', accuracy: '96.8%', status: 'Active' },
        { name: 'Maintenance Optimization', accuracy: '91.5%', status: 'Active' },
        { name: 'Anomaly Detection', accuracy: '98.1%', status: 'Active' }
      ] as Feature[]
    },
    {
      category: 'Notification System',
      icon: Bell,
      color: 'text-orange-600',
      features: [
        { name: 'Real-time Alerts', count: '247 today', status: 'Active' },
        { name: 'Audio Notifications', feature: 'Multi-channel', status: 'Active' },
        { name: 'Notification Center', feature: 'Centralized', status: 'Active' },
        { name: 'Auto Escalation', feature: 'Configurable', status: 'Active' }
      ] as Feature[]
    },
    {
      category: 'Security & Audit',
      icon: Shield,
      color: 'text-green-600',
      features: [
        { name: 'Complete Traceability', logs: '15,247 entries', status: 'Active' },
        { name: 'Chiffrement AES-256', compliance: 'ISO 27001', status: 'Actif' },
        { name: 'Authentification 2FA', users: '247 utilisateurs', status: 'Actif' },
        { name: 'Real-Time Audit', monitoring: 'Continuous', status: 'Active' }
      ] as Feature[]
    },
    {
      category: 'Analytics & Reporting',
      icon: BarChart3,
      color: 'text-blue-600',
      features: [
        { name: 'Advanced Dashboards', charts: '12 widgets', status: 'Active' },
        { name: 'Automated Reports', frequency: 'Daily/Weekly', status: 'Active' },
        { name: 'Manufacturing KPIs', metrics: 'OEE, TRS, Quality', status: 'Active' },
        { name: 'Visualisations Interactives', library: 'Recharts', status: 'Actif' }
      ] as Feature[]
    },
    {
      category: 'Export & Integration',
      icon: Download,
      color: 'text-cyan-600',
      features: [
        { name: 'Export Multi-Format', formats: 'CSV, Excel, PDF', status: 'Actif' },
        { name: 'API REST Enterprise', endpoints: '25+ endpoints', status: 'Actif' },
        { name: 'Webhooks Configurables', integrations: 'SAP, MES, GMAO', status: 'Actif' },
        { name: 'Real-Time Synchronization', latency: '<100ms', status: 'Active' }
      ] as Feature[]
    }
  ];

  const productionMetrics = {
    vehicles: [
      { model: 'Clio V', target: 5950, actual: 5945, efficiency: 99.9 },
      { model: 'Megane E-Tech', target: 2940, actual: 2940, efficiency: 100 },
      { model: 'Captur', target: 2660, actual: 2625, efficiency: 98.7 },
      { model: 'Arkana', target: 1750, actual: 1750, efficiency: 100 }
    ],
    kpis: {
      oee: 94.2,
      quality: 99.1,
      performance: 96.8,
      availability: 97.4
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Factory className="h-8 w-8" />
              ShiftFlow Enterprise Demo
            </h1>
            <p className="text-blue-100 text-lg">
              Next-generation shift handover platform for Renault
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="h-3 w-3 mr-1" />
                Niveau Entreprise
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Production Ready
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Globe className="h-3 w-3 mr-1" />
                Renault Specific
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">13,260</div>
            <div className="text-blue-100">Vehicles/Week</div>
            <div className="text-sm text-blue-200 mt-1">Target: 13,300 (99.7%)</div>
          </div>
        </div>
      </div>

      {/* Production Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productionMetrics.vehicles.map((vehicle, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Car className="h-4 w-4 text-blue-600" />
                {vehicle.model}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Production</span>
                  <span className="font-semibold">{vehicle.actual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Objectif</span>
                  <span className="text-sm">{vehicle.target.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Efficiency</span>
                  <Badge 
                    variant={vehicle.efficiency >= 99 ? "default" : "secondary"}
                    className={vehicle.efficiency >= 99 ? "bg-green-600" : ""}
                  >
                    {vehicle.efficiency}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPIs Manufacturing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Real-Time Manufacturing KPIs
          </CardTitle>
          <CardDescription>
            Key performance indicators from Renault Flins plant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{productionMetrics.kpis.oee}%</div>
              <div className="text-sm font-medium">OEE Global</div>
              <div className="text-xs text-muted-foreground">Overall Equipment Effectiveness</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{productionMetrics.kpis.quality}%</div>
              <div className="text-sm font-medium">Quality Rate</div>
              <div className="text-xs text-muted-foreground">Conforming parts/Total</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{productionMetrics.kpis.performance}%</div>
              <div className="text-sm font-medium">Performance</div>
              <div className="text-xs text-muted-foreground">Theoretical/actual rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">{productionMetrics.kpis.availability}%</div>
              <div className="text-sm font-medium">Availability</div>
              <div className="text-xs text-muted-foreground">Temps production/Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          Fonctionnalités Entreprise Avancées
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enterpriseFeatures.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{feature.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {feature.accuracy && `Précision: ${feature.accuracy}`}
                          {feature.count && feature.count}
                          {feature.feature && `Type: ${feature.feature}`}
                          {feature.logs && feature.logs}
                          {feature.compliance && `Conformité: ${feature.compliance}`}
                          {feature.users && feature.users}
                          {feature.monitoring && `Monitoring: ${feature.monitoring}`}
                          {feature.charts && feature.charts}
                          {feature.frequency && `Fréquence: ${feature.frequency}`}
                          {feature.metrics && `Métriques: ${feature.metrics}`}
                          {feature.library && `Technologie: ${feature.library}`}
                          {feature.formats && `Formats: ${feature.formats}`}
                          {feature.endpoints && feature.endpoints}
                          {feature.integrations && `Intégrations: ${feature.integrations}`}
                          {feature.latency && `Latence: ${feature.latency}`}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Demo Actions */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Actions de Démonstration
          </CardTitle>
          <CardDescription>
            Fonctionnalités clés à présenter lors de la démonstration Renault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="flex flex-col items-center gap-2 h-auto p-4">
              <BarChart3 className="h-6 w-6" />
              <span>Tableau de Bord</span>
              <span className="text-xs opacity-75">KPIs temps réel</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Bell className="h-6 w-6" />
              <span>Notifications</span>
              <span className="text-xs opacity-75">Système d'alertes</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Brain className="h-6 w-6" />
              <span>IA Prédictive</span>
              <span className="text-xs opacity-75">Analytics avancées</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Shield className="h-6 w-6" />
              <span>Audit & Sécurité</span>
              <span className="text-xs opacity-75">Traçabilité complète</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Download className="h-6 w-6" />
              <span>Export Avancé</span>
              <span className="text-xs opacity-75">Multi-formats</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Users className="h-6 w-6" />
              <span>Workflow Équipes</span>
              <span className="text-xs opacity-75">Transmission optimisée</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">99.8%</div>
            <div className="text-sm text-muted-foreground">Disponibilité Système</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">247</div>
            <div className="text-sm text-muted-foreground">Utilisateurs Connectés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-muted-foreground">Today's Alerts</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};