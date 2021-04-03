import blogs from '../apis/blogs';

import history from '../history';

export const signIn = (userData) => {
  return {
    type: 'SIGN_IN',
    payload: userData,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const createBlog = (formValues) => async (dispatch, getState) => {
  const response = await blogs.post('/blogs', { ...formValues });

  dispatch({
    type: 'CREATE_BLOG',
    payload: response.data,
  });

  history.push('/');
};

export const fetchBlogs = () => async (dispatch, getState) => {
  const response = await blogs.get('/blogs');

  dispatch({
    type: 'FETCH_BLOGS',
    payload: response.data,
  });
};

export const fetchBlog = (id) => async (dispatch, getState) => {
  const response = await blogs.get('/blogs', {
    params: { id },
  });

  dispatch({
    type: 'FETCH_BLOG',
    payload: response.data[0],
  });
};

export const updateBlog = (id, formValues) => async (dispatch, getState) => {
  const response = await blogs.patch(`/blogs/${id}`, { ...formValues });

  dispatch({
    type: 'UPDATE_BLOG',
    payload: response.data,
  });

  history.push('/');
};

export const deleteBlog = (id) => async (dispatch) => {
  const response = await blogs.delete(`/blogs/${id}`);

  dispatch({
    type: 'DELETE_BLOG',
    payload: id,
  });

  history.push('/');
};
