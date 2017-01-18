import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  posts: [],
  post: {}
};

function postSectionsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.POST_ADD_SECTION:
      return [
        ...state,
        {
          name: action.section.name,
          id: action.section.id,
          order: state.length
        }
      ];
    case ActionTypes.POST_DELETE_SECTION:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_MOVE_UP_SECTION:
      return [
        ...state.slice(0, action.index - 1),
        {
          ...state[action.index - 1],
          order: action.index
        },
        {
          ...state[action.index],
          order: action.index - 1
        },
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_MOVE_DOWN_SECTION:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          order: action.index + 1
        },
        {
          ...state[action.index + 1],
          order: action.index
        },
        ...state.slice(action.index + 2)
      ];
    default: return state;
  }
}

function posts(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.POST_CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    case ActionTypes.POST_ADD_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_DELETE_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_MOVE_UP_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_MOVE_DOWN_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.SET_POST:
      return {
        ...state,
        post: action.post
      };
    case ActionTypes.POSTS_REQUEST:
      return {
        ...state,
        request: true,
        posts: []
      };
    case ActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        posts: action.posts,
        post: action.post
      };
    case ActionTypes.POST_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        post: action.post
      };
    case ActionTypes.POSTS_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.POSTS_DELETE_SUCCESS:
      return {
        ...state,
        request: false,
        error: ''
      };
    default:
      return state;
  }
}

export default posts;
