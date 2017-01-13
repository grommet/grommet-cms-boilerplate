import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { spy } from 'sinon';
import PostPreview from '../index';

describe('<PostPreview />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PostPreview />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
