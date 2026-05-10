/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Carbon Design System — https://carbondesignsystem.com/elements/color/overview/
        'gray-10':  '#f4f4f4',
        'gray-20':  '#e0e0e0',
        'gray-30':  '#c6c6c6',
        'gray-40':  '#a8a8a8',
        'gray-50':  '#8d8d8d',
        'gray-60':  '#6f6f6f',
        'gray-70':  '#525252',
        'gray-80':  '#393939',
        'gray-90':  '#262626',
        'gray-100': '#161616',
        'blue-10':  '#edf5ff',
        'blue-20':  '#d0e2ff',
        'blue-30':  '#a6c8ff',
        'blue-40':  '#78a9ff',
        'blue-50':  '#4589ff',
        'blue-60':  '#0f62fe',
        'blue-70':  '#0043ce',
        'green-10': '#defbe6',
        'green-20': '#a7f0ba',
        'green-40': '#42be65',
        'green-50': '#24a148',
        'green-60': '#198038',
        'teal-10':  '#d9fbfb',
        'teal-40':  '#08bdba',
        'teal-60':  '#007d79',
        'red-10':   '#fff1f1',
        'red-40':   '#ff8389',
        'red-60':   '#da1e28',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
