const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const sh = require('shelljs');

const pmUtilities = ['sanatizeContent', 'proxyForm'];

const host = 'https://postman-web-property-assets.s3.amazonaws.com';

let bff;
let bffUrl;
let cacheDirName;
let cacheDir;
let cachePmDir;
let script;

function cacheCdn(url, name) {
  sh.exec('mkdir -p public');
  sh.exec(`mkdir -p ${cacheDir}`);

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
      sh.exec(`mkdir -p ${cachePmDir}`);
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
  cacheCdn('https://pages.getpostman.com/js/forms2/js/forms2.min.js', 'forms2');

  if (!fs.existsSync(cachePmDir)) {
    fs.mkdirSync(cachePmDir, true);
  }

  getPms(pmUtilities);
}

axios.get(`${host}/api/manifest.json`)
  .then((response) => {
    bff = { ...response.data, host };
    bffUrl = `${bff.host}/${bff.path}`;
    cacheDirName = `cache-${bff.path.replace(/(api|bff)\//, '').replace('/', '_')}`;
    cacheDir = path.join('public', cacheDirName);
    cachePmDir = path.join(cacheDir, 'pm');
    script = `
    var d = 1000, t, z;
    load('/${cacheDirName}/sh.js');
    loadPms(${JSON.stringify(pmUtilities)});
    if (!z) {
      clearTimeout(t);
      t = setTimeout(function(){
        if (window.pm && window.pm.sanatizeContent) {
          window.pm.cache = '${cacheDirName}';
          clearTimeout(t);
        }
      }, d);
    }
    window.lazyLoadPmUtility = function(name, cb, optionalDelay) {
      var delay = optionalDelay || 1000;
      setTimeout(function(){
        var hasDependencies = window && window.pm && window.pm.cache;
        if (hasDependencies) {
          const e = document.createElement('script');
          e.src = '/' + window.pm.cache + '/pm/' + name + '.js';
          e.onload = cb;
          document.head.appendChild(e);
        }
      }, delay);
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

    fs.writeFile('bff.json', JSON.stringify({ ...response.data, host, script }), (err) => {
      if (err) {
        throw err;
      } else {
        cachePm();
      }
    });
  });
