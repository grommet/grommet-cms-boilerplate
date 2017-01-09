// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import './scss/index.scss';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './js/containers/Root';
import configureStore from './js/store';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);
const element = document.getElementById('content');

render(
	<Root store={store} history={history} />,
	element
);

document.body.classList.remove('loading');
