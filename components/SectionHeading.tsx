import { Heading } from "@chakra-ui/react";
import React from "react";
import classes from "./SectionHeading.module.css";
function SectionHeading({ text }: { text: string }) {
  return (
    <Heading textAlign="center" className={classes.animatedText} mt={3}>
      {text}
    </Heading>
  );
}

export default SectionHeading;
