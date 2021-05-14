import { Heading } from "@chakra-ui/react";
import React from "react";

function SectionHeading({ text }: { text: string }) {
  return (
    <Heading textAlign="center" mt={3}>
      {text}
    </Heading>
  );
}

export default SectionHeading;
