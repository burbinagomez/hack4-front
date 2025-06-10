import { ScanData } from '@/types/dashboard';

export const mockScanData: ScanData[] = [
  {
    id: '1',
    scanDate: '2024-01-15T10:30:00Z',
    subdomainsDiscovered: 45,
    vulnerabilitiesDetected: 23,
    severityDistribution: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 6,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 8 },
      { type: 'SQL Injection', count: 3 },
      { type: 'CSRF', count: 4 },
      { type: 'Open Redirect', count: 5 },
      { type: 'Information Disclosure', count: 3 }
    ]
  },
  {
    id: '2',
    scanDate: '2024-01-10T14:20:00Z',
    subdomainsDiscovered: 38,
    vulnerabilitiesDetected: 17,
    severityDistribution: {
      critical: 1,
      high: 3,
      medium: 6,
      low: 5,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 5 },
      { type: 'SQL Injection', count: 2 },
      { type: 'CSRF', count: 3 },
      { type: 'Open Redirect', count: 4 },
      { type: 'Information Disclosure', count: 3 }
    ]
  },
  {
    id: '3',
    scanDate: '2024-01-05T09:15:00Z',
    subdomainsDiscovered: 52,
    vulnerabilitiesDetected: 31,
    severityDistribution: {
      critical: 3,
      high: 7,
      medium: 12,
      low: 7,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 12 },
      { type: 'SQL Injection', count: 4 },
      { type: 'CSRF', count: 6 },
      { type: 'Open Redirect', count: 5 },
      { type: 'Information Disclosure', count: 4 }
    ]
  },
  {
    id: '4',
    scanDate: '2023-12-28T16:45:00Z',
    subdomainsDiscovered: 41,
    vulnerabilitiesDetected: 19,
    severityDistribution: {
      critical: 1,
      high: 4,
      medium: 7,
      low: 5,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 6 },
      { type: 'SQL Injection', count: 2 },
      { type: 'CSRF', count: 4 },
      { type: 'Open Redirect', count: 4 },
      { type: 'Information Disclosure', count: 3 }
    ]
  },
  {
    id: '5',
    scanDate: '2023-12-20T11:30:00Z',
    subdomainsDiscovered: 35,
    vulnerabilitiesDetected: 14,
    severityDistribution: {
      critical: 0,
      high: 2,
      medium: 5,
      low: 5,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 4 },
      { type: 'SQL Injection', count: 1 },
      { type: 'CSRF', count: 3 },
      { type: 'Open Redirect', count: 3 },
      { type: 'Information Disclosure', count: 3 }
    ]
  },
  {
    id: '6',
    scanDate: '2023-12-15T13:20:00Z',
    subdomainsDiscovered: 48,
    vulnerabilitiesDetected: 26,
    severityDistribution: {
      critical: 2,
      high: 6,
      medium: 9,
      low: 7,
      informational: 2
    },
    vulnerabilityTypes: [
      { type: 'XSS', count: 9 },
      { type: 'SQL Injection', count: 3 },
      { type: 'CSRF', count: 5 },
      { type: 'Open Redirect', count: 5 },
      { type: 'Information Disclosure', count: 4 }
    ]
  }
];