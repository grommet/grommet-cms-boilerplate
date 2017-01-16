import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import PostFeedItem from '../index';

describe('<PostFeedItem />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PostFeedItem />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
