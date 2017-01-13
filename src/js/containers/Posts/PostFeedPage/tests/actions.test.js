import * as A from '../actions';
import * as T from '../constants';

describe('PostFeedPage actions', () => {
  it('should have a type of POSTFEEDPAGE/LOAD_DATA_INITIATION', () => {
    const expected = {
      type: T.LOAD_DATA_INITIATION
    };
    expect(A.loadDataInitiation()).toEqual(expected);
  });
  it('should have a type of POSTFEEDPAGE/LOAD_DATA_SUCCESS', () => {
    const expected = {
      type: T.LOAD_DATA_SUCCESS
    };
    expect(A.loadDataSuccess()).toEqual(expected);
  });
  it('should have a type of POSTFEEDPAGE/LOAD_DATA_FAILURE', () => {
    const error = new Error('Ooopsie');
    const expected = {
      type: T.LOAD_DATA_FAILURE,
      error
    };
    expect(A.loadDataFailure(error)).toEqual(expected);
  });
});
