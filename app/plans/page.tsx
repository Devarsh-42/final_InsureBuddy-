"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, Info, Star, X, Shield, Heart, Umbrella, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from '@/lib/motion';

const mockPlans = {
  health: [
    {
      id: 'health-1',
      name: 'Essential Care',
      provider: 'HealthGuard',
      premium: 1499,
      coverage: 500000,
      features: [
        { name: 'Hospitalization', included: true },
        { name: 'Pre & Post Hospitalization', included: true },
        { name: 'Daycare Procedures', included: true },
        { name: 'Ambulance Coverage', included: true },
        { name: 'Maternity Benefits', included: false },
        { name: 'Critical Illness', included: false },
        { name: 'No Claim Bonus', included: true },
        { name: 'Alternative Treatments', included: false },
      ],
      exclusions: ['Pre-existing diseases for 36 months', 'Cosmetic treatments', 'Dental treatments unless from accident'],
      waitingPeriod: '30 days',
      bestFor: 'Young professionals',
      rating: 4.1,
    },
    {
      id: 'health-2',
      name: 'Comprehensive Plus',
      provider: 'MaxLife',
      premium: 2499,
      coverage: 1000000,
      features: [
        { name: 'Hospitalization', included: true },
        { name: 'Pre & Post Hospitalization', included: true },
        { name: 'Daycare Procedures', included: true },
        { name: 'Ambulance Coverage', included: true },
        { name: 'Maternity Benefits', included: true },
        { name: 'Critical Illness', included: true },
        { name: 'No Claim Bonus', included: true },
        { name: 'Alternative Treatments', included: true },
      ],
      exclusions: ['Pre-existing diseases for 24 months', 'Self-inflicted injuries', 'Substance abuse treatments'],
      waitingPeriod: '30 days',
      bestFor: 'Families',
      badge: 'Most Popular',
      rating: 4.7,
    },
    {
      id: 'health-3',
      name: 'Premium Shield',
      provider: 'Care Health',
      premium: 3999,
      coverage: 2000000,
      features: [
        { name: 'Hospitalization', included: true },
        { name: 'Pre & Post Hospitalization', included: true },
        { name: 'Daycare Procedures', included: true },
        { name: 'Ambulance Coverage', included: true },
        { name: 'Maternity Benefits', included: true },
        { name: 'Critical Illness', included: true },
        { name: 'No Claim Bonus', included: true },
        { name: 'Alternative Treatments', included: true },
      ],
      exclusions: ['Pre-existing diseases for 12 months', 'Experimental treatments'],
      waitingPeriod: '15 days',
      bestFor: 'Comprehensive coverage seekers',
      rating: 4.5,
    },
  ],
  life: [
    {
      id: 'life-1',
      name: 'Term Shield Basic',
      provider: 'SecureLife',
      premium: 950,
      coverage: 5000000,
      features: [
        { name: 'Death Benefit', included: true },
        { name: 'Terminal Illness Benefit', included: true },
        { name: 'Accidental Death Benefit', included: false },
        { name: 'Critical Illness Cover', included: false },
        { name: 'Disability Benefit', included: false },
        { name: 'Return of Premium', included: false },
        { name: 'Tax Benefits', included: true },
        { name: 'Policy Revival', included: true },
      ],
      exclusions: ['Suicide within 12 months', 'Death due to pre-existing conditions (if not disclosed)'],
      bestFor: 'Basic protection needs',
      rating: 4.0,
    },
    {
      id: 'life-2',
      name: 'Term Shield Plus',
      provider: 'MaxLife',
      premium: 1750,
      coverage: 10000000,
      features: [
        { name: 'Death Benefit', included: true },
        { name: 'Terminal Illness Benefit', included: true },
        { name: 'Accidental Death Benefit', included: true },
        { name: 'Critical Illness Cover', included: true },
        { name: 'Disability Benefit', included: false },
        { name: 'Return of Premium', included: false },
        { name: 'Tax Benefits', included: true },
        { name: 'Policy Revival', included: true },
      ],
      exclusions: ['Suicide within 12 months', 'Death due to hazardous activities'],
      bestFor: 'Comprehensive protection',
      badge: 'Recommended',
      rating: 4.6,
    },
    {
      id: 'life-3',
      name: 'Term Shield Premium',
      provider: 'PrudentInsure',
      premium: 2850,
      coverage: 20000000,
      features: [
        { name: 'Death Benefit', included: true },
        { name: 'Terminal Illness Benefit', included: true },
        { name: 'Accidental Death Benefit', included: true },
        { name: 'Critical Illness Cover', included: true },
        { name: 'Disability Benefit', included: true },
        { name: 'Return of Premium', included: true },
        { name: 'Tax Benefits', included: true },
        { name: 'Policy Revival', included: true },
      ],
      exclusions: ['Suicide within 12 months'],
      bestFor: 'Maximum coverage',
      rating: 4.4,
    },
  ],
};

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState('health');
  const [comparePlans, setComparePlans] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const togglePlanSelection = (planId: string) => {
    setComparePlans((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), planId]; // Remove the oldest selection
        }
        return [...prev, planId];
      }
    });
  };

  const plans = activeTab === 'health' ? mockPlans.health : mockPlans.life;
  const selectedPlans = plans.filter((plan) => comparePlans.includes(plan.id));

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Insurance Plans</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect insurance plan by comparing features, benefits, and prices side by side.
          </p>
        </div>

        {isComparing ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setIsComparing(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Plans
              </Button>
              <h2 className="text-xl font-semibold">Comparing {selectedPlans.length} Plans</h2>
            </div>
            
            <div className="overflow-x-auto">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Features</TableHead>
                    {selectedPlans.map((plan) => (
                      <TableHead key={plan.id} className="text-center min-w-[220px]">
                        <div className="font-bold text-lg">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.provider}</div>
                        {plan.badge && (
                          <Badge className="mt-1 bg-primary">{plan.badge}</Badge>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Premium</TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-premium`} className="text-center">
                        <div className="text-xl font-bold text-primary">₹{plan.premium}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coverage Amount</TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-coverage`} className="text-center">
                        <div className="font-semibold">₹{(plan.coverage).toLocaleString()}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">User Rating</TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-rating`} className="text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span>{plan.rating}/5</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Best For</TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-bestfor`} className="text-center">
                        {plan.bestFor}
                      </TableCell>
                    ))}
                  </TableRow>
                  {activeTab === 'health' && (
                    <TableRow>
                      <TableCell className="font-medium">Waiting Period</TableCell>
                      {selectedPlans.map((plan: any) => (
                        <TableCell key={`${plan.id}-waiting`} className="text-center">
                          {plan.waitingPeriod}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}
                  
                  {/* Features */}
                  {selectedPlans[0]?.features.map((feature, index) => (
                    <TableRow key={`feature-${index}`}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      {selectedPlans.map((plan) => (
                        <TableCell key={`${plan.id}-feature-${index}`} className="text-center">
                          {plan.features[index].included ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-destructive" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  
                  {/* Exclusions */}
                  <TableRow>
                    <TableCell className="font-medium">Key Exclusions</TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-exclusions`} className="text-center">
                        <ul className="list-disc text-sm text-muted-foreground text-left ml-4">
                          {plan.exclusions.map((exclusion, i) => (
                            <li key={i}>{exclusion}</li>
                          ))}
                        </ul>
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Action buttons */}
                  <TableRow>
                    <TableCell className="font-medium"></TableCell>
                    {selectedPlans.map((plan) => (
                      <TableCell key={`${plan.id}-action`} className="text-center">
                        <Button className="w-full">
                          Select Plan
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="health">
                    <Heart className="h-4 w-4 mr-2" />
                    Health Insurance
                  </TabsTrigger>
                  <TabsTrigger value="life">
                    <Shield className="h-4 w-4 mr-2" />
                    Life Insurance
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                disabled={comparePlans.length < 2} 
                onClick={() => setIsComparing(true)}
              >
                Compare Selected ({comparePlans.length}/3)
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`h-full border border-border/50 relative ${comparePlans.includes(plan.id) ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                    {plan.badge && (
                      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <Badge className="bg-primary">{plan.badge}</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <CardDescription>{plan.provider}</CardDescription>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span className="font-medium">{plan.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm text-muted-foreground">Monthly Premium</span>
                          <div className="text-2xl font-bold text-primary">₹{plan.premium}</div>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-muted-foreground">Coverage</span>
                          <div className="font-semibold">₹{(plan.coverage).toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Umbrella className="h-4 w-4 mr-1" /> Key Features
                        </h4>
                        <ul className="space-y-1.5">
                          {plan.features.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start text-sm">
                              {feature.included ? (
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              )}
                              <span>{feature.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-1" /> Key Exclusions
                        </h4>
                        <ul className="list-disc text-sm text-muted-foreground ml-5 space-y-1">
                          {plan.exclusions.map((exclusion, i) => (
                            <li key={i}>{exclusion}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center text-primary underline cursor-help">
                              <Info className="h-3.5 w-3.5 mr-1" /> 
                              View all details
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-sm">
                              <p>Click to see full plan details, including all covered benefits, exclusions, and terms.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3 pt-2">
                      <Button 
                        variant={comparePlans.includes(plan.id) ? "outline" : "secondary"}
                        className="w-full"
                        onClick={() => togglePlanSelection(plan.id)}
                      >
                        {comparePlans.includes(plan.id) ? 'Remove from Compare' : 'Add to Compare'}
                      </Button>
                      <Button className="w-full">
                        Select Plan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}