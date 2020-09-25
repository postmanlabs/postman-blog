import React from 'react';

const proxyForm = ({
  track, id, className, description, form,
}) => {
  if (typeof document === 'object' && track && id) {
    window.lazyLoadPmUtility('proxyForm', () => {
      window.pm.proxyForm({
        host: '//pages.getpostman.com',
        track,
        id,
      });
    });

    return (
      <div className={className}>
        {description}
        {form}
        <form id={`mktoForm_${id}`} />
        <style>
          {`
          #mktoForm_${id} {
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
