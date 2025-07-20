import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";

export const styles = {
  logo: {
    width: 80,
  },
  heading: {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
    padding: "17px 0 0",
  },
  paragraph: {
    margin: "0 0 15px",
    fontSize: "15px",
    lineHeight: "1.4",
    color: "#3c4149",
  },
  buttonContainer: {
    padding: "27px 0 27px",
  },
  button: {
    backgroundColor: "#B80208",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "11px 23px",
  },
  code: {
    fontFamily: "monospace",
    fontWeight: "700",
    padding: "1px 4px",
    backgroundColor: "#dfe1e4",
    letterSpacing: "-0.3px",
    fontSize: "21px",
    borderRadius: "4px",
    color: "#3c4149",
  },

  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
  },

  hr: {
    borderColor: "#dfe1e4",
    margin: "42px 0 26px",
  },

  reportLink: {
    fontSize: "14px",
    color: "#b4becc",
  },
};

export const appBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? `https://www.cartwayhq.com`
    : "http://localhost:3000";

export const BaseEmailTemplate = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Html>
    <Head />
    <Preview>{title}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img
          src="https://uuggxtszhitznobhirpd.supabase.co/storage/v1/object/public/payment_proof/cw-logo-red.png"
          width="80"
          alt="Cartway"
          style={styles.logo}
        />

        {children}

        <Hr style={styles.hr} />
        <Link href={appBaseUrl()} style={styles.reportLink}>
          Cartway {new Date().getFullYear()}
        </Link>
      </Container>
    </Body>
  </Html>
);
