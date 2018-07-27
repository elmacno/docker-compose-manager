import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fetch from '../Services/Fetch';
import { addProps } from './Home.props';

class Home extends Component {
  propTypes = {
    containers: PropTypes.array
  };
  async componentDidMount() {
    try {
      let response = await Fetch('/containers');
      console.info(response);
    } catch (error) {
      console.error(await error);
    }
  }

  render() {
    return <p> This is the Home page </p>;
  }
}

export default addProps(Home);
