import React from 'react';

const ReturnDateString = ({ data }) => {
  let dated;
  if (data && !data.includes('T')) {
    const arr = data.split(/[- :]/);
    dated = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  } else {
    dated = new Date(Date.parse(data));
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = dated.toLocaleDateString('en-US', options);
  return (
    <span>{dateString}</span>
  );
};
export default ReturnDateString;
