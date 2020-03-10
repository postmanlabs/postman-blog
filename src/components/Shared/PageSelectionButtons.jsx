import React from 'react';
import { Link } from 'gatsby';
// import './_pageSelectionButtons.scss';

const PageSelectionButtons = ({ currentPage, totalPages, prefix }) => {
  const numOfPages = 5; // # of next page options to display
  const nextPageButtons = [];

  const root = prefix || '';

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
    nextPageButtons.push(<li className="page-item-prev"><Link to={`${root}/page/${currentIndex - 1}`} className="page-link" key={currentIndex}>Prev</Link></li>);
  }
  for (let i = 0; i < numOfButtons; i++) {
    if (currentIndex === totalPages) {
      nextPageButtons.push(<li key={currentIndex} className="page-item"><Link to={`${root}/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
      break;
    }
    nextPageButtons.push(<li key={currentIndex} className="page-item"><Link to={`${root}/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
    currentIndex++;
  }

  if (!(currentPage === totalPages)) {
    nextPageButtons.push(<li key={currentIndex} className="page-item-next"><Link to={`${root}/page/${currentPage + 1}`} className="page-link" key={currentPage + 1}>Next</Link></li>);
  }
  return (
    <div className="row">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {nextPageButtons.map((button) => button)}
        </ul>
      </nav>
    </div>
  );
};

export default PageSelectionButtons;
