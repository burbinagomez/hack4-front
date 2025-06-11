"use client";

import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import Charts from '@/components/dashboard/Charts';
import Filters from '@/components/dashboard/Filters';
import { mockScanData } from '@/lib/mockData';
import { DashboardFilters } from '@/types/dashboard';
import { isWithinInterval } from 'date-fns';

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      from: undefined,
      to: undefined
    }
  });

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!filters.dateRange.from && !filters.dateRange.to) {
      return mockScanData;
    }

    return mockScanData.filter((scan) => {
      const scanDate: Date = new Date(scan.scanDate);
      
      if (filters.dateRange.from && filters.dateRange.to) {
        return isWithinInterval(scanDate, {
          start: filters.dateRange.from,
          end: filters.dateRange.to
        });
      }
      
      if (filters.dateRange.from) {
        return scanDate >= filters.dateRange.from;
      }
      
      if (filters.dateRange.to) {
        return scanDate <= filters.dateRange.to;
      }
      
      return true;
    });
  }, [filters]);

  const handleExportCSV = (): void => {
    const headers: string[] = ['Scan Date', 'Subdomains Discovered', 'Vulnerabilities Detected', 'Critical', 'High', 'Medium', 'Low', 'Informational'];
    const csvContent: string = [
      headers.join(','),
      ...filteredData.map(scan => [
        new Date(scan.scanDate).toISOString(),
        scan.subdomainsDiscovered,
        scan.vulnerabilitiesDetected,
        scan.severityDistribution.critical,
        scan.severityDistribution.high,
        scan.severityDistribution.medium,
        scan.severityDistribution.low,
        scan.severityDistribution.informational
      ].join(','))
    ].join('\n');

    const blob: Blob = new Blob([csvContent], { type: 'text/csv' });
    const url: string = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `security-scan-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportPDF = (): void => {
    // Placeholder for PDF export functionality
    console.log('PDF export functionality would be implemented here');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
        />
        
        <Charts data={filteredData} />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Scan History</h2>
          <DataTable data={filteredData} onExport={handleExportCSV} />
        </div>
      </div>
    </DashboardLayout>
  );
}