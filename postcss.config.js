export default {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.ts'
    },
    autoprefixer: {},
  },
  map: {
    inline: false,
    annotation: true,
    sourcesContent: false
  }
}
