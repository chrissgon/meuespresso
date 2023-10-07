import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        default: {
          "50": "#fcfcea",
          "100": "#f9f6c8",
          "200": "#f5ec93",
          "300": "#efdb55",
          "400": "#e8c727",
          "500": "#d9b019",
          "600": "#af8112",
          "700": "#956413",
          "800": "#7c4f17",
          "900": "#6a4119",
          "950": "#3d230b",
        },
      },
    },
  },
};
