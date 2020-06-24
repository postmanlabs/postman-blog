const axios = require('axios').default;
const React = require('react');
const fs = require('fs');
const path = require('path');
const bff = require('./bff.json');

const bffUrl = `${bff.host}/${bff.path}`;
const cacheDirName = `cache-${bff.path.replace(/(api|bff)\//, '').replace('/', '_')}`;
const cacheDir = path.join('public', cacheDirName);
const cachePmDir = path.join(cacheDir, 'pm');
const pmUtilities = ['sanatizeContent'];

function cacheCdn(url, name) {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  axios.get(url)
    .then((response) => {
      fs.writeFile(path.join(cacheDir, `${name}.js`), response.data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
}

function getPm(name) {
  axios.get(`${bffUrl}/pm/${name}.js?${new Date().getTime()}`)
    .then((response) => {
      fs.writeFile(path.join(cachePmDir, `${name}.js`), response.data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
}

function getPms(names) {
  names.forEach((name) => {
    getPm(name);
  });
}

function cachePm() {
  cacheCdn('https://cdn.jsdelivr.net/npm/sanitize-html@1.23.0/dist/sanitize-html.min.js', 'sh');

  if (!fs.existsSync(cachePmDir)) {
    fs.mkdirSync(cachePmDir);
  }

  getPms(pmUtilities);
}

cachePm();

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  const modifiedComponents = [...headComponents];
  const script = `
    var d = 1000, t, z;
    load('/${cacheDirName}/sh.js');
    loadPms(${JSON.stringify(pmUtilities)});
    loadPms(['getEnv', 'enablePostmanAnalytics']);
    if (!z) {
      clearTimeout(t);
      t = setTimeout(function(){
        if (window.pm && window.pm.sanatizeContent) {
          window.pm.cache = '${cacheDirName}';
          clearTimeout(t);
        }
        if (window.pm && window.pm.enablePostmanAnalytics) {
          var config = {
            env: window.pm.getEnv(),
            type: 'events-blog'
          };
          window.ga = pm.enablePostmanAnalytics(window.ga, config);
          z = true;
          clearTimeout(t);
        }
      }, d);
    }

    function load(src) {
      var e = document.createElement('script');
      e.src = src;
      document.head.appendChild(e);
    }
    function loadPm(name) {
      load('/${cacheDirName}/pm/' + name + '.js');
    }
    function loadPms(names) {
      var i, max = names.length;
      for (i = 0; i < max; i++) {
        loadPm(names[i]);
      }
    }
  `;

  modifiedComponents.push(
    React.createElement(
      'script',
      {
        key: 'pm',
        dangerouslySetInnerHTML: {
          __html: script,
        },
      },
    ),
  );

  replaceHeadComponents(modifiedComponents);
};
