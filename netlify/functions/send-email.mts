import FormData from "form-data";
import Mailgun from "mailgun.js";

// Simple translations object
const translations = {
  bs: {
    greeting: (name: string) => `Pozdrav ${name}!`,
    thankYouMessage:
      "Zahvaljujemo se na vašem zahtjevu za rezervaciju poslanom putem Japodium aplikacije! Vaš zahtjev je zaprimljen i trenutno ima status \u201ENa čekanju\u201C.",
    statusTitle: "Status zahtjeva: Na čekanju",
    statusText:
      "Ovo nije potvrda rezervacije. Vaš zahtjev pregledava naš administrator, nakon čega se detalji usklađuju između vas i pružaoca usluge. Kada se detalji dogovore, status vašeg zahtjeva u aplikaciji mijenja se na \u201EPotvrđeno\u201C i o tome ćete biti obaviješteni.",
    reservationDetails: "Podaci o zahtjevu:",
    name: "Ime:",
    email: "Email:",
    phone: "Broj telefona:",
    participants: "Broj učesnika:",
    date: "Željeni datum:",
    activityType: "Vrsta aktivnosti:",
    location: "Lokacija:",
    activity: "Aktivnost:",
    provider: "Pružalac usluge:",
    pricePerPerson: "Okvirna cijena po osobi:",
    totalPrice: "Okvirni ukupni iznos",
    priceNotice:
      "Cijene su okvirne i informativnog su karaktera. Konačnu cijenu, uvjete plaćanja i uvjete otkazivanja određuje pružalac usluge.",
    contactMessage:
      "Naš tim će vas kontaktirati putem e-maila, Viber-a ili WhatsApp-a kako bi uskladio detalje i povezao vas s pružaocem usluge.",
    intermediaryTitle: "Važno obavještenje",
    intermediaryText:
      "Japodium djeluje isključivo kao posrednička platforma za rezervacije. Mi ne pružamo, ne organizujemo niti ne prodajemo aktivnosti prikazane u aplikaciji. Aktivnost pruža nezavisni pružalac usluge treće strane, s kojim sklapate ugovor i čiji uvjeti poslovanja se primjenjuju. Učešće u rekreacijskim i ekstremnim sportskim aktivnostima nosi inherentne rizike.",
    cancellationPolicy: "Otkazivanje",
    cancellationText:
      "Zahtjev možete otkazati u bilo kojem trenutku u aplikaciji ili odgovorom na ovaj e-mail. Japodium vam ne naplaćuje ništa. Ako je rezervacija već potvrđena, primjenjuju se uvjeti otkazivanja pružaoca usluge, pa vas molimo da otkazivanje najavite što ranije, po mogućnosti najmanje 48 sati prije planirane aktivnosti.",
    thankYouFinal:
      "Zahvaljujemo se što koristite Japodium za pronalaženje lokalnih avantura.",
    regards: "Srdačan pozdrav",
    team: "Japodium tim",
    newReservation: "Novi zahtjev za rezervaciju - Japodium",
    confirmationSubject: "Zahtjev za rezervaciju zaprimljen (Na čekanju) - Japodium",
    footerNote: "Zahtjev za rezervaciju poslan iz Japodium mobilne aplikacije",
    privacyLink: "Politika privatnosti",
    tosLink: "Uslovi korištenja",
  },
  en: {
    greeting: (name: string) => `Hello ${name}!`,
    thankYouMessage:
      "Thank you for your reservation request submitted through the Japodium app! We have received your request and its status is currently \u201CPending\u201D.",
    statusTitle: "Request status: Pending",
    statusText:
      "This is not a booking confirmation. Your request is being reviewed by our administrator, after which the details are agreed between you and the service provider. Once the details are agreed, the status of your request in the app changes to \u201CConfirmed\u201D and you will be notified.",
    reservationDetails: "Request Details:",
    name: "Name:",
    email: "Email:",
    phone: "Phone Number:",
    participants: "Number of Participants:",
    date: "Requested Date:",
    activityType: "Activity Type:",
    location: "Location:",
    activity: "Activity:",
    provider: "Service Provider:",
    pricePerPerson: "Indicative Price per Person:",
    totalPrice: "Indicative Total",
    priceNotice:
      "Prices are indicative and provided for information only. The final price, payment terms and cancellation terms are set by the service provider.",
    contactMessage:
      "Our team will contact you via email, Viber, or WhatsApp to agree the details and connect you with the service provider.",
    intermediaryTitle: "Important Notice",
    intermediaryText:
      "Japodium acts solely as an intermediary booking platform. We do not provide, organise or sell the activities shown in the app. The activity is supplied by an independent third-party provider, with whom you enter into a contract and whose terms and conditions apply. Participation in recreational and extreme sport activities carries inherent risks.",
    cancellationPolicy: "Cancellation",
    cancellationText:
      "You can cancel your request at any time in the app or by replying to this email. Japodium does not charge you anything. If the reservation has already been confirmed, the service provider's cancellation terms apply, so please let us know as early as possible, ideally at least 48 hours before the planned activity.",
    thankYouFinal:
      "Thank you for using Japodium to discover local adventures.",
    regards: "Best regards",
    team: "Japodium Team",
    newReservation: "New Reservation Request - Japodium",
    confirmationSubject: "Reservation Request Received (Pending) - Japodium",
    footerNote: "Reservation request sent from the Japodium mobile app",
    privacyLink: "Privacy Policy",
    tosLink: "Terms of Service",
  },
  de: {
    greeting: (name: string) => `Hallo ${name}!`,
    thankYouMessage:
      "Vielen Dank für Ihre über die Japodium-App gesendete Reservierungsanfrage! Wir haben Ihre Anfrage erhalten, ihr Status lautet derzeit \u201EAusstehend\u201C.",
    statusTitle: "Status der Anfrage: Ausstehend",
    statusText:
      "Dies ist keine Buchungsbestätigung. Ihre Anfrage wird von unserem Administrator geprüft, anschließend werden die Details zwischen Ihnen und dem Dienstleister abgestimmt. Sobald die Details vereinbart sind, wechselt der Status Ihrer Anfrage in der App auf \u201EBestätigt\u201C und Sie werden benachrichtigt.",
    reservationDetails: "Details der Anfrage:",
    name: "Name:",
    email: "E-Mail:",
    phone: "Telefonnummer:",
    participants: "Anzahl der Teilnehmer:",
    date: "Gewünschtes Datum:",
    activityType: "Aktivitätstyp:",
    location: "Standort:",
    activity: "Aktivität:",
    provider: "Dienstleister:",
    pricePerPerson: "Indikativer Preis pro Person:",
    totalPrice: "Indikativer Gesamtbetrag",
    priceNotice:
      "Die Preise sind indikativ und dienen nur zur Information. Der endgültige Preis sowie die Zahlungs- und Stornierungsbedingungen werden vom Dienstleister festgelegt.",
    contactMessage:
      "Unser Team wird Sie per E-Mail, Viber oder WhatsApp kontaktieren, um die Details abzustimmen und Sie mit dem Dienstleister zu verbinden.",
    intermediaryTitle: "Wichtiger Hinweis",
    intermediaryText:
      "Japodium fungiert ausschließlich als Vermittlungsplattform für Reservierungen. Wir erbringen, organisieren und verkaufen die in der App gezeigten Aktivitäten nicht. Die Aktivität wird von einem unabhängigen Drittanbieter erbracht, mit dem Sie einen Vertrag schließen und dessen Geschäftsbedingungen gelten. Die Teilnahme an Freizeit- und Extremsportaktivitäten ist mit inhärenten Risiken verbunden.",
    cancellationPolicy: "Stornierung",
    cancellationText:
      "Sie können Ihre Anfrage jederzeit in der App oder durch Antwort auf diese E-Mail stornieren. Japodium stellt Ihnen nichts in Rechnung. Wenn die Reservierung bereits bestätigt wurde, gelten die Stornierungsbedingungen des Dienstleisters. Bitte informieren Sie uns daher so früh wie möglich, idealerweise mindestens 48 Stunden vor der geplanten Aktivität.",
    thankYouFinal:
      "Vielen Dank, dass Sie Japodium nutzen, um lokale Abenteuer zu entdecken.",
    regards: "Mit freundlichen Grüßen",
    team: "Japodium Team",
    newReservation: "Neue Reservierungsanfrage - Japodium",
    confirmationSubject: "Reservierungsanfrage erhalten (Ausstehend) - Japodium",
    footerNote: "Reservierungsanfrage aus der Japodium-App gesendet",
    privacyLink: "Datenschutzrichtlinie",
    tosLink: "Nutzungsbedingungen",
  },
};

const SUPPORTED_LOCALES = ["bs", "en", "de"] as const;
const DEFAULT_LOCALE = "bs";

// Mailgun rejects header values containing CR/LF, but validate anyway so that
// user input can never be used to inject additional headers.
const EMAIL_PATTERN = /^[^\s@<>"',;:\\]+@[^\s@<>"',;:\\]+\.[A-Za-z]{2,}$/;

const MAX_FIELD_LENGTH = 200;

function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTranslation(locale: string, key: string, ...args: any[]) {
  const lang =
    translations[locale as keyof typeof translations] || translations.bs;
  const translation = lang[key as keyof typeof lang];

  if (typeof translation === "function") {
    return (translation as (...args: any[]) => string)(...args);
  }
  return translation || key;
}

function resolveLocale(value: unknown): string {
  return SUPPORTED_LOCALES.includes(value as any)
    ? (value as string)
    : DEFAULT_LOCALE;
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function buildCorsHeaders(origin: string | undefined) {
  // Native app requests carry no Origin header. Browser requests are limited to
  // the origins listed in ALLOWED_ORIGINS (comma separated).
  const allowed = (process.env.ALLOWED_ORIGINS || "https://www.japodium.com,https://japodium.com")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };

  if (origin && allowed.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function isAuthorised(event: any): boolean {
  const expected = process.env.RESERVATION_API_KEY;

  // Enforcement is enabled by setting RESERVATION_API_KEY. This keeps already
  // published app versions working until they ship the key.
  if (!expected) return true;

  const provided =
    event.headers?.["x-api-key"] || event.headers?.["X-Api-Key"] || "";
  return provided === expected;
}

function validate(body: any): string | null {
  if (!body || typeof body !== "object") return "Invalid payload";

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_PATTERN.test(email) || email.length > MAX_FIELD_LENGTH) {
    return "A valid email address is required";
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  if (!firstName && !lastName) return "A name is required";

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!phone) return "A phone number is required";

  return null;
}

export const handler = async function (event, context) {
  const headers = buildCorsHeaders(event.headers?.origin || event.headers?.Origin);

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

  if (!isAuthorised(event)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ status: "ERROR", message: "Unauthorized" }),
    };
  }

  try {
    let body: any;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "ERROR", message: "Invalid JSON" }),
      };
    }

    const validationError = validate(body);
    if (validationError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "ERROR", message: validationError }),
      };
    }

    const locale = resolveLocale(body.locale);
    const userEmail = String(body.email).trim();

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

    // Generate localized content
    const content = generateLocalizedEmailContent(body, locale);

    // Send email using Mailgun
    const appOwnerEmail =
      process.env.MAILGUN_APP_OWNER_EMAIL || "info@japodium.com";

    // Send email to app owner (notification)
    const appOwnerResult = await mg.messages.create(
      process.env.MAILGUN_DOMAIN || "",
      {
        from: `Japodium <${process.env.MAILGUN_SENDER_EMAIL || ""}>`,
        to: appOwnerEmail,
        subject: getTranslation(locale, "newReservation"),
        html: content,
        "h:Reply-To": userEmail,
      }
    );

    // Send acknowledgement email to the requester
    const userResult = await mg.messages.create(
      process.env.MAILGUN_DOMAIN || "",
      {
        from: `Japodium <${process.env.MAILGUN_SENDER_EMAIL || ""}>`,
        to: userEmail,
        subject: getTranslation(locale, "confirmationSubject"),
        html: content,
        "h:Reply-To": appOwnerEmail,
      }
    );

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
    // Never log the request body; it contains personal data.
    console.error("Mailgun send failed:", error?.message || "unknown error");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "ERROR",
        message: "Unable to send the reservation request",
      }),
    };
  }
};

function generateLocalizedEmailContent(body: any, locale: string): string {
  const fallbackName =
    locale === "en" ? "Guest" : locale === "de" ? "Gast" : "Gost";
  const guestName = escapeHtml(body.firstName || fallbackName);

  const fullName = escapeHtml(
    `${body.firstName || ""} ${body.lastName || ""}`.trim()
  );

  const hasPrice = body.price !== undefined && String(body.price).trim() !== "";
  const indicativeTotal = toNumber(body.price) * (toNumber(body.participants) || 1);

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Japodium</title>
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
        
        .status-badge {
            display: inline-block;
            background-color: #4a3f1f;
            color: #F0C860;
            border: 1px solid #C0A769;
            border-radius: 999px;
            padding: 6px 16px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .notice-section {
            background-color: #1a1a1a;
            border-left: 3px solid #C0A769;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 24px;
        }
        
        .notice-title {
            font-size: 15px;
            font-weight: 600;
            color: #C0A769;
            margin-bottom: 8px;
        }
        
        .notice-text {
            font-size: 14px;
            color: #c8c8c8;
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
            background-color: #333333;
            color: #ffffff;
            border: 1px solid #C0A769;
            padding: 16px 24px;
            border-radius: 8px;
            margin-bottom: 12px;
            text-align: center;
        }
        
        .price-label {
            font-size: 14px;
            font-weight: 500;
            color: #C0A769;
            margin-bottom: 4px;
        }
        
        .price-value {
            font-size: 32px;
            font-weight: 700;
        }
        
        .price-note {
            font-size: 12px;
            color: #909090;
            margin-bottom: 24px;
            line-height: 1.5;
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
        
        .legal-links {
            font-size: 12px;
            color: #808080;
            margin-top: 8px;
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
            <div class="greeting">${getTranslation(
              locale,
              "greeting",
              guestName
            )}</div>

            <div class="status-badge">${getTranslation(
              locale,
              "statusTitle"
            )}</div>

            <div class="message">
                ${getTranslation(locale, "thankYouMessage")}
            </div>

            <div class="notice-section">
                <div class="notice-text">${getTranslation(
                  locale,
                  "statusText"
                )}</div>
            </div>
            
            <div class="details-section">
                <div class="section-title">${getTranslation(
                  locale,
                  "reservationDetails"
                )}</div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "name"
                    )}</span>
                    <span class="detail-value">${fullName}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "email"
                    )}</span>
                    <span class="detail-value">${escapeHtml(body.email)}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "phone"
                    )}</span>
                    <span class="detail-value">${escapeHtml(body.phone)}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "participants"
                    )}</span>
                    <span class="detail-value">${escapeHtml(
                      body.participants
                    )}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "date"
                    )}</span>
                    <span class="detail-value">${escapeHtml(body.date)}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "activityType"
                    )}</span>
                    <span class="detail-value">${escapeHtml(
                      body.categoryName
                    )}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "location"
                    )}</span>
                    <span class="detail-value">${escapeHtml(
                      Array.isArray(body.cities) ? body.cities.join(" - ") : ""
                    )}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "activity"
                    )}</span>
                    <span class="detail-value">${escapeHtml(
                      body.activity
                    )}</span>
                </div>

                ${
                  body.providerName
                    ? `
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "provider"
                    )}</span>
                    <span class="detail-value">${escapeHtml(
                      body.providerName
                    )}</span>
                </div>
                `
                    : ""
                }

                ${
                  hasPrice
                    ? `
                <div class="detail-item">
                    <span class="detail-label">${getTranslation(
                      locale,
                      "pricePerPerson"
                    )}</span>
                    <span class="detail-value">${escapeHtml(body.price)} €</span>
                </div>
                `
                    : ""
                }
            </div>
            
            ${
              hasPrice
                ? `
            <div class="price-section">
                <div class="price-label">${getTranslation(
                  locale,
                  "totalPrice"
                )}</div>
                <div class="price-value">${indicativeTotal} €</div>
            </div>
            <div class="price-note">${getTranslation(
              locale,
              "priceNotice"
            )}</div>
            `
                : ""
            }
            
            <div class="message">
                ${getTranslation(locale, "contactMessage")}
            </div>

            <div class="notice-section">
                <div class="notice-title">${getTranslation(
                  locale,
                  "intermediaryTitle"
                )}</div>
                <div class="notice-text">${getTranslation(
                  locale,
                  "intermediaryText"
                )}</div>
            </div>

            <div class="notice-section">
                <div class="notice-title">${getTranslation(
                  locale,
                  "cancellationPolicy"
                )}</div>
                <div class="notice-text">${getTranslation(
                  locale,
                  "cancellationText"
                )}</div>
            </div>

            <div class="message">
                ${getTranslation(locale, "thankYouFinal")}
            </div>

            <div class="message">
                ${getTranslation(locale, "regards")},
                ${getTranslation(locale, "team")}
            </div>
        </div>
        <div class="footer">
            <div class="contact-info">
                ${getTranslation(locale, "footerNote")}
            </div>
            <div class="website-link">
                <a href="https://www.japodium.com" style="color: #C0A769; text-decoration: none;">www.japodium.com</a>
            </div>
            <div class="legal-links">
                <a href="https://www.japodium.com/privacy" style="color: #808080; text-decoration: underline;">${getTranslation(
                  locale,
                  "privacyLink"
                )}</a>
                &nbsp;·&nbsp;
                <a href="https://www.japodium.com/tos" style="color: #808080; text-decoration: underline;">${getTranslation(
                  locale,
                  "tosLink"
                )}</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
}
