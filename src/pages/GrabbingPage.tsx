import * as React from 'react';
import { TGrabbing, TComment, TAppState } from '../types';
import { StoreConsumer } from '../App';
import { getGrabbingComments } from '../functions';
import { Grabbing } from '../components/Grabbing';

interface IGrabbingPageState {
  grabbing: TGrabbing | null;
  comments: Array<TComment>;
}

interface IGrabbingPageProps {
  props: any;
}

export class GrabbingPage extends React.Component<
  IGrabbingPageProps & any,
  IGrabbingPageState
> {
  id: number = this.props.match.params.id;

  constructor(props: IGrabbingPageProps) {
    super(props);
    this.state = {
      grabbing: null,
      comments: [],
    };
  }

  async componentWillMount() {
    const id: number = this.id;
    const comments: Array<TComment> = await getGrabbingComments(id);
    this.setState({ comments });
  }

  render() {
    return (
      <StoreConsumer>
        {(store: TAppState) => (
          <React.Fragment>
            <Grabbing {...store.grabbings[this.id]} />
          </React.Fragment>
        )}
      </StoreConsumer>
    );
  }
}
