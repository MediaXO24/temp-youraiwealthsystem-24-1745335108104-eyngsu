
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Michael T.",
    location: "Chicago, IL",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "I was skeptical at first, but after just 2 weeks using this AI trading system, I've made over $18,500. It's literally changed my life!",
    profession: "Former Truck Driver"
  },
  {
    name: "Sarah J.",
    location: "Phoenix, AZ",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "As a single mom, I never had time to learn trading. This AI tool does everything for me and I'm now making more than at my day job.",
    profession: "Retail Manager"
  },
  {
    name: "David L.",
    location: "Miami, FL",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    quote: "I was living paycheck to paycheck before. Now I'm debt-free and planning my dream vacation thanks to this incredible AI system.",
    profession: "Office Administrator"
  },
  {
    name: "Jennifer K.",
    location: "Seattle, WA",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    quote: "$32,847 in my first month! I never thought making money could be this easy. The AI does all the hard work while I enjoy life.",
    profession: "Nurse"
  }
];

const Testimonials = () => {
  return (
    <Carousel className="max-w-5xl mx-auto">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
            <Card className="bg-white/80 border-purple-200 hover:border-purple-300 transition-all duration-300 backdrop-blur-xl h-full transform hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden mr-4 border-2 border-purple-200">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <p className="italic text-gray-600 flex-grow leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="mt-6 pt-4 border-t border-purple-100">
                  <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{testimonial.profession}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-8">
        <CarouselPrevious className="mr-4 bg-white border-purple-200 hover:bg-purple-50 relative static translate-y-0 left-0" />
        <CarouselNext className="ml-4 bg-white border-purple-200 hover:bg-purple-50 relative static translate-y-0 right-0" />
      </div>
    </Carousel>
  );
};

export default Testimonials;
