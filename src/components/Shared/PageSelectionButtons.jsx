import React from 'react';
import { Link } from 'gatsby';

const PageSelectionButtons = ({ currentPage }) => {
  console.log('HELLO current page', currentPage);
  const numOfPages = 5;
  let nextPageButtons;
  for (let i = currentPage; i < currentPage + numOfPages; i++) {
    nextPageButtons += <Link to={`/page/${i}`} className="btn" key={currentPage}>{i}</Link>;
  }
  return (
    <Link to={`/page/${currentPage + 1}`} className="btn">Next Page</Link>
  );
};

export default PageSelectionButtons;
