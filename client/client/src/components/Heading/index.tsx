// React Imports
import * as React from "react";
// MUI Imports
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

const root = {
  fontSize: "25px",
  fontWeight: "700",
  whiteSpace: "wrap !important",
  color: "#49454F",

  "@media screen and (max-width: 425px)": {
    fontSize: "18px",
  },

  "@media screen and (max-width: 375px)": {
    fontSize: "15px",
  },
};

const subRoot = {
  fontSize: "15px",
  fontWeight: "500",
  whiteSpace: "wrap !important",
  color: "#49454F",

  "@media screen and (max-width: 425px)": {
    fontSize: "12px",
  },

  "@media screen and (max-width: 320px)": {
    fontSize: "12px",
  },
};

interface HeadingProps {
  children?: React.ReactNode;
  sx?: SxProps;
}

export const Heading = (props: HeadingProps) => {
  const styles: any = props.sx;
  return <Box sx={{ ...root, ...styles }}>{props.children}</Box>;
};

export const SubHeading = (props: HeadingProps) => {
  const styles: any = props.sx;
  return <Box sx={{ ...subRoot, ...styles }}>{props.children}</Box>;
};
