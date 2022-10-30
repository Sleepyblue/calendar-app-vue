import { mount } from '@vue/test-utils';
import Calendar from './Calendar.vue';

describe('Initial configuration test', () => {
  it('should render Sidebar component', () => {
    const wrapper = mount(Calendar);
    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true);
  });
});
