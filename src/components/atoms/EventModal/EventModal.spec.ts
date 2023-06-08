const { useCalendarStore } = vi.hoisted(() => {
  return { useCalendarStore: vi.fn() };
});

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

  it('should add the "open" attribute to the dialog element if "show" prop is true', () => {
    const wrapper = mount(EventModal, {
      global: {
        stubs: ['teleport'],
      },
      props: {
        show: true,
      },
    });

    expect(wrapper.find('dialog').attributes()).toHaveProperty('open');
  });

  it('should remove the "open" attribute from the dialog element if "show" prop is false', () => {
    const wrapper = mount(EventModal, {
      global: {
        stubs: ['teleport'],
      },
      props: {
        show: false,
      },
    });

    expect(wrapper.find('dialog').attributes()).not.toHaveProperty('open');
  });

  it('should have the form inputs blank if none of the optional props are passed', () => {
    const wrapper = mount(EventModal, {
      global: {
        stubs: ['teleport'],
      },
      props: {
        show: true,
      },
    });

    expect(
      wrapper.findAll('input').map((input) => input.element.value)
    ).toMatchObject(['', '', '']);
  });
});
