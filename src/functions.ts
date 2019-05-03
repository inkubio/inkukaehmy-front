import { IComment, IGrabbing } from './types';

// const API_BASE = 'https://www.inkubio.fi';
const API_BASE = 'http://localhost';
const API_URL = `${API_BASE}/wp-json/inku-kaehmy/v1`;
const CONTENT_URL = `${API_BASE}/wp-json/wp/v2/pages/?slug=kähmyt`;

/*
 * Abstract methods
 */
const GET = (endpoint: string): Promise<unknown> => {
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

const GETCONT = (endpoint: string): Promise<unknown> => {
  return fetch(`${CONTENT_URL}${endpoint}`, {
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

const POST = (endpoint: string, data: unknown): Promise<unknown> => {
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
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      alert(resp.json()); // eslint-disable-line
      return false;
    })
    .catch(e => {
      console.error(e);
      return false;
    });
};

const PUT = (endpoint: string, data: unknown): unknown => {
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
    .catch(e => {
      console.error(e);
      return false;
    }); // tslint:disable-line no-console
};

/*
 * Exports
 */

// Transform array of objects to object of objects with ID as key
interface IArrayToObject {
  (array: IGrabbing[]): { [key: number]: IGrabbing };
  (array: IComment[]): { [key: number]: IComment };
}

export const arrayToObject: IArrayToObject = (array: any) =>
  array.reduce((obj: any, item: any) => {
    obj[item.ID] = item; // eslint-disable-line
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

export const flattenComments = (comments: IComment[]): IComment[] => {
  return comments.concat(
    comments
      .map(comment => flattenComments(comment.comments))
      .reduce((acc, curr) => acc.concat(curr), []),
  );
};

// Request functions
// GETs
export const getGrabbings = (): Promise<IGrabbing[]> => {
  return GET('/grabbings') as Promise<IGrabbing[]>;
};

export const getGrabbing = (id: number): Promise<IGrabbing> => {
  return GET(`/grabbing/${id}`) as Promise<IGrabbing>;
};

export const getGrabbingComments = (id: number): Promise<IComment[]> => {
  return GET(`/grabbing/${id}/comments`) as Promise<IComment[]>;
};

export const getPageTextContent = () => {
  return GETCONT('');
};

// POSTs
export const getCurrentUserId = (): Promise<number> => {
  return POST('/me', {}) as Promise<number>;
};

export const postGrabbing = (
  payload: Pick<IGrabbing, 'title' | 'text' | 'tags' | 'is_hallitus' | 'batch'>,
) => {
  return POST('/grabbings', payload);
};

export const postComment = (payload: {
  text: string;
  parent_grabbing_id: number;
  parent_comment_id?: number;
}) => {
  return POST('/comments', payload);
};

// PUTs
export const putGrabbing = (
  payload: Pick<IGrabbing, 'title' | 'text' | 'tags' | 'is_hallitus'>,
  grabbingID: number,
) => {
  return PUT(`/grabbing/${grabbingID}`, payload);
};

export const putComment = (payload: { text: string }, commentID: number) => {
  return PUT(`/comment/${commentID}`, payload);
};
