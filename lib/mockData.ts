import { ScanData, SubdomainData } from '@/types/dashboard';

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

export const mockSubdomainData: SubdomainData[] = [
  {
    id: '1',
    name: 'api',
    url: 'api.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T10:30:00Z',
    certificateExpiry: '2024-12-15T23:59:59Z',
    ipAddress: '192.168.1.10',
    responseTime: 245,
    httpStatus: 200
  },
  {
    id: '2',
    name: 'www',
    url: 'www.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T10:25:00Z',
    certificateExpiry: '2024-12-15T23:59:59Z',
    ipAddress: '192.168.1.11',
    responseTime: 180,
    httpStatus: 200
  },
  {
    id: '3',
    name: 'blog',
    url: 'blog.example.com',
    sslStatus: 'expired',
    usageStatus: 'not-in-use',
    lastChecked: '2024-01-15T10:20:00Z',
    certificateExpiry: '2023-11-20T23:59:59Z',
    ipAddress: '192.168.1.12',
    responseTime: 0,
    httpStatus: 503
  },
  {
    id: '4',
    name: 'admin',
    url: 'admin.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T10:15:00Z',
    certificateExpiry: '2024-08-30T23:59:59Z',
    ipAddress: '192.168.1.13',
    responseTime: 320,
    httpStatus: 200
  },
  {
    id: '5',
    name: 'staging',
    url: 'staging.example.com',
    sslStatus: 'pending',
    usageStatus: 'maintenance',
    lastChecked: '2024-01-15T10:10:00Z',
    certificateExpiry: '2024-06-15T23:59:59Z',
    ipAddress: '192.168.1.14',
    responseTime: 450,
    httpStatus: 503
  },
  {
    id: '6',
    name: 'cdn',
    url: 'cdn.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T10:05:00Z',
    certificateExpiry: '2025-03-20T23:59:59Z',
    ipAddress: '192.168.1.15',
    responseTime: 95,
    httpStatus: 200
  },
  {
    id: '7',
    name: 'mail',
    url: 'mail.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T10:00:00Z',
    certificateExpiry: '2024-09-10T23:59:59Z',
    ipAddress: '192.168.1.16',
    responseTime: 210,
    httpStatus: 200
  },
  {
    id: '8',
    name: 'test',
    url: 'test.example.com',
    sslStatus: 'inactive',
    usageStatus: 'not-in-use',
    lastChecked: '2024-01-15T09:55:00Z',
    certificateExpiry: '2024-04-25T23:59:59Z',
    ipAddress: '192.168.1.17',
    responseTime: 0,
    httpStatus: 404
  },
  {
    id: '9',
    name: 'dev',
    url: 'dev.example.com',
    sslStatus: 'active',
    usageStatus: 'maintenance',
    lastChecked: '2024-01-15T09:50:00Z',
    certificateExpiry: '2024-07-18T23:59:59Z',
    ipAddress: '192.168.1.18',
    responseTime: 380,
    httpStatus: 503
  },
  {
    id: '10',
    name: 'shop',
    url: 'shop.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T09:45:00Z',
    certificateExpiry: '2024-11-05T23:59:59Z',
    ipAddress: '192.168.1.19',
    responseTime: 165,
    httpStatus: 200
  },
  {
    id: '11',
    name: 'support',
    url: 'support.example.com',
    sslStatus: 'active',
    usageStatus: 'in-use',
    lastChecked: '2024-01-15T09:40:00Z',
    certificateExpiry: '2024-10-12T23:59:59Z',
    ipAddress: '192.168.1.20',
    responseTime: 275,
    httpStatus: 200
  },
  {
    id: '12',
    name: 'docs',
    url: 'docs.example.com',
    sslStatus: 'expired',
    usageStatus: 'not-in-use',
    lastChecked: '2024-01-15T09:35:00Z',
    certificateExpiry: '2023-12-01T23:59:59Z',
    ipAddress: '192.168.1.21',
    responseTime: 0,
    httpStatus: 503
  }
];