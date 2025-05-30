"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Heart, 
  Car, 
  Check, 
  X, 
  ArrowLeft, 
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { motion } from '@/lib/motion';
import { useRouter, useSearchParams } from 'next/navigation';

interface AckoInsurancePlan {
  plan_id: string;
  plan_name: string;
  insurer_name: string;
  plan_type: 'health' | 'life' | 'term' | 'motor';
  premium: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  sum_insured: number;
  key_features: string[];
  benefits: string[];
  waiting_period: string;
  claim_settlement_ratio: number;
  network_hospitals?: number;
  tax_benefits: string[];
  policy_term: number;
  rating: number;
  popular?: boolean;
  best_value?: boolean;
}

export default function PlanComparison() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [plans, setPlans] = useState<AckoInsurancePlan[]>([]);

  useEffect(() => {
    // Get plans data from URL params or localStorage
    const plansData = searchParams?.get('plans') ?? '';
    if (plansData) {
      try {
        const decodedPlans = JSON.parse(decodeURIComponent(plansData));
        setPlans(decodedPlans);
      } catch (error) {
        console.error('Error parsing plans data:', error);
        // Fallback to mock data
        setPlans(getMockPlans());
      }
    } else {
      // Fallback to mock data
      setPlans(getMockPlans());
    }
  }, [searchParams]);

  const getMockPlans = (): AckoInsurancePlan[] => [
    {
      plan_id: "acko-health-001",
      plan_name: "Acko Platinum Health",
      insurer_name: "Acko General Insurance",
      plan_type: "health",
      premium: {
        monthly: 2500,
        quarterly: 7200,
        yearly: 28000
      },
      sum_insured: 1000000,
      key_features: [
        "Zero waiting period for accidents",
        "100% digital claims process",
        "Free health checkups",
        "Mental health coverage",
        "Maternity coverage after 2 years",
        "Alternative treatments covered"
      ],
      benefits: [
        "Cashless treatment at 14,000+ hospitals",
        "Ambulance coverage up to ₹2,000",
        "Day care procedures covered",
        "No room rent capping",
        "Pre and post hospitalization: 60-180 days",
        "Annual health checkup included"
      ],
      waiting_period: "2 years for pre-existing diseases",
      claim_settlement_ratio: 98.1,
      network_hospitals: 14000,
      tax_benefits: ["Section 80D benefits up to ₹25,000"],
      policy_term: 1,
      rating: 4.5,
      popular: true
    },
    {
      plan_id: "acko-term-001",
      plan_name: "Acko Life Term Plan",
      insurer_name: "Acko Life Insurance",
      plan_type: "term",
      premium: {
        monthly: 1200,
        quarterly: 3500,
        yearly: 13500
      },
      sum_insured: 5000000,
      key_features: [
        "100% online process",
        "Quick claim settlement",
        "No medical tests up to 50L",
        "Accidental death benefit",
        "Terminal illness coverage",
        "Premium waiver benefit"
      ],
      benefits: [
        "Terminal illness coverage",
        "Premium waiver on disability",
        "Tax savings under 80C & 10(10D)",
        "Flexible premium payment modes",
        "Grace period of 30 days",
        "Policy revival within 2 years"
      ],
      waiting_period: "No waiting period",
      claim_settlement_ratio: 96.8,
      tax_benefits: ["Section 80C & 10(10D) benefits"],
      policy_term: 30,
      rating: 4.7,
      best_value: true
    },
    {
      plan_id: "acko-health-002",
      plan_name: "Acko Essential Health",
      insurer_name: "Acko General Insurance",
      plan_type: "health",
      premium: {
        monthly: 1800,
        quarterly: 5200,
        yearly: 20000
      },
      sum_insured: 500000,
      key_features: [
        "Digital-first experience",
        "No waiting period for accidents",
        "Day care procedures covered",
        "Pre and post hospitalization",
        "Annual health checkup",
        "Teleconsultation included"
      ],
      benefits: [
        "Cashless treatment at 10,000+ hospitals",
        "Ambulance coverage up to ₹1,500",
        "No room rent restrictions",
        "Modern treatments covered",
        "Mental health support",
        "Wellness programs included"
      ],
      waiting_period: "2 years for pre-existing diseases",
      claim_settlement_ratio: 97.5,
      network_hospitals: 10000,
      tax_benefits: ["Section 80D benefits up to ₹25,000"],
      policy_term: 1,
      rating: 4.2
    }
  ];

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'health': return <Heart className="h-5 w-5 text-red-500" />;
      case 'life':
      case 'term': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'motor': return <Car className="h-5 w-5 text-green-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  const handleCompareSelected = () => {
    if (selectedPlans.length < 2) {
      alert('Please select at least 2 plans to compare');
      return;
    }
    setComparisonMode(true);
  };

  const handleBuyNow = (plan: AckoInsurancePlan) => {
    // Redirect to Acko's website or your checkout process
    const buyUrl = `https://www.acko.com/buy/${plan.plan_type}?plan_id=${plan.plan_id}`;
    window.open(buyUrl, '_blank');
  };

  const getSelectedPlansData = () => {
    return plans.filter(plan => selectedPlans.includes(plan.plan_id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (comparisonMode && selectedPlans.length >= 2) {
    const compareData = getSelectedPlansData();
    
    return (
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setComparisonMode(false)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Plans
            </Button>
            <h1 className="text-3xl font-bold">Plan Comparison</h1>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {compareData.map((plan) => (
                  <Card key={plan.plan_id} className="border-2">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-2">
                        {getPlanIcon(plan.plan_type)}
                      </div>
                      <CardTitle className="text-lg">{plan.plan_name}</CardTitle>
                      <CardDescription>{plan.insurer_name}</CardDescription>
                      <div className="flex justify-center items-center gap-2 mt-2">
                        <div className="flex">{renderStars(plan.rating)}</div>
                        <span className="text-sm text-muted-foreground">({plan.rating})</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center border-b pb-4">
                        <div className="text-3xl font-bold text-primary">₹{plan.premium.monthly.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                        <div className="text-sm font-medium">Coverage: ₹{(plan.sum_insured / 100000).toFixed(1)}L</div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {plan.key_features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {plan.benefits.slice(0, 4).map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <Check className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>CSR: {plan.claim_settlement_ratio}%</span>
                        </div>
                        {plan.network_hospitals && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{(plan.network_hospitals / 1000).toFixed(0)}K hospitals</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Term: {plan.policy_term}yr</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          <span>Tax benefits</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => handleBuyNow(plan)}
                      >
                        Buy Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Analysis
            </Button>
            <h1 className="text-3xl font-bold">Insurance Plans</h1>
            <p className="text-muted-foreground">Compare and choose the best plan for your needs</p>
          </div>
          
          {selectedPlans.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {selectedPlans.length} plan{selectedPlans.length > 1 ? 's' : ''} selected
              </span>
              <Button 
                onClick={handleCompareSelected}
                disabled={selectedPlans.length < 2}
              >
                Compare Selected ({selectedPlans.length})
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.plan_id} className="relative hover:shadow-lg transition-shadow">
              {plan.popular && (
                <Badge className="absolute -top-2 left-4 bg-orange-500 hover:bg-orange-600">
                  Most Popular
                </Badge>
              )}
              {plan.best_value && (
                <Badge className="absolute -top-2 right-4 bg-green-500 hover:bg-green-600">
                  Best Value
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedPlans.includes(plan.plan_id)}
                      onCheckedChange={() => handlePlanSelect(plan.plan_id)}
                    />
                    {getPlanIcon(plan.plan_type)}
                    <div>
                      <CardTitle className="text-lg">{plan.plan_name}</CardTitle>
                      <CardDescription>{plan.insurer_name}</CardDescription>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{renderStars(plan.rating)}</div>
                  <span className="text-sm text-muted-foreground">({plan.rating})</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center border rounded-lg p-4 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">₹{plan.premium.monthly.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <div className="text-sm font-medium mt-1">Coverage: ₹{(plan.sum_insured / 100000).toFixed(1)}L</div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {plan.key_features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.key_features.length > 3 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      +{plan.key_features.length - 3} more features
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>CSR: {plan.claim_settlement_ratio}%</span>
                  </div>
                  {plan.network_hospitals && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{(plan.network_hospitals / 1000).toFixed(0)}K hospitals</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Term: {plan.policy_term} year{plan.policy_term > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    <span>Tax benefits</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Show plan details modal or navigate to details page
                      alert(`Viewing details for ${plan.plan_name}`);
                    }}
                  >
                    View Full Details
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => handleBuyNow(plan)}
                  >
                    Buy Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlans.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {selectedPlans.length} plan{selectedPlans.length > 1 ? 's' : ''} selected
              </span>
              <Button 
                onClick={handleCompareSelected}
                disabled={selectedPlans.length < 2}
                size="sm"
              >
                Compare Now
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}