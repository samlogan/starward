import React from 'react';

const buildPage = (page) => {
  const {
    componentHTML,
    initialState,
    headAssets,
    chunks
  } = page;
  const { js, styles, cssHash } = chunks;
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${styles}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    ${cssHash}
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${js}
  </body>
</html>`;
};

export default (page) => {
  return buildPage(page);
};
