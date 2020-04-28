import React from 'react';

const ReturnDateString = ({ data }) => {
  const dated = new Date(Date.parse(data));
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = dated.toLocaleDateString('en-GB', options);
  return (
    <span>{dateString}</span>
  );
};
export default ReturnDateString;
