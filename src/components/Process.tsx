
import React from 'react';

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We start by deeply understanding your business, users, and goals to establish a solid foundation."
  },
  {
    number: "02",
    title: "Design",
    description: "Our iterative design process transforms insights into intuitive interfaces and compelling visuals."
  },
  {
    number: "03",
    title: "Develop",
    description: "We bring designs to life with clean, efficient code that performs flawlessly across devices."
  },
  {
    number: "04",
    title: "Deliver",
    description: "We launch your solution and provide ongoing support to ensure lasting success."
  }
];

const Process = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title mb-6">Our <span className="gradient-text">process</span></h2>
          <p className="text-gray-600">
            A thoughtful, collaborative approach that transforms ideas into impactful digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 border border-gray-100 rounded-2xl hover:shadow-md transition-all group"
            >
              <div className="absolute -top-4 left-8 bg-white px-2 py-1">
                <span className="gradient-text font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-4 group-hover:text-coral transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
