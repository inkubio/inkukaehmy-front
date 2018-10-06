import { IComment, IGrabbing } from './types';

const API_URL = 'http://localhost/wp-json/inku-kaehmy/v1';

/*
 * Abstract methods
 */
const _GET = (endpoint: string): any => {
  return fetch(`${API_URL}${endpoint}`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    method: 'GET',
  })
    .then(resp => resp.json())
    .catch(e => console.error(e)); // tslint:disable-line no-console
};

const _POST = (endpoint: string, data: any): any => {
  return fetch(`${API_URL}${endpoint}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    method: 'POST',
  })
    .then(resp => resp.json())
    .catch(e => console.error(e)); // tslint:disable-line no-console
};

/*
 * Exports
 */

// Transform array of objects to object of objects with ID as key
interface IArrayToObject {
  (array: IGrabbing[]): { [key: number]: IGrabbing };
  (array: IComment[]): { [key: number]: IComment };
}

export const arrayToObject: IArrayToObject = (array: any[]) =>
  array.reduce((obj: any, item: any) => {
    obj[item.ID] = item;
    return obj;
  }, {});

// Transform object of objects to array and discard keys
interface IObjectToArray {
  (obj: { [key: number]: IGrabbing }): IGrabbing[];
  (obj: { [key: number]: IComment }): IComment[];
}

export const objectToArray: IObjectToArray = (obj: any) => {
  return Object.keys(obj).map((key: any) => obj[key]);
};

// Request functions
export const getGrabbings = (): IGrabbing[] => {
  return _GET('/grabbings');
};

export const getGrabbing = (id: number): IGrabbing => {
  return _GET(`/grabbing/${id}`);
};

export const getGrabbingComments = (id: number): IComment[] => {
  return _GET(`/grabbing/${id}/comments`);
};

export const postGrabbing = (payload: IGrabbing) => {
  return _POST('/grabbings', payload);
};
