import type { CSSProperties, ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

export type ContactFormNotificationProps = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const LOGO_URL =
  "https://cdn.sanity.io/images/nck2qq2n/production/91fe08287752bbb11f7155a6fc991309ce34edf1-2000x2000.png";

const brand = {
  black: "#000000",
  navy: "#1b3a6b",
  cyan: "#006f9a",
  text: "#0f1c2e",
  muted: "#4a5a6a",
  border: "#d5dde5",
  paper: "#ffffff",
  page: "#eef2f6",
  soft: "#f4f8fb",
} as const;

function Field({
  label,
  children,
  last = false,
}: {
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  const cellBorder = last ? "none" : `1px solid ${brand.border}`;

  return (
    <tr>
      <td style={{ ...labelCell, borderBottom: cellBorder }}>{label}</td>
      <td style={{ ...valueCell, borderBottom: cellBorder }}>{children}</td>
    </tr>
  );
}

export function ContactFormNotification({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormNotificationProps) {
  const preview = `New message from ${name}: ${subject}`;
  const firstName = name.split(/\s+/)[0] ?? name;

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={LOGO_URL}
              width="120"
              height="120"
              alt="Arizona Seals Swimming"
              style={logo}
            />
            <Text style={headerLabel}>Arizona Seals Swimming</Text>
          </Section>

          <Section style={accentLine} />

          <Section style={content}>
            <Heading as="h1" style={title}>
              {subject}
            </Heading>
            <Text style={intro}>
              New message from {name} via the Arizona Seals website. Reply
              directly to reach them.
            </Text>

            <Section style={card}>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
                style={fieldsTable}
              >
                <tbody>
                  <Field label="Name">
                    <Text style={fieldValue}>{name}</Text>
                  </Field>
                  <Field label="Email" last={!phone}>
                    <Link href={`mailto:${email}`} style={fieldLink}>
                      {email}
                    </Link>
                  </Field>
                  {phone ? (
                    <Field label="Phone" last>
                      <Link
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        style={fieldLink}
                      >
                        {phone}
                      </Link>
                    </Field>
                  ) : null}
                </tbody>
              </table>
            </Section>

            <Text style={messageLabel}>Message</Text>
            <Text style={messageBody}>{message}</Text>

            <Section style={ctaWrap}>
              <Link
                href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}`}
                style={cta}
              >
                Reply to {firstName}
              </Link>
            </Section>

            <Text style={hint}>
              Or use Reply in your email client — responses go to the person who
              submitted the form.
            </Text>
          </Section>

          <Hr style={footerRule} />

          <Section style={footer}>
            <Text style={footerText}>
              Sent from the Arizona Seals website
              <br />
              Team inbox: info@arizonaseals.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ContactFormNotification.PreviewProps = {
  name: "Jordan Rivera",
  email: "jordan.rivera@example.com",
  phone: "(520) 555-0142",
  subject: "Schedule a Tryout",
  message:
    "Hi! My daughter is 12 and currently swims with another club. We're interested in scheduling a tryout for the age-group program this spring. What dates do you have available?",
} satisfies ContactFormNotificationProps;

export default ContactFormNotification;

const body: CSSProperties = {
  backgroundColor: brand.page,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: "32px 14px",
};

const container: CSSProperties = {
  backgroundColor: brand.paper,
  border: `1px solid ${brand.border}`,
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
};

const header: CSSProperties = {
  backgroundColor: brand.black,
  padding: "24px 28px 20px",
  textAlign: "center",
};

const logo: CSSProperties = {
  display: "block",
  margin: "0 auto 10px",
};

const headerLabel: CSSProperties = {
  color: "#5ec9f2",
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  margin: 0,
  textTransform: "uppercase",
};

const accentLine: CSSProperties = {
  backgroundColor: brand.cyan,
  height: "3px",
  lineHeight: "3px",
  fontSize: "3px",
};

const content: CSSProperties = {
  padding: "28px 32px 8px",
};

const title: CSSProperties = {
  color: brand.navy,
  fontSize: "24px",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: "1.25",
  margin: "0 0 10px",
};

const intro: CSSProperties = {
  color: brand.muted,
  fontSize: "14px",
  lineHeight: "1.55",
  margin: "0 0 22px",
};

const card: CSSProperties = {
  backgroundColor: brand.soft,
  border: `1px solid ${brand.border}`,
  padding: "6px 18px",
};

const fieldsTable: CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
};

const labelCell: CSSProperties = {
  borderBottom: `1px solid ${brand.border}`,
  color: brand.muted,
  fontSize: "12px",
  fontWeight: 700,
  padding: "12px 14px 12px 0",
  verticalAlign: "top",
  width: "88px",
};

const valueCell: CSSProperties = {
  borderBottom: `1px solid ${brand.border}`,
  padding: "12px 0",
  verticalAlign: "top",
};

const fieldValue: CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "1.4",
  margin: 0,
};

const fieldLink: CSSProperties = {
  color: brand.cyan,
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "1.4",
  textDecoration: "underline",
};

const messageLabel: CSSProperties = {
  color: brand.text,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  margin: "22px 0 8px",
  textTransform: "uppercase",
};

const messageBody: CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  lineHeight: "1.65",
  margin: "0 0 8px",
  whiteSpace: "pre-wrap",
};

const ctaWrap: CSSProperties = {
  padding: "26px 0 0",
  textAlign: "center",
};

const cta: CSSProperties = {
  backgroundColor: brand.navy,
  color: brand.paper,
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 22px",
  textDecoration: "none",
};

const hint: CSSProperties = {
  color: brand.muted,
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "14px 0 18px",
  textAlign: "center",
};

const footerRule: CSSProperties = {
  borderColor: brand.border,
  borderTop: `1px solid ${brand.border}`,
  margin: "0 32px",
};

const footer: CSSProperties = {
  padding: "16px 32px 24px",
  textAlign: "center",
};

const footerText: CSSProperties = {
  color: brand.muted,
  fontSize: "12px",
  lineHeight: "1.55",
  margin: 0,
};
