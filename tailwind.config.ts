import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
