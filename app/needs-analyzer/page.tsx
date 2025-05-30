"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { HelpCircle, Info, ArrowRight, Shield, Heart, Car } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from '@/lib/motion';
import { analyzeInsuranceNeeds } from '@/lib/gemini';
import { useRouter } from 'next/navigation';

// Acko API Integration
interface AckoInsuranceRequest {
  personal_info: {
    age: number;
    gender: string;
    pincode: string;
    annual_income: number;
    occupation: string;
  };
  family_info: {
    dependents: number;
    spouse_age?: number;
    children_count: number;
  };
  health_info: {
    pre_existing_conditions: boolean;
    lifestyle: string;
    bmi?: number;
  };
  coverage_preferences: {
    health_sum_insured: number;
    life_sum_insured: number;
    preferred_premium_range: {
      min: number;
      max: number;
    };
  };
}

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
}

// Mock Acko API functions (replace with actual API calls)
const getAckoInsuranceQuotes = async (request: AckoInsuranceRequest): Promise<AckoInsurancePlan[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on user profile
  const { personal_info, coverage_preferences } = request;
  
  const mockPlans: AckoInsurancePlan[] = [
    {
      plan_id: "acko-health-001",
      plan_name: "Acko Platinum Health",
      insurer_name: "Acko General Insurance",
      plan_type: "health",
      premium: {
        monthly: Math.round(coverage_preferences.health_sum_insured * 0.002),
        quarterly: Math.round(coverage_preferences.health_sum_insured * 0.006),
        yearly: Math.round(coverage_preferences.health_sum_insured * 0.02)
      },
      sum_insured: coverage_preferences.health_sum_insured,
      key_features: [
        "Zero waiting period for accidents",
        "100% digital claims process",
        "Free health checkups",
        "Mental health coverage"
      ],
      benefits: [
        "Cashless treatment at 14,000+ hospitals",
        "Ambulance coverage up to ₹2,000",
        "Day care procedures covered",
        "No room rent capping"
      ],
      waiting_period: "2 years for pre-existing diseases",
      claim_settlement_ratio: 98.1,
      network_hospitals: 14000,
      tax_benefits: ["Section 80D benefits up to ₹25,000"],
      policy_term: 1
    },
    {
      plan_id: "acko-term-001",
      plan_name: "Acko Life Term Plan",
      insurer_name: "Acko Life Insurance",
      plan_type: "term",
      premium: {
        monthly: Math.round(coverage_preferences.life_sum_insured * 0.0005),
        quarterly: Math.round(coverage_preferences.life_sum_insured * 0.0015),
        yearly: Math.round(coverage_preferences.life_sum_insured * 0.005)
      },
      sum_insured: coverage_preferences.life_sum_insured,
      key_features: [
        "100% online process",
        "Quick claim settlement",
        "No medical tests up to 50L",
        "Accidental death benefit"
      ],
      benefits: [
        "Terminal illness coverage",
        "Premium waiver on disability",
        "Tax savings under 80C & 10(10D)",
        "Flexible premium payment modes"
      ],
      waiting_period: "No waiting period",
      claim_settlement_ratio: 96.8,
      tax_benefits: ["Section 80C & 10(10D) benefits"],
      policy_term: 30
    }
  ];

  return mockPlans.filter(plan => 
    plan.premium.monthly >= coverage_preferences.preferred_premium_range.min &&
    plan.premium.monthly <= coverage_preferences.preferred_premium_range.max
  );
};

export default function NeedsAnalyzer() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [pincode, setPincode] = useState('');
  const [dependents, setDependents] = useState('0');
  const [existingCoverage, setExistingCoverage] = useState('no');
  const [existingInsurance, setExistingInsurance] = useState(0);
  const [preExistingConditions, setPreExistingConditions] = useState(false);
  const [occupation, setOccupation] = useState('salaried');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [recommendedPlans, setRecommendedPlans] = useState<AckoInsurancePlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = async () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress(progress + 33);

      if (step === 2) {
        setIsLoading(true);
        try {
          // Calculate recommended coverage amounts
          const healthCoverage = Math.min(Math.max(annualIncome * 0.5, 500000), 2000000);
          const lifeCoverage = Math.min(annualIncome * 10, 20000000);
          const maxPremiumBudget = Math.round(annualIncome * 0.1 / 12); // 10% of annual income per month

          // Prepare Acko API request
          const ackoRequest: AckoInsuranceRequest = {
            personal_info: {
              age: parseInt(age),
              gender: gender,
              pincode: pincode,
              annual_income: annualIncome,
              occupation: occupation
            },
            family_info: {
              dependents: parseInt(dependents),
              children_count: parseInt(dependents)
            },
            health_info: {
              pre_existing_conditions: preExistingConditions,
              lifestyle: 'moderate'
            },
            coverage_preferences: {
              health_sum_insured: healthCoverage,
              life_sum_insured: lifeCoverage,
              preferred_premium_range: {
                min: 1000,
                max: maxPremiumBudget
              }
            }
          };

          // Get recommendations from Acko API
          const ackoPlans = await getAckoInsuranceQuotes(ackoRequest);

          // Get AI analysis
          const aiAnalysis = await analyzeInsuranceNeeds({
            age: parseInt(age),
            income: annualIncome,
            dependents: parseInt(dependents),
            existingCoverage: existingCoverage === 'yes' ? existingInsurance : 0,
            preExistingConditions
          });

          setAiRecommendation(aiAnalysis);
          setRecommendedPlans(ackoPlans);
        } catch (error) {
          console.error('Error getting recommendations:', error);
          // You can add toast notification here
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 33);
    }
  };

  const handleCompareSelected = () => {
    // Navigate to comparison page with plans data
    const plansData = encodeURIComponent(JSON.stringify(recommendedPlans));
    router.push(`/compare-plans?plans=${plansData}`);
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'health': return <Heart className="h-5 w-5 text-red-500" />;
      case 'life':
      case 'term': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'motor': return <Car className="h-5 w-5 text-green-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Insurance Needs Analyzer</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get personalized insurance recommendations from Acko&apos;s comprehensive plans tailored to your specific needs.
          </p>
        </div>

        <Card className="mb-8 border-border/50 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Your Insurance Profile</CardTitle>
            <CardDescription>
              We&apos;ll analyze your profile using Acko&apos;s advanced recommendation engine.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Personal Info</span>
                <span>Financial Details</span>
                <span>AI Recommendations</span>
              </div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="80"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter your pincode"
                    maxLength={6}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Select value={dependents} onValueChange={setDependents}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dependents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No dependents</SelectItem>
                      <SelectItem value="1">1 dependent</SelectItem>
                      <SelectItem value="2">2 dependents</SelectItem>
                      <SelectItem value="3">3 dependents</SelectItem>
                      <SelectItem value="4">4+ dependents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Select value={occupation} onValueChange={setOccupation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried Employee</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="homemaker">Homemaker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="preExistingConditions">Pre-existing Medical Conditions</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>This includes conditions like diabetes, heart disease, hypertension, etc. that may affect your insurance coverage and premium.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="preExistingConditions" 
                      checked={preExistingConditions}
                      onCheckedChange={setPreExistingConditions}
                    />
                    <Label htmlFor="preExistingConditions">
                      {preExistingConditions ? 'Yes' : 'No'}
                    </Label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleNextStep} disabled={!pincode || !age}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                    <span className="text-sm font-medium">₹{annualIncome.toLocaleString()}</span>
                  </div>
                  <Input
                    id="annualIncome"
                    type="number"
                    min={300000}
                    max={10000000}
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(parseInt(e.target.value) || 0)}
                    placeholder="Enter your annual income"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹3L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingCoverage">Do you have existing life/health insurance?</Label>
                  <RadioGroup
                    id="existingCoverage"
                    value={existingCoverage}
                    onValueChange={setExistingCoverage}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="existing-yes" />
                      <Label htmlFor="existing-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="existing-no" />
                      <Label htmlFor="existing-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {existingCoverage === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="existingInsurance">Existing Coverage Amount (₹)</Label>
                    <Input
                      id="existingInsurance"
                      type="number"
                      value={existingInsurance}
                      onChange={(e) => setExistingInsurance(parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} disabled={isLoading}>
                    {isLoading ? 'Getting Acko Quotes...' : 'Get Recommendations'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">AI-Powered Recommendation</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {aiRecommendation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Recommended Acko Plans
                  </h3>
                  
                  {recommendedPlans.length === 0 ? (
                    <Card className="p-6 text-center">
                      <p className="text-muted-foreground">No plans found matching your criteria. Please adjust your preferences.</p>
                    </Card>
                  ) : (
                    recommendedPlans.map((plan) => (
                      <Card key={plan.plan_id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3">
                              {getPlanIcon(plan.plan_type)}
                              <div>
                                <h4 className="font-semibold text-lg">{plan.plan_name}</h4>
                                <p className="text-sm text-muted-foreground">{plan.insurer_name}</p>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mt-1">
                                  {plan.plan_type.charAt(0).toUpperCase() + plan.plan_type.slice(1)} Insurance
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">₹{plan.premium.monthly.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                              <p className="text-sm font-medium mt-1">Coverage: ₹{(plan.sum_insured / 100000).toFixed(1)}L</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="font-medium text-sm mb-2">Key Features</h5>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {plan.key_features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-1">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-2">Benefits</h5>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {plan.benefits.slice(0, 3).map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-1">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            {plan.claim_settlement_ratio && (
                              <span>Claim Settlement: {plan.claim_settlement_ratio}%</span>
                            )}
                            {plan.network_hospitals && (
                              <span>Network: {plan.network_hospitals.toLocaleString()} hospitals</span>
                            )}
                            <span>Term: {plan.policy_term} year{plan.policy_term > 1 ? 's' : ''}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full">
                              View Full Details
                            </Button>
                            <Button 
                              className="w-full"
                              onClick={() => {
                                // Redirect to Acko's website or your checkout process
                                const buyUrl = `https://www.acko.com/buy/${plan.plan_type}?plan_id=${plan.plan_id}`;
                                window.open(buyUrl, '_blank');
                              }}
                            >
                              Buy on Acko
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <div className="pt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleCompareSelected} disabled={recommendedPlans.length === 0}>
                    Compare All Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}