import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "The biggest testament to the quality of Sand Dollar Design's work is how easy it's been for us to work with the developers. The way they structured the design informed the development and made it much easier to build the app. Because we operate in rural areas, we also benefitted a lot from their experience in creating simple designs that would be easy for people to interact with beyond cultural barriers. They were very good at project management, delivering on time and within budget. Their communication was on point and very clear; I was never in doubt about where we were or how the project was going. I was impressed that Sand Dollar Design was as passionate about my project as I am — that really made a difference. They went beyond the call of duty. Working with people this passionate was phenomenal.",
    client: "NGO / Digital Health Client"
  },
  {
    text: "Their work helped ensure a significant boost in page visits and goal completion rates. The existing journeys were simplified for better ease of use, and new journeys were created based on sound design principles. How effective was the workflow between your team and theirs? Very effective and completely seamless. They plugged in from day one and you couldn't tell them apart from one of our permanent designers. They were dedicated and enthusiastic, and didn't shy away from raising valid design concerns - no matter how tense the situation or contentious the opinion.",
    client: "Telco Client"
  },
  {
    text: "What is most impressive about Sand Dollar Design is the way in which they approach the pre-work for a proposed solution. With our two different apps, they egaged on a very detailed level with the users to really understand what they needed, what features would most benefit the business and how the business could best position their brand. The care and understanding that they took to get direction on the above provided us with exceptionally strong initial proposed solutions. The proposed solutions did not just span process and the ensuing screens, it already provided a rich all encompasing experience. They're a highly skilled and professional outfit with a down to earth, open for business demeanor. They are diligent in following up and deliver some extra mile efforts without being asked.",
    client: "Fintec Client"
  }
];

const TestimonialsCarousel = () => {
  return (
    <section id="testimonials" className="section-padding bg-white py-16 md:py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 section-animate">
          <h2 className="section-title font-black from-left">Trusted by Innovators in Fintech, NGOs, and Telco.</h2>
        </div>
        
        <div className="max-w-6xl mx-auto section-animate from-right">
          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 md:p-8 relative">
            <Carousel 
              className="relative" 
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="px-6 md:px-8 py-4">
                    <div className="py-4 px-6 md:px-8">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                        "{testimonial.text}"
                      </p>
                      <p className="font-semibold text-white text-xs md:text-sm">— {testimonial.client}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-20 bg-gradient-to-br from-coral-light to-coral hover:from-coral to-coral-dark border-none text-white" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-20 bg-gradient-to-br from-coral-light to-coral hover:from-coral to-coral-dark border-none text-white" />
            </Carousel>
            
            {/* Clutch Widget in same card */}
            <div className="mt-8 pt-8 border-t border-gray-600">
              <div className="clutch-widget-container">
                <div 
                  className="clutch-widget" 
                  data-url="https://widget.clutch.co" 
                  data-widget-type="2" 
                  data-height="50" 
                  data-darkbg="1" 
                  data-clutchcompany-id="1333314"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
