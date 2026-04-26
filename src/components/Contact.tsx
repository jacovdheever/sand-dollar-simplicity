import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init('EdeMDiduxh2tdO30U');
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('EmailJS initialization failed:', error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.message) {
        console.error('Missing required fields:', formData);
        setSubmitStatus('error');
        return;
      }

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        reply_to: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
        to_name: 'Sand Dollar Design Team'
      };

      console.log('Sending email with params:', templateParams);
      
      // Test EmailJS connection first
      console.log('Testing EmailJS connection...');
      console.log('Service ID:', 'service_ihil4up');
      console.log('Template ID:', 'template_ueizqz4');
      console.log('Public Key:', 'EdeMDiduxh2tdO30U');
      
      // Try the standard EmailJS send method
      const result = await emailjs.send(
        'service_ihil4up',
        'template_ueizqz4',
        templateParams,
        'EdeMDiduxh2tdO30U'
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text,
        fullError: error,
        errorType: typeof error,
        errorKeys: Object.keys(error || {}),
        errorString: String(error)
      });
      
      // Log error for debugging
      const errorMsg = error?.message || error?.text || error?.status || String(error) || 'Unknown error';
      console.error('EmailJS Error:', errorMsg);
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding py-16 md:py-20" style={{background: 'radial-gradient(ellipse at center top, #f98865 0%, #fbac76 70%, #fbac76 100%)'}}>
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="section-animate in-view">
            <h2 className="section-title mb-6 text-center from-left font-black md:whitespace-nowrap">Book a free strategy call</h2>
            <p className="text-gray-800 text-center mb-8 max-w-xl mx-auto">
              We'll review your website, product or platform, identify the biggest friction points, and suggest practical next steps.
            </p>
          </div>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
              Thank you for your message! We'll get back to you as soon as possible.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              Something went wrong. Please try again later or contact us directly.
            </div>
          )}
          
          <form
            className="space-y-6 text-center section-animate in-view from-right"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 text-center">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="form-input bg-white shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-center">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="form-input bg-white shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 text-center">Company name</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company"
                className="form-input bg-white shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-center">What are we going to help you with?</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, timeline, and any useful context."
                className="form-input min-h-[140px] bg-white shadow-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/sanddollardesign/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold py-4 px-8 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all shadow-lg"
              >
                Book a free strategy call
              </a>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="py-4 px-8 rounded-full border-2 border-white/80 text-white font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
