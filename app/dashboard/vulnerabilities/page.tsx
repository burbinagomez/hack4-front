"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VulnerabilitiesTable from '@/components/dashboard/VulnerabilitiesTable';
import { mockVulnerabilityData } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Download, RefreshCw, Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export default function VulnerabilitiesPage() {
  const handleAddVulnerability = (): void => {
    console.log('Add new vulnerability');
    // TODO: Implement add vulnerability functionality
  };

  const handleExport = (): void => {
    console.log('Export vulnerabilities');
    // TODO: Implement export functionality
  };

  const handleRefresh = (): void => {
    console.log('Refresh vulnerabilities');
    // TODO: Implement refresh functionality
  };

  // Calculate statistics
  const totalVulnerabilities: number = mockVulnerabilityData.length;
  const criticalAndHigh: number = mockVulnerabilityData.filter(v => v.severity === 'critical' || v.severity === 'high').length;
  const openVulnerabilities: number = mockVulnerabilityData.filter(v => v.status === 'open').length;
  const mitigatedVulnerabilities: number = mockVulnerabilityData.filter(v => v.status === 'mitigated').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vulnerabilities</h1>
            <p className="text-muted-foreground">
              Monitor and manage security vulnerabilities across your infrastructure
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddVulnerability}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vulnerability
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vulnerabilities</p>
                <p className="text-2xl font-bold">{totalVulnerabilities}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical & High</p>
                <p className="text-2xl font-bold text-red-600">{criticalAndHigh}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Issues</p>
                <p className="text-2xl font-bold text-orange-600">{openVulnerabilities}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mitigated</p>
                <p className="text-2xl font-bold text-green-600">{mitigatedVulnerabilities}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment Alert */}
        {criticalAndHigh > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">High Risk Vulnerabilities Detected</h3>
                <p className="text-sm text-red-700 mt-1">
                  You have {criticalAndHigh} critical or high severity vulnerabilities that require immediate attention. 
                  Review and prioritize mitigation efforts for these security issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Vulnerabilities Table */}
        <VulnerabilitiesTable data={mockVulnerabilityData} />
      </div>
    </DashboardLayout>
  );
}