"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  CalendarIcon,
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Info,
  Target,
  CheckCircle,
  Clock,
  FileText,
  Activity,
  Download,
  Filter,
  X
} from 'lucide-react';
import { VulnerabilityData, VulnerabilitySortField, SortDirection, VulnerabilityFilters, SeverityLevel, VulnerabilityStatus } from '@/types/dashboard';
import { format, isWithinInterval } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

interface VulnerabilitiesTableProps {
  data: VulnerabilityData[];
}

const ITEMS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

function getSeverityIcon(severity: SeverityLevel) {
  switch (severity) {
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'high':
      return <ShieldAlert className="h-4 w-4 text-orange-600" />;
    case 'medium':
      return <Shield className="h-4 w-4 text-yellow-600" />;
    case 'low':
      return <ShieldCheck className="h-4 w-4 text-blue-600" />;
    case 'informational':
      return <Info className="h-4 w-4 text-gray-600" />;
    default:
      return <Shield className="h-4 w-4 text-gray-400" />;
  }
}

function getSeverityBadge(severity: SeverityLevel) {
  const variants: Record<SeverityLevel, string> = {
    critical: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200',
    high: 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200',
    informational: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200'
  };

  return (
    <Badge variant="secondary" className={`${variants[severity]} border`}>
      <div className="flex items-center gap-1">
        {getSeverityIcon(severity)}
        <span className="capitalize font-medium">{severity}</span>
      </div>
    </Badge>
  );
}

function getStatusIcon(status: VulnerabilityStatus) {
  switch (status) {
    case 'open':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'mitigated':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-400" />;
  }
}

function getStatusBadge(status: VulnerabilityStatus) {
  const variants: Record<VulnerabilityStatus, string> = {
    open: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200',
    mitigated: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
  };

  const labels: Record<VulnerabilityStatus, string> = {
    open: 'Open',
    'in-progress': 'In Progress',
    mitigated: 'Mitigated'
  };

  return (
    <Badge variant="secondary" className={`${variants[status]} border`}>
      <div className="flex items-center gap-1">
        {getStatusIcon(status)}
        <span className="font-medium">{labels[status]}</span>
      </div>
    </Badge>
  );
}

function VulnerabilityDetailDialog({ vulnerability }: { vulnerability: VulnerabilityData }) {
  const handleSimulateAttack = (): void => {
    console.log('Simulating attack for:', vulnerability.cveId);
    // TODO: Implement attack simulation
  };

  const handleMitigate = (): void => {
    console.log('Mitigating vulnerability:', vulnerability.cveId);
    // TODO: Implement mitigation
  };

  const handleGenerateReport = (): void => {
    console.log('Generating report for:', vulnerability.cveId);
    // TODO: Implement report generation
  };

  const handleTrackProgress = (): void => {
    console.log('Tracking progress for:', vulnerability.cveId);
    // TODO: Implement progress tracking
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {getSeverityIcon(vulnerability.severity)}
          {vulnerability.cveId} - {vulnerability.title}
        </DialogTitle>
        <DialogDescription>
          Discovered on {format(new Date(vulnerability.discoveryDate), 'MMM dd, yyyy')}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Status and Severity */}
        <div className="flex items-center gap-4">
          {getSeverityBadge(vulnerability.severity)}
          {getStatusBadge(vulnerability.status)}
          {vulnerability.cvssScore && (
            <Badge variant="outline" className="font-mono">
              CVSS: {vulnerability.cvssScore}
            </Badge>
          )}
        </div>

        {/* Full Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{vulnerability.fullDescription}</p>
        </div>

        {/* Affected Systems */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Affected Systems</h3>
          <div className="flex flex-wrap gap-2">
            {vulnerability.affectedSystems.map((system: string, index: number) => (
              <Badge key={index} variant="outline" className="font-mono">
                {system}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm leading-relaxed">{vulnerability.technicalDetails}</p>
          </div>
        </div>

        {/* Potential Impact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Potential Impact</h3>
          <p className="text-muted-foreground leading-relaxed">{vulnerability.potentialImpact}</p>
        </div>

        {/* Mitigation Steps */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Recommended Mitigation Steps</h3>
          <ul className="space-y-2">
            {vulnerability.mitigationSteps.map((step: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exploitation History */}
        {vulnerability.exploitationHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Exploitation History</h3>
            <div className="space-y-2">
              {vulnerability.exploitationHistory.map((event, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Activity className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.date), 'MMM dd, yyyy HH:mm')} - {event.severity} severity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {vulnerability.references && vulnerability.references.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">References</h3>
            <ul className="space-y-1">
              {vulnerability.references.map((ref: string, index: number) => (
                <li key={index}>
                  <a 
                    href={ref} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button onClick={handleSimulateAttack} variant="outline" size="sm">
            <Target className="mr-2 h-4 w-4" />
            Simulate Attack
          </Button>
          <Button onClick={handleMitigate} variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Mitigate
          </Button>
          <Button onClick={handleGenerateReport} variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={handleTrackProgress} variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Track Progress
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function VulnerabilitiesTable({ data }: VulnerabilitiesTableProps) {
  const [filters, setFilters] = useState<VulnerabilityFilters>({
    severity: 'all',
    status: 'all',
    dateRange: { from: undefined, to: undefined },
    searchTerm: ''
  });
  const [sortField, setSortField] = useState<VulnerabilitySortField>('discoveryDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSort = (field: VulnerabilitySortField): void => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: DateRange | undefined): void => {
    setDateRange(range);
    setFilters(prev => ({
      ...prev,
      dateRange: {
        from: range?.from,
        to: range?.to
      }
    }));
    setCurrentPage(1);
  };

  const clearFilters = (): void => {
    setFilters({
      severity: 'all',
      status: 'all',
      dateRange: { from: undefined, to: undefined },
      searchTerm: ''
    });
    setDateRange(undefined);
    setCurrentPage(1);
  };

  const filteredAndSortedData: VulnerabilityData[] = useMemo(() => {
    let filtered: VulnerabilityData[] = data.filter((vulnerability) => {
      // Search filter
      if (filters.searchTerm) {
        const searchLower: string = filters.searchTerm.toLowerCase();
        if (
          !vulnerability.cveId.toLowerCase().includes(searchLower) &&
          !vulnerability.title.toLowerCase().includes(searchLower) &&
          !vulnerability.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Severity filter
      if (filters.severity !== 'all' && vulnerability.severity !== filters.severity) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && vulnerability.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const vulnDate: Date = new Date(vulnerability.discoveryDate);
        if (filters.dateRange.from && filters.dateRange.to) {
          if (!isWithinInterval(vulnDate, {
            start: filters.dateRange.from,
            end: filters.dateRange.to
          })) {
            return false;
          }
        } else if (filters.dateRange.from && vulnDate < filters.dateRange.from) {
          return false;
        } else if (filters.dateRange.to && vulnDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'discoveryDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'severity') {
        const severityOrder: Record<SeverityLevel, number> = { critical: 4, high: 3, medium: 2, low: 1, informational: 0 };
        aValue = severityOrder[aValue as SeverityLevel];
        bValue = severityOrder[bValue as SeverityLevel];
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [data, filters, sortField, sortDirection]);

  const totalPages: number = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const paginatedData: VulnerabilityData[] = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const SortButton = ({ field, children }: { field: VulnerabilitySortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 p-2 font-medium hover:bg-muted"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className={`ml-2 h-3 w-3 ${sortField === field ? 'text-primary' : 'text-muted-foreground'}`} />
    </Button>
  );

  const hasActiveFilters: boolean = filters.severity !== 'all' || filters.status !== 'all' || 
                          filters.dateRange.from !== undefined || filters.dateRange.to !== undefined || filters.searchTerm !== '';

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4 p-4 bg-card rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search CVE ID, title..."
              value={filters.searchTerm}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          {/* Severity Filter */}
          <Select
            value={filters.severity}
            onValueChange={(value: SeverityLevel | 'all') => {
              setFilters(prev => ({ ...prev, severity: value }));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="informational">Informational</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value: VulnerabilityStatus | 'all') => {
              setFilters(prev => ({ ...prev, status: value }));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="mitigated">Mitigated</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value: string) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option: number) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>
        
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">
                <SortButton field="cveId">CVE ID</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="severity">Severity</SortButton>
              </TableHead>
              <TableHead className="min-w-[300px]">
                <SortButton field="title">Title</SortButton>
              </TableHead>
              <TableHead className="w-[150px]">
                <SortButton field="discoveryDate">Discovery Date</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="status">Status</SortButton>
              </TableHead>
              <TableHead className="w-[100px]">
                <SortButton field="cvssScore">CVSS</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {hasActiveFilters ? 'No vulnerabilities found matching your filters.' : 'No vulnerabilities available.'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((vulnerability) => (
                <Dialog key={vulnerability.id}>
                  <DialogTrigger asChild>
                    <TableRow className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-mono text-sm font-medium">
                        {vulnerability.cveId}
                      </TableCell>
                      <TableCell>
                        {getSeverityBadge(vulnerability.severity)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium line-clamp-1">{vulnerability.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {vulnerability.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(vulnerability.discoveryDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(vulnerability.status)}
                      </TableCell>
                      <TableCell>
                        {vulnerability.cvssScore && (
                          <Badge variant="outline" className="font-mono">
                            {vulnerability.cvssScore}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <VulnerabilityDetailDialog vulnerability={vulnerability} />
                </Dialog>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of{' '}
          {filteredAndSortedData.length} entries
          {hasActiveFilters && ` (filtered from ${data.length} total)`}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber: number;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}