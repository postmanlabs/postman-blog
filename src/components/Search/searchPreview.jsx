import React, { Component } from 'react';
import { connectSearchBox, connectHits } from 'react-instantsearch-dom';

import './_search.scss';

class SearchBox extends Component {
  Counter = 3; 

  state = {
    value: this.props.currentRefinement
  };

  onKeyStroke = event => {
    const { refine } = this.props;
    const value = event.currentTarget.value;
    console.log('refine/////////////////', refine)

    clearTimeout(this.Counter);
    this.Counter = setTimeout(() => refine(value))

    this.setState(() => ({
      value
    }));
  }
  render() {
    const { value } = this.state;

    return (
      <div className="ais-SearchBox">
      <form noValidate action="" role="search" className="ais-SearchBox-form">
      <input 
        value={value}
        onChange={this.onKeyStroke}
        placeholder="Search for products with 3 keystrokes...."
        />
          </form>
      </div>
    )
  }
}

// const SearchBox = ({ currentRefinement, refine }) => (
//   <div className="ais-SearchBox">
//     <form noValidate action="" role="search" className="ais-SearchBox-form">
//       <input
//         className="ais-SearchBox-input"
//         type="search"
//         value={currentRefinement}
//         onChange={(event) => refine(event.currentTarget.value)}
//       />
//     </form>
//   </div>
// );

export const CustomSearchBox = connectSearchBox(SearchBox);

// on page load do not display
const Hits = ({ hits }) => (
  // if parent component set is type, render, otherwise hide
  <ul className="style">
    {hits.length < 1 ? <li>No search results found</li> : ''}
    {hits.map((hit) => (
      // console.log(hit);
      <li key={hit.title}>
        <a href={hit.slug}>
          <span className="search-title" dangerouslySetInnerHTML={{ __html: hit._highlightResult.title.value }} />
          <p dangerouslySetInnerHTML={{ __html: hit._snippetResult.excerpt.value }} />
        </a>
      </li>
    ))}
  </ul>
);

export const CustomHits = connectHits(Hits);
