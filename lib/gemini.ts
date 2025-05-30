import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getGeminiResponse(prompt: string) {
  const enhancedPrompt = `As a friendly insurance expert, provide a clear response following this EXACT format:

💡 Quick Answer
• Brief 1-2 line summary
• No markdown, just plain text with emojis

🔍 Key Points
• Point 1
• Point 2
• Point 3

💰 Cost & Coverage (if applicable)
• Amount: ₹X
• Duration: X years
• Features: X, Y, Z

🌟 Pro Tips
• Tip 1
• Tip 2

Keep all responses:
1. Focused on insurance topics
2. Use Indian context and ₹
3. No markdown symbols like **, ##, or *
4. Use emojis at start of sections only
5. Use simple bullet points (•)
6. Maximum 3-4 points per section

Here's the user's question:
${prompt}`;

  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: enhancedPrompt }),
  });
  
  if (!res.ok) throw new Error('Failed to get Gemini response');
  const data = await res.json();
  
  // Clean up the response
  let cleanResponse = data.text
    .replace(/\*\*/g, '') // Remove **bold** markdown
    .replace(/##/g, '') // Remove ## headers
    .replace(/\*/g, '•') // Replace * bullets with •
    .trim();
    
  return cleanResponse;
}

export async function analyzeInsuranceNeeds(userInfo: any) {
  const prompt = `As an insurance expert, provide a concise, structured analysis for a person with:
  Age: ${userInfo.age}
  Annual Income: ₹${userInfo.income.toLocaleString()}
  Dependents: ${userInfo.dependents}
  Existing Coverage: ₹${userInfo.existingCoverage.toLocaleString()}
  Pre-existing Conditions: ${userInfo.preExistingConditions ? 'Yes' : 'No'}

  Format your response EXACTLY like this, with emojis and clear sections:

  💰 Recommended Coverage
  • Life Insurance: ₹X
  • Health Insurance: ₹X
  • Critical Illness: ₹X

  📋 Essential Plans
  • Type 1: [specific plan type]
  • Type 2: [specific plan type]
  • Type 3: [specific plan type]

  ⭐ Key Features to Look For
  • Feature 1
  • Feature 2
  • Feature 3

  Keep all recommendations precise, actionable, and based on Indian insurance standards.`;

  return getGeminiResponse(prompt);
}