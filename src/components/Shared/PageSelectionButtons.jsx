import React from 'react';
import { Link } from 'gatsby';

const PageSelectionButtons = ({ currentPage, totalPages }) => {
  const numOfPages = 5; // # of next page options to display
  const nextPageButtons = [];

  // If the current page we're on + the number of page options we want to display
  // Is greater than all of pages total (ex. we are on page 26 + the next 5 > then 28)
  const numOfButtons = currentPage + numOfPages > totalPages
    // numOfButtons to display is the remaining difference + 1 to include current page
    ? totalPages - currentPage + 1
    // Or else just display the 5;
    : numOfPages;

  let currentIndex = currentPage;
  // If we're not on the first page, add a previous button
  if (currentIndex !== 1) {
    nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex - 1}`} className="page-link" key={currentIndex}>Previous</Link></li>);
  }
  for (let i = 0; i < numOfButtons; i++) {
    if (currentIndex === totalPages) {
      nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
      break;
    }
    nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
    currentIndex++;
  }

  if (!(currentPage === totalPages)) {
    nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentPage + 1}`} className="page-link" key={currentPage + 1}>Next</Link></li>);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {nextPageButtons.map((button) => button)}
      </ul>
    </nav>
  );
};

export default PageSelectionButtons;
