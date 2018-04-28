import React, { Component } from 'react';

class Image extends Component {
  render() {
    return(
      <a href={this.props.url} target="_blank">
        <img className='photo' src={this.props.source} alt='' />
      </a>
    );
  }
}

export default Image;
