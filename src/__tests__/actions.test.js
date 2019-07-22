import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { set_event } from '../actions';
import { START, SPAN, STOP, DATA } from '../actions/types';

const initial_state = {
  events: { start: {}, span: {}, stop: {}, data: [] },
};

const mockStore = configureStore([thunk]);

describe('actions', () => {
  describe('set start', () => {
    const store = mockStore(initial_state);

    store.dispatch(set_event({ type: START, test: ['test_data'] }));

    const actions = store.getActions();
    const expected_payload = { type: START, data: { type: START, test: ['test_data'] } };

    it('should dispatch action', () => {
      expect(actions).toEqual([expected_payload]);
    });
  });

  describe('set span', () => {
    const store = mockStore(initial_state);

    store.dispatch(set_event({ type: SPAN, begin: 123, end: 456 }));

    const actions = store.getActions();
    const expected_payload = { type: SPAN, data: { type: SPAN, begin: 123, end: 456 } };

    it('should dispatch action', () => {
      expect(actions).toEqual([expected_payload]);
    });
  });

  describe('set stop', () => {
    const store = mockStore(initial_state);

    store.dispatch(set_event({ type: STOP, timestamp: 456 }));

    const actions = store.getActions();
    const expected_payload = { type: STOP, data: { type: STOP, timestamp: 456 } };

    it('should dispatch action', () => {
      expect(actions).toEqual([expected_payload]);
    });
  });

  describe('set data', () => {
    const store = mockStore({
      events: {
        start: { test: ['test_data'] },
        span: { begin: 123, end: 456 },
        stop: {},
        data: [],
      },
    });

    store.dispatch(set_event({ type: DATA, timestamp: 123, test_data: '' }));

    const actions = store.getActions();
    const expected_payload = { type: DATA, data: { type: DATA, timestamp: 123, test_data: '' } };

    it('should dispatch action', () => {
      expect(actions).toEqual([expected_payload]);
    });
  });
});
