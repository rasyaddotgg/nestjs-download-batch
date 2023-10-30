import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';

//
import { dispatch } from '../store';
import axios from 'axios';

// ----------------------------------------------------------------------

const initialState: any = {
    isLoading: false,
    error: null,
    data: null,
    comments: null,
    like: 0
};

const slice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET LABELS
        getDataSuccess(state, action) {
            state.isLoading = false;

            // const { likes } = action.payload;
            state.data = action.payload;
            state.like = action.payload.likes;
        },

        addComment(state, action) {
            state.isLoading = false;
            state.comments = {...action.payload};
        },
        
        addLike(state) {
            state.isLoading = false;
            state.like = Number(state.like) + 1;
        },

        addView(state) {
            state.isLoading = false;
            state.view = state.view + 1;
        }
    }
});

// // Reducer
export default slice.reducer;

export function getArticle() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('https://63f32f1afe3b595e2edc636b.mockapi.io/articles/'+1);
      console.log(response);
      dispatch(slice.actions.getDataSuccess(response.data));
    } catch (error) {
        console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addComment() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.addComment(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addLike() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
    //   const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.addLike());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addView() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.addView());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}