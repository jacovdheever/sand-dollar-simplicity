import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Route, Rocket, UsersRound, type LucideIcon } from 'lucide-react';

const testimonials = [
  {
    text: "The biggest testament to the quality of Sand Dollar Design's work is how easy it's been for us to work with the developers. The way they structured the design informed the development and made it much easier to build the app. Because we operate in rural areas, we also benefitted a lot from their experience in creating simple designs that would be easy for people to interact with beyond cultural barriers. They were very good at project management, delivering on time and within budget. Their communication was on point and very clear; I was never in doubt about where we were or how the project was going. I was impressed that Sand Dollar Design was as passionate about my project as I am — that really made a difference. They went beyond the call of duty. Working with people this passionate was phenomenal.",
    client: 'NGO / Digital Health Client',
  },
  {
    text: "Their work helped ensure a significant boost in page visits and goal completion rates. The existing journeys were simplified for better ease of use, and new journeys were created based on sound design principles. How effective was the workflow between your team and theirs? Very effective and completely seamless. They plugged in from day one and you couldn't tell them apart from one of our permanent designers. They were dedicated and enthusiastic, and didn't shy away from raising valid design concerns - no matter how tense the situation or contentious the opinion.",
    client: 'Telco Client',
  },
  {
    text: "What is most impressive about Sand Dollar Design is the way in which they approach the pre-work for a proposed solution. With our two different apps, they egaged on a very detailed level with the users to really understand what they needed, what features would most benefit the business and how the business could best position their brand. The care and understanding that they took to get direction on the above provided us with exceptionally strong initial proposed solutions. The proposed solutions did not just span process and the ensuing screens, it already provided a rich all encompasing experience. They're a highly skilled and professional outfit with a down to earth, open for business demeanor. They are diligent in following up and deliver some extra mile efforts without being asked.",
    client: 'Fintec Client',
  },
];

const highlightCards: { body: string; Icon: LucideIcon }[] = [
  {
    Icon: Route,
    body: 'Improved adoption and reduced friction in complex journeys',
  },
  {
    Icon: Rocket,
    body: 'Delivered MVPs quickly with research-led decision making',
  },
  {
    Icon: UsersRound,
    body: 'Strong cross-functional collaboration across design, development and stakeholders',
  },
];

const TestimonialsCarousel = () => {
  return (
    <section id="testimonials" className="section-padding bg-white py-16 md:py-20">
      <div className="container-custom">
        {/* One column: same max width for heading, cards, and carousel (matches black container) */}
        <div className="w-full max-w-6xl mx-auto space-y-10 md:space-y-12">
          <div className="text-center section-animate">
            <h2 className="section-title mb-4 md:mb-6 font-black from-left leading-[1.15]">
              Trusted by teams solving complex digital challenges
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto from-right">
              Clients come to us when digital products need to become clearer, easier to use and better aligned to business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 section-animate">
            {highlightCards.map(({ Icon, body }, index) => (
              <div
                key={body}
                className={`relative flex flex-col items-center text-center ${
                  index % 2 === 0 ? 'from-left' : 'from-right'
                }`}
              >
                <div className="flex justify-center w-full mb-0">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center coral-gradient relative z-10 -mb-8 shadow-md">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.75} />
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl pt-12 pb-6 px-5 shadow-sm w-full flex-1 flex items-center justify-center min-h-[7.5rem]">
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-animate from-right">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 md:p-8 relative">
              <Carousel
                className="relative"
                opts={{
                  align: 'center',
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

              <div className="mt-8 pt-8 border-t border-gray-600">
                <div className="clutch-widget-container">
                  <div
                    className="clutch-widget"
                    data-url="https://widget.clutch.co"
                    data-widget-type="2"
                    data-height="50"
                    data-darkbg="1"
                    data-clutchcompany-id="1333314"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
