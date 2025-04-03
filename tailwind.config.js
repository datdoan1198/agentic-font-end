/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        red: {
          95: "#ffe6e6",
          75: "#ff8080",
          70: "#ff6666",
          65: "#ff4d4d",
          60: "#ff3333",
          55: "#ff1a1a",
          50: "#ff0000",
          45: "#e60000",
          40: "#cc0000",
          35: "#b30000",
          30: "#990000",
          25: "#800000",
        },
        blue: {
          95: "#E9F3FF",
          90: "#ccebff",
          85: "#b3e0ff",
          80: "#99d6ff",
          70: "#66a3ff",
          65: "#4d94ff",
          60: "#3385ff",
          55: "#1a75ff",
          50: "#0066ff",
          45: "#005ce6",
          40: "#0052cc",
          35: "#0047b3",
          30: "#003d99",
          25: "#003380",
        },
        green: {
          95: "#ccffcc",
          75: "#99e699",
          70: "#85e085",
          65: "#70db70",
          60: "#5cd65c",
          55: "#47d147",
          50: "#33cc33",
          45: "#2eb82e",
          40: "#29a329",
          35: "#248f24",
          30: "#1f7a1f",
          25: "#196619",
        },
        gray: {
          120: "#F9F9F9",
          115: "#fcfcfc",
          110: "#f1f1f4d6",
          100: "#ffffff",
          95: "#f2f2f2",
          90: "#e6e6e6",
          85: "#d9d9d9",
          80: "#cccccc",
          75: "#bfbfbf",
          70: "#b3b3b3",
          65: "#a6a6a6",
          60: "#999999",
          55: "#8c8c8c",
          50: "#808080",
          45: "#737373",
          40: "#666666",
          35: "#595959",
          30: "#4d4d4d",
          25: "#404040",
          20: "#5c5c5c",
        },
        black: {
          110: "#6c5ffc0d",
          75: "#bfbfbf",
          70: "#b3b3b3",
          65: "#a6a6a6",
          60: "#999999",
          55: "#8c8c8c",
          50: "#808080",
          45: "#737373",
          40: "#666666",
          35: "#595959",
          30: "#4d4d4d",
          25: "#404040",
          20: "#333333",
          15: "#262626",
          10: "#1a1a1a",
          0: "#000000",
        },
        orange: {
          95: "#fff6e6",
          75: "#ffd280",
          70: "#ffc966",
          65: "#ffc14d",
          60: "#ffb833",
          55: "#ffaf1a",
          50: "#ffa600",
          45: "#e69500",
          40: "#cc8500",
          35: "#b37400",
          30: "#996300",
          25: "#805300",
        },
        branda: {
          base: "#90278F",
          500: "#9C2B94",
          400: "#AC48A3",
          300: "#BB68B3",
          200: "#CF92C9",
          100: "#E2BDDE",
          50: "#F3E5F1"
        },
        brandb: {
          base: "#29A8DF",
          500: "#239BD1",
          400: "#3EB5E3",
          300: "#5BC2E6",
          200: "#85D3ED",
          100: "#B4E5F4",
          50: "#E1F5FB"
        },
      },
      keyframes: {
        subWrap: {
          from: {
            left: '70px',
            opacity: 0
          },
          to: {
            left: '64px',
            opacity: 1
          }
        }
      },
      animation: {
        'sub-wrap': 'subWrap 0.3s',
      },
      screens: {
        'max-sm': { 'max': '639px' },  
      },
      boxShadow: {
        'card-box': '0px 3px 4px 0px rgba(0, 0, 0, 0.03)',
        'img': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        'card-right': '3px 0 3px 0px #00000033'
      },
      background: {
        'card': 'hsla(0,0%,100%,.48)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

