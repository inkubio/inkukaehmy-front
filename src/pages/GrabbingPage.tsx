import * as React from 'react';
import { StoreConsumer } from '../App';
import { IAppState, IComment, IGrabbing } from '../types';

import { Comment } from '../components/Comment';
import { ContentContainer } from '../components/ContentContainer';
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
    this.refreshComments = this.refreshComments.bind(this);
  }

  async componentWillMount() {
    const comments = await getGrabbingComments(this.id);
    this.setState({ comments });
  }

  async refreshComments() {
    const comments = await getGrabbingComments(this.id);
    this.setState({ comments });
  }

  render() {
    return (
      <StoreConsumer>
        {(store: IAppState) => (
          <React.Fragment>
            {store.grabbings[this.id] && ( // Ensure the data exists
              <Grabbing
                refreshCallback={() => this.refreshComments()}
                refreshGrabbings={() => store.refreshGrabbings()}
                {...store.grabbings[this.id]}
                currentUserID={store.currentUserID}
              />
            )}
            
            {this.state.comments.length !== 0 &&
              <ContentContainer>
                <h3>Kommentit</h3>
                {this.state.comments.map(comment => (
                  <Comment
                    key={comment.ID}
                    grabbing_ID={this.id}
                    refreshCallback={() => this.refreshComments()}
                    currentUserID={store.currentUserID}
                    {...comment} />
                ))}
              </ContentContainer>
            }
          </React.Fragment>
        )}
      </StoreConsumer>
    );
  }
}
