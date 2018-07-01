import * as React from 'react';
import { Grabbing, getGrabbings } from '../functions';
import { GrabbingFeed } from '../components/GrabbingFeed';
import { MainContent } from '../components/MainContent';

interface IMainPageState {
  grabbings: Array<Grabbing>;
}

interface IMainPageProps {
  props: any;
}

export class MainPage extends React.Component<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);
    this.state = {
      grabbings: [],
    };
  }

  async componentWillMount() {
    const grabbings: Array<Grabbing> = await getGrabbings();
    this.setState({ grabbings });
  }

  render() {
    return (
      <React.Fragment>
        <MainContent />
        <GrabbingFeed grabs={this.state.grabbings} />
      </React.Fragment>
    );
  }
}
