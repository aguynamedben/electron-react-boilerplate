// @flow
import path from 'path';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { requireTaskPool } from 'electron-remote';
import isDev from 'electron-is-dev';

import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.asyncSlowdown();
  }

  async asyncSlowdown() {
    const start = new Date();

    // This depends on a fix in electron-remote that makes electron-remote stop
    // using require.resolve(), which conflicts with
    // electron-react-boilerplate's Webpack config.

    // Get the filename of the module without using require.resolve(), which in
    // Webpack appears to return relative file path.

    // At first I hard-coded this to debug the electron-remote issue.
    //const slowdownPath = '/Users/ben/code/electron-react-boilerplate/app/slowdown.js';

    // Note: I have not tested the non-dev path. It should be handled via:
    // - files or resources in electron-builder
    // - a new Webpack entry so ES6 can be used

    const slowdownPath = isDev
      ? path.join(__dirname, '..', 'app', 'slowdown.js')
      : path.join(process.resourcesPath, 'slowdown.js');

    console.log(`slowdownPath is ${slowdownPath}`);

    const slowdownTask = requireTaskPool(slowdownPath);

    const result = await slowdownTask();
    const finish = new Date();
    const elapsed = finish - start;
    console.log(`Done with asyncSlowdown, took ${elapsed}ms`);
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
