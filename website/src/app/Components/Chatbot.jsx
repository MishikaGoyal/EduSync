import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Configure the chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "Vo4ZY_VgjbsEd31ZZGFsC",
      domain: "www.chatbase.co",
    };

    // Create and append the chatbot script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "Vo4ZY_VgjbsEd31ZZGFsC");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    // Function to close the chatbot
    const closeChatbot = () => {
      const chatbotContainer = document.querySelector(
        ".embedded-chatbot-container"
      ); // Adjust this selector based on the chatbot's actual DOM structure
      if (chatbotContainer) {
        chatbotContainer.style.display = "none"; // Hide the chatbot
      }
    };

    // Handle clicks on the document
    const handleClickOutside = (event) => {
      const chatbotContainer = document.querySelector(
        ".embedded-chatbot-container"
      );
      const arrowDown = document.querySelector(".arrow-down"); // Adjust selector for the arrow down element
      if (
        chatbotContainer &&
        !chatbotContainer.contains(event.target) && // Check if the click is outside the chatbot
        (!arrowDown || !arrowDown.contains(event.target)) // Ensure it's not the arrow mark
      ) {
        closeChatbot();
      }
    };

    // Add global click event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return <>{/* Your arrow-down element */}</>;
};

export default Chatbot;
