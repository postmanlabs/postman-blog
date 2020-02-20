import React from 'react';
import { Link } from 'gatsby';

const PageSelectionButtons = ({ currentPage, totalPages }) => {
  const numOfPages = 5;
  const nextPageButtons = [];

  const numOfButtons = currentPage + numOfPages > totalPages
    ? (currentPage + numOfPages) - totalPages
    : numOfPages;

  console.log('totalPages', totalPages);
  console.log('currentPage', currentPage);
  console.log('numOfButtons', numOfButtons);
  let currentIndex = currentPage;
  nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex - 1}`} className="page-link" key={currentIndex}>Previous</Link></li>);
  for (let i = 0; i < numOfButtons; i++) {
    if (currentIndex === totalPages) {
      nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
      break;
    }
    nextPageButtons.push(<li className="page-item"><Link to={`/page/${currentIndex}`} className="page-link" key={currentIndex}>{currentIndex}</Link></li>);
    currentIndex++;
  }

  if (numOfButtons === numOfPages) {
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
