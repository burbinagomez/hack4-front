import { DateRange } from 'react-day-picker';

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
  dateRange: DateRange;
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

// New interfaces for vulnerability management
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'informational';
export type VulnerabilityStatus = 'open' | 'mitigated' | 'in-progress';

export interface VulnerabilityData {
  id: string;
  cveId: string;
  severity: SeverityLevel;
  title: string;
  description: string;
  discoveryDate: string;
  status: VulnerabilityStatus;
  fullDescription: string;
  affectedSystems: string[];
  technicalDetails: string;
  potentialImpact: string;
  mitigationSteps: string[];
  exploitationHistory: {
    date: string;
    description: string;
    severity: string;
  }[];
  cvssScore?: number;
  references?: string[];
}

export interface VulnerabilityFilters {
  severity: SeverityLevel | 'all';
  status: VulnerabilityStatus | 'all';
  dateRange: DateRange;
  searchTerm: string;
}

export type VulnerabilitySortField = 'cveId' | 'severity' | 'title' | 'discoveryDate' | 'status' | 'cvssScore';