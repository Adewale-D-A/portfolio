import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import { appBaseUrl, BaseEmailTemplate, styles } from "@/temp/utils";

interface OrderCreatedEmailProps {
  orderId: string;
}

export const OrderCreatedEmail = ({ orderId }: OrderCreatedEmailProps) => (
  <BaseEmailTemplate title="Your Order has been received">
    <Heading style={styles.heading}>Your Order has been received</Heading>
    <code style={styles.code}>{orderId}</code>
    <Text style={styles.paragraph}>
      We have received your order and is pending confirmation. You can track
      your order on the website by clicking the button below.
    </Text>
    <Section style={styles.buttonContainer}>
      <Button
        style={styles.button}
        href={`${appBaseUrl()}/track-order/${orderId}`}
      >
        Track your order
      </Button>
    </Section>
  </BaseEmailTemplate>
);

// LinearLoginCodeEmail.PreviewProps = {
//   validationCode: "tt226-5398x",
// } as LinearLoginCodeEmailProps;

export default OrderCreatedEmail;
