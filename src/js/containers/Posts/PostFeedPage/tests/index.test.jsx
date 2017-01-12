import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as postFeedPage } from '../reducer';
import PostFeedPage from '../index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<PostFeedPage />', () => {
  it('should render with default props', () => {
    const store = mockStore({ postFeedPage });
    const wrapper = shallow(
      <PostFeedPage store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
