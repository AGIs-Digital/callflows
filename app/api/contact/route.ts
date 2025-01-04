import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { transporter } from "@/lib/email";

const getSubject = (source: string) => {
  switch (source) {
    case 'inbound':
      return 'Anfrage Inbound';
    case 'outbound':
      return 'Anfrage Outbound';
    case 'enterprise':
      return 'Anfrage Enterprise';
    default:
      return 'Neue Kontaktanfrage';
  }
};

export async function POST(request: Request) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP-Konfiguration fehlt');
    return NextResponse.json(
      { error: 'Server-Konfigurationsfehler' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    const validationResult = contactFormSchema.safeParse(data);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    
    const sourceText = validatedData.source 
      ? `\nQuelle: ${validatedData.source}` 
      : '';

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: getSubject(validatedData.source || ''),
      text: `
Name: ${validatedData.name}
E-Mail: ${validatedData.email}
Telefon: ${validatedData.phone || 'Nicht angegeben'}
Nachricht: ${validatedData.message}${sourceText}
      `,
      html: `
<h2>Neue Kontaktanfrage</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>E-Mail:</strong> ${validatedData.email}</p>
<p><strong>Telefon:</strong> ${validatedData.phone || 'Nicht angegeben'}</p>
<p><strong>Nachricht:</strong></p>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
${sourceText ? `<p><strong>Quelle:</strong> ${validatedData.source}</p>` : ''}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('SMTP-Fehler:', emailError);
      return NextResponse.json(
        { error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Formular-Fehler:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}