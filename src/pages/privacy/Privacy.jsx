import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">Welcome to our Privacy Policy page. We are committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website. Please read this Privacy Policy carefully.</p>

        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">We collect information about you in various ways when you use our website. This information may include your name, email address, postal address, phone number, and other personal information.</p>

        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">We may use the information we collect from you to:</p>
        <ul className="list-disc pl-6">
          <li>Provide, operate, and maintain our website.</li>
          <li>Improve, personalize, and expand our website.</li>
          <li>Understand and analyze how you use our website.</li>
          <li>Develop new products, services, features, and functionality.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Disclosure of Your Information</h2>
        <p className="mb-4">We may disclose your personal information:</p>
        <ul className="list-disc pl-6">
          <li>To comply with applicable laws and regulations.</li>
          <li>To respond to a subpoena, search warrant, or other lawful request for information we receive.</li>
          <li>To protect our rights, property, or safety, or that of our users or others.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at epharma@gmail.com.</p>
      </div>
    </div>
  );
}

export default Privacy;
