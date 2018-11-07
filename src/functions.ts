import { IComment, IGrabbing } from './types';

const API_URL = 'http://localhost/wp-json/inku-kaehmy/v1';

/*
 * Abstract methods
 */
const _GET = (endpoint: string): any => {
  return fetch(`${API_URL}${endpoint}`, {
    credentials: 'same-origin',
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
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-WP-Nonce': (window as any).wpApiSettings.nonce,
    },
    method: 'POST',
  })
    .then(resp => resp.json())
    .catch(e => {console.error(e); return false}); // tslint:disable-line no-console
};

const _PUT = (endpoint: string, data: any): any => {
  return fetch(`${API_URL}${endpoint}`, {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-WP-Nonce': (window as any).wpApiSettings.nonce,
    },
    method: 'PUT',
  })
    .then(resp => resp.json())
    .catch(e => {console.error(e); return false}); // tslint:disable-line no-console
}

/*
 * Exports
 */

// Transform array of objects to object of objects with ID as key
interface IArrayToObject {
  (array: IGrabbing[]): { [key: number]: IGrabbing };
  (array: IComment[]): { [key: number]: IComment };
};

export const arrayToObject: IArrayToObject = (array: any[]) =>
  array.reduce((obj: any, item: any) => {
    obj[item.ID] = item;
    return obj;
  }, {});

// Transform object of objects to array and discard keys
interface IObjectToArray {
  (obj: { [key: number]: IGrabbing }): IGrabbing[];
  (obj: { [key: number]: IComment }): IComment[];
};

export const objectToArray: IObjectToArray = (obj: any) => {
  return Object.keys(obj).map((key: any) => obj[key]);
};

// Request functions
// GETs
export const getGrabbings = (): IGrabbing[] => {
  return _GET('/grabbings');
};

export const getGrabbing = (id: number): IGrabbing => {
  return _GET(`/grabbing/${id}`);
};

export const getGrabbingComments = (id: number): IComment[] => {
  return _GET(`/grabbing/${id}/comments`);
};

// POSTs
export const getCurrentUserId = (): number => {
  return _POST('/me', {});
};

export const postGrabbing = (payload: Pick<IGrabbing,
    'title' | 'text' | 'tags' | 'is_hallitus' | 'batch'
>) => {
  return _POST('/grabbings', payload);
};

export const postComment = (payload:
  {text: string, parent_grabbing_id: number, parent_comment_id?: number}
) => {
  return _POST('/comments', payload);
};

// PUTs
export const putGrabbing = (
  payload: Pick<IGrabbing, 'title' | 'text' | 'tags' | 'is_hallitus'>,
  grabbingID: number,  
) => {
  return _PUT(`/grabbing/${grabbingID}`, payload);
};

export const putComment = (payload: {text: string}, commentID: number) => {
  return _PUT(`/comment/${commentID}`, payload);
};
