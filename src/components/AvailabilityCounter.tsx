import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import CtaForm from "@/components/CtaForm";
import { useIsMobile } from '@/hooks/use-mobile';

const AvailabilityCounter = () => {
  const [showForm, setShowForm] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  const handleCheckAvailability = () => {
    setIsCounting(true);
    const availableCount = Math.floor(Math.random() * 3) + 3;
    const totalSpots = 10;
    
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < totalSpots - availableCount) {
        currentCount++;
        setProgress((currentCount / totalSpots) * 100);
      } else {
        clearInterval(interval);
        setAvailableSpots(availableCount);
        setTimeout(() => setShowForm(true), 1500);
      }
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {!isCounting && !showForm && (
        <div className="relative">
          {isMobile ? (
            <div className="flex justify-center gap-4 mb-6">
              <ArrowDown
                size={64}
                strokeWidth={3}
                className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
              />
            </div>
          ) : (
            <>
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 flex flex-row gap-4 hidden md:flex">
                <ArrowRight
                  size={64}
                  strokeWidth={3}
                  className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 flex flex-row gap-4 hidden md:flex">
                <ArrowLeft
                  size={64}
                  strokeWidth={3}
                  className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                />
              </div>
            </>
          )}
          <Button 
            onClick={handleCheckAvailability}
            size="lg" 
            className="w-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 hover:from-green-500 hover:via-green-600 hover:to-emerald-700 text-lg py-6 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              CHECK IF YOU QUALIFY
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-transparent to-transparent animate-shimmer" />
          </Button>
        </div>
      )}

      {isCounting && !showForm && (
        <Card className="bg-white border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Analyzing Available Spots...
            </h3>
            <Progress value={progress} className="mb-6 bg-gray-200" />
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: 10 }).map((_, index) => {
                const isOccupied = (index + 1) <= (progress / 10);
                const isAvailable = index + 1 > (progress / 10);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center transition-all duration-300 ${
                      isOccupied 
                        ? 'text-red-500 scale-110 animate-pulse' 
                        : isAvailable
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <User 
                      size={24} 
                      className={`${
                        isOccupied 
                          ? 'fill-red-500' 
                          : isAvailable 
                          ? 'fill-green-500' 
                          : ''
                      }`} 
                    />
                  </div>
                );
              })}
            </div>
            {availableSpots > 0 && (
              <p className="mt-6 text-center text-lg animate-fade-in">
                <span className="text-green-600 font-bold text-xl">
                  {availableSpots} spots remaining!
                </span>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {showForm && (
        <div className="animate-fade-in relative">
          {isMobile ? (
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2].map((i) => (
                <ArrowDown
                  key={`down-${i}`}
                  size={64}
                  strokeWidth={3}
                  className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    opacity: 1 - (i * 0.2)
                  }}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="absolute left-0 top-0 h-full -translate-x-full flex flex-col justify-center gap-4 hidden md:flex">
                {[0, 1, 2].map((i) => (
                  <ArrowRight
                    key={`left-${i}`}
                    size={64}
                    strokeWidth={3}
                    className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      opacity: 1 - (i * 0.2)
                    }}
                  />
                ))}
              </div>
              <div className="absolute right-0 top-0 h-full translate-x-full flex flex-col justify-center gap-4 hidden md:flex">
                {[0, 1, 2].map((i) => (
                  <ArrowLeft
                    key={`right-${i}`}
                    size={64}
                    strokeWidth={3}
                    className="text-purple-500 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      opacity: 1 - (i * 0.2)
                    }}
                  />
                ))}
              </div>
            </>
          )}
          <Card className="bg-white border-gray-200 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
                Get Exclusive Access To Our AI Trading Tool Today
              </h3>
              <p className="text-green-600 font-bold text-center mb-4">
                {availableSpots} spots remaining - Act fast!
              </p>
              <CtaForm />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCounter;
