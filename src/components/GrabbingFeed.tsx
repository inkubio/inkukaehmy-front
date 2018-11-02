import * as React from 'react';
import { Filterable, IGrabbing, Sortable } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { GrabbingFeedItem } from './GrabbingFeedItem';

interface IGrabbingFeedState {
  sortBy: Sortable;
  showBoard: boolean;
  showOfficials: boolean;
  filterBy: Filterable;
};

// Filter visible grabbings between board, official or all
const grabFilter = (filterBy: Filterable) => (grab: IGrabbing) => {
  if (filterBy === 'all') {
    return true;
  } else if (filterBy === 'board') {
    return grab.is_hallitus;
  } else {
    return !grab.is_hallitus;
  }
};

// Sort by either newest or oldest grabbings first
const grabSort = (sortBy: Sortable) => (
  sortBy === 'newest'
    ? (a: IGrabbing, b: IGrabbing) => {
      if (a.timestamp < b.timestamp) {return 1;}
      if (b.timestamp < a.timestamp) {return -1;}
      return 0;
    } : (a: IGrabbing, b: IGrabbing) => {
      if (a.timestamp > b.timestamp) {return 1;}
      if (b.timestamp > a.timestamp) {return -1;}
      return 0;
    }
);

export class GrabbingFeed extends React.Component<{grabs: IGrabbing[]}, IGrabbingFeedState> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterBy: 'all',
      showBoard: true,
      showOfficials: true,
      sortBy: 'newest',
    }

    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  onChangeVisibility(e: any) {
    this.setState({[e.target.name]: e.target.value} as any);
  }

  async onChangeFilter(e: any) {
    await this.setState({[e.target.name]: e.target.checked} as any);
    if (this.state.showBoard && this.state.showOfficials) {
      this.setState({filterBy: 'all'});
    } else if (this.state.showBoard && !this.state.showOfficials) {
      this.setState({filterBy: 'board'});
    } else if (this.state.showOfficials && !this.state.showBoard) {
      this.setState({filterBy: 'official'});
    } else {
      this.setState({filterBy: 'all'});
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ContentContainer>
            <select name="sortBy" onChange={this.onChangeVisibility}>
              <option value="newest">Uusin ensin</option>
              <option value="oldest">Vanhin ensin</option>
            </select>

            <div>
              <label className="toggle-label">Näkyvät kähmyt</label>
              <div className="toggle">
                <input
                  id="official"
                  name="showOfficials"
                  type="checkbox"
                  checked={this.state.showOfficials}
                  onChange={this.onChangeFilter}
                />
                <label className="toggle-label" htmlFor="official">Toimari</label>
                <input
                  id="board"
                  name="showBoard"
                  type="checkbox"
                  checked={this.state.showBoard}
                  onChange={this.onChangeFilter}
                />
                <label className="toggle-label" htmlFor="board">Hallitus</label>
              </div>
            </div>

          </ContentContainer>
        </div>

        {
          this.props.grabs
            .filter(grabFilter(this.state.filterBy))
            .sort(grabSort(this.state.sortBy))
            .map(grab => <GrabbingFeedItem key={grab.ID} {...grab} />)
        }
      </React.Fragment>
    )
  }
}
