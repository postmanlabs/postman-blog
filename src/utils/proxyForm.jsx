import React from 'react';

const proxyForm = ({
  track, id, className, description, form,
}) => {
  const mktoId = `mktoForm_${id}`;
  if (typeof document === 'object' && track && id) {
    if (document.getElementById(mktoId) === null) {
      console.log('calling');
      window.lazyLoadPmUtility('proxyForm', () => {
        window.pm.proxyForm({
          host: '//pages.getpostman.com',
          track,
          id,
        });
      });
    }
    return (
      <div className={className}>
        {description}
        {form}
        <form id={mktoId} />
        <style>
          {`
          #${mktoId} {
            display: none !important;
          }
        `}
        </style>
      </div>
    );
  }

  return null;
};

export default proxyForm;
