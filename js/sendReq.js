document.querySelector(".styled-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    target: "user:954513064571584554",
    content: `New form submission!\n**Name:** ${form.name.value}\n**Email:** ${form.email.value}\n**Message:** ${form.message.value}`
  };

  try {
    const res = await fetch("https://b5685057-57ef-4115-9422-ae36a1e7246d-00-2rrfnhzhpy7sd.worf.replit.dev/webhook/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    
    if (result.success) {
      alert("Message sent to Discord! Thank you 💌");
      form.reset();
    } else {
      alert("Failed to send: " + result.message);
    }
  } catch (err) {
    alert("Something went wrong 😢");
    console.error(err);
  }
});