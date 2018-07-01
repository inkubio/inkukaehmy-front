const API_URL = 'localhost/wp-json/inku-kaehmy/v1';

/*
 * Types
 */
type Tag = {
  ID: number;
  name: string;
};

type Grabbing = {
  ID: number;
  name: string;
  title: string;
  text: string;
  tags: Array<Tag>;
  timestamp: string;
  is_board: boolean;
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
