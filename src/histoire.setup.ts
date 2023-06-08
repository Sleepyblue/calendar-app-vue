import { createPinia } from 'pinia';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import '@/assets/main.css';

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  const pinia = createPinia();
  app.use(pinia);
});
