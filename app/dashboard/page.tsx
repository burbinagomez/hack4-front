"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VulnerabilityTable } from "@/components/dashboard/VulnerabilityTable";
import { VulnerabilitySummary } from "@/components/dashboard/VulnerabilitySummary";
import { VulnerabilityTrends } from "@/components/dashboard/VulnerabilityTrends";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <VulnerabilitySummary />
            <VulnerabilityTable />
          </TabsContent>

          <TabsContent value="domains" className="space-y-4">
            <VulnerabilityTable showAllColumns />
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <VulnerabilityTrends />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}