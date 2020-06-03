import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';


/* import 'Index' for federated search in 'react-instantsearch-dom'
********************************************************************* */
import {
  InstantSearch, /* SearchBox, */ Hits, Configure, Index,
} from 'react-instantsearch-dom';
import SEO from '../components/seo';
import Layout from '../components/layout';

/* needed for federated search: import 'NextHits' and 'Hits_www' in '../Search/searchPreview'
******************************************************************************************* */
import { DebouncedSearchBox, CustomHits, NextHits, HitsWww } from '../components/Search/searchPreview';


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

const updateAfter = 700;
const searchStateToUrl = (searchState) => (searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '');

class SearchPage extends Component {
  constructor() {
    super();

    if (typeof window === 'object') {
      this.state = {
        searchState: qs.parse(window.location.search.slice(1)),
      };

      window.addEventListener('popstate', () => {
        this.setState({ state: 'api' });
      });
    }
  }

    onSearchStateChange = (searchState) => {
      // update the URL when there is a new search state.
      clearTimeout(this.debouncedSetState);
      this.debouncedSetState = setTimeout(() => {
        window.history.pushState(
          searchState,
          null,
          searchStateToUrl(searchState),
        );
      }, updateAfter);

      this.setState((previousState) => {
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


    render() {
      const { searchState } = this.state || {};

      const parameters = {};

      return (
        <Layout>
          <SEO title="Search" />
          {/* Aloglia Widgets */}
          <div className="container form-inline header__search mb-4">
            <InstantSearch
              searchClient={searchClient}
              indexName="blog"
              searchState={searchState}
              onSearchStateChange={this.onSearchStateChange}
            >
              {/* eslint-disable react/jsx-props-no-spreading */}
              <Configure hitsPerPage={5} {...parameters} />
              {/* eslint-enpoable */}
              {/* forcefeed className because component does not accept natively as prop */}
              {/* <SearchBox
                className="searchbox"
                class="ais-SearchBox-input"
                submit={<></>}
                reset={<></>}
                translations={{
                  placeholder: 'Search Postman',
                }}
              /> */}
              <DebouncedSearchBox delay={150} />
              {/* Comment in only if you want Blog post hits */}
              {/* <div className={!hasInput ? 'input-empty' : 'input-value'}> */}
              {/* <CustomHits hitComponent={Hits} />
          </div> */}


              {/* Comment in for federated search */}
              <>
                <Index indexName="blog">
                  <div className="row">
                    <div className="col-sm-12 results-blog">
                      <p className="font-weight-bold mb-0">On the Blog</p>
                      <CustomHits hitComponent={Hits} />
                      <Configure hitsPerPage={6} />
                    </div>
                  </div>
                </Index>
                <div className="row">
                  <Index indexName="www">

                    <div className="col-sm-12 col-md-6 results-www">
                      <p className="font-weight-bold mb-0">On the Website</p>
                      <HitsWww hitComponent={Hits} />
                      <Configure hitsPerPage={4} />
                    </div>
                  </Index>

                  <Index indexName="docs">
                    <div className="col-sm-12 col-md-6 results-lc">
                      <p className="font-weight-bold mb-0">On Learning Center</p>
                      <NextHits hitComponent={Hits} />
                      <Configure hitsPerPage={4} />
                    </div>

                  </Index>
                </div>
              </>
            </InstantSearch>
          </div>
        </Layout>
      );
    }
}

export default SearchPage;
