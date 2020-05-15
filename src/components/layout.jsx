/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { useStaticQuery, graphql } from "gatsby"

import Header from './Header/Header';
import Footer from './Footer/Footer';
import CookieAlert from './CookieAlert';
// import './_layout.scss';
import './_all.scss';
import '../utils/typography';

const Layout = ({ children }) => (
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
    <Header />
    <main>{children}</main>
    <CookieAlert />
    <Footer />
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
