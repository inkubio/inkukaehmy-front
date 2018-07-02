export type TTag = {
  ID: number;
  name: string;
};

export type TGrabbing = {
  ID: number;
  username: string;
  title: string;
  text: string;
  tags: Array<TTag>;
  timestamp: string;
  is_hallitus: boolean;
  comments?: Array<TComment>;
};

export type TComment = {
  ID: number;
  username: string;
  text: string;
  timestamp: string;
  depth: number;
  comments: Array<TComment>;
};

export type TAppState = {
  grabbings: { [key: number]: TGrabbing };
  update: (newState: any) => void;
};
