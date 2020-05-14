import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';


/* import 'Index' for federated search in 'react-instantsearch-dom'
********************************************************************* */
import {
  InstantSearch, SearchBox, Hits, Configure, Index,
} from 'react-instantsearch-dom';
import SEO from '../components/seo';
import Layout from '../components/layout';

/* needed for federated search: import 'NextHits' and 'Hits_www' in '../Search/searchPreview'
******************************************************************************************* */
import { CustomHits, NextHits, HitsWww } from '../components/Search/searchPreview';


/* these keys are to access only blog index in Algolia
****************************************************************************************** */
// const algoliaClient = algoliasearch('4A5N71XYH0', 'f2417f2277d49686d11c909fe9e7a896');

/* add in API Keys from Learning Center to activate multiple index search
****************************************************************************************** */
const algoliaClient = algoliasearch('4A5N71XYH0', 'bf5cf4783437b12c2dca33724c9c04b0');


/* removes empty query searches from Algolia analytics
****************************************************************************************** */
const searchClient = {
  search(requests) {
    const newRequests = requests.map((request) => {
      // test for empty string and change request parameter: analytics
      if (!request.params.query || request.params.query.length === 0) {
        request.params.analytics = false;
      }
      return request;
    });
    return algoliaClient.search(newRequests);
  },
};

const updateAfter = 1000;
const searchStateToUrl = (searchState) => (searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '');


class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchState: {},
    };
    console.log('this.state searchState', this.state)
  }
    
  onSearchStateChange = (searchState) => {
    console.log('onSearchStateChange Function searchState', searchState)

    // update the URL when there is a new search state.
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      window.history.pushState(
        this.searchState,
        null,
        searchStateToUrl(this.searchState),
      );
    }, updateAfter);

    this.setState((previousState, searchState) => {
      const hasQueryChanged = previousState.searchState.query !== searchState.query;
      return {
        ...previousState,
        searchState: {
          ...searchState,
          boundingBox: !hasQueryChanged ? searchState.boundingBox : null,
        },
      };
    });
  };

  componentDidMount() {
    window.addEventListener('popstate', ({ state: searchState }) => {
      this.setState({ searchState });
    });
    
    this.setState({
      searchState: qs.parse(window.location.search.slice(1))
    });
    const { searchState } = this.state;
    console.log('componentDidMount searchState', searchState)
    this.onSearchStateChange(searchState);
  }

    render() {
      const { searchState } = this.state;
      console.log('render() searchState', searchState)
      const parameters = {}; 

      return (
        <Layout>
          <SEO title="Search" />
          {/* Aloglia Widgets */}
          <div className="form-inline header__search">
            <InstantSearch
              searchClient={searchClient}
              indexName="blog"
              searchState={searchState}
              onSearchStateChange={this.onSearchStateChange}
            >
              {/* eslint-disable react/jsx-props-no-spreading */}
              <Configure hitsPerPage={5} {...parameters} />
              {/* eslint-enaable */}
              
              {/* forcefeed className because component does not accept natively as prop */}
              <SearchBox
                className="searchbox"
                class="ais-SearchBox-input"
                submit={<></>}
                reset={<></>}
                translations={{
                  placeholder: 'Search Postman',
                }}
              />
              {/* Comment in only if you want Blog post hits */}
              {/* <div className={!hasInput ? 'input-empty' : 'input-value'}> */}
              {/* <CustomHits hitComponent={Hits} />
          </div> */}


              {/* Comment in for federated search */}
              {/* <div className={!hasInput 
                ? 'input-empty' : 'row wrapper-search-results input-value'}> */}
              <div>
                <Index indexName="blog">
                  <div className="col-sm-12 results-blog">
                    <p className="font-weight-bold mb-0">On the Blog</p>
                    <CustomHits hitComponent={Hits} />
                    <Configure hitsPerPage={4} />
                  </div>
                </Index>

                <Index indexName="www">
                  <div className="col-sm-12 results-blog">
                    <p className="font-weight-bold mb-0">On the Website</p>
                    <HitsWww hitComponent={Hits} />
                    <Configure hitsPerPage={4} />
                  </div>
                </Index>

                <Index indexName="docs">
                  <div className="col-sm-12 results-lc">
                    <p className="font-weight-bold mb-0">On Learning Center</p>
                    <NextHits hitComponent={Hits} />
                    <Configure hitsPerPage={4} />
                  </div>
                </Index>
              </div>
            </InstantSearch>
          </div>
        </Layout>
      );
    }
}

export default SearchPage;
