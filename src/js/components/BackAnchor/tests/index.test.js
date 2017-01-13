import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { spy } from 'sinon';
import BackAnchor from '../index';

describe('<BackAnchor />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <BackAnchor />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
