import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Contact Us</h2>
        <p className="mb-4">Please email us at <a className="text-blue-500" href="mailto:milaporia99@gmail.com">readify.in</a></p>
      </div>
    </div>
  );
};

export default ContactForm;
