"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "@/lib/motion";

const faqs = [
  {
    question: "How does the AI-powered chatbot understand my insurance needs?",
    answer: "Our chatbot uses advanced natural language processing to understand your queries, preferences, and requirements. It's trained on thousands of insurance policies, regulations, and customer conversations to provide accurate, personalized advice."
  },
  {
    question: "Is my personal and financial information secure?",
    answer: "Yes, we take data security very seriously. We use bank-grade encryption for all data transmission and storage. Your information is never shared with third parties without your explicit consent, and we comply with all relevant data protection regulations."
  },
  {
    question: "How accurate is the needs analyzer for calculating coverage requirements?",
    answer: "Our needs analyzer is highly accurate as it considers multiple factors including your age, income, family situation, assets, liabilities, and lifestyle. It uses actuarial models and machine learning algorithms that are regularly updated with the latest insurance data and trends."
  },
  {
    question: "Can I use InsurBuddy for all types of insurance?",
    answer: "Yes, InsurBuddy supports various insurance types including health, life, auto, home, travel, and business insurance. Our platform is continuously expanding to include more specialized insurance categories."
  },
  {
    question: "How does the document upload feature work?",
    answer: "Our document uploader uses OCR (Optical Character Recognition) and computer vision technology to extract information from your uploaded documents. Simply take a photo of your ID, medical reports, or other documents, and our system will automatically extract the relevant data to fill out forms and verify your identity."
  },
  {
    question: "What payment methods are supported for purchasing insurance?",
    answer: "We support various payment methods including credit/debit cards, UPI, net banking, and digital wallets like Paytm, Google Pay, and PhonePe. All transactions are secure and processed through PCI-DSS compliant payment gateways."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about InsurBuddy and our services.
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">
              Didn't find what you're looking for?
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;