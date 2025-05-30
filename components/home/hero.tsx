"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from '@/lib/motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Insurance Simplified with <span className="text-primary">AI</span> Assistance
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Get personalized insurance recommendations, compare plans, and manage your policies—all with the help of our AI companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 relative overflow-hidden group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link href="/needs-analyzer">
                    Get Started
                    <motion.span
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/plans">
                    Compare Plans
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Your Insurance Companion</h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-background/80 rounded-lg p-4 border border-border/50">
                    <h4 className="font-medium mb-2">Health Insurance</h4>
                    <p className="text-sm text-muted-foreground">Recommended based on your age and lifestyle</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium">Premium:</span> 
                      <span className="ml-2 text-primary font-semibold">₹2,499/month</span>
                      <span className="ml-auto text-green-500 font-medium">Best Value</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/80 rounded-lg p-4 border border-border/50">
                    <h4 className="font-medium mb-2">Term Life Insurance</h4>
                    <p className="text-sm text-muted-foreground">1 Cr coverage with critical illness</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium">Premium:</span> 
                      <span className="ml-2 text-primary font-semibold">₹1,250/month</span>
                      <span className="ml-auto text-blue-500 font-medium">Recommended</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
};

export default Hero;