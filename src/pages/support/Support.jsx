import React, { useEffect, useState } from 'react';

const Support = () => {
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setFirstVisit(false);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (!firstVisit) {
      const script = document.createElement('script');
      script.src = "https://www.chatbase.co/embed.min.js";
      script.defer = true;

      const configScript = document.createElement('script');
      configScript.textContent = `
        window.embeddedChatbotConfig = {
          chatbotId: "OWD8N_pfUWackdioxY54V",
          domain: "www.chatbase.co"
        };
      `;

      document.body.appendChild(configScript);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(configScript);
        document.body.removeChild(script);
      };
    }
  }, [firstVisit]);

  if (firstVisit) return null;
  return <button onClick={() => setFirstVisit(true)}></button>;
};

export default Support;
