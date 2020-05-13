import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import algoliasearch from 'algoliasearch/lite';

/* import 'Index' for federated search in 'react-instantsearch-dom'
********************************************************************* */
import {
  InstantSearch, SearchBox, Hits, Configure, Index,
} from 'react-instantsearch-dom';

/* needed for federated search: import 'NextHits' in '../Search/searchPreview'
******************************************************************************* */
import { CustomHits, NextHits } from '../components/Search/searchPreview';



/* these keys are to access only blog index in Algolia
********************************************************************* */
// const algoliaClient = algoliasearch('4A5N71XYH0', 'f2417f2277d49686d11c909fe9e7a896');

/* add in API Keys from Learning Center to activate multiple index search
*************************************************************************** */
const algoliaClient = algoliasearch('4A5N71XYH0', 'bf5cf4783437b12c2dca33724c9c04b0');

/* removes empty query searches from Algolia analytics
********************************************************************* */
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

const SearchPage = () => (
  <Layout>
    <SEO title="Search" />


    {/* Aloglia Widgets */}
      <div className="form-inline header__search">     
        <InstantSearch
          searchClient={searchClient}
          indexName="blog"
          // refresh={refresh}
        >
          <Configure hitsPerPage={5} />
          {/* forcefeed className because component does not accept natively as prop */}
          <SearchBox
            className="searchbox"
            class="ais-SearchBox-input"
            submit={<></>}
            reset={<></>}
            translations={{
              placeholder: 'Search Postman',
            }}
            // onKeyUp={(event) => {
            //   this.setState({
            //     hasInput: event.currentTarget.value.length > 2,
            //   });
            // }}
          />
          {/* Comment in only if you want Blog post hits */}
          {/* <div className={!hasInput ? 'input-empty' : 'input-value'}>
            <CustomHits hitComponent={Hits} />
          </div> */}


          {/* Comment in for federated search */}
          {/* <div className={!hasInput ? 'input-empty' : 'row wrapper-search-results input-value'}> */}
          <div>
            <Index indexName="blog">
              <div className="col-sm-12 results-blog">
                <p className="font-weight-bold mb-0">On the Blog</p>
                <CustomHits hitComponent={Hits} />
                <Configure hitsPerPage={4} />
              </div>
            </Index>

            {/* <Index indexName="www">
              <div className="col-sm-12 results-blog">
                <p className="font-weight-bold mb-0">On the Website</p>
                <CustomHits hitComponent={Hits} />
                <Configure hitsPerPage={4} />
              </div>
            </Index> */}

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

export default SearchPage;
