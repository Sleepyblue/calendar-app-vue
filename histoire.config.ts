import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';
import { tailwindTokens } from 'histoire/dist/node/builtin-plugins/tailwind-tokens';

export default defineConfig({
  plugins: [HstVue(), tailwindTokens({ configFile: '' })],
  setupFile: '/src/histoire.setup.ts',
  tree: {
    groups: [
      {
        id: 'atoms',
        title: 'Atoms',
      },
      {
        id: 'molecules',
        title: 'Molecules',
      },
      {
        id: 'organisms',
        title: 'Organisms',
      },
      {
        id: 'templates',
        title: 'Templates',
      },
      {
        id: 'pages',
        title: 'Pages',
      },
    ],
  },
  theme: {
    title: 'Calendar Application',
    colors: {
      gray: {
        50: '#ffffff',
        100: '#fdf7f2',
        200: '#b4b1b6',
        300: '#a19ea4',
        400: '#8e8b92',
        500: '#7b7780',
        600: '#69646d',
        700: '#56505b',
        750: '#433d49',
        800: '#3c3742',
        850: '#36313a',
        900: '#2f2b33',
        950: '#28252c',
      },
      primary: {
        50: '#ffdfb9',
        100: '#ffd9ae',
        200: '#ffd4a2',
        300: '#ffce97',
        400: '#FFC98B',
        500: '#e6b57d',
        600: '#cca16f',
        700: '#b38d61',
        800: '#997953',
        900: '#806546',
      },
    },
  },
});
