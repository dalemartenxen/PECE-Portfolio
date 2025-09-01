import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message || "Thank you for your message! I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sddgmes@gmail.com",
      subtitle: "Response within 24 hours",
      href: "mailto:sddgmes@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(+63) 915 133 2084",
      subtitle: "Mon-Fri, 9 AM - 6 PM EST",
      href: "tel:+639151332084"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Region 2 (Cagayan Valley)",
      subtitle: "Remote consultation available",
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-contact-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto" data-testid="text-contact-description">
            Ready to discuss your electronics engineering project? Let's connect and explore how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-8">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex flex-col items-center text-center" data-testid={`contact-info-${index}`}>
                    <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-4">
                      <info.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{info.title}</h4>
                    {info.href ? (
                      <a href={info.href} className="text-secondary-foreground hover:text-primary transition-colors text-base font-medium">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-secondary-foreground text-base font-medium">{info.value}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{info.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
