import { PaletteOptions } from '@material-ui/core/styles/createPalette';

/**
 * A weathered red and yellow palette
 */
export const paletteOptions: PaletteOptions = {
  primary: {
    // primary light and dark are calculated from main
    main: '#9d0a0e',
  },
  secondary: {
    // light and dark calculated from main
    main: '#ebe466'
  },
  // used to maximize contrast between background and text
  contrastThreshold: 3,
};
