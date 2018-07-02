import { TGrabbing, TComment } from './types';

const API_URL = 'http://localhost/wp-json/inku-kaehmy/v1';

/*
 * Abstract methods
 */
const _GET = (endpoint: string): any => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
};

const _POST = (endpoint: string, data: any): any => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(resp => resp.json())
    .catch(e => console.error(e));
};

/*
 * Exports
 */

// Transform array of objects to object of objects with ID as key
interface IArrayToObject {
  (array: Array<TGrabbing>): { [key: number]: TGrabbing };
  (array: Array<TComment>): { [key: number]: TComment };
}

export const arrayToObject: IArrayToObject = (array: Array<any>) =>
  array.reduce((obj: any, item: any) => {
    obj[item.ID] = item;
    return obj;
  }, {});

// Transform object of objects to array and discard keys
interface IObjectToArray {
  (obj: { [key: number]: TGrabbing }): Array<TGrabbing>;
  (obj: { [key: number]: TComment }): Array<TComment>;
}

export const objectToArray: IObjectToArray = (obj: any) => {
  return Object.keys(obj).map((key: any) => obj[key]);
};

// Request functions
export const getGrabbings = (): Array<TGrabbing> => {
  return _GET('/grabbings');
};

export const getGrabbing = (id: number): TGrabbing => {
  return _GET(`/grabbing/${id}`);
};

export const getGrabbingComments = (id: number): Array<TComment> => {
  return _GET(`/grabbing/${id}/comments`);
};

export const postGrabbing = (payload: TGrabbing) => {
  return _POST('/grabbings', payload);
};
