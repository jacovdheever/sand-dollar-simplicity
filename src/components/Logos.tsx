import React from 'react';
import { getAssetPath } from '@/lib/utils';

const clientLogos = [
  { name: "Heineken", image: "Client Logo - heineken.png" },
  { name: "Standard Bank", image: "Client Logo - standard bank.png" },
  { name: "Pathcare", image: "Client Logo - Pathcare.png" },
  { name: "Vodafone", image: "Client Logo - Vodafone.png" },
  { name: "Tradition Bank", image: "Client Logo - Tradition Bank.png" },
  { name: "Mukuru", image: "Client Logo - Mukuru.png" },
  { name: "Toyota", image: "Client Logo - Toyota.png" },
  { name: "North West University", image: "Client Logo - NWU.png" }
];

const Logos = () => {
  return (
    <section style={{marginTop: '0 !important', marginBottom: '0 !important', paddingTop: '0 !important', paddingBottom: '0 !important', backgroundColor: '#f9fafb'}}>
      <div style={{backgroundColor: '#f9fafb', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '30px 0'}}>
      <div style={{overflow: 'hidden', width: '100%'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '4.375rem', width: 'max-content', animation: 'clients-scroll 28s linear infinite'}}>
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div key={`logo-${index}`} className="logo-wrapper" style={{padding: '8px'}}>
              <div style={{height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img
                  src={getAssetPath(client.image)}
                  alt={client.name}
                  style={{height: '100%', width: 'auto', objectFit: 'contain'}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Logos;
