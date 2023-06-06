const useCalendarStore = vi.fn();
vi.mock('@/stores/calendarStore', () => {
  return {
    useCalendarStore,
  };
});

import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import EventModal from '.';

describe('EventModal', () => {
  beforeEach(() => {
    useCalendarStore.mockReturnValue({
      events: ref([]),
    });
  });

  it('should show the event modal if show prop is true', () => {
    const wrapper = mount(EventModal, {
      props: {
        show: true,
      },
    });

    console.log(wrapper.html());
  });
});
