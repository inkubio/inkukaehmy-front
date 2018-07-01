const API_URL = 'http://localhost/wp-json/inku-kaehmy/v1';

/*
 * Types
 */
export type Tag = {
  ID: number;
  name: string;
};

export type Grabbing = {
  ID: number;
  userID: string;
  grabbing_title: string;
  grabbing_text: string;
  tags: Array<Tag>;
  time_stamp: string;
  is_hallitus: boolean;
};

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
export const getGrabbings = (): Array<Grabbing> => {
  return _GET('/grabbings');
};

export const postGrabbing = (payload: Grabbing) => {
  return _POST('/grabbings', payload);
};
