import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    tinypoints: React.CSSProperties;
    teamname: React.CSSProperties;
    username: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tinypoints?: React.CSSProperties;
    teamname?: React.CSSProperties;
    username?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tinypoints: true;
    teamname: true;
    username: true;
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
    teamname: {
      fontSize: '1.2rem',
    },
    username: {
      fontSize: '0.9rem',
    }
  }
});

export default darkTheme;