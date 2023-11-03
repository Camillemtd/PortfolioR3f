import React from "react";

const Contact = () => {
	let webhookUrl = import.meta.env.VITE_REACT_APP_DISCORD_WEB_HOOK;

  function sendMessage(e) {
    e.preventDefault();
    console.log(webhookUrl);
    const date = new Date();
    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const messageContent = `
            ------------------------
            *${date}* 

            __**Username**__ : ${userName}
            __**Email**__ : ${userEmail} 
            __**Message**__ : ${message}
            `;

    if (userName && userEmail && message) {
      fetch(webhookUrl, {
        body: JSON.stringify({
          content: messageContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(function () {
          alert("message envoyé");
        })
        .catch(function (error) {
          console.error(error);
          alert("There was an error. " + error);
        });
    } else {
      alert("Please fill in all information.");
    }
  }
  return <div id="contact" className="text-white flex justify-center">
	<form className="flex flex-col w-1/2">
                    <label htmlFor='name'>Name</label>
                    <input className="bg-gray-500 text-gray-200 border rounded p-2 mb-4 focus:border-blue-500 focus:outline-none" id='name' placeholder='Greg' required type="text"></input>
                    <label htmlFor='email'>Email</label>
                    <input className="bg-gray-500 text-gray-200 border rounded p-2 mb-4 focus:border-blue-500 focus:outline-none" id='email' placeholder='gregou@hotmail.com' required type='email'></input>
                    <label htmlFor='message'>Message</label>
                    <textarea className="bg-gray-500 text-gray-200 border rounded p-2 mb-4 focus:border-blue-500 focus:outline-none" id='message' placeholder='I like your work' required rows='6'></textarea>
                    <button className="bg-indigo-500 text-white rounded p-2 cursor-pointer hover:bg-blue-400 transition-colors" id='sendBtn' onClick={sendMessage}>Send</button>
                </form>
  </div>;
};

export default Contact;
