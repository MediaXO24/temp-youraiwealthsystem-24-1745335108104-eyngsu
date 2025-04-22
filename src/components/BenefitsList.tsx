
import { Card, CardContent } from "@/components/ui/card";
import { Bot, TrendingUp, Check, Shield, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Bot,
    title: "AI-Powered Trading",
    description: "Our advanced AI algorithms analyze thousands of market data points in real-time to identify the most profitable trading opportunities."
  },
  {
    icon: TrendingUp,
    title: "Consistent Profits",
    description: "Users report earning an average of $1,327 per day with our automated system that works 24/7, even when you're sleeping."
  },
  {
    icon: Check,
    title: "Zero Experience Required",
    description: "No prior trading knowledge needed. Our system does all the work for you, from market analysis to executing trades at the perfect moment."
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Built-in safeguards and stop-loss mechanisms protect your capital during volatile market conditions."
  },
  {
    icon: DollarSign,
    title: "Fast Withdrawals",
    description: "Access your profits anytime with our easy withdrawal system. From the platform to your bank account in as little as 24 hours."
  }
];

const BenefitsList = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {benefits.slice(0, 3).map((benefit, index) => (
          <Card 
            key={index} 
            className="w-full bg-white/80 border-blue-200 hover:border-blue-300 transition-all duration-300 backdrop-blur-xl transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <CardContent className="p-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform">
                <benefit.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Second row with 2 cards, centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
        {benefits.slice(3, 5).map((benefit, index) => (
          <Card 
            key={index + 3} 
            className="w-full bg-white/80 border-blue-200 hover:border-blue-300 transition-all duration-300 backdrop-blur-xl transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <CardContent className="p-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform">
                <benefit.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenefitsList;
