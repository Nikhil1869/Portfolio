export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (
    !fields.name.trim() ||
    fields.name.trim().length > 100 ||
    /[\r\n]/.test(fields.name)
  )
    errors.name = "Enter your name (up to 100 characters).";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ||
    fields.email.length > 254
  )
    errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10 || fields.message.length > 2000)
    errors.message = "Write a message between 10 and 2,000 characters.";
  return errors;
}

export function createMailto(fields: ContactFields, recipient: string): string {
  if (Object.keys(validateContact(fields)).length)
    throw new Error("Invalid contact fields");
  const subject = `Portfolio enquiry from ${fields.name.trim()}`;
  const body = `${fields.message.trim()}\n\nFrom: ${fields.name.trim()}\nReply to: ${fields.email.trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
