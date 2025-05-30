"use client";

import { motion } from "@/lib/motion";
import { CircleUser, FileText, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <CircleUser className="h-10 w-10 text-blue-600" />,
    title: "Tell Us About You",
    description: "Chat with our AI assistant or use our needs analyzer to share your insurance requirements and preferences.",
    details: [
      "Share basic information",
      "Discuss your needs",
      "Get personalized guidance"
    ]
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    title: "Get Smart Recommendations",
    description: "Our AI analyzes your profile to recommend the most suitable insurance plans with detailed comparisons.",
    details: [
      "AI-powered analysis",
      "Custom plan matching",
      "Side-by-side comparison"
    ]
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
    title: "Easy Documentation",
    description: "Upload required documents easily using our smart document scanner with instant verification.",
    details: [
      "Quick document scan",
      "Auto-form filling",
      "Secure verification"
    ]
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
    title: "Get Insured Instantly",
    description: "Complete your purchase seamlessly with our one-click checkout and receive instant policy confirmation.",
    details: [
      "Simple checkout",
      "Instant activation",
      "Digital policy delivery"
    ]
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">How InsurBuddy Works</h2>
          <p className="text-blue-600/80 text-lg">
            Getting the right insurance coverage has never been easier. Our AI-powered platform guides you through every step.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100 h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm left-1/2 ml-8">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 text-center">{step.title}</h3>
                  <p className="text-blue-600/80 mb-4 text-center">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-blue-600/70 text-sm">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-full z-20">
                    <ArrowRight className="h-8 w-8 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;