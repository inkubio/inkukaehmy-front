import * as React from 'react';
import { StoreConsumer } from '../App';
import { IAppState, IComment, IGrabbing } from '../types';

import { Comment } from '../components/Comment';
import { Grabbing } from '../components/Grabbing';
import { getGrabbingComments } from '../functions';

interface IGrabbingPageState {
  grabbing: IGrabbing | null;
  comments: IComment[];
}

interface IGrabbingPageProps {
  props: { id: number };
}

export class GrabbingPage extends React.Component<
  IGrabbingPageProps & any,
  IGrabbingPageState
> {
  id: number = this.props.id;

  constructor(props: IGrabbingPageProps) {
    super(props);
    this.state = {
      comments: [],
      grabbing: null,
    };
  }

  async componentWillMount() {
    const id: number = this.id;
    const comments: IComment[] = await getGrabbingComments(id);
    this.setState({ comments });
  }

  render() {
    return (
      <StoreConsumer>
        {(store: IAppState) => (
          <React.Fragment>
            {store.grabbings[this.id] && ( // Ensure the data exists
              <Grabbing {...store.grabbings[this.id]} />
            )}

            {this.state.comments.map(comment => (
              <Comment key={comment.ID} {...comment} />
            ))}
          </React.Fragment>
        )}
      </StoreConsumer>
    );
  }
}
