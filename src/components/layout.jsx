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

import Header from './Header/Header';
import Footer from './Footer/Footer';
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
    <Footer />
    {marketo()}
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
