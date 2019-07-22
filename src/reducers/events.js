import { START, SPAN, DATA, STOP } from '../actions/types';

const initial_state = {
  start: {},
  span: {},
  stop: {},
  data: [],
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case START:
      return {
        ...initial_state,
        start: { ...action.data },
      };

    case SPAN:
      return {
        ...state,
        span: { ...action.data },
      };

    case DATA:
      return {
        ...state,
        data: [...state.data, { ...action.data }],
      };

    case STOP:
      return {
        ...state,
        stop: { ...action.data },
      };

    default:
      return state;
  }
};
