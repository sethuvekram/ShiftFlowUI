import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, FileText, FileSpreadsheet, Image, 
  Printer, Mail, Share2, Calendar 
} from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface ExportData {
  title: string;
  subtitle?: string;
  data: any[];
  metadata?: Record<string, any>;
}

interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf' | 'json' | 'png';
  fileName?: string;
  includeCharts?: boolean;
  includeMetadata?: boolean;
  compressed?: boolean;
}

export class EnterpriseExportService {
  
  // Export to CSV
  static exportToCSV(data: ExportData, options: ExportOptions = { format: 'csv' }) {
    const { title, data: tableData } = data;
    const fileName = options.fileName || `${title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
    
    if (!tableData || tableData.length === 0) {
      throw new Error('No data to export');
    }

    // Get headers from first row
    const headers = Object.keys(tableData[0]);
    
    // Create CSV content
    const csvContent = [
      // Header with metadata
      `# ${title}`,
      `# Generated on: ${format(new Date(), 'dd/MM/yyyy \'at\' HH:mm', { locale: enUS })}`,
      `# Renault Digital Factory - Flins Plant`,
      '',
      // Column headers
      headers.join(','),
      // Data rows
      ...tableData.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle special cases
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
          return value.toString();
        }).join(',')
      )
    ].join('\n');

    this.downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
  }

  // Export to Excel (simplified version using CSV)
  static exportToExcel(data: ExportData, options: ExportOptions = { format: 'excel' }) {
    // For demo purposes, we'll create a sophisticated CSV that Excel can open
    const fileName = options.fileName || `${data.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`;
    
    const excelContent = this.createExcelCompatibleCSV(data);
    this.downloadFile(excelContent, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  // Create a sophisticated PDF report
  static exportToPDF(data: ExportData, options: ExportOptions = { format: 'pdf' }) {
    const fileName = options.fileName || `rapport_${data.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    
    // Create HTML content for PDF
    const htmlContent = this.createPDFContent(data);
    
    // Use browser's print functionality to generate PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  }

  // Export chart as PNG
  static exportChartAsPNG(chartId: string, fileName?: string) {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
      throw new Error('Chart not found');
    }

    // Convert SVG or Canvas to PNG (simplified for demo)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // This would normally use html2canvas or similar library
    // For demo, we'll just show the concept
    const finalFileName = fileName || `graphique_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.png`;
    
    console.log(`Exportation du graphique ${chartId} vers ${finalFileName}`);
    // In real implementation, would convert chart to image and download
  }

  private static createExcelCompatibleCSV(data: ExportData): string {
    const { title, subtitle, data: tableData, metadata } = data;
    
    const content = [
      // Excel-friendly header
      `"${title}"`,
      subtitle ? `"${subtitle}"` : '',
      `"Generated on: ${format(new Date(), 'dd/MM/yyyy \'at\' HH:mm', { locale: enUS })}"`,
      `"Renault Digital Factory - Flins Plant"`,
      '',
      // Metadata if available
      ...(metadata ? Object.entries(metadata).map(([key, value]) => `"${key}","${value}"`) : []),
      metadata ? '' : '',
      // Data table
      ...(tableData && tableData.length > 0 ? [
        Object.keys(tableData[0]).map(h => `"${h}"`).join(','),
        ...tableData.map(row => 
          Object.values(row).map(v => `"${v || ''}"`).join(',')
        )
      ] : ['No data available'])
    ];

    return content.join('\n');
  }

  private static createPDFContent(data: ExportData): string {
    const { title, subtitle, data: tableData } = data;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title} - Rapport PDF</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0066CC;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .company-logo {
            font-size: 24px;
            font-weight: bold;
            color: #0066CC;
            margin-bottom: 10px;
          }
          .report-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .report-subtitle {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
          }
          .metadata {
            font-size: 12px;
            color: #888;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-logo">🏭 Renault Digital Factory</div>
          <div class="report-title">${title}</div>
          ${subtitle ? `<div class="report-subtitle">${subtitle}</div>` : ''}
          <div class="metadata">
            Generated on ${format(new Date(), 'dd MMMM yyyy \'at\' HH:mm', { locale: enUS })} • Flins Plant, France
          </div>
        </div>

        ${tableData && tableData.length > 0 ? `
          <table>
            <thead>
              <tr>
                ${Object.keys(tableData[0]).map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableData.map(row => `
                <tr>
                  ${Object.values(row).map(value => `<td>${value || '-'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p>No data available for this report.</p>'}

        <div class="footer">
          <p>© 2025 Renault Digital Factory - Shift Management System</p>
          <p>Confidential document - Internal use only</p>
        </div>
      </body>
      </html>
    `;
  }

  private static downloadFile(content: string, fileName: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

// Enterprise Export Panel Component
interface EnterpriseExportPanelProps {
  data: ExportData;
  availableFormats?: ExportOptions['format'][];
  onExport?: (format: ExportOptions['format']) => void;
}

export const EnterpriseExportPanel: React.FC<EnterpriseExportPanelProps> = ({
  data,
  availableFormats = ['csv', 'excel', 'pdf'],
  onExport
}) => {
  const handleExport = async (format: ExportOptions['format']) => {
    try {
      switch (format) {
        case 'csv':
          EnterpriseExportService.exportToCSV(data);
          break;
        case 'excel':
          EnterpriseExportService.exportToExcel(data);
          break;
        case 'pdf':
          EnterpriseExportService.exportToPDF(data);
          break;
        case 'png':
          EnterpriseExportService.exportChartAsPNG('chart-container');
          break;
      }
      
      if (onExport) {
        onExport(format);
      }
    } catch (error) {
      console.error('Error during export:', error);
      alert('Export error. Please try again.');
    }
  };

  const getFormatInfo = (format: ExportOptions['format']) => {
    switch (format) {
      case 'csv':
        return {
          icon: FileText,
          label: 'CSV',
          description: 'Excel-compatible tabular data',
          color: 'text-green-600'
        };
      case 'excel':
        return {
          icon: FileSpreadsheet,
          label: 'Excel',
          description: 'Microsoft Excel spreadsheet',
          color: 'text-green-700'
        };
      case 'pdf':
        return {
          icon: FileText,
          label: 'PDF',
          description: 'Formatted report for printing',
          color: 'text-red-600'
        };
      case 'png':
        return {
          icon: Image,
          label: 'PNG',
          description: 'Chart image export',
          color: 'text-blue-600'
        };
      default:
        return {
          icon: Download,
          label: format.toUpperCase(),
          description: 'Data format',
          color: 'text-gray-600'
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-blue-600" />
          Enterprise Export
        </CardTitle>
        <CardDescription>
          Export your data in various professional formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Export Info */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-900">{data.title}</span>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {data.data?.length || 0} entries
              </Badge>
            </div>
            {data.subtitle && (
              <p className="text-sm text-blue-700">{data.subtitle}</p>
            )}
            <div className="text-xs text-blue-600 mt-2">
              📅 {format(new Date(), 'dd MMMM yyyy \'at\' HH:mm', { locale: enUS })}
            </div>
          </div>

          {/* Export Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableFormats.map((format) => {
              const info = getFormatInfo(format);
              const Icon = info.icon;
              
              return (
                <Button
                  key={format}
                  variant="outline"
                  onClick={() => handleExport(format)}
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                >
                  <Icon className={`h-8 w-8 ${info.color}`} />
                  <div className="text-center">
                    <div className="font-medium">{info.label}</div>
                    <div className="text-xs text-gray-600">{info.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Additional Options */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Send by email
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-3">
            🔒 <strong>Confidentiality:</strong> Exported data is subject to Renault security policies. 
            Internal use only. Complete export traceability in audit log.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};