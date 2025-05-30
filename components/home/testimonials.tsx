"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "@/lib/motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "InsurBuddy helped me find the perfect health insurance for my family. The AI chatbot explained everything so clearly and the comparison tool saved me hours of research.",
    author: "Priya Sharma",
    title: "Small Business Owner",
    avatar: "PS",
    rating: 5
  },
  {
    quote: "Filing an insurance claim used to be a nightmare. With InsurBuddy, I just chatted with the AI assistant, uploaded a few photos, and everything was handled smoothly.",
    author: "Rahul Mehta",
    title: "IT Professional",
    avatar: "RM",
    rating: 5
  },
  {
    quote: "The needs analyzer gave me insights about my insurance requirements I hadn't even considered. I feel much more secure now with the right coverage.",
    author: "Ananya Patel",
    title: "Healthcare Worker",
    avatar: "AP",
    rating: 4
  },
  {
    quote: "As someone who knows little about insurance, the 'Explain Like I'm 5' feature was a game-changer. Finally understood what I was actually paying for!",
    author: "Vikram Singh",
    title: "Freelance Designer",
    avatar: "VS",
    rating: 5
  },
  {
    quote: "The multilingual support meant my parents could use InsurBuddy in their native language. They're now properly insured for the first time in years.",
    author: "Deepak Khanna",
    title: "Teacher",
    avatar: "DK",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">
            Thousands of users trust InsurBuddy to simplify their insurance journey. Here are some of their stories.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2">
            <Button
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2">
            <Button
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="flex md:hidden justify-center gap-4 mb-8">
            <Button
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="pt-10 pb-10">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5 fill-current",
                                i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        
                        <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-2xl">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div>
                          <cite className="not-italic font-semibold">
                            {testimonial.author}
                          </cite>
                          <p className="text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;