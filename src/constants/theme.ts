import {createTheme} from '@mui/material/styles';
import '@fontsource/rubik/latin-400.css';
import '@fontsource/rubik/latin-500.css';
import '@fontsource/rubik/latin-700.css';

const theme = createTheme({
  // palette 调色板
  // 调色板颜色由四个标记表示：
  // main：颜色的主要色调
  // light：颜色较浅main
  // dark: 颜色较深main
  // contrastText：文本颜色，旨在与main
  // 该主题公开以下默认调色板颜色（可在 下访问theme.palette.*）：
  // primary- 用于主要界面元素。
  // secondary- 用于辅助界面元素。
  // error- 用户应该注意的元素。
  // warning- 潜在危险的行为或重要消息。
  // info- 用于突出显示中性信息。
  // success- 用于指示用户触发的操作成功完成。
  // palette: {
  // mode: 'dark', // 深色模式
  //   primary: {
  //     main: '#FF5733',
  //     light: will be calculated from palette.primary.main,
  //     dark: will be calculated from palette.primary.main,
  //     contrastText: will be calculated to contrast with palette.primary.main
  //   },
  //   secondary: {
  //     main: '#E0C2FF',
  //     light: '#F5EBFF',
  //     dark: will be calculated from palette.secondary.main,
  //     contrastText: '#47008F',
  //   },
  // },
  // 板式配置
  typography: {
    // fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(','),
    fontFamily: ['Rubik'].join(','),
    h1: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.185,
    },
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    // fontSize: 12,
    // Tell Material UI what the font-size on the html element is.
    // htmlFontSize: 10,
    // Variants 13 种变量配置
    // subtitle1: {
    //   fontSize: 12,
    // },
    // body1: {
    //   fontWeight: 500,
    // },
    // button: {
    //   fontStyle: 'italic',
    // },
  },
  // spacing 间距配置
  // spacing: 4,
  // breakpoints 断点设置
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  //   values: {
  //     mobile: 0,
  //     tablet: 640,
  //     laptop: 1024,
  //     desktop: 1200,
  //   },
  // },
  // 组件样式覆盖配置
  // components: {
  // 使用板式中的默认样式覆盖组件中的字体样式
  // MuiCssBaseline: {
  //   styleOverrides: `
  //     @font-face {
  //       font-family: 'Rubik';
  //       font-style: normal;
  //       font-display: swap;
  //       font-weight: 400;
  //       src: local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2');
  //       unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  //     }
  //   `,
  // },
  // Density 组件全局间距（密度）设置
  // MuiButton: {
  //   defaultProps: {
  //     size: 'small',
  //     The props to change the default for.
  //     disableRipple: true, // No more ripple, on the whole application 💣!
  //   },
  //   样式覆盖
  //   styleOverrides: {
  //     Name of the slot
  //     root: {
  //       Some CSS
  //       fontSize: '1rem',
  //     },
  //   },
  //   变量覆盖
  //   variants: [
  //     {
  //       props: {variant: 'dashed'},
  //       style: {
  //         textTransform: 'none',
  //         border: `2px dashed ${blue[500]}`,
  //       },
  //     },
  //     {
  //       props: {variant: 'dashed', color: 'secondary'},
  //       style: {
  //         border: `4px dashed ${red[500]}`,
  //       },
  //     },
  //   ],
  // },
  // MuiFilledInput: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiFormControl: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiFormHelperText: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiIconButton: {
  //   defaultProps: {
  //     size: 'small',
  //   },
  // },
  // MuiInputBase: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiInputLabel: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiListItem: {
  //   defaultProps: {
  //     dense: true,
  //   },
  // },
  // MuiOutlinedInput: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiFab: {
  //   defaultProps: {
  //     size: 'small',
  //   },
  // },
  // MuiTable: {
  //   defaultProps: {
  //     size: 'small',
  //   },
  // },
  // MuiTextField: {
  //   defaultProps: {
  //     margin: 'dense',
  //   },
  // },
  // MuiToolbar: {
  //   defaultProps: {
  //     variant: 'dense',
  //   },
  // },
  // },
});
export {theme};
