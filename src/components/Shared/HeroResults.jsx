import React from 'react';
// import './_heroResults.scss';

const HeroResults = ({
  title, totalPosts,
}) => {
  // For now, it'll randomly select a background color.
  // We can set up a switch statement to change color based on category later on
  const colorsArray = ['#6d7f91', '#fbe9f2', '#f4815b', '#f5f8fb', '#7d728e', '#f4f4f4'];
  const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

  return (
    <div className="row hero-results__container" style={{ backgroundColor: color }}>
      <div className="col-12">
        <h1 className="h2">{`Now viewing ${totalPosts} posts for ${title[0].toUpperCase()}${title.slice(1)}`}</h1>
      </div>
    </div>
  );
};

export default HeroResults;
