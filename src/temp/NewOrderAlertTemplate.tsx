import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewOrderAlertEmailProps {
  orderId: string;
  name: string;
  phone: string;
  email: string;
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  width: 80,
  // height: 42,
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px",
  color: "#b80208",
};

const NewOrderAlertEmail = ({
  orderId,
  name,
  phone,
  email,
}: NewOrderAlertEmailProps) => (
  <Html>
    <Head />
    <Preview>New Order Alert - Order #{orderId}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://uuggxtszhitznobhirpd.supabase.co/storage/v1/object/public/payment_proof/cw-logo-red.png"
          width="80"
          // height="42"
          alt="Cartway"
          style={logo}
        />
        <Heading style={heading}>New Order Alert</Heading>
        <Text style={paragraph}>
          A new order has been placed on your website. Here are the details:
        </Text>

        <Section>
          <Text style={sectionTitle}>Order Information</Text>
          <Text style={paragraph}>
            <strong>Order ID:</strong> {orderId}
          </Text>
        </Section>

        <Hr style={hr} />

        <Section>
          <Text style={sectionTitle}>Customer Details</Text>
          <Text style={paragraph}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={paragraph}>
            <strong>Phone:</strong> {phone}
          </Text>
          <Text style={paragraph}>
            <strong>Email:</strong> {email}
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={paragraph}>
          Please process this order as soon as possible. If you have any
          questions, please contact the customer using the provided information.
        </Text>

        <Text style={paragraph}>
          Thank you for your prompt attention to this matter.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewOrderAlertEmail;
