import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// import Image from "gatsby-image"
// import PropTypes from "prop-types"

const Pagination = ({ name, avatar, date }) => {
// cursor is a property pointer to where in query the item exists. Its not a property of the node itself but a property of node in relation to a query that it is coming from. We can ask for relevant information

  // The limit is called first, meaning you’re grabbing the first x elements after a provided start index.

  const data = useStaticQuery(graphql`
  query Pagination {
    wpgraphql {
      posts(after: "10", before: "10", first: 10) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            date
          }
        }
      }
    }
  }`);


  return (
    <div className="row">
      <img src={avatar} alt={name} />
      <p>
        {name}
        {' '}
        on
        {' '}
        {date}
      </p>
    </div>
  );
};

// Pagination.propTypes = {
//   name: PropTypes.string,
//   avatar: PropTypes.string,
//   date: PropTypes.string
// }

export default Pagination;
