import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import PostPreview from '../index';
import props from './__mocks__/props';

describe('<PostPreview />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PostPreview
        {...props}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
