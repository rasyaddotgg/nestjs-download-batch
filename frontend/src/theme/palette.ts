import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#FFE8E8',
  light: '#F0B1B1',
  main: '#CE2424',
  dark: '#9E1B1B',
  darker: '#7A1515',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D7DBEE',
  light: '#BDC2E3',
  main: '#3949AB',
  dark: '#2F3D8E',
  darker: '#1C2455',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D2E7FA',
  light: '#B4D7F6',
  main: '#1E88E5',
  dark: '#145A98',
  darker: '#0F4472',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E3F4DC',
  light: '#BAE2AC',
  main: '#49B522',
  dark: '#378C17',
  darker: '#1E510D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FEEDD7',
  light: '#FDD5A2',
  main: '#FB8C00',
  dark: '#CC7200',
  darker: '#9E5800',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#F4D7DC',
  light: '#E1AAB3',
  main: '#A5001B',
  dark: '#8A0017',
  darker: '#53000E',
  contrastText: '#fff',
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
