export interface ITag {
  ID: number;
  name: string;
};

export interface IGrabbing {
  ID: number;
  username: string;
  userID: number;
  title: string;
  text: string;
  tags: ITag[];
  timestamp: string;
  is_hallitus: boolean;
  batch: string;
  comments?: IComment[];
};

export interface IComment {
  ID: number;
  username: string;
  userID: number;
  text: string;
  timestamp: string;
  depth: number;
  comments: IComment[];
};

export type Sortable = 'newest' | 'oldest';
export type Filterable = 'all' | 'board' | 'official';

export interface IAppState {
  currentUserID: number;
  grabbings: { [key: number]: IGrabbing };
  visibleGrabbings: IGrabbing[];
  update: (newState: any) => void;
  sortBy: Sortable;
  filterBy: Filterable;
};
