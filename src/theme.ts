import { createTheme } from "@mui/material";
import React from "react";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    tinypoints: React.CSSProperties;
    primaryname: React.CSSProperties;
    secondaryname: React.CSSProperties;
    unobtrusive: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tinypoints?: React.CSSProperties;
    primaryname?: React.CSSProperties;
    secondaryname?: React.CSSProperties;
    unobtrusive?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tinypoints: true;
    primaryname: true;
    secondaryname: true;
    unobtrusive: true;
  }
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    tinypoints: {
      fontSize: '0.7rem',
    },
    primaryname: {
      fontSize: '1.2rem',
    },
    secondaryname: {
      fontSize: '0.9rem',
    },
    unobtrusive: {
      textDecoration: 'none',
      fontSize: '0.7rem',
      color: 'gray',
      cursor: 'pointer',
    },
  }
});

export default darkTheme;