import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
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
        50: '#fdf8f4',
        100: '#fdf7f2',
        200: '#fdf6f1',
        300: '#e4ddd9',
        400: '#cac5c1',
        500: '#b1aca9',
        600: '#989491',
        700: '#7f7b79',
        750: '#656260',
        800: '#4c4a48',
        850: '#333130',
        900: '#191918',
        950: '#000000',
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
