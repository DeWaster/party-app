import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl, Howler } from 'howler';

import * as uiActions from '../actions/ui';

import Navigation from '../components/Navigation';
import SoundBoard from '../components/SoundBoard';

import sounds from '../components/SoundBoard/sounds';

const Wrapper = styled.div`
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNDAzYzNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxZTI5MmQiPjwvcGF0aD4KPC9zdmc+');
`;

class SoundboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSound: null,
      sounds,
      soundsPlaying: [],
      sound: null,
      duration: 0,
    };
  }

  componentDidMount() {
    this.setState({
      soundsPlaying: this.state.sounds.map(() => false),
    });
  }

  stopSound = () => {
    this.state.sound && this.state.sound.unload();

    this.setState(prevState => ({
      soundsPlaying: prevState.sounds.map(() => false),
      currentSound: null,
    }));
  };

  setSoundToPlay = number => {
    const newPlayStatus = [...this.state.soundsPlaying];
    newPlayStatus[number] = true;

    this.setState({
      soundsPlaying: newPlayStatus,
      duration: this.state.sound.duration(),
    });
  };

  selectSound = soundNumber => {
    this.stopSound();
    this.setState(prevState => ({
      currentSound: soundNumber,
      sound: new Howl({
        src: this.state.sounds[soundNumber],
        autoplay: true,
        onend: () => this.stopSound(soundNumber),
        onplay: () => this.setSoundToPlay(soundNumber),
      }),
    }));
  };

  render() {
    const { ui } = this.props;

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={false}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
        />
        <SoundBoard
          onPlaySound={this.selectSound}
          onStopSound={this.stopSound}
          playStatus={this.state.soundsPlaying}
          duration={this.state.duration}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundboardContainer);
