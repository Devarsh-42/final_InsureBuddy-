// import axios from 'axios';

// const API_BASE_URL = 'https://api.policybazaar.com/v1';
// const API_KEY = process.env.NEXT_PUBLIC_POLICYBAZAAR_API_KEY;

// export interface InsuranceQuoteRequest {
//   type: 'health' | 'life';
//   age: number;
//   gender: string;
//   pincode: string;
//   sumInsured: number;
//   members?: {
//     age: number;
//     relation: string;
//   }[];
//   // Life insurance specific
//   smoker?: boolean;
//   annualIncome?: number;
//   occupation?: string;
// }

// export interface InsurancePlan {
//   id: string;
//   name: string;
//   provider: string;
//   type: string;
//   premium: {
//     monthly: number;
//     yearly: number;
//   };
//   coverage: number;
//   features: string[];
//   benefits: string[];
//   exclusions: string[];
//   waitingPeriod?: string;
//   networkHospitals?: number;
//   claimSettlementRatio?: number;
// }

// export async function getInsuranceQuotes(request: InsuranceQuoteRequest): Promise<InsurancePlan[]> {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/quotes/${request.type}`,
//       request,
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     return response.data.plans;
//   } catch (error: any) {
//     console.error('Error fetching insurance quotes:', error);
//     throw new Error(error.response?.data?.message || 'Failed to fetch insurance quotes');
//   }
// }

// export async function getPlanDetails(planId: string): Promise<InsurancePlan> {
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/plans/${planId}`,
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     console.error('Error fetching plan details:', error);
//     throw new Error(error.response?.data?.message || 'Failed to fetch plan details');
//   }
// }

// export async function recommendPlans(userProfile: {
//   age: number;
//   income: number;
//   dependents: number;
//   pincode: string;
//   gender: string;
//   preExistingConditions: boolean;
// }) {
//   try {
//     // Calculate recommended coverage amounts
//     const healthCoverage = Math.min(Math.max(userProfile.income * 0.5, 500000), 2000000);
//     const lifeCoverage = Math.min(userProfile.income * 10, 20000000);

//     // Get health insurance quotes
//     const healthRequest: InsuranceQuoteRequest = {
//       type: 'health',
//       age: userProfile.age,
//       gender: userProfile.gender,
//       pincode: userProfile.pincode,
//       sumInsured: healthCoverage,
//       members: userProfile.dependents > 0 ? [
//         { age: userProfile.age, relation: 'self' },
//         ...Array(userProfile.dependents).fill({ age: 5, relation: 'child' })
//       ] : undefined
//     };

//     // Get life insurance quotes
//     const lifeRequest: InsuranceQuoteRequest = {
//       type: 'life',
//       age: userProfile.age,
//       gender: userProfile.gender,
//       pincode: userProfile.pincode,
//       sumInsured: lifeCoverage,
//       annualIncome: userProfile.income,
//       smoker: false,
//       occupation: 'salaried'
//     };

//     const [healthPlans, lifePlans] = await Promise.all([
//       getInsuranceQuotes(healthRequest),
//       getInsuranceQuotes(lifeRequest)
//     ]);

//     // Filter and sort plans based on user profile
//     const recommendations = {
//       health: healthPlans
//         .filter(plan => plan.premium.monthly <= userProfile.income * 0.1) // Max 10% of monthly income
//         .sort((a, b) => b.claimSettlementRatio! - a.claimSettlementRatio!),
//       life: lifePlans
//         .filter(plan => plan.premium.monthly <= userProfile.income * 0.15) // Max 15% of monthly income
//         .sort((a, b) => b.coverage - a.coverage)
//     };

//     return recommendations;
//   } catch (error) {
//     console.error('Error getting insurance recommendations:', error);
//     throw error;
//   }
// }