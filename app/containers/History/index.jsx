// @flow

import React, { Component } from 'react';
import storage from 'electron-json-storage';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import { setPhoto } from 'app/containers/Main/redux';
import Navbar from 'app/components/Navbar';
import PhotoItem from './components/PhotoItem';
import Style from './style';

type Props = {
  setPhoto: () => void
};

type State = {
  pictures: Array
};

@connect(
  null,
  { setPhoto }
)
@withRouter
@autobind
class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    this.getLocalPhotos();
  }

  getLocalPhotos() {
    storage.get('pictures', (error, pictures) => {
      if (pictures.list) {
        this.setState({ pictures: pictures.list });
      }
    });
  }

  handleSetActivePhoto(photoData: any) {
    const { setPhoto, history } = this.props;
    setPhoto(photoData);
    history.push('/');
  }

  render() {
    const { pictures } = this.state;
    return (
      <Style>
        <Navbar />
        <div className="pictures-wrapper">
          {
            pictures.map((picItem) => (
              <PhotoItem
                key={picItem.id}
                imageSRC={picItem.urls.small}
                onClick={() => this.handleSetActivePhoto(picItem)}
              />
            ))
          }
        </div>
      </Style>
    );
  }
}

export default Main;
