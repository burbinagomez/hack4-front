"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Star } from 'lucide-react';
import { Feature } from '@/types/pricing';

interface FeatureComparisonTableProps {
  features: Feature[];
}

const renderFeatureValue = (value: boolean | string) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-green-600 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-red-400 mx-auto" />
    );
  }
  return (
    <span className="text-sm font-medium text-center block">
      {value}
    </span>
  );
};

export default function FeatureComparisonTable({ features }: FeatureComparisonTableProps) {
  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Feature Comparison</CardTitle>
        <CardDescription>
          Compare all features across our pricing plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="w-[300px] font-semibold text-foreground">
                  Features
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground">
                  Basic
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground relative">
                  <div className="flex items-center justify-center gap-2">
                    Professional
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground">
                  Enterprise
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                <>
                  <TableRow key={category} className="bg-muted/30">
                    <TableCell 
                      colSpan={4} 
                      className="font-semibold text-foreground py-3 text-sm uppercase tracking-wide"
                    >
                      {category}
                    </TableCell>
                  </TableRow>
                  {categoryFeatures.map((feature, index) => (
                    <TableRow 
                      key={`${category}-${index}`}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="font-medium py-4">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(feature.basic)}
                      </TableCell>
                      <TableCell className="text-center py-4 bg-primary/5">
                        {renderFeatureValue(feature.professional)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(feature.enterprise)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}