import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Footer />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
