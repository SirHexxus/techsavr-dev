import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  colors: {
    navy: '#001f3f',
    blue: '#0074D9',
    aqua: '#7FDBFF',
    teal: '#39CCCC',
    olive: '#3D9970',
    newGreen: '#2ECC40',
    lime: '#01FF70',
    yellow: '#FFDC00',
    orange: '#FF851B',
    newRed: '#FF4136',
    maroon: '#85144b',
    fuschia: '#F012BE',
    purple: '#B10DC9',
    black: '#111111',
    grey: '#AAAAAA',
    silver: '#DDDDDD',
    white: '#FFFFFF',
    logo: '#3d0568'
  }
});

export default theme;
