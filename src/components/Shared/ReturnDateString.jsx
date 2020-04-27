import React from 'react';

const ReturnDateString = ({ data }) => {
  const dated = new Date(Date.parse(data));
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = dated.toLocaleDateString('en-US', options);
  return (
    <span style={{ marginLeft: '16px' }}>{dateString}</span>
  );
};
export default ReturnDateString;
