import React from 'react';
import universal from 'react-universal-component';
import {
  BLOG_SLUG,
  CATEGORY_SLUG,
  AUTHOR_SLUG,
  SEARCH_SLUG
} from './config/app';
import { fetchWPData } from './fetch-data';
import App from './containers/App';

const getComponent = name => universal(() => import(`./containers/${name}`));

export default [{
  component: App,
  routes: [{
    path: `/${BLOG_SLUG}/page/:page`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: getComponent('Blog'),
  }, {
    path: `/${BLOG_SLUG}/:post`,
    name: 'BlogPost',
    fetchData: fetchWPData,
    component: getComponent('BlogPost'),
  }, {
    path: `/${BLOG_SLUG}`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: getComponent('Blog'),
  }, {
    path: `/${CATEGORY_SLUG}/:slug/page/:page`,
    name: 'Category',
    fetchData: fetchWPData,
    component: getComponent('Category'),
  }, {
    path: `/${CATEGORY_SLUG}/:slug`,
    name: 'Category',
    fetchData: fetchWPData,
    component: getComponent('Category'),
  }, {
    path: `/${AUTHOR_SLUG}/:name/page/:page`,
    name: 'Author',
    fetchData: fetchWPData,
    component: getComponent('Author'),
  }, {
    path: `/${AUTHOR_SLUG}/:name`,
    name: 'Author',
    fetchData: fetchWPData,
    component: getComponent('Author'),
  }, {
    path: `/${SEARCH_SLUG}`,
    name: 'Search',
    fetchData: fetchWPData,
    component: getComponent('Search'),
  }, {
    path: '*',
    name: 'Page',
    fetchData: fetchWPData,
    component: getComponent('Page'),
  }]
}];
