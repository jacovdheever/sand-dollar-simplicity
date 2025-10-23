import React from 'react';
import TestimonialsCarousel from './TestimonialsCarousel';
import { getAssetPath } from '@/lib/utils';

const clientLogos = [
  { name: "Heineken", image: "Client Logo - heineken.png", height: "h-24" },
  { name: "Standard Bank", image: "Client Logo - standard bank.png", height: "h-14" },
  { name: "Pathcare", image: "Client Logo - Pathcare.png", height: "h-14" },
  { name: "Vodafone", image: "Client Logo - Vodafone.png", height: "h-20" },
  { name: "Tradition Bank", image: "Client Logo - Tradition Bank.png", height: "h-26" },
  { name: "Mukuru", image: "Client Logo - Mukuru.png", height: "h-20" },
  { name: "Toyota", image: "Client Logo - Toyota.png", height: "h-20" },
  { name: "North West University", image: "Client Logo - NWU.png", height: "h-20" }
];


const Clients = () => {
  return (
    <>
      <TestimonialsCarousel />
    </>
  );
};

export default Clients;
