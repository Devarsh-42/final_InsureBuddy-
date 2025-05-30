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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { HelpCircle, Info, Lightbulb, ArrowRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from '@/lib/motion';
import { analyzeInsuranceNeeds } from '@/lib/gemini';
import { fetchInsurancePlans } from '@/lib/api-setu';

export default function NeedsAnalyzer() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [age, setAge] = useState('30');
  const [dependents, setDependents] = useState('0');
  const [existingCoverage, setExistingCoverage] = useState('no');
  const [existingInsurance, setExistingInsurance] = useState(0);
  const [activeTab, setActiveTab] = useState('standard');
  const [preExistingConditions, setPreExistingConditions] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [recommendedPlans, setRecommendedPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = async () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress(progress + 25);

      if (step === 2) {
        setIsLoading(true);
        try {
          // Get AI recommendation
          const userInfo = {
            age: parseInt(age),
            income: annualIncome,
            dependents: parseInt(dependents),
            existingCoverage: existingCoverage === 'yes' ? existingInsurance : 0,
            preExistingConditions
          };

          const recommendation = await analyzeInsuranceNeeds(userInfo);
          setAiRecommendation(recommendation);

          // Fetch matching plans
          const plans = await fetchInsurancePlans('health');
          setRecommendedPlans(plans);
        } catch (error) {
          console.error('Error getting recommendations:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 25);
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
            Answer a few questions to get a personalized insurance recommendation tailored to your specific situation.
          </p>
        </div>

        <Card className="mb-8 border-border/50 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Your Insurance Profile</CardTitle>
            <CardDescription>
              We&apos;ll analyze your personal and financial situation to recommend the right coverage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Personal Info</span>
                <span>Financial Details</span>
                <span>Results</span>
              </div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="age">Age</Label>
                    <span className="text-sm font-medium">{age} years</span>
                  </div>
                  <Input
                    id="age"
                    type="text"
                    value={age}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseInt(value) >= 18 && parseInt(value) <= 80)) {
                        setAge(value);
                      }
                    }}
                    placeholder="Enter your age (18-80)"
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
                  <Button onClick={handleNextStep}>
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
                    max={5000000}
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(parseInt(e.target.value) || 0)}
                    placeholder="Enter your annual income"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹3L</span>
                    <span>₹50L</span>
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
                    {isLoading ? 'Analyzing...' : 'See Results'}
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
                      <h3 className="font-semibold mb-1">AI Recommendation</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {aiRecommendation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recommended Plans</h3>
                  {recommendedPlans.map((plan: any) => (
                    <Card key={plan.id} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{plan.name}</h4>
                            <p className="text-sm text-muted-foreground">{plan.provider}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{plan.premium}/month</p>
                            <p className="text-sm text-muted-foreground">Coverage: ₹{plan.coverage}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                  <Button>
                    Compare Selected Plans
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