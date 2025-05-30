"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  Calendar, 
  FileText, 
  Heart, 
  ShieldAlert, 
  ShieldCheck, 
  Umbrella, 
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  FileCheck,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from '@/lib/motion';

// Mock data
const areaData = [
  { month: 'Jan', premium: 2500 },
  { month: 'Feb', premium: 2500 },
  { month: 'Mar', premium: 2500 },
  { month: 'Apr', premium: 3000 },
  { month: 'May', premium: 3000 },
  { month: 'Jun', premium: 3000 },
  { month: 'Jul', premium: 3000 },
  { month: 'Aug', premium: 3000 },
  { month: 'Sep', premium: 3500 },
  { month: 'Oct', premium: 3500 },
  { month: 'Nov', premium: 3500 },
  { month: 'Dec', premium: 3500 },
];

const pieData = [
  { name: 'Health', value: 55 },
  { name: 'Life', value: 30 },
  { name: 'Home', value: 15 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const policies = [
  {
    id: 'POL123456',
    name: 'Comprehensive Health Insurance',
    type: 'health',
    premium: 2999,
    frequency: 'monthly',
    coverage: 1000000,
    renewalDate: '2025-03-15',
    status: 'active',
    provider: 'MaxLife Insurance'
  },
  {
    id: 'POL789012',
    name: 'Term Life Insurance',
    type: 'life',
    premium: 1750,
    frequency: 'monthly',
    coverage: 10000000,
    renewalDate: '2045-05-22',
    status: 'active',
    provider: 'Prudent Life'
  },
  {
    id: 'POL345678',
    name: 'Home Insurance',
    type: 'home',
    premium: 8450,
    frequency: 'yearly',
    coverage: 5000000,
    renewalDate: '2024-11-10',
    status: 'renewal-due',
    provider: 'SafeHouse Insurance'
  }
];

const alerts = [
  {
    id: 1,
    type: 'renewal',
    title: 'Home Insurance Renewal Due',
    message: 'Your home insurance policy will expire in 30 days. Renew now to maintain coverage.',
    date: '2024-10-10',
    priority: 'high'
  },
  {
    id: 2,
    type: 'health',
    title: 'Seasonal Health Alert',
    message: 'Flu season approaches. Consider getting vaccinated to avoid potential health issues.',
    date: '2024-09-05',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'claim',
    title: 'Claim Update Available',
    message: 'Your recent health insurance claim has been approved. Payment will be processed within 7 days.',
    date: '2024-08-22',
    priority: 'low'
  }
];

const claims = [
  {
    id: 'CLM001',
    policyId: 'POL123456',
    amount: 95000,
    status: 'approved',
    description: 'Hospital admission for appendectomy',
    date: '2023-12-18'
  },
  {
    id: 'CLM002',
    policyId: 'POL123456',
    amount: 12000,
    status: 'processing',
    description: 'Annual health checkup',
    date: '2024-02-16'
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getPolicyIcon = (type: string) => {
    switch(type) {
      case 'health': return <Heart className="h-5 w-5 text-chart-1" />;
      case 'life': return <ShieldCheck className="h-5 w-5 text-chart-2" />;
      case 'home': return <Umbrella className="h-5 w-5 text-chart-3" />;
      default: return <ShieldCheck className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': 
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'renewal-due': 
        return <Badge className="bg-yellow-500 text-white">Renewal Due</Badge>;
      case 'expired': 
        return <Badge className="bg-red-500 text-white">Expired</Badge>;
      default: 
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'renewal': return <Calendar className="h-5 w-5 text-primary" />;
      case 'health': return <Heart className="h-5 w-5 text-chart-1" />;
      case 'claim': return <FileCheck className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getClaimStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const totalPremium = policies.reduce((sum, policy) => {
    return policy.frequency === 'monthly' 
      ? sum + policy.premium 
      : sum + (policy.premium / 12);
  }, 0);

  const totalCoverage = policies.reduce((sum, policy) => sum + policy.coverage, 0);
  
  const renewalsSoon = policies.filter(policy => {
    const renewalDate = new Date(policy.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90;
  }).length;

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Your Insurance Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your policies, track claims, and stay updated on important insurance matters.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              View All Policies
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Tips</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{Math.round(totalPremium).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next payment on {new Date().getDate() + 10} {new Date().toLocaleString('default', { month: 'short' })}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(totalCoverage / 10000000).toFixed(2)} Cr</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across {policies.length} active policies
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Renewals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{renewalsSoon}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {renewalsSoon > 0 ? `Policies to renew in the next 90 days` : 'No renewals due soon'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Premium Trends</CardTitle>
                  <CardDescription>Your premium payments over the last 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={areaData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis 
                          dataKey="month"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip 
                          formatter={(value: any) => [`₹${value}`, 'Premium']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="premium" 
                          stroke="hsl(var(--chart-1))" 
                          fill="hsl(var(--chart-1))" 
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Distribution</CardTitle>
                  <CardDescription>Breakdown by insurance type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="75%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => [`${value}%`, '']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="flex justify-center gap-4 mt-2">
                      {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-xs">{entry.name} ({entry.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    <span>Recent Claims</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/claims" className="text-xs h-auto py-1 px-2">
                        View All 
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {claims.map((claim) => (
                    <div 
                      key={claim.id} 
                      className="flex items-center justify-between py-3 border-b last:border-0 border-border"
                    >
                      <div className="flex items-start gap-3">
                        {getClaimStatusIcon(claim.status)}
                        <div>
                          <p className="font-medium text-sm">{claim.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(claim.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{claim.amount.toLocaleString()}</p>
                        <Badge variant={
                          claim.status === 'approved' ? 'default' : 
                          claim.status === 'processing' ? 'outline' : 
                          'destructive'
                        }>
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    <span>Risk Alerts</span>
                    <Button variant="ghost" size="sm" className="text-xs h-auto py-1 px-2">
                      Settings
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className="flex gap-3 py-3 border-b last:border-0 border-border"
                    >
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm flex items-center gap-2">
                          {alert.title}
                          <span className={`text-xs ${getPriorityColor(alert.priority)}`}>
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.message}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Policies Tab */}
          <TabsContent value="policies">
            <div className="grid grid-cols-1 gap-6">
              {policies.map((policy) => (
                <Card key={policy.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {getPolicyIcon(policy.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{policy.name}</h3>
                          <p className="text-sm text-muted-foreground">{policy.provider}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Policy #{policy.id}</span>
                            {getStatusBadge(policy.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4 md:mt-0">
                        <div>
                          <p className="text-xs text-muted-foreground">Premium</p>
                          <p className="font-medium">₹{policy.premium.toLocaleString()} / {policy.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Coverage</p>
                          <p className="font-medium">₹{(policy.coverage / 100000).toLocaleString()} Lakh</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Renewal Date</p>
                          <p className="font-medium">{new Date(policy.renewalDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-end">
                          <Button className="w-full md:w-auto">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center py-6">
                    <ShieldAlert className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Need More Coverage?</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Our AI can analyze your current coverage and recommend additional protection based on your lifestyle and needs.
                    </p>
                    <Button>
                      Get Personalized Recommendations
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Claims Tab */}
          <TabsContent value="claims">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Claims Summary</CardTitle>
                  <CardDescription>Overview of your insurance claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Approved Claims</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Processing Claims</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Rejected Claims</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full" asChild>
                        <Link href="/claims">
                          File a New Claim
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Claims</CardTitle>
                  <CardDescription>Your most recent insurance claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {claims.map((claim) => (
                      <div 
                        key={claim.id} 
                        className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex gap-3">
                          {getClaimStatusIcon(claim.status)}
                          <div>
                            <p className="font-medium">{claim.description}</p>
                            <p className="text-xs text-muted-foreground">Claim #{claim.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{claim.amount.toLocaleString()}</p>
                          <Badge variant={
                            claim.status === 'approved' ? 'default' : 
                            claim.status === 'processing' ? 'outline' : 
                            'destructive'
                          } className="mt-1">
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/claims">
                        View All Claims History
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Track Ongoing Claims</CardTitle>
                <CardDescription>Monitor the status of your in-progress claims</CardDescription>
              </CardHeader>
              <CardContent>
                {claims.filter(claim => claim.status === 'processing').length > 0 ? (
                  <div className="space-y-6">
                    {claims.filter(claim => claim.status === 'processing').map((claim) => (
                      <div key={claim.id}>
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{claim.description}</h3>
                            <p className="text-sm text-muted-foreground">Claim #{claim.id}</p>
                          </div>
                          <Button size="sm">
                            Track Details
                          </Button>
                        </div>
                        
                        <div className="space-y-1 mb-2">
                          <div className="flex justify-between text-sm">
                            <span>Claim Filed</span>
                            <span>Under Review</span>
                            <span>Processing</span>
                            <span>Settlement</span>
                          </div>
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                              <div 
                                style={{ width: "50%" }} 
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Submitted {new Date(claim.date).toLocaleDateString()}</span>
                              <span>Expected completion in 5-7 days</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border p-3 rounded-md bg-muted/30 mt-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Additional Documents Required</p>
                              <p className="text-sm text-muted-foreground">
                                Please upload the following documents to process your claim faster:
                              </p>
                              <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                                <li>Original hospital discharge summary</li>
                                <li>Itemized hospital bills with payment receipts</li>
                              </ul>
                              <Button size="sm" className="mt-3">Upload Documents</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-1">No Active Claims</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any claims in progress at the moment.
                    </p>
                    <Button asChild>
                      <Link href="/claims">File a New Claim</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Important Alerts & Notifications</CardTitle>
                  <CardDescription>Stay informed about your insurance policies and health risks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`border-l-4 pl-4 py-2 ${
                          alert.priority === 'high' ? 'border-red-500' : 
                          alert.priority === 'medium' ? 'border-amber-500' : 
                          'border-green-500'
                        }`}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold flex items-center gap-2">
                            {getAlertIcon(alert.type)}
                            {alert.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                          </Badge>
                        </div>
                        <p className="mt-2 text-muted-foreground">{alert.message}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString()}
                          </span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Dismiss</Button>
                            <Button size="sm">Take Action</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Health Tips</CardTitle>
                    <CardDescription>AI-powered health recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm">Monsoon Health Alert</h3>
                          <p className="text-sm text-muted-foreground">
                            Increased risk of viral infections during the rainy season. Consider these preventive measures:
                          </p>
                          <ul className="text-sm list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                            <li>Avoid standing water</li>
                            <li>Keep surroundings clean</li>
                            <li>Drink boiled or purified water</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm">Vaccination Reminder</h3>
                          <p className="text-sm text-muted-foreground">
                            Seasonal flu vaccines are now available. Your health insurance covers preventive vaccinations.
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        View All Health Tips
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Recommendations</CardTitle>
                    <CardDescription>Based on your profile and needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Critical Illness Coverage</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your age and family history, we recommend adding critical illness coverage to your existing health policy.
                        </p>
                        <Button size="sm">Explore Options</Button>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Home Insurance Update</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your current home insurance is due for renewal soon. We've found better options with more coverage at similar rates.
                        </p>
                        <Button size="sm">Compare Plans</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}