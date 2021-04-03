import _ from 'lodash';

const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_BLOG':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_BLOG':
      return { ...state, [action.payload.id]: action.payload };
    case 'UPDATE_BLOG':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_BLOG':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default blogReducer;
