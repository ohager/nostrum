import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import autoprefixer from "autoprefixer";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
