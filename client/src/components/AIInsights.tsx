import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Lightbulb, Target, Zap, Clock, Factory, Shield, BarChart3,
  ArrowRight, Info, Star, Cpu
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AIInsight {
  id: string;
  type: 'prediction' | 'optimization' | 'anomaly' | 'recommendation' | 'alert';
  category: 'production' | 'quality' | 'maintenance' | 'safety' | 'efficiency';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  predictedOutcome?: string;
  timeframe?: string;
  data?: any[];
  recommendations?: string[];
  riskScore?: number;
  priority: number; // 1-10
  timestamp: Date;
}

interface PredictiveModel {
  name: string;
  accuracy: number;
  lastTrained: Date;
  nextUpdate: Date;
  status: 'active' | 'training' | 'error';
}

// Simulated AI Engine
export class RenaultAIEngine {
  private static models: PredictiveModel[] = [
    {
      name: 'Production Forecasting',
      accuracy: 94.2,
      lastTrained: new Date(Date.now() - 86400000 * 2),
      nextUpdate: new Date(Date.now() + 86400000),
      status: 'active'
    },
    {
      name: 'Quality Prediction',
      accuracy: 96.8,
      lastTrained: new Date(Date.now() - 86400000 * 1),
      nextUpdate: new Date(Date.now() + 86400000 * 2),
      status: 'active'
    },
    {
      name: 'Maintenance Optimization',
      accuracy: 91.5,
      lastTrained: new Date(Date.now() - 86400000 * 3),
      nextUpdate: new Date(Date.now() + 86400000 * 0.5),
      status: 'training'
    },
    {
      name: 'Anomaly Detection',
      accuracy: 98.1,
      lastTrained: new Date(Date.now() - 86400000 * 0.5),
      nextUpdate: new Date(Date.now() + 86400000 * 0.25),
      status: 'active'
    }
  ];

  static generateInsights(): AIInsight[] {
    const insights: AIInsight[] = [
      {
        id: 'ai_001',
        type: 'prediction',
        category: 'production',
        title: 'Optimal production prediction',
        description: 'AI model predicts a 3.2% productivity increase by adjusting Clio V line parameters during peak hours.',
        confidence: 94.2,
        impact: 'high',
        actionable: true,
        predictedOutcome: '+27 vehicles per shift',
        timeframe: '2-3 days',
        recommendations: [
          'Adjust robot R-340 pace to 52 vehicles/h between 9am-11am',
          'Optimize inter-station buffers',
          'Schedule preventive maintenance outside peak hours'
        ],
        priority: 9,
        timestamp: new Date(),
        data: [
          { hour: '6h', current: 45, predicted: 47 },
          { hour: '8h', current: 48, predicted: 52 },
          { hour: '10h', current: 47, predicted: 54 },
          { hour: '12h', current: 46, predicted: 51 },
          { hour: '14h', current: 44, predicted: 48 }
        ]
      },
      {
        id: 'ai_002',
        type: 'anomaly',
        category: 'quality',
        title: 'Quality anomaly detected',
        description: 'Early detection of unusual pattern in Megane dimensional measurements. Intervention recommended before drift.',
        confidence: 87.5,
        impact: 'medium',
        actionable: true,
        riskScore: 65,
        timeframe: 'Immediate',
        recommendations: [
          'Check 3D measurement system calibration',
          'Control workshop ambient temperature',
          'Inspecter usure outils ligne assemblage'
        ],
        priority: 7,
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 'ai_003',
        type: 'optimization',
        category: 'maintenance',
        title: 'Predictive maintenance optimization',
        description: 'AI recommends advancing robot R-580 maintenance by 2 days to avoid a probable unplanned shutdown at 78%.',
        confidence: 91.3,
        impact: 'high',
        actionable: true,
        predictedOutcome: 'Avoid 4h production downtime',
        timeframe: '48-72h',
        riskScore: 78,
        recommendations: [
          'Schedule intervention tomorrow 10pm-6am',
          'Order preventive spare parts',
          'Train night shift on procedure'
        ],
        priority: 8,
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: 'ai_004',
        type: 'recommendation',
        category: 'efficiency',
        title: 'Energy optimization',
        description: 'Consumption pattern analysis: 12% savings possible by adjusting work zone heating cycles.',
        confidence: 89.7,
        impact: 'medium',
        actionable: true,
        predictedOutcome: '-2.4 kWh/vehicle',
        timeframe: '1 week',
        recommendations: [
          'Program zone heating according to production schedule',
          'Install workshop presence sensors',
          'Optimize critical zone insulation'
        ],
        priority: 6,
        timestamp: new Date(Date.now() - 900000)
      },
      {
        id: 'ai_005',
        type: 'alert',
        category: 'safety',
        title: 'Safety risk prediction',
        description: 'AI model identifies a statistical increase in incident risk in the welding area during 10am-12pm hours.',
        confidence: 92.8,
        impact: 'critical',
        actionable: true,
        riskScore: 85,
        timeframe: 'Aujourd\'hui',
        recommendations: [
          'Renforcer vigilance superviseur zone soudure',
          'Check PPE for 10am-12pm team',
          'Control emergency stop systems',
          'Safety briefing for incoming team'
        ],
        priority: 10,
        timestamp: new Date(Date.now() - 1200000)
      }
    ];

    return insights.sort((a, b) => b.priority - a.priority);
  }

  static getModelStatus(): PredictiveModel[] {
    return this.models;
  }

  static getOverallAIHealth(): {
    status: 'optimal' | 'good' | 'warning' | 'critical';
    score: number;
    activeModels: number;
    totalInsights: number;
    avgConfidence: number;
  } {
    const activeModels = this.models.filter(m => m.status === 'active').length;
    const avgAccuracy = this.models.reduce((sum, m) => sum + m.accuracy, 0) / this.models.length;
    const insights = this.generateInsights();
    const avgConfidence = insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length;

    let status: 'optimal' | 'good' | 'warning' | 'critical' = 'optimal';
    if (avgAccuracy < 85) status = 'critical';
    else if (avgAccuracy < 90) status = 'warning';
    else if (avgAccuracy < 95) status = 'good';

    return {
      status,
      score: Math.round(avgAccuracy),
      activeModels,
      totalInsights: insights.length,
      avgConfidence: Math.round(avgConfidence)
    };
  }
}

// AI Insights Dashboard Component
export const AIInsightsDashboard: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [models, setModels] = useState<PredictiveModel[]>([]);
  const [aiHealth, setAIHealth] = useState(RenaultAIEngine.getOverallAIHealth());

  useEffect(() => {
    // Initialize AI data
    setInsights(RenaultAIEngine.generateInsights());
    setModels(RenaultAIEngine.getModelStatus());

    // Simulate real-time AI updates
    const interval = setInterval(() => {
      setInsights(RenaultAIEngine.generateInsights());
      setAIHealth(RenaultAIEngine.getOverallAIHealth());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: AIInsight['category']) => {
    switch (category) {
      case 'production': return <Factory className="h-4 w-4" />;
      case 'quality': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Zap className="h-4 w-4" />;
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'efficiency': return <BarChart3 className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Score IA Global</p>
                <p className="text-2xl font-bold text-purple-600">{aiHealth.score}%</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  Optimal
                </p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-blue-600">{aiHealth.activeModels}</p>
                <p className="text-xs text-muted-foreground">sur {models.length}</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Generated Insights</p>
                <p className="text-2xl font-bold text-green-600">{insights.length}</p>
                <p className="text-xs text-muted-foreground">last hour</p>
              </div>
              <Lightbulb className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confiance Moy.</p>
                <p className="text-2xl font-bold text-orange-600">{aiHealth.avgConfidence}%</p>
                <p className="text-xs text-muted-foreground">model accuracy</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Models Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-600" />
            AI Model Status
          </CardTitle>
          <CardDescription>
            Real-time artificial intelligence model monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{model.name}</span>
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                    {model.status === 'active' ? 'Active' : 
                     model.status === 'training' ? 'Training' : 'Error'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Accuracy:</span>
                    <span className="font-medium">{model.accuracy.toFixed(1)}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Last training: {model.lastTrained.toLocaleDateString('en-US')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Insights IA - Recommandations Intelligentes
          </CardTitle>
          <CardDescription>
            Predictive analytics and AI-based recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-lg p-4 ${getImpactColor(insight.impact)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(insight.type)}
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">
                          Confiance: {insight.confidence}%
                        </Badge>
                        <Badge variant="outline">
                          Priority: {insight.priority}/10
                        </Badge>
                        {insight.timeframe && (
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {insight.timeframe}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {insight.riskScore && (
                    <div className="text-right">
                      <div className="text-sm font-medium">Risque</div>
                      <div className="text-lg font-bold">{insight.riskScore}%</div>
                    </div>
                  )}
                </div>

                <p className="text-sm mb-3">{insight.description}</p>

                {insight.predictedOutcome && (
                  <div className="bg-white/50 rounded p-2 mb-3">
                    <div className="text-sm font-medium">Expected impact:</div>
                    <div className="text-green-700 font-semibold">{insight.predictedOutcome}</div>
                  </div>
                )}

                {insight.data && (
                  <div className="bg-white/50 rounded p-3 mb-3">
                    <div className="text-sm font-medium mb-2">Predictive data:</div>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={insight.data}>
                        <XAxis dataKey="hour" />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="current" stroke="#6b7280" strokeDasharray="5 5" name="Actuel" />
                        <Line type="monotone" dataKey="predicted" stroke="#059669" strokeWidth={2} name="Predicted" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {insight.recommendations && insight.recommendations.length > 0 && (
                  <div className="bg-white/50 rounded p-3">
                    <div className="text-sm font-medium mb-2">Recommandations IA:</div>
                    <ul className="space-y-1">
                      {insight.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {insight.actionable && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Appliquer
                    </Button>
                    <Button size="sm" variant="outline">
                      More details
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};