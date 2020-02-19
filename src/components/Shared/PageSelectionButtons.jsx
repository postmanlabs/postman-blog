import React from 'react';
import { Link } from 'gatsby';

const PageSelectionButtons = ({ currentPage }) => {
  console.log('HELLO current page', currentPage);
  const numOfPages = 5;
  const nextPageButtons = [];
  for (let i = currentPage; i < currentPage + numOfPages; i++) {
    nextPageButtons.push(<Link to={`/page/${i}`} className="btn" key={currentPage}>{i}</Link>);
  }
  console.log(nextPageButtons);
  return (
    <div>
      {nextPageButtons.map((button) => button)}
    </div>

  );
};

export default PageSelectionButtons;
