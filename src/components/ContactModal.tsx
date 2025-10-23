import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  useEffect(() => {
    // Load ConvertKit script
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const formOptions = {
    settings: {
      after_subscribe: {
        action: "message",
        success_message: "Thank you for contacting us. We'll get back to you as soon as we can!",
        redirect_url: ""
      },
      analytics: {
        google: null,
        fathom: null,
        facebook: null,
        segment: null,
        pinterest: null,
        sparkloop: null,
        googletagmanager: null
      },
      modal: {
        trigger: "timer",
        scroll_percentage: null,
        timer: 5,
        devices: "all",
        show_once_every: 15
      },
      powered_by: {
        show: false,
        url: "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
      },
      recaptcha: {
        enabled: false
      },
      return_visitor: {
        action: "show",
        custom_content: ""
      },
      slide_in: {
        display_in: "bottom_right",
        trigger: "timer",
        scroll_percentage: null,
        timer: 5,
        devices: "all",
        show_once_every: 15
      },
      sticky_bar: {
        display_in: "top",
        trigger: "timer",
        scroll_percentage: null,
        timer: 5,
        devices: "all",
        show_once_every: 15
      }
    },
    version: "5"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-8">
        <form 
          action="https://app.kit.com/forms/7923166/subscriptions" 
          className="seva-form formkit-form flex flex-col items-center" 
          method="post" 
          data-sv-form="7923166" 
          data-uid="558420b846" 
          data-format="modal" 
          data-version="5" 
          data-options={JSON.stringify(formOptions)}
          min-width="400 500 600 700 800"
          style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '4px' }}
        >
          <div data-style="full" className="w-full max-w-md">
            <div data-element="column" className="formkit-background" style={{ backgroundImage: 'url("https://embed.filekitcdn.com/e/ih2NqreJSswp9H4wkp8QEK/3Xb55GnDBhHic84CqBJWoG")' }}></div>
            <div data-element="column" className="formkit-column flex flex-col items-center">
              <div className="formkit-header" data-element="header" style={{ color: 'rgb(83, 83, 83)', fontSize: '28px', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                <h2 className="font-special text-3xl" style={{color: '#19191a'}}>Get in touch</h2>
              </div>
              <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
              <div data-element="fields" className="seva-fields formkit-fields w-full space-y-4">
                <div className="formkit-field">
                  <input 
                    className="formkit-input w-full px-4 py-2 rounded-md border border-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-200" 
                    aria-label="First Name" 
                    name="fields[first_name]" 
                    required 
                    placeholder="First Name" 
                    type="text" 
                    style={{ color: 'rgb(83, 83, 83)', borderColor: 'rgb(221, 224, 228)', fontWeight: '400', fontFamily: 'sans-serif' }}
                  />
                </div>
                <div className="formkit-field">
                  <input 
                    className="formkit-input w-full px-4 py-2 rounded-md border border-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-200" 
                    name="email_address" 
                    aria-label="Email Address" 
                    placeholder="Email Address" 
                    required 
                    type="email" 
                    style={{ color: 'rgb(83, 83, 83)', borderColor: 'rgb(221, 224, 228)', fontWeight: '400', fontFamily: 'sans-serif' }}
                  />
                </div>
                <button 
                  data-element="submit" 
                  className="formkit-submit w-full px-6 py-3 mt-4 text-white bg-pink-400 hover:bg-pink-500 rounded-md transition-colors duration-200" 
                  style={{ fontWeight: '600', fontFamily: 'sans-serif' }}
                >
                  <div className="formkit-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span>Submit</span>
                </button>
              </div>
              <div className="formkit-disclaimer" data-element="disclaimer" style={{ color: 'rgb(139, 139, 139)', fontSize: '13px', marginTop: '1rem' }}>
                <p></p>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal; 