import { mount } from '@vue/test-utils';
import DefaultLayout from './DefaultLayout.vue';

describe('Initial configuration test', () => {
  it('should render Sidebar component', () => {
    const wrapper = mount(DefaultLayout);
    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true);
  });
});
