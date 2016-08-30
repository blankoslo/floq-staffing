import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Year from '../../../src/components/view/table/header/year';

// setup is a function, so that each test get its own state
const setup = () => {
  const wrapper = shallow(
    <Year
      year={2016}
      colspan={1}
    />);

  return {
    wrapper
  };
};

describe('<StaffingEditTitle />', () => {
  it('contains correct year', () => {
    const { wrapper } = setup();
    expect(wrapper.text()).toContain('2016');
  });
});
