import expect from 'expect';
import moment from 'moment';
import { getStaffable } from '../../src/selectors/employeesSelector';

describe('getStaffable(startOfWeek, firstDayWorked, lastDayWorked)', () => {
  it('start date null. Expect 0 days', () => {
    expect(getStaffable(moment('2016-08-01'), null, null))
      .toEqual(0);
  });

  it('start date undefined. Expect 0 days', () => {
    expect(getStaffable(moment('2016-08-01'), undefined, null))
      .toEqual(0);
  });

  it('start date before week. Expect 5 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-07-31', null))
      .toEqual(5);
  });

  it('start date on first day in week. Expect 5 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', null))
      .toEqual(5);
  });

  it('start date on second day in week. Expect 4 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-02', null))
      .toEqual(4);
  });

  it('start date after week. Expect 0 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-06', null))
      .toEqual(0);
  });

  it('start/end date on first day in week. Expect 1 day', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', '2016-08-01'))
      .toEqual(1);
  });

  it('start date on first day in week, end date on second. Expect 2 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', '2016-08-02'))
      .toEqual(2);
  });

  it('start date on first day in week, end date on fifth. Expect 5 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', '2016-08-05'))
      .toEqual(5);
  });

  it('start date on first day in week, end date on sixth. Expect 5 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', '2016-08-06'))
      .toEqual(5);
  });

  it('start date on first day in week, end date before start day. Expect 0 days', () => {
    expect(getStaffable(moment('2016-08-01'), '2016-08-01', '2016-07-31'))
      .toEqual(0);
  });
});
