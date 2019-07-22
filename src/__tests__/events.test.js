import events from '../reducers/events';
import { START, SPAN, DATA, STOP } from '../actions/types';

const initial_state = {
  start: {},
  span: {},
  stop: {},
  data: [],
};

describe('events reducer', () => {
  describe('start event', () => {
    const expected_state = {
      ...initial_state,
      start: {
        type: START,
        test: 'test data',
      },
    };

    it('should define new fields', () => {
      const reducer = events(initial_state, {
        type: START,
        data: {
          type: START,
          test: 'test data',
        },
      });

      expect(reducer).toEqual(expected_state);
    });

    it('should erase old state and start new sequence', () => {
      const reducer = events(
        {
          old_state: 'old_state',
        },
        {
          type: START,
          data: {
            type: START,
            test: 'test data',
          },
        },
      );

      expect(reducer).toEqual(expected_state);
    });
  });

  describe('span event', () => {
    it('should define begin and end values', () => {
      const expected_state = {
        ...initial_state,
        span: { type: SPAN, timestamp: 0, begin: 1, end: 2 },
      };

      const reducer = events(initial_state, {
        type: SPAN,
        data: {
          type: SPAN,
          timestamp: 0,
          begin: 1,
          end: 2,
        },
      });

      expect(reducer).toEqual(expected_state);
    });
  });

  describe('data event', () => {
    it('should store list of data events', () => {
      const expected_state = {
        ...initial_state,
        data: [
          {
            type: DATA,
            test: 'test_data',
          },
        ],
      };

      const reducer = events(initial_state, {
        type: DATA,
        data: {
          type: DATA,
          test: 'test_data',
        },
      });

      expect(reducer).toEqual(expected_state);
    });
  });

  describe('stop event', () => {
    it('should define end of events', () => {
      const state = {
        ...initial_state,
        stop: {
          type: STOP,
          timestamp: 0,
        },
      };
      const reducer = events(initial_state, {
        type: STOP,
        data: {
          type: STOP,
          timestamp: 0,
        },
      });

      expect(reducer).toEqual(state);
    });
  });
});
