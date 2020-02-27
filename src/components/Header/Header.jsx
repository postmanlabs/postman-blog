import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import './_header.scss';
import '../Shared/_buttons.scss';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch, SearchBox, Hits, Configure, Index,
} from 'react-instantsearch-dom';
import DynamicLink from '../Shared/DynamicLink';
import postmanLogo from '../../images/postman-logo-horizontal-orange.svg';
import '../../utils/typography';


import { CustomHits, NextHits } from '../Search/searchPreview';


const ClickOutHandler = require('react-onclickout');


// const algoliaClient = algoliasearch('4A5N71XYH0', 'f2417f2277d49686d11c909fe9e7a896');

// add in API Keys from Learning Center to activate multiple index search
const algoliaClient = algoliasearch('4A5N71XYH0', 'bf5cf4783437b12c2dca33724c9c04b0');

// removes empty query searches from analytics
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

// changes button in navbar based on cookie presence
const LoginCheck = (props) => {
  const { cookie } = props;
  if (cookie !== 'yes') {
    return (
      <a href="https://identity.getpostman.com/login" className="btn btn__primary">Sign In</a>
    );
  }
  return (
    <a href="https://app.getpostman.com" className="btn btn__primary">Dashboard</a>
  );
};

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.getCookie = this.getCookie.bind(this);
    const { data } = this.props;

    this.state = {
      data: JSON.parse(data),
      isToggledOn: 'unset',
      refresh: false,
    };
  }

  getCookie = (a) => {
    if (typeof document !== 'undefined') {
      const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
      return b ? b.pop() : '';
    }
    return false;
  };

  // toggles the hamburger menu
  toggleMenu = () => {
    this.setState((state) => {
      if (state.isToggledOn === 'unset') {
        return ({
          isToggledOn: true,
        });
      }
      return ({
        isToggledOn: !state.isToggledOn,
      });
    });
  }

  // click out search results box
  onClickOut = () => {
    document.getElementsByClassName('ais-SearchBox-input')[0].value = '';
    this.setState(() => ({
      hasInput: false,
    }));
  }

  render() {
    const {
      isToggledOn, refresh, hasInput, data,
      // isToggledOn, data,
    } = this.state;

    return (
      <header className="header text-center navbar navbar-expand-xl navbar-light">
        <div className="navbar-brand header__brand">
          <Link
            className="header__homelink"
            to="/"
          >
            <img className="header__logo" src={postmanLogo} alt="postman logo" />
            <span className="header__title">{data.title}</span>
          </Link>
        </div>

        {/* hamburger toggle */}
        <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`header__right-links justify-content-end navbar-nav mr-auto navbar-collapse collapse show
            ${(isToggledOn === true) ? 'animate-open' : ''}
            ${(isToggledOn === false) ? 'animate-close' : ''}
            ${isToggledOn === 'unset' ? 'closed' : ''}
            `}
          id="navbarSupportedContent"
        >
          {/* Aloglia Widgets */}
          <div className="form-inline header__search">
            <ClickOutHandler onClickOut={this.onClickOut}>
              <InstantSearch
                searchClient={searchClient}
                indexName="blog"
                refresh={refresh}
              >
                {/* <Configure hitsPerPage={2} /> */}
                {/* forcefeed className because component does not accept natively as prop */}
                <SearchBox
                  className="searchbox"
                  class="ais-SearchBox-input"
                  submit={<></>}
                  reset={<></>}
                  translations={{
                    placeholder: 'Search Postman Blog',
                  }}
                  onKeyUp={(event) => {
                    this.setState({
                      hasInput: event.currentTarget.value.length > 2,
                    });
                  }}
                />
                {/* <div className={!hasInput ? 'input-empty' : 'input-value'}>
                  <CustomHits hitComponent={Hits} />
                </div> */}

                <Index indexName="blog">
                  <div className={!hasInput ? 'input-empty' : 'input-value'}>
                    <h2>Blog</h2>
                    <CustomHits hitComponent={Hits} />
                    <Configure hitsPerPage={2} />
                  </div>
                </Index>

                <Index indexName="docs">
                  <div className={!hasInput ? 'input-empty' : 'input-value'} style={{ top: '350px' }}>
                    <h2>Learning Center </h2>
                    <NextHits hitComponent={Hits} />
                    <Configure hitsPerPage={2} />
                  </div>
                </Index>

              </InstantSearch>
            </ClickOutHandler>
          </div>
          {data.links.map((link) => (
            <div className="nav-item" key={link.name}>
              {link.cta ? <LoginCheck cookie={this.getCookie('getpostmanlogin')} /> : <DynamicLink className="nav-link" url={link.url} name={link.name} />}
            </div>
          ))}
        </div>
      </header>
    );
  }
}

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      headerLinks {
        value
      }
    }`);
  return (
    <HeaderComponent data={data.headerLinks.value} />
  );
};

export default Header;
