import { ScanData, SubdomainData, VulnerabilityData } from '@/types/dashboard';

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

export const mockVulnerabilityData: VulnerabilityData[] = [
  {
    id: '1',
    cveId: 'CVE-2024-0001',
    severity: 'critical',
    title: 'Remote Code Execution in Authentication Module',
    description: 'Critical vulnerability allowing remote code execution through authentication bypass...',
    discoveryDate: '2024-01-15T08:30:00Z',
    status: 'open',
    fullDescription: 'This critical vulnerability exists in the authentication module where improper input validation allows attackers to execute arbitrary code remotely. The vulnerability stems from a buffer overflow condition that can be triggered by sending specially crafted authentication requests.',
    affectedSystems: ['auth.example.com', 'api.example.com', 'admin.example.com'],
    technicalDetails: 'The vulnerability is located in the login handler function at line 245 of auth.c. When processing authentication requests, the system fails to properly validate the length of the username parameter, leading to a stack-based buffer overflow. An attacker can exploit this by sending a username longer than 256 characters, overwriting the return address and gaining control of the execution flow.',
    potentialImpact: 'Complete system compromise, unauthorized access to sensitive data, potential lateral movement within the network, and possible data exfiltration. This vulnerability could lead to full administrative access to affected systems.',
    mitigationSteps: [
      'Immediately patch the authentication module to version 2.1.5 or higher',
      'Implement input validation for all user-supplied data',
      'Deploy Web Application Firewall (WAF) rules to block malicious requests',
      'Monitor authentication logs for suspicious activity',
      'Consider implementing rate limiting on authentication endpoints'
    ],
    exploitationHistory: [
      {
        date: '2024-01-16T14:20:00Z',
        description: 'Attempted exploitation detected from IP 192.168.1.100',
        severity: 'high'
      },
      {
        date: '2024-01-17T09:15:00Z',
        description: 'Multiple failed exploitation attempts blocked by WAF',
        severity: 'medium'
      }
    ],
    cvssScore: 9.8,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0001',
      'https://security.example.com/advisories/2024-001'
    ]
  },
  {
    id: '2',
    cveId: 'CVE-2024-0002',
    severity: 'high',
    title: 'SQL Injection in User Management System',
    description: 'SQL injection vulnerability in user search functionality allowing data extraction...',
    discoveryDate: '2024-01-12T16:45:00Z',
    status: 'in-progress',
    fullDescription: 'A SQL injection vulnerability has been identified in the user management system\'s search functionality. The vulnerability allows attackers to manipulate SQL queries and potentially extract sensitive information from the database.',
    affectedSystems: ['admin.example.com', 'user.example.com'],
    technicalDetails: 'The vulnerability exists in the user search endpoint (/api/users/search) where user input is directly concatenated into SQL queries without proper sanitization. The vulnerable parameter is the "query" field in POST requests.',
    potentialImpact: 'Unauthorized access to user data, potential data exfiltration, database manipulation, and possible privilege escalation within the application.',
    mitigationSteps: [
      'Implement parameterized queries for all database interactions',
      'Apply input validation and sanitization',
      'Use least privilege principle for database connections',
      'Deploy database activity monitoring',
      'Regular security code reviews'
    ],
    exploitationHistory: [
      {
        date: '2024-01-13T11:30:00Z',
        description: 'Automated scanning detected attempting SQL injection',
        severity: 'medium'
      }
    ],
    cvssScore: 8.1,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0002'
    ]
  },
  {
    id: '3',
    cveId: 'CVE-2024-0003',
    severity: 'medium',
    title: 'Cross-Site Scripting (XSS) in Comment System',
    description: 'Stored XSS vulnerability in comment system allowing script injection...',
    discoveryDate: '2024-01-10T09:20:00Z',
    status: 'mitigated',
    fullDescription: 'A stored cross-site scripting vulnerability was found in the comment system where user-supplied content is not properly sanitized before being stored and displayed to other users.',
    affectedSystems: ['blog.example.com', 'forum.example.com'],
    technicalDetails: 'The vulnerability occurs in the comment submission handler where HTML entities are not properly encoded. Malicious JavaScript can be injected through comment fields and executed when other users view the comments.',
    potentialImpact: 'Session hijacking, credential theft, defacement of web pages, and potential phishing attacks against other users.',
    mitigationSteps: [
      'Implement proper output encoding for all user-generated content',
      'Use Content Security Policy (CSP) headers',
      'Validate and sanitize all input on both client and server side',
      'Regular security testing of user input fields'
    ],
    exploitationHistory: [],
    cvssScore: 6.1,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0003'
    ]
  },
  {
    id: '4',
    cveId: 'CVE-2024-0004',
    severity: 'low',
    title: 'Information Disclosure in Error Messages',
    description: 'Verbose error messages revealing sensitive system information...',
    discoveryDate: '2024-01-08T14:15:00Z',
    status: 'open',
    fullDescription: 'The application returns detailed error messages that reveal sensitive information about the system architecture, database structure, and file paths.',
    affectedSystems: ['api.example.com'],
    technicalDetails: 'Error handling routines expose stack traces, database connection strings, and internal file paths in HTTP responses when exceptions occur.',
    potentialImpact: 'Information gathering for further attacks, system reconnaissance, and potential discovery of additional vulnerabilities.',
    mitigationSteps: [
      'Implement generic error messages for production',
      'Log detailed errors server-side only',
      'Remove debug information from production builds',
      'Implement proper error handling mechanisms'
    ],
    exploitationHistory: [],
    cvssScore: 3.7,
    references: []
  },
  {
    id: '5',
    cveId: 'CVE-2024-0005',
    severity: 'high',
    title: 'Insecure Direct Object Reference in File Access',
    description: 'IDOR vulnerability allowing unauthorized access to user files...',
    discoveryDate: '2024-01-14T11:00:00Z',
    status: 'open',
    fullDescription: 'An Insecure Direct Object Reference vulnerability allows users to access files belonging to other users by manipulating file ID parameters in API requests.',
    affectedSystems: ['files.example.com', 'api.example.com'],
    technicalDetails: 'The file download endpoint (/api/files/{id}) does not properly verify that the requesting user has permission to access the specified file. Users can enumerate file IDs and access arbitrary files.',
    potentialImpact: 'Unauthorized access to sensitive documents, privacy violations, potential data breaches, and compliance violations.',
    mitigationSteps: [
      'Implement proper authorization checks for all file access',
      'Use indirect references or UUIDs instead of sequential IDs',
      'Implement access control lists (ACLs) for file permissions',
      'Regular access control audits'
    ],
    exploitationHistory: [
      {
        date: '2024-01-15T16:45:00Z',
        description: 'Suspicious file access patterns detected',
        severity: 'medium'
      }
    ],
    cvssScore: 7.5,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0005'
    ]
  },
  {
    id: '6',
    cveId: 'CVE-2024-0006',
    severity: 'medium',
    title: 'CSRF Vulnerability in Account Settings',
    description: 'Cross-Site Request Forgery allowing unauthorized account modifications...',
    discoveryDate: '2024-01-11T13:30:00Z',
    status: 'in-progress',
    fullDescription: 'A Cross-Site Request Forgery vulnerability exists in the account settings functionality, allowing attackers to perform unauthorized actions on behalf of authenticated users.',
    affectedSystems: ['account.example.com'],
    technicalDetails: 'The account update endpoints do not implement CSRF protection tokens, making them vulnerable to cross-site request forgery attacks.',
    potentialImpact: 'Unauthorized account modifications, password changes, email address changes, and potential account takeover.',
    mitigationSteps: [
      'Implement CSRF tokens for all state-changing operations',
      'Use SameSite cookie attributes',
      'Implement proper referrer validation',
      'Add confirmation steps for sensitive operations'
    ],
    exploitationHistory: [],
    cvssScore: 5.4,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0006'
    ]
  },
  {
    id: '7',
    cveId: 'CVE-2024-0007',
    severity: 'informational',
    title: 'Missing Security Headers',
    description: 'Web application missing important security headers...',
    discoveryDate: '2024-01-09T10:45:00Z',
    status: 'open',
    fullDescription: 'The web application is missing several important security headers that help protect against various types of attacks.',
    affectedSystems: ['www.example.com', 'app.example.com'],
    technicalDetails: 'Missing headers include: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Strict-Transport-Security, and Content-Security-Policy.',
    potentialImpact: 'Increased susceptibility to clickjacking, MIME-type confusion attacks, XSS attacks, and man-in-the-middle attacks.',
    mitigationSteps: [
      'Implement all recommended security headers',
      'Configure Content Security Policy (CSP)',
      'Enable HTTP Strict Transport Security (HSTS)',
      'Regular security header audits'
    ],
    exploitationHistory: [],
    cvssScore: 2.1,
    references: []
  },
  {
    id: '8',
    cveId: 'CVE-2024-0008',
    severity: 'critical',
    title: 'Authentication Bypass in Admin Panel',
    description: 'Critical authentication bypass allowing unauthorized admin access...',
    discoveryDate: '2024-01-16T07:20:00Z',
    status: 'open',
    fullDescription: 'A critical authentication bypass vulnerability in the admin panel allows attackers to gain administrative access without valid credentials.',
    affectedSystems: ['admin.example.com'],
    technicalDetails: 'The admin authentication check can be bypassed by manipulating the "admin" cookie value or by sending specific HTTP headers that cause the authentication logic to be skipped.',
    potentialImpact: 'Complete administrative access, ability to modify system configurations, user data manipulation, and potential system compromise.',
    mitigationSteps: [
      'Immediately patch the admin panel authentication system',
      'Implement multi-factor authentication for admin accounts',
      'Review and strengthen authentication logic',
      'Monitor admin panel access logs',
      'Consider temporarily disabling admin panel access'
    ],
    exploitationHistory: [],
    cvssScore: 9.9,
    references: [
      'https://nvd.nist.gov/vuln/detail/CVE-2024-0008'
    ]
  }
];