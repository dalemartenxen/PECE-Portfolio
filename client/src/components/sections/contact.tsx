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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="john@example.com" 
                              {...field} 
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company" 
                              {...field} 
                              value={field.value || ""}
                              data-testid="input-contact-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interest</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger data-testid="select-contact-service">
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="consultancy">Engineering Consultancy</SelectItem>
                              <SelectItem value="design">Electronics Design</SelectItem>
                              <SelectItem value="sign-seal">Sign & Seal Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={5}
                              placeholder="Tell me about your project requirements, timeline, and any specific challenges you're facing..."
                              className="resize-none"
                              {...field} 
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg text-primary-foreground py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                      disabled={contactMutation.isPending}
                      data-testid="button-contact-submit"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      {info.href ? (
                        <a href={info.href} className="text-secondary-foreground hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-secondary-foreground">{info.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="mailto:contact@electroproeng.com" 
                  className="w-12 h-12 bg-card border border-border hover:border-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  data-testid="link-social-email"
                >
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </a>
                <a 
                  href="https://linkedin.com/in/electroproeng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border hover:border-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  data-testid="link-social-linkedin"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </a>
                <a 
                  href="https://facebook.com/electroproeng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border hover:border-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  data-testid="link-social-facebook"
                >
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Professional Credentials */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 text-primary">Professional Licensing</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" data-testid="license-number">
                    <span>Professional Regulations Commission (PRC):</span>
                    <span className="font-semibold">PE-12345-CA</span>
                  </div>
                  <div className="flex justify-between" data-testid="license-state">
                    <span>License State:</span>
                    <span className="font-semibold">Philippines</span>
                  </div>
                  <div className="flex justify-between" data-testid="license-expiration">
                    <span>Expiration:</span>
                    <span className="font-semibold">Dec 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
