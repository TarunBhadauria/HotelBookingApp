/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-cover": "url('src/assets/images/hotel/bedroom_1.jpg')",
      },
    },
    colors: {
      black: "",
      white: "#ffffff",
      hotPink: {
        25: "#ff385c", // airbnb logo
        50: "#ff3b5e", // search icon
        75: "#e51d4f", // for gradient of login button
        100: "#d70565", // for gradient of login button
      },
      gray: {
        5: "#e5e5e5",
        10: "#f7f7f7",
        25: "#eeeeee",
        50: "717171",
        75: "#afafaf",
        100: "#b0b0b0",
        125: "#909090",
      },

      richBlack: {
        25: "#5b5b5b", // for unhighlighted icons below navbar
        50: "#373737", // Third section of nabar
        75: "#262626", // Mid section of navbar
        100: "#1b1b1b", // for highlighted icons below navbar
        125: "#232426", // for heading & price of hotel card
        150: "#222222", // for footer and buttons/icons
        175: "#484848", // for dark text and navbar buttons
      },
    },
  },
  plugins: [],
};
