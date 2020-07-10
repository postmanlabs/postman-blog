/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import marketo from '../../scripts/marketo.munchkin';
// import { useStaticQuery, graphql } from "gatsby"
import HelloBar from './HelloBar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ReferrerCookie from './ReferrerCookie';
// import './_layout.scss';
import CookieAlert from './CookieAlert';
import './_all.scss';
import '../utils/typography';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { children } = this.state;
    return (

  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  <>
    <HelloBar />
    <Header />
    <main>{children}</main>
    <Footer />
    <CookieAlert />
    <ReferrerCookie />
    {marketo()}
  </>
    );
  }
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
