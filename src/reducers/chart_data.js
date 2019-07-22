import { CHART } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CHART:
      return action.data;

    default:
      return state;
  }
};
