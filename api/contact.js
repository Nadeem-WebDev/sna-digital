export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Pulling all keys from Vercel environment
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("Missing EmailJS credentials in Vercel environment.");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey, // Secures the backend request
        template_params: {
          from_name: name,
          from_email: email,
          subject: "Inquiry from Portfolio",
          message: message,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS API rejected the request:", errorText); 
      return res.status(response.status).json({ error: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fetch to EmailJS failed:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}