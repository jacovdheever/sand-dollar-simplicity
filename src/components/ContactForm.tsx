
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: `${formData.name} ${formData.surname}`,
        from_email: formData.email,
        telephone: formData.telephone || 'Not provided',
        message: 'Contact form submission from Sand Dollar website',
      };

      await emailjs.send(
        'service_ihil4up',
        'template_ueizqz4',
        templateParams,
        'YOUR_USER_ID' // This should be replaced with the actual user ID in a real implementation
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: '',
        surname: '',
        email: '',
        telephone: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
              Surname*
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              required
              value={formData.surname}
              onChange={handleChange}
              className="form-input"
              placeholder="Your surname"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
            Telephone (optional)
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="form-input"
            placeholder="+1 (123) 456-7890"
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary mt-6"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
};

export default ContactForm;
