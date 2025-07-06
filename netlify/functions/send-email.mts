import FormData from "form-data";
import Mailgun from "mailgun.js";

export const handler = async function (event, context) {
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

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "",
      // Use EU endpoint if your domain is in EU
      url:
        process.env.MAILGUN_EU_DOMAIN === "true"
          ? "https://api.eu.mailgun.net"
          : undefined,
    });

    const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Japodium Reservation Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #2d2d2d;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background-color: #1a1a1a;
            padding: 32px 24px;
            text-align: center;
            border-bottom: 1px solid #404040;
        }
        
        .logo {
            width: 64px;
            height: 64px;
            margin: 0 auto 16px;
            display: block;
        }
        
        .logo img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: block;
        }
        
        .title {
            font-size: 28px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .subtitle {
            font-size: 16px;
            color: #C0A769;
            margin-bottom: 16px;
        }
        
        .content {
            padding: 32px 24px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 16px;
        }
        
        .message {
            font-size: 16px;
            color: #e0e0e0;
            margin-bottom: 24px;
            line-height: 1.5;
        }
        
        .details-section {
            background-color: #1a1a1a;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #C0A769;
            margin-bottom: 16px;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #404040;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-size: 14px;
            color: #b0b0b0;
            font-weight: 500;
        }
        
        .detail-value {
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
            text-align: right;
        }
        
        .price-section {
            background-color: #C0A769;
            color: #1a1a1a;
            padding: 16px 24px;
            border-radius: 8px;
            margin-bottom: 24px;
            text-align: center;
        }
        
        .price-label {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 4px;
        }
        
        .price-value {
            font-size: 32px;
            font-weight: 700;
        }
        
        .footer {
            background-color: #1a1a1a;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #404040;
        }
        
        .footer-text {
            font-size: 14px;
            color: #b0b0b0;
            margin-bottom: 8px;
        }
        
        .contact-info {
            font-size: 12px;
            color: #808080;
            font-style: italic;
        }
        
        .emoji {
            font-size: 20px;
            margin-left: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="https://japodium.com/Japodium-Logo-128.png" alt="Japodium Logo" style="width: 64px; height: 64px; border-radius: 50%; display: block;">
            </div>
            <div class="title">Japodium</div>
        </div>
        
        <div class="content">
            <div class="greeting">Pozdrav ${body.firstName || "Gost"}!</div>
            
            <div class="message">
                Zahvaljujemo se na vašoj rezervaciji putem Japodium aplikacije! Drago nam je da ste odabrali našu platformu za planiranje vaše avanture. <span class="emoji">😊</span>
            </div>
            
            <div class="details-section">
                <div class="section-title">Podaci o rezervaciji:</div>
                
                <div class="detail-item">
                    <span class="detail-label">Ime:</span>
                    <span class="detail-value">${
                      body.firstName || body.lastName
                        ? `${body.firstName || ""} ${
                            body.lastName || ""
                          }`.trim()
                        : ""
                    }</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${body.email || ""}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Broj telefona:</span>
                    <span class="detail-value">${body.phone || ""}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Broj učesnika:</span>
                    <span class="detail-value">${body.participants || ""}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Datum rezervacije:</span>
                    <span class="detail-value">${body.date || ""}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Vrsta aktivnosti:</span>
                    <span class="detail-value">${body.categoryName || ""}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Lokacija:</span>
                    <span class="detail-value">${
                      body.cities ? body.cities.join(" - ") : ""
                    }</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Aktivnost:</span>
                    <span class="detail-value">${body.activity || ""}</span>
                </div>

                <div class="detail-item">
                    <span class="detail-label">Cijena po osobi:</span>
                    <span class="detail-value">${body.price || ""} €</span>
                </div>
            </div>
            
            ${
              body.price
                ? `
            <div class="price-section">
                <div class="price-label">Ukupna cijena:</div>
                <div class="price-value">${(() => {
                  const cleanPrice =
                    typeof body.price === "string"
                      ? parseFloat(body.price.replace(/[^\d.-]/g, "")) || 0
                      : body.price || 0;
                  const participants =
                    typeof body.participants === "string"
                      ? parseInt(body.participants.replace(/[^\d]/g, "")) || 1
                      : body.participants || 1;
                  return cleanPrice * participants;
                })()} €</div>
            </div>
            `
                : ""
            }
            
            <div class="message">
                Naš tim će vas kontaktirati putem e-maila, Viber-a ili WhatsApp-a, gdje ćemo ostati u kontaktu za sva dodatna pitanja.
            </div>

            <div class="message">
                <strong>Politika otkazivanja:</strong>  U slučaju otkazivanja rezervacije, molimo vas da nas obavijestite najmanje 48 sati prije planirane aktivnosti. Otkazivanje unutar ovog perioda može rezultirati naplatom troškova.
            </div>

            <div class="message">
                Zahvaljujemo se što ste odabrali Japodium. Radujemo se vašoj avanturi i vjerujemo da ćete uživati u svemu što smo pripremili za vas!
            </div>

            <div class="message">
                Srdačan pozdrav,
                Japodium tim
            </div>
        </div>
        <div class="footer">
            <div class="contact-info">
                Rezervacija poslana iz mobilne aplikacije
            </div>
            <div class="website-link">
                <a href="https://www.japodium.com" style="color: #C0A769; text-decoration: none;">www.japodium.com</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

    // Send email using Mailgun
    const appOwnerEmail =
      process.env.MAILGUN_APP_OWNER_EMAIL || "anes.mulalic@outlook.com";

    // Send email to app owner (notification)
    const appOwnerResult = await mg.messages.create(
      process.env.MAILGUN_DOMAIN || "",
      {
        from: `Japodium <${process.env.MAILGUN_SENDER_EMAIL || ""}>`,
        to: appOwnerEmail,
        subject: "New Reservation - Mobile App",
        html: content,
        "h:Reply-To": body.email,
      }
    );

    // Send confirmation email to user if email provided
    let userResult: any = null;
    if (body.email) {
      userResult = await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
        from: `Japodium <${process.env.MAILGUN_SENDER_EMAIL || ""}>`,
        to: "anes.mulalic@outlook.com",
        subject: "Reservation Confirmation - Japodium",
        html: content,
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "SUCCESS",
        appOwnerEmailId: appOwnerResult.id,
        userEmailId: userResult?.id || null,
      }),
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
