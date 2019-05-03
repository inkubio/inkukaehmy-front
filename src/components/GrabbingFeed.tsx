import * as React from 'react';
import { Filterable, IGrabbing, Sortable } from '../types';

import { ContentContainer } from './ContentContainer';
import { GrabbingFeedItem } from './GrabbingFeedItem';

interface IGrabbingFeedState {
  sortBy: Sortable;
  showBoard: boolean;
  showOfficials: boolean;
  filterBy: Filterable;
  filterText: string;
}

// Filter visible grabbings between board, official or all
const grabFilter = (filterBy: Filterable) => (grab: IGrabbing) => {
  if (filterBy === 'all') {
    return true;
  }
  if (filterBy === 'board') {
    return grab.is_hallitus;
  }
  return !grab.is_hallitus;
};

const grabSearch = (query: string) => (grab: IGrabbing) => {
  if (!query) {
    return true;
  }
  if (
    grab.text.toLowerCase().includes(query.toLowerCase()) ||
    grab.username.toLowerCase().includes(query.toLowerCase()) ||
    grab.title.toLowerCase().includes(query.toLowerCase())
  ) {
    return true;
  }
  return false;
};

// Sort by either newest or oldest grabbings first
const grabSort = (sortBy: Sortable) => {
  if (sortBy === 'newest') {
    return (a: IGrabbing, b: IGrabbing) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (b.timestamp < a.timestamp) {
        return -1;
      }
      return 0;
    };
  }
  return (a: IGrabbing, b: IGrabbing) => {
    if (a.timestamp > b.timestamp) {
      return 1;
    }
    if (b.timestamp > a.timestamp) {
      return -1;
    }
    return 0;
  };
};

export class GrabbingFeed extends React.Component<{ grabs: IGrabbing[] }, IGrabbingFeedState> {
  constructor(props: { grabs: IGrabbing[] }) {
    super(props);
    this.state = {
      filterBy: 'all',
      filterText: '',
      showBoard: false,
      showOfficials: false,
      sortBy: 'newest',
    };

    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ filterText: e.currentTarget.value });
  }

  onChangeVisibility(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  }

  async onChangeFilter(e: React.FormEvent<HTMLInputElement>) {
    await this.setState({ [e.currentTarget.name]: e.currentTarget.checked } as any);
    if (this.state.showBoard && this.state.showOfficials) {
      this.setState({ filterBy: 'all' });
    } else if (this.state.showBoard && !this.state.showOfficials) {
      this.setState({ filterBy: 'board' });
    } else if (this.state.showOfficials && !this.state.showBoard) {
      this.setState({ filterBy: 'official' });
    } else {
      this.setState({ filterBy: 'all' });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ContentContainer style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '2rem' }}>
            <div className="feed-control">
              <label className="toggle-label">
                Lajittele
                <select
                  style={{ display: 'block' }}
                  name="sortBy"
                  onChange={this.onChangeVisibility}
                >
                  <option value="newest">Uusin ensin</option>
                  <option value="oldest">Vanhin ensin</option>
                </select>
              </label>
            </div>

            <div className="feed-control">
              <label htmlFor="official" className="toggle-label">
                Näkyvät kähmyt
              </label>
              <div className="toggle">
                <input
                  id="official"
                  name="showOfficials"
                  type="checkbox"
                  checked={this.state.showOfficials}
                  onChange={this.onChangeFilter}
                />
                <label className="toggle-label" htmlFor="official">
                  Toimari
                </label>
                <input
                  id="board"
                  name="showBoard"
                  type="checkbox"
                  checked={this.state.showBoard}
                  onChange={this.onChangeFilter}
                />
                <label className="toggle-label" htmlFor="board">
                  Hallitus
                </label>
              </div>
            </div>

            <div className="feed-control">
              <label className="toggle-label">
                Hae tekstillä
                <input
                  style={{ display: 'block' }}
                  value={this.state.filterText}
                  onChange={this.onChangeSearch}
                />
              </label>
            </div>
          </ContentContainer>
        </div>

        {this.props.grabs
          .filter(grabFilter(this.state.filterBy))
          .filter(grabSearch(this.state.filterText))
          .sort(grabSort(this.state.sortBy))
          .map(grab => (
            <GrabbingFeedItem key={grab.ID} {...grab} />
          ))}
      </React.Fragment>
    );
  }
}
