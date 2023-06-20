import { mount } from '@vue/test-utils';
import EventCard from './EventCard.vue';
import EventModal from '@/components/atoms/EventModal';

describe('EventCard', () => {
  it('should render a card displaying the correct title', () => {
    const wrapper = mount(EventCard, {
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 9,
      },
    });

    expect(wrapper.find('p').text()).toEqual('Event Card Test');
  });

  it('should render a card displaying the correct hour format', () => {
    const wrapper = mount(EventCard, {
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 9,
      },
    });

    expect(wrapper.find('p:nth-child(2)').text()).toEqual('9:00 AM');
  });

  it('should render a card displaying the correct hour range format', () => {
    const wrapper = mount(EventCard, {
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 15,
      },
    });

    expect(wrapper.find('p:nth-child(2)').text()).toEqual('9:00 AM - 3:00 PM');
  });

  it('should show the event modal after clicking the card', async () => {
    const wrapper = mount(EventCard, {
      global: {
        stubs: {
          EventModal: true,
        },
      },
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 15,
      },
    });

    expect(wrapper.findComponent(EventModal).exists()).toBe(false);

    await wrapper.trigger('click');
    expect(wrapper.findComponent(EventModal).exists()).toBe(true);
  });

  it('should show the edit event modal after clicking the card', async () => {
    const wrapper = mount(EventCard, {
      global: {
        stubs: {
          EventModal: true,
        },
      },
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 15,
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.findComponent(EventModal).attributes('edit')).toBe('true');
  });

  it('should pass the correct data to the edit event modal props', async () => {
    const wrapper = mount(EventCard, {
      global: {
        stubs: {
          EventModal: true,
        },
      },
      props: {
        eventDate: '2023-06-20',
        eventId: 'card-id',
        eventTitle: 'Event Card Test',
        eventStartHour: 9,
        eventEndHour: 15,
      },
    });

    const cardProps = Object.keys(wrapper.props()).map(
      (key) => wrapper.props()[key]
    );

    await wrapper.trigger('click');

    const modalProps = Object.keys(
      wrapper.findComponent(EventModal).props()
    ).map((key) => wrapper.findComponent(EventModal).props()[key]);

    expect(modalProps).toEqual(expect.arrayContaining(cardProps));
  });
});
