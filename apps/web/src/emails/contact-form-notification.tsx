import type { CSSProperties } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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

const brand = {
  navy: "#1b3a6b",
  cyan: "#006f9a",
  foreground: "#0f1c2e",
  muted: "#4a5a6a",
  surface: "#e8eff5",
  accent: "#e8f6fd",
  white: "#ffffff",
  border: "#c5d0db",
} as const;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={detailRow}>
      <Text style={detailLabel}>{label}</Text>
      <Text style={detailValue}>{value}</Text>
    </Section>
  );
}

export function ContactFormNotification({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormNotificationProps) {
  const preview = `${name} · ${subject}`;

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={eyebrow}>Arizona Seals Swimming</Text>
            <Heading as="h1" style={title}>
              New contact message
            </Heading>
            <Text style={headerSub}>
              Someone reached out through the website contact form.
            </Text>
          </Section>

          <Section style={badgeWrap}>
            <Text style={badge}>{subject}</Text>
          </Section>

          <Section style={card}>
            <DetailRow label="Name" value={name} />
            <Hr style={divider} />
            <DetailRow label="Email" value={email} />
            {phone ? (
              <>
                <Hr style={divider} />
                <DetailRow label="Phone" value={phone} />
              </>
            ) : null}
          </Section>

          <Section style={messageCard}>
            <Text style={detailLabel}>Message</Text>
            <Text style={messageBody}>{message}</Text>
          </Section>

          <Section style={ctaSection}>
            <Link
              href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
              style={cta}
            >
              Reply to {name}
            </Link>
            <Text style={hint}>
              Or hit Reply in your email client — replies go to the sender.
            </Text>
          </Section>

          <Hr style={footerDivider} />
          <Text style={footer}>
            Sent from the Arizona Seals website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactFormNotification;

const body: CSSProperties = {
  backgroundColor: brand.surface,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: "32px 16px",
};

const container: CSSProperties = {
  backgroundColor: brand.white,
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
  border: `1px solid ${brand.border}`,
};

const header: CSSProperties = {
  backgroundColor: brand.navy,
  padding: "32px 28px 28px",
};

const eyebrow: CSSProperties = {
  color: "#5ec9f2",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  margin: "0 0 12px",
  textTransform: "uppercase",
};

const title: CSSProperties = {
  color: brand.white,
  fontSize: "28px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: "1.15",
  margin: "0 0 10px",
};

const headerSub: CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: 0,
};

const badgeWrap: CSSProperties = {
  padding: "24px 28px 0",
};

const badge: CSSProperties = {
  backgroundColor: brand.accent,
  borderRadius: "999px",
  color: brand.cyan,
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  margin: 0,
  padding: "8px 14px",
  textTransform: "uppercase",
};

const card: CSSProperties = {
  backgroundColor: brand.white,
  padding: "20px 28px 8px",
};

const detailRow: CSSProperties = {
  margin: 0,
  padding: "10px 0",
};

const detailLabel: CSSProperties = {
  color: brand.muted,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  margin: "0 0 4px",
  textTransform: "uppercase",
};

const detailValue: CSSProperties = {
  color: brand.foreground,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "1.4",
  margin: 0,
};

const divider: CSSProperties = {
  borderColor: brand.border,
  borderTop: `1px solid ${brand.border}`,
  margin: 0,
};

const messageCard: CSSProperties = {
  backgroundColor: brand.accent,
  borderRadius: "12px",
  margin: "8px 28px 0",
  padding: "20px",
};

const messageBody: CSSProperties = {
  color: brand.foreground,
  fontSize: "15px",
  lineHeight: "1.65",
  margin: 0,
  whiteSpace: "pre-wrap",
};

const ctaSection: CSSProperties = {
  padding: "28px",
  textAlign: "center",
};

const cta: CSSProperties = {
  backgroundColor: brand.cyan,
  borderRadius: "8px",
  color: brand.white,
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  padding: "14px 24px",
  textDecoration: "none",
  textTransform: "uppercase",
};

const hint: CSSProperties = {
  color: brand.muted,
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "14px 0 0",
};

const footerDivider: CSSProperties = {
  borderColor: brand.border,
  borderTop: `1px solid ${brand.border}`,
  margin: "0 28px",
};

const footer: CSSProperties = {
  color: brand.muted,
  fontSize: "12px",
  lineHeight: "1.5",
  margin: 0,
  padding: "20px 28px 28px",
  textAlign: "center",
};
