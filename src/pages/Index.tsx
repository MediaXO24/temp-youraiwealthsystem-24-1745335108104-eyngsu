import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import Testimonials from "@/components/Testimonials";
import BenefitsList from "@/components/BenefitsList";
import AvailabilityCounter from "@/components/AvailabilityCounter";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [showCTA, setShowCTA] = useState(false);

  const scrollToVideo = () => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVideoProgress = (currentTime: number) => {
    if (currentTime >= 330 && !showCTA) { // 5:30 minutes = 330 seconds
      setShowCTA(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      {/* Hero Section with Embedded Video */}
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="text-center max-w-4xl mx-auto" ref={videoRef}>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight">
            BREAKING: AI Trading System Makes Average People $1,327 Per Day
          </h1>
          <h2 className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed">
            This Revolutionary AI Tool Automates Your Trading While You Sleep - Even If You Have Zero Experience
          </h2>
          
          <div className="mb-12 transform hover:scale-[1.02] transition-all duration-300">
            <VideoPlayer onVideoProgress={handleVideoProgress} />
          </div>
          
          <p className="text-sm text-purple-600 animate-pulse mb-4">
            *Limited access: Only accepting 100 new users today
          </p>
        </div>
      </div>

      {/* CTA Section - Only shown after 5:30 minutes */}
      {showCTA && (
        <div className="py-16 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <AvailabilityCounter />
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            How Our AI-Powered Trading System Works For You
          </h2>
          <BenefitsList />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Real People, Real Results
          </h2>
          <Testimonials />
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Limited-Time Offer: Claim Your Spot Now
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-600">
            Only accepting 100 new users today. Don't miss your chance to start generating $1,000+ daily with automated AI trading.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={scrollToVideo}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-lg py-6 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-white"
            >
              YES! I WANT FINANCIAL FREEDOM <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 text-center text-gray-500 text-sm border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="mb-6">
            Copyright © {new Date().getFullYear()} AI Trading Pro. All rights reserved.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-gray-500 text-xs leading-relaxed">
            *Disclaimer: Trading involves risk. Results may vary. Past performance is not indicative of future results.
            The income figures stated are our personal results and the results of exceptional participants.
            There is no guarantee you will earn any money using the techniques and ideas in these materials.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
