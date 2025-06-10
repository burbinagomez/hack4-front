"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SubdomainsTable from '@/components/dashboard/SubdomainsTable';
import { mockSubdomainData } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Download, RefreshCw } from 'lucide-react';

export default function SubdomainsPage() {
  const handleAddSubdomain = () => {
    console.log('Add new subdomain');
    // TODO: Implement add subdomain functionality
  };

  const handleExport = () => {
    console.log('Export subdomains');
    // TODO: Implement export functionality
  };

  const handleRefresh = () => {
    console.log('Refresh subdomains');
    // TODO: Implement refresh functionality
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Subdomains</h1>
            <p className="text-muted-foreground">
              Manage and monitor all subdomains for your domain
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
            <Button size="sm" onClick={handleAddSubdomain}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subdomain
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subdomains</p>
                <p className="text-2xl font-bold">{mockSubdomainData.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active SSL</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockSubdomainData.filter(s => s.sslStatus === 'active').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-600"></div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Use</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockSubdomainData.filter(s => s.usageStatus === 'in-use').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockSubdomainData.filter(s => s.sslStatus === 'expired' || s.usageStatus === 'not-in-use').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-red-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Subdomains Table */}
        <SubdomainsTable data={mockSubdomainData} />
      </div>
    </DashboardLayout>
  );
}