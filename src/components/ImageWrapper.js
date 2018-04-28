import React, { Component } from 'react';
import Image from './Image';
import ImageNotFound from './ImageNotFound';
import Capitalize from '../helpers/Capitalize';
import FetchImages from '../service/FetchImages';

class ImageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: true
    };
  }
  /**
   * Fetches images from API and sets state for the component
   * @param query
   */
  loadContent = (query) => {
    this.setState({ loading: true });
    return FetchImages(query)
    .then((photos) => {
      this.setState({
        photos: photos,
        hasPhotos: photos && photos.length > 0,
        loading: false
      });
    })
  }
  // Called on inital launch
  componentDidMount = () => {
    this.loadContent(this.props.match.params.query);
  }
  // Called when the route path changes, so we can
  // update the images
  componentWillReceiveProps = (nextProps) => {
    const currentQuery = this.props.match.params.query;
    const nextQuery = nextProps.match.params.query;
    if(currentQuery !== nextQuery) {
      this.loadContent(nextQuery);
    }
  }
  render() {
    const query = Capitalize(this.props.match.params.query);
    const photos = this.state.photos;
    let heading = null;
    if (this.state.hasPhotos || this.state.loading ) {
      heading =
        <div>
          <h1 className='photo-heading'>{query}</h1>
        </div>;
    }
  	return (
      <div>
        {heading}
        {
          (this.state.loading)
          ? <div className='loading'> </div>
          :
          <div>
            {
              (photos.length > 0)
              ? photos.map((photo) => {
                return (
                  <Image id={photo.id} url={photo.url} source={photo.source} key={photo.id} />
                );
              })
              : <ImageNotFound />
            }
          </div>
        }
    	</div>
  	);
  }
}

export default ImageWrapper;
