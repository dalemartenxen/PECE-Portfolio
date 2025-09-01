import { motion } from "framer-motion";
import { LucideIcon, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
}

export default function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      className="card-hover h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardContent className="p-8 flex flex-col h-full">
          <div className="mb-6">
            <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3" data-testid={`text-service-title-${index}`}>
              {title}
            </h3>
            <p className="text-secondary-foreground mb-6" data-testid={`text-service-description-${index}`}>
              {description}
            </p>
          </div>
          
          <ul className="space-y-3 mb-6 flex-grow">
            {features.map((feature, featureIndex) => (
              <li 
                key={featureIndex} 
                className="flex items-center space-x-3"
                data-testid={`feature-${index}-${featureIndex}`}
              >
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            variant="outline" 
            className="w-full border border-border hover:border-primary text-foreground hover:text-primary transition-all duration-300"
            data-testid={`button-service-learn-more-${index}`}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
