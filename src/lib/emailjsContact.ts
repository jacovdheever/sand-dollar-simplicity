export type ContactEmailFields = {
  fullName: string;
  email: string;
  company?: string;
  needHelpWith?: string;
  location?: string;
  message: string;
};

const fallback = (value?: string) => (value?.trim() ? value.trim() : 'Not provided');

/**
 * Builds EmailJS template params for contact submissions.
 * Individual fields are included for templates that reference them, and the
 * full details are also embedded in `message` so older templates that only
 * render {{message}} still receive every submitted field.
 */
export function buildContactEmailParams(fields: ContactEmailFields) {
  const fullName = fields.fullName.trim();
  const email = fields.email.trim();
  const company = fallback(fields.company);
  const needHelpWith = fallback(fields.needHelpWith);
  const location = fallback(fields.location);
  const userMessage = fields.message.trim();

  const message = [
    `Full name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Need help with: ${needHelpWith}`,
    `Based in: ${location}`,
    '',
    'Message:',
    userMessage,
  ].join('\n');

  return {
    from_name: fullName,
    name: fullName,
    user_name: fullName,
    from_email: email,
    email,
    user_email: email,
    reply_to: email,
    company,
    need_help_with: needHelpWith,
    location,
    message,
    to_name: 'Sand Dollar Design Team',
  };
}

export const EMAILJS_CONTACT_CONFIG = {
  serviceId: 'service_ihil4up',
  templateId: 'template_ueizqz4',
  publicKey: 'EdeMDiduxh2tdO30U',
} as const;
