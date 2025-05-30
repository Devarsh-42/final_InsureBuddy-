const API_SETU_BASE_URL = "https://api.setu.co/api/v1";
const API_KEY = "your_api_setu_key"; // Replace with actual API key

interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  type: string;
  premium: number;
  coverage: number;
  features: string[];
}

export async function fetchInsurancePlans(type: string): Promise<InsurancePlan[]> {
  try {
    const response = await fetch(`${API_SETU_BASE_URL}/insurance/plans?type=${type}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "x-api-key": API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Setu error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.plans;
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    throw error;
  }
}

export async function getInsuranceQuote(planId: string, userDetails: any): Promise<any> {
  try {
    const response = await fetch(`${API_SETU_BASE_URL}/insurance/quote`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        planId,
        userDetails
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Setu error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting insurance quote:", error);
    throw error;
  }
}