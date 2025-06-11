"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanData } from '@/types/dashboard';
import { format } from 'date-fns';

interface ChartsProps {
  data: ScanData[];
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#3b82f6',
  informational: '#6b7280'
};

const VULNERABILITY_COLORS: string[] = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export default function Charts({ data }: ChartsProps) {
  // Prepare timeline data
  const timelineData = data
    .sort((a, b) => new Date(a.scanDate).getTime() - new Date(b.scanDate).getTime())
    .map((scan) => ({
      date: format(new Date(scan.scanDate), 'MMM dd'),
      subdomains: scan.subdomainsDiscovered,
      vulnerabilities: scan.vulnerabilitiesDetected,
      fullDate: scan.scanDate
    }));

  // Prepare vulnerability types data
  const vulnerabilityTypesMap = new Map<string, number>();
  data.forEach((scan) => {
    scan.vulnerabilityTypes.forEach((vuln) => {
      vulnerabilityTypesMap.set(
        vuln.type,
        (vulnerabilityTypesMap.get(vuln.type) || 0) + vuln.count
      );
    });
  });

  const vulnerabilityTypesData: Array<{ name: string; value: number }> = Array.from(vulnerabilityTypesMap.entries()).map(
    ([type, count]) => ({ name: type, value: count })
  );

  // Prepare severity distribution data
  const severityData: Array<{ severity: string; count: number; color: string }> = Object.entries(
    data.reduce((acc: Record<string, number>, scan) => {
      Object.entries(scan.severityDistribution).forEach(([severity, count]) => {
        acc[severity] = (acc[severity] || 0) + count;
      });
      return acc;
    }, {} as Record<string, number>)
  ).map(([severity, count]) => ({
    severity: severity.charAt(0).toUpperCase() + severity.slice(1),
    count,
    color: SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS]
  }));

  // Calculate risk assessment
  const totalVulns: number = data.reduce((sum, scan) => sum + scan.vulnerabilitiesDetected, 0);
  const totalCritical: number = data.reduce((sum, scan) => sum + scan.severityDistribution.critical, 0);
  const totalHigh: number = data.reduce((sum, scan) => sum + scan.severityDistribution.high, 0);
  const riskScore: number = Math.round(((totalCritical * 10 + totalHigh * 7) / Math.max(totalVulns, 1)) * 10);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Timeline Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Scan Timeline</CardTitle>
          <CardDescription>
            Historical view of subdomains discovered and vulnerabilities detected over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      const fullDate: string = payload[0].payload.fullDate;
                      return format(new Date(fullDate), 'MMM dd, yyyy HH:mm');
                    }
                    return label;
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="subdomains"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Subdomains"
                />
                <Line
                  type="monotone"
                  dataKey="vulnerabilities"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Vulnerabilities"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Vulnerability Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Types</CardTitle>
          <CardDescription>
            Distribution of different vulnerability types across all scans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vulnerabilityTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vulnerabilityTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={VULNERABILITY_COLORS[index % VULNERABILITY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
          <CardDescription>
            Breakdown of vulnerabilities by severity level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Summary */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Security Risk Assessment</CardTitle>
          <CardDescription>
            Overall security posture based on recent scans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{data.length}</div>
              <div className="text-sm text-muted-foreground">Total Scans</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalVulns}</div>
              <div className="text-sm text-muted-foreground">Total Vulnerabilities</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalCritical + totalHigh}</div>
              <div className="text-sm text-muted-foreground">High Risk Issues</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${riskScore > 7 ? 'text-red-600' : riskScore > 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                {riskScore}/10
              </div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}