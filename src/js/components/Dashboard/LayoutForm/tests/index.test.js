import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import LayoutForm from '../index';

describe('<LayoutForm />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LayoutForm />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
