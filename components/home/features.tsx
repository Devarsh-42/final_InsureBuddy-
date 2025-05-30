"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Calculator, 
  Upload, 
  ListFilter, 
  Wallet, 
  BarChart3, 
  FileCheck, 
  Plug 
} from "lucide-react";
import { motion } from "@/lib/motion";

const features = [
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "AI Chatbot Assistant",
    description: "Get instant answers to insurance queries in natural language with voice and multilingual support."
  },
  {
    icon: <Calculator className="h-6 w-6 text-primary" />,
    title: "Needs Analyzer",
    description: "Calculate optimal coverage based on your age, income, and lifestyle with simplified ELI5 explanations."
  },
  {
    icon: <Upload className="h-6 w-6 text-primary" />,
    title: "Smart Document Upload",
    description: "Snap and upload your ID and medical reports with OCR technology that auto-fills your forms."
  },
  {
    icon: <ListFilter className="h-6 w-6 text-primary" />,
    title: "Plan Comparison",
    description: "Compare personalized insurance plans side-by-side with highlighted benefits and exclusions."
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "One-Click Purchase",
    description: "Seamless checkout with integrated UPI, NetBanking, and digital wallet payment options."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Dynamic Dashboard",
    description: "View personalized risk alerts, renewal reminders, and a comprehensive policy overview."
  },
  {
    icon: <FileCheck className="h-6 w-6 text-primary" />,
    title: "Claim Tracker",
    description: "File claims with AI assistance and receive real-time status updates and document alerts."
  },
  {
    icon: <Plug className="h-6 w-6 text-primary" />,
    title: "Partner Integration",
    description: "Embed InsurBuddy on your platform with our JavaScript widget and RESTful API endpoints."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Insurance Features</h2>
          <p className="text-muted-foreground text-lg">
            InsurBuddy combines artificial intelligence with insurance expertise to make managing your coverage simple and stress-free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 p-2 rounded-full bg-primary/10 inline-block">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;