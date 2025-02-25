import React from 'react';
import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

export const themeModes = {
  dark: 'dark',
  light: 'light',
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: '#3E7B27',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#123524',
              contrastText: '#ffffff',
            },
            background: {
              default: '#000000',
              paper: '#131313',
            },
          }
        : {
            primary: {
              main: '#3E7B27',
            },
            secondary: {
              main: '#123524',
            },
            background: {
              default: colors.grey['100'],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
