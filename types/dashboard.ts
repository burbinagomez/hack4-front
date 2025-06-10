export interface SeverityDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
}

export interface VulnerabilityType {
  type: string;
  count: number;
}

export interface ScanData {
  id: string;
  scanDate: string;
  subdomainsDiscovered: number;
  vulnerabilitiesDetected: number;
  severityDistribution: SeverityDistribution;
  vulnerabilityTypes: VulnerabilityType[];
}

export interface DashboardFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export type SortField = 'scanDate' | 'subdomainsDiscovered' | 'vulnerabilitiesDetected';
export type SortDirection = 'asc' | 'desc';

// New interfaces for subdomain management
export interface SubdomainData {
  id: string;
  name: string;
  url: string;
  sslStatus: 'active' | 'inactive' | 'expired' | 'pending';
  usageStatus: 'in-use' | 'not-in-use' | 'maintenance';
  lastChecked: string;
  certificateExpiry?: string;
  ipAddress?: string;
  responseTime?: number;
  httpStatus?: number;
}

export type SubdomainSortField = 'name' | 'sslStatus' | 'usageStatus' | 'lastChecked';