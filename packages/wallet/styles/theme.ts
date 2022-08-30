const theme = {
  colors: {
    white: '#FFFFFF',
    bluegrey: {
      dark: '#313A45',
      main: '#465365',
      sub: '#737E91',
      light: '#D7DBE0',
      pale: '#F3F4F6',
    },
    darkgrey: {
      light: '#A1B2BE',
      pale: '#919DB6',
      main: '#3A4044',
      sub: '#748089',
      dark: '#060607',
    },
    mediumgrey: {
      main: '#D9E0E5',
      dark: '#B9C5CE',
      sub: '#EAEEF1',
    },
    lightgrey: {
      main: '#FAFBFC',
    },
    primary: {
      main: '#195DEE',
      pale: '#F0F5FF',
    },
  },
  evaluation: {
    level5: '0px 10px 15px rgba(54, 62, 76, 0.3), 0px 10px 15px rgba(54, 62, 76, 0.1), 0px 15px 40px rgba(54, 62, 76, 0.2)',
  },
  spacing: {
    small: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
    },
    medium: {
      1: '16px',
      2: '32px',
      3: '48px',
      4: '64px',
      5: '80px',
      6: '96px',
    },
  },
};

type ThemeType = typeof theme;

export default theme;
export type { ThemeType };
