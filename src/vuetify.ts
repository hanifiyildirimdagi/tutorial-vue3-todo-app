import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import { VDataTable } from "vuetify/labs/VDataTable";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const defaultTheme = {
  dark: true,
  colors: {
    primary: "#9155FD",
    secondary: "#8A8D93",
    "on-secondary": "#fff",
    success: "#56CA00",
    info: "#16B1FF",
    warning: "#FFB400",
    error: "#FF4C51",
    "on-primary": "#FFFFFF",
    "on-success": "#FFFFFF",
    "on-warning": "#FFFFFF",
    background: "#28243D",
    "on-background": "#E7E3FC",
    surface: "#312D4B",
    "on-surface": "#E7E3FC",
    "grey-50": "#2A2E42",
    "grey-100": "#2F3349",
    "grey-200": "#4A5072",
    "grey-300": "#5E6692",
    "grey-400": "#7983BB",
    "grey-500": "#8692D0",
    "grey-600": "#AAB3DE",
    "grey-700": "#B6BEE3",
    "grey-800": "#CFD3EC",
    "grey-900": "#E7E9F6",
  },
};

export const CustomVuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
  theme: {
    defaultTheme: "defaultTheme",
    themes: {
      defaultTheme,
    },
  },
});
