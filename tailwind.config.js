module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-layer-1": "var(--bg-layer-1)",
        "bg-layer-2": "var(--bg-layer-2)",
      },
    },
  },
  plugins: [],
};
