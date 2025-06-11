"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Edit,
  Trash2,
  Eye,
  Shield,
  ShieldCheck,
  ShieldX,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { SubdomainData, SubdomainSortField, SortDirection } from '@/types/dashboard';
import { format } from 'date-fns';

interface SubdomainsTableProps {
  data: SubdomainData[];
}

const ITEMS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

function getSSLStatusIcon(status: SubdomainData['sslStatus']) {
  switch (status) {
    case 'active':
      return <ShieldCheck className="h-4 w-4 text-green-600" />;
    case 'expired':
      return <ShieldX className="h-4 w-4 text-red-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'inactive':
      return <Shield className="h-4 w-4 text-gray-400" />;
    default:
      return <Shield className="h-4 w-4 text-gray-400" />;
  }
}

function getSSLStatusBadge(status: SubdomainData['sslStatus']) {
  const variants: Record<SubdomainData['sslStatus'], string> = {
    active: 'bg-green-100 text-green-800 hover:bg-green-200',
    expired: 'bg-red-100 text-red-800 hover:bg-red-200',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  };

  return (
    <Badge variant="secondary" className={variants[status]}>
      <div className="flex items-center gap-1">
        {getSSLStatusIcon(status)}
        <span className="capitalize">{status}</span>
      </div>
    </Badge>
  );
}

function getUsageStatusIcon(status: SubdomainData['usageStatus']) {
  switch (status) {
    case 'in-use':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'not-in-use':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'maintenance':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    default:
      return <XCircle className="h-4 w-4 text-gray-400" />;
  }
}

function getUsageStatusBadge(status: SubdomainData['usageStatus']) {
  const variants: Record<SubdomainData['usageStatus'], string> = {
    'in-use': 'bg-green-100 text-green-800 hover:bg-green-200',
    'not-in-use': 'bg-red-100 text-red-800 hover:bg-red-200',
    'maintenance': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
  };

  const labels: Record<SubdomainData['usageStatus'], string> = {
    'in-use': 'In Use',
    'not-in-use': 'Not in Use',
    'maintenance': 'Maintenance'
  };

  return (
    <Badge variant="secondary" className={variants[status]}>
      <div className="flex items-center gap-1">
        {getUsageStatusIcon(status)}
        <span>{labels[status]}</span>
      </div>
    </Badge>
  );
}

export default function SubdomainsTable({ data }: SubdomainsTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<SubdomainSortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleSort = (field: SubdomainSortField): void => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const filteredAndSortedData: SubdomainData[] = useMemo(() => {
    let filtered: SubdomainData[] = data.filter((subdomain) =>
      subdomain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subdomain.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'lastChecked') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
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
  }, [data, searchTerm, sortField, sortDirection]);

  const totalPages: number = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const paginatedData: SubdomainData[] = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const SortButton = ({ field, children }: { field: SubdomainSortField; children: React.ReactNode }) => (
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

  const handleEdit = (subdomain: SubdomainData): void => {
    console.log('Edit subdomain:', subdomain);
    // TODO: Implement edit functionality
  };

  const handleDelete = (subdomain: SubdomainData): void => {
    console.log('Delete subdomain:', subdomain);
    // TODO: Implement delete functionality
  };

  const handleViewDetails = (subdomain: SubdomainData): void => {
    console.log('View details for subdomain:', subdomain);
    // TODO: Implement view details functionality
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subdomains..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        
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
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <SortButton field="name">Subdomain</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="sslStatus">SSL Status</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="usageStatus">Usage Status</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="lastChecked">Last Checked</SortButton>
              </TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? 'No subdomains found matching your search.' : 'No subdomains available.'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((subdomain) => (
                <TableRow key={subdomain.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{subdomain.name}</div>
                      <div className="text-sm text-muted-foreground">{subdomain.url}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSSLStatusBadge(subdomain.sslStatus)}
                  </TableCell>
                  <TableCell>
                    {getUsageStatusBadge(subdomain.usageStatus)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(subdomain.lastChecked), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                        onClick={() => handleViewDetails(subdomain)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-yellow-100"
                        onClick={() => handleEdit(subdomain)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-yellow-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-100"
                        onClick={() => handleDelete(subdomain)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
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
          {searchTerm && ` (filtered from ${data.length} total)`}
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