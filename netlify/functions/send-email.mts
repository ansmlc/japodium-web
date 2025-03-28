const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });

    const content = `<div>
      <ul>
        <li>Name: <strong>${body.name}</strong></li>
        <li>Email: <strong>${body.email}</strong></li>
        <li>Phone: <strong>${body.phone}</strong></li>
        <li>Date: <strong>${body.date || ""}</strong></li>
        <li>Participants: <strong>${body.participants || ""}</strong></li>
        <li>Activity: <strong>${body.activity || ""}</strong></li>
        <li>Message: <strong>${body.message || ""}</strong></li>
      </ul>
      <br/>
      <i>Reservation sent from mobile app</i>
    </div>`;

    // Send email using Mailgun
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAILGUN_SENDER_EMAIL,
      to: process.env.MAILGUN_SENDER_EMAIL,
      subject: "Reservation - Mobile App",
      html: content,
      "h:Reply-To": body.email,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "SUCCESS", id: result.id }),
    };
  } catch (error) {
    console.log("Mailgun error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "ERROR",
        message: error.message,
      }),
    };
  }
};
