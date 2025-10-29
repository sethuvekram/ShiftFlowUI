import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

type TranslationKey = 
  | 'header.title' | 'header.subtitle' | 'header.shift' | 'header.morning' | 'header.afternoon' | 'header.night'
  | 'header.logout' | 'header.notifications' | 'header.profile' | 'header.settings'
  | 'nav.dashboard' | 'nav.logbook' | 'nav.handover' | 'nav.reports' | 'nav.administration' | 'nav.demo'
  | 'login.title' | 'login.subtitle' | 'login.welcome' | 'login.description' | 'login.username' | 'login.password'
  | 'login.signin' | 'login.remember' | 'login.enterprise' | 'login.manufacturing' | 'login.realtime'
  | 'dashboard.title' | 'dashboard.subtitle' | 'dashboard.oee' | 'dashboard.quality' | 'dashboard.performance'
  | 'dashboard.availability' | 'dashboard.production' | 'dashboard.target' | 'dashboard.efficiency'
  | 'dashboard.vehicles_week' | 'dashboard.objective' | 'dashboard.realtime_kpis' | 'dashboard.key_indicators'
  | 'dashboard.conforming_parts' | 'dashboard.theoretical_actual' | 'dashboard.production_time'
  | 'handover.title' | 'handover.subtitle' | 'handover.safety' | 'handover.quality' | 'handover.production_checklist'
  | 'handover.submit' | 'handover.save_draft' | 'handover.safety_protocols' | 'handover.equipment_status'
  | 'handover.quality_standards' | 'handover.production_targets'
  | 'reports.title' | 'reports.subtitle' | 'reports.production_analytics' | 'reports.quality_metrics'
  | 'reports.oee_trends' | 'reports.safety_tracking' | 'reports.weekly_production' | 'reports.quality_evolution'
  | 'reports.oee_evolution' | 'reports.safety_incidents'
  | 'admin.title' | 'admin.subtitle' | 'admin.overview' | 'admin.ai_analytics' | 'admin.security' | 'admin.audit'
  | 'admin.export' | 'admin.integrations' | 'admin.system_health' | 'admin.uptime' | 'admin.active_users'
  | 'admin.data_day' | 'admin.alerts_today' | 'admin.api_calls' | 'admin.performance'
  | 'demo.title' | 'demo.subtitle' | 'demo.enterprise_level' | 'demo.production_ready' | 'demo.renault_specific'
  | 'demo.advanced_features' | 'demo.demo_actions' | 'demo.realtime_dashboard' | 'demo.notification_system'
  | 'demo.predictive_ai' | 'demo.audit_security' | 'demo.advanced_export' | 'demo.team_workflow'
  | 'common.active' | 'common.status' | 'common.connected' | 'common.warning' | 'common.error' | 'common.success'
  | 'common.loading' | 'common.save' | 'common.cancel' | 'common.edit' | 'common.delete' | 'common.view'
  | 'common.export' | 'common.import' | 'common.refresh' | 'common.search' | 'common.filter' | 'common.sort'
  | 'common.today' | 'common.week' | 'common.month' | 'common.year';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Header
    'header.title': 'Shift Handover Platform',
    'header.subtitle': 'Digital Factory Management System',
    'header.shift': 'Shift',
    'header.morning': 'Morning',
    'header.afternoon': 'Afternoon',
    'header.night': 'Night',
    'header.logout': 'Logout',
    'header.notifications': 'Notifications',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.logbook': 'Digital Logbook',
    'nav.handover': 'Handover Approval',
    'nav.reports': 'Reports & Analytics',
    'nav.administration': 'Administration',
    'nav.demo': 'Demo Overview',
    
    // Login
    'login.title': 'Renault Digital Factory',
    'login.subtitle': 'Advanced Shift Management Platform',
    'login.welcome': 'Welcome to ShiftFlow Enterprise',
    'login.description': 'Secure access to the next-generation shift handover system',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.signin': 'Sign In',
    'login.remember': 'Remember me',
    'login.enterprise': 'Enterprise Level',
    'login.manufacturing': 'Manufacturing Excellence',
    'login.realtime': 'Real-time Monitoring',
    
    // Dashboard
    'dashboard.title': 'Production Dashboard',
    'dashboard.subtitle': 'Real-time manufacturing metrics and KPIs',
    'dashboard.oee': 'Overall Equipment Effectiveness',
    'dashboard.quality': 'Quality Rate',
    'dashboard.performance': 'Performance',
    'dashboard.availability': 'Availability',
    'dashboard.production': 'Production',
    'dashboard.target': 'Target',
    'dashboard.efficiency': 'Efficiency',
    'dashboard.vehicles_week': 'Vehicles/Week',
    'dashboard.objective': 'Objective',
    'dashboard.realtime_kpis': 'Real-time Manufacturing KPIs',
    'dashboard.key_indicators': 'Key performance indicators for Renault Flins plant',
    'dashboard.conforming_parts': 'Conforming parts/Total',
    'dashboard.theoretical_actual': 'Theoretical/actual rate',
    'dashboard.production_time': 'Production time/Total',
    
    // Handover
    'handover.title': 'Shift Handover',
    'handover.subtitle': 'Manufacturing shift transition workflow',
    'handover.safety': 'Safety Checklist',
    'handover.quality': 'Quality Checklist',
    'handover.production_checklist': 'Production Checklist',
    'handover.submit': 'Submit Handover',
    'handover.save_draft': 'Save as Draft',
    'handover.safety_protocols': 'Safety protocols verified',
    'handover.equipment_status': 'Equipment operational status',
    'handover.quality_standards': 'Quality standards compliance',
    'handover.production_targets': 'Production targets status',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Advanced manufacturing analytics and insights',
    'reports.production_analytics': 'Production Analytics',
    'reports.quality_metrics': 'Quality Metrics',
    'reports.oee_trends': 'OEE Trends',
    'reports.safety_tracking': 'Safety Tracking',
    'reports.weekly_production': 'Weekly Production Analysis',
    'reports.quality_evolution': 'Quality Rate Evolution',
    'reports.oee_evolution': 'OEE Evolution Trend',
    'reports.safety_incidents': 'Safety Incidents Tracking',
    
    // Admin
    'admin.title': 'Enterprise Administration Center',
    'admin.subtitle': 'Advanced management for Renault Digital Factory shift handover system',
    'admin.overview': 'Overview',
    'admin.ai_analytics': 'AI & Analytics',
    'admin.security': 'Security',
    'admin.audit': 'Audit',
    'admin.export': 'Export',
    'admin.integrations': 'Integrations',
    'admin.system_health': 'System Health',
    'admin.uptime': 'Uptime',
    'admin.active_users': 'Active Users',
    'admin.data_day': 'Data/day',
    'admin.alerts_today': 'Alerts today',
    'admin.api_calls': 'API calls',
    'admin.performance': 'Performance',
    
    // Demo Overview
    'demo.title': 'ShiftFlow Enterprise Demo',
    'demo.subtitle': 'Next-generation shift handover platform for Renault',
    'demo.enterprise_level': 'Enterprise Level',
    'demo.production_ready': 'Production Ready',
    'demo.renault_specific': 'Renault Specific',
    'demo.advanced_features': 'Advanced Enterprise Features',
    'demo.demo_actions': 'Demonstration Actions',
    'demo.realtime_dashboard': 'Real-time Dashboard',
    'demo.notification_system': 'Notification System',
    'demo.predictive_ai': 'Predictive AI',
    'demo.audit_security': 'Audit & Security',
    'demo.advanced_export': 'Advanced Export',
    'demo.team_workflow': 'Team Workflow',
    
    // Common
    'common.active': 'Active',
    'common.status': 'Status',
    'common.connected': 'Connected',
    'common.warning': 'Warning',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.loading': 'Loading',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.refresh': 'Refresh',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.today': 'Today',
    'common.week': 'Week',
    'common.month': 'Month',
    'common.year': 'Year'
  },
  fr: {
    // Header
    'header.title': 'Plateforme de Transmission d\'Équipes',
    'header.subtitle': 'Système de Gestion d\'Usine Digitale',
    'header.shift': 'Équipe',
    'header.morning': 'Matin',
    'header.afternoon': 'Après-midi',
    'header.night': 'Nuit',
    'header.logout': 'Déconnexion',
    'header.notifications': 'Notifications',
    'header.profile': 'Profil',
    'header.settings': 'Paramètres',
    
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.logbook': 'Carnet Digital',
    'nav.handover': 'Validation Transmission',
    'nav.reports': 'Rapports & Analytics',
    'nav.administration': 'Administration',
    'nav.demo': 'Aperçu Démo',
    
    // Login
    'login.title': 'Renault Digital Factory',
    'login.subtitle': 'Plateforme Avancée de Gestion d\'Équipes',
    'login.welcome': 'Bienvenue sur ShiftFlow Enterprise',
    'login.description': 'Accès sécurisé au système de transmission d\'équipes nouvelle génération',
    'login.username': 'Nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.signin': 'Se connecter',
    'login.remember': 'Se souvenir de moi',
    'login.enterprise': 'Niveau Entreprise',
    'login.manufacturing': 'Excellence Manufacturing',
    'login.realtime': 'Surveillance Temps Réel',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord Production',
    'dashboard.subtitle': 'Métriques de fabrication et KPIs en temps réel',
    'dashboard.oee': 'Taux de Rendement Global',
    'dashboard.quality': 'Taux Qualité',
    'dashboard.performance': 'Performance',
    'dashboard.availability': 'Disponibilité',
    'dashboard.production': 'Production',
    'dashboard.target': 'Objectif',
    'dashboard.efficiency': 'Efficacité',
    'dashboard.vehicles_week': 'Véhicules/Semaine',
    'dashboard.objective': 'Objectif',
    'dashboard.realtime_kpis': 'KPIs Manufacturing Temps Réel',
    'dashboard.key_indicators': 'Indicateurs clés de performance de l\'usine Renault Flins',
    'dashboard.conforming_parts': 'Pièces conformes/Total',
    'dashboard.theoretical_actual': 'Cadence théorique/réelle',
    'dashboard.production_time': 'Temps production/Total',
    
    // Handover
    'handover.title': 'Transmission d\'Équipe',
    'handover.subtitle': 'Workflow de transition d\'équipe manufacturing',
    'handover.safety': 'Checklist Sécurité',
    'handover.quality': 'Checklist Qualité',
    'handover.production_checklist': 'Checklist Production',
    'handover.submit': 'Valider Transmission',
    'handover.save_draft': 'Sauvegarder Brouillon',
    'handover.safety_protocols': 'Protocoles de sécurité vérifiés',
    'handover.equipment_status': 'État opérationnel des équipements',
    'handover.quality_standards': 'Conformité aux standards qualité',
    'handover.production_targets': 'État des objectifs de production',
    
    // Reports
    'reports.title': 'Rapports & Analytics',
    'reports.subtitle': 'Analytics manufacturing avancées et insights',
    'reports.production_analytics': 'Analytics Production',
    'reports.quality_metrics': 'Métriques Qualité',
    'reports.oee_trends': 'Tendances TRS',
    'reports.safety_tracking': 'Suivi Sécurité',
    'reports.weekly_production': 'Analyse Production Hebdomadaire',
    'reports.quality_evolution': 'Évolution Taux Qualité',
    'reports.oee_evolution': 'Tendance Évolution TRS',
    'reports.safety_incidents': 'Suivi Incidents Sécurité',
    
    // Admin
    'admin.title': 'Centre d\'Administration Entreprise',
    'admin.subtitle': 'Gestion avancée du système de transmission d\'équipes Renault Digital Factory',
    'admin.overview': 'Vue d\'ensemble',
    'admin.ai_analytics': 'IA & Analytics',
    'admin.security': 'Sécurité',
    'admin.audit': 'Audit',
    'admin.export': 'Export',
    'admin.integrations': 'Intégrations',
    'admin.system_health': 'Santé Système',
    'admin.uptime': 'Disponibilité',
    'admin.active_users': 'Utilisateurs actifs',
    'admin.data_day': 'Données/jour',
    'admin.alerts_today': 'Alertes aujourd\'hui',
    'admin.api_calls': 'Appels API',
    'admin.performance': 'Performance',
    
    // Demo Overview
    'demo.title': 'ShiftFlow Enterprise Demo',
    'demo.subtitle': 'Plateforme de transmission d\'équipes nouvelle génération pour Renault',
    'demo.enterprise_level': 'Niveau Entreprise',
    'demo.production_ready': 'Prêt pour Production',
    'demo.renault_specific': 'Spécifique Renault',
    'demo.advanced_features': 'Fonctionnalités Entreprise Avancées',
    'demo.demo_actions': 'Actions de Démonstration',
    'demo.realtime_dashboard': 'Tableau de Bord Temps Réel',
    'demo.notification_system': 'Système de Notifications',
    'demo.predictive_ai': 'IA Prédictive',
    'demo.audit_security': 'Audit & Sécurité',
    'demo.advanced_export': 'Export Avancé',
    'demo.team_workflow': 'Workflow Équipes',
    
    // Common
    'common.active': 'Actif',
    'common.status': 'État',
    'common.connected': 'Connecté',
    'common.warning': 'Avertissement',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.loading': 'Chargement',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    'common.refresh': 'Actualiser',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.sort': 'Trier',
    'common.today': 'Aujourd\'hui',
    'common.week': 'Semaine',
    'common.month': 'Mois',
    'common.year': 'Année'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};