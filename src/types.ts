export interface ITag {
  ID: number;
  name: string;
};

export interface IGrabbing {
  ID: number;
  username: string;
  user_ID: number;
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
  text: string;
  timestamp: string;
  depth: number;
  comments: IComment[];
};

export interface IAppState {
  grabbings: { [key: number]: IGrabbing };
  update: (newState: any) => void;
};
