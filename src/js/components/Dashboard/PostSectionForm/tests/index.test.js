import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { spy } from 'sinon';
import PostSectionForm from '../index';

describe('<PostSectionForm />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PostSectionForm />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
