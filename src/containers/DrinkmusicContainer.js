import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl, Howler } from 'howler';

import * as drinkmusicActions from '../actions/drinkmusic';
import * as uiActions from '../actions/ui';

import Drinkmusic from '../components/Drinkmusic';
import Navigation from '../components/Navigation';
import musicWebm from '../components/Drinkmusic/assets/music/music.webm';
import musicMp3 from '../components/Drinkmusic/assets/music/music.mp3';
import Confirm from '../components/Confirm';


const Wrapper = styled.div``;

class DrinkmusicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: {},
    };
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.controlPoints = 25;
  }
  componentDidMount() {
    this.setState({
      music: new Howl({
        src: [musicWebm, musicMp3],
        autoplay: false,
        loop: false,
      }),
    });

    // Connect analyser to Howler music
    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser.connect(Howler.ctx.destination);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.isMobile = window.innerWidth <= 500;
  }

  handleMusicReset = () => {
    this.props.initialiseGrid();
    this.props.closeConfirmation();
  };

  handleMusicToggle = () => {
    if (this.state.music.playing()) {
      this.state.music.pause();
      this.videoRef.current && this.videoRef.current.pause();
      //cancelAcancelAnimationFrame(this.reqFrameLoop);
    } else {
      this.renderFreqFrame();
      this.state.music.play();
      this.videoRef.current && this.videoRef.current.play();
    }
  };

  renderFreqFrame = () => {
    this.reqFrameLoop = requestAnimationFrame(this.renderFreqFrame);
    this.analyser.getByteFrequencyData(this.frequencyData);

    this.drawBars(
      this.createBarCoordinates(this.arrayToAverages(this.frequencyData))
    );

    // this.drawCircle(
    //   this.createCircleCoordinates(this.arrayToAverages(this.frequencyData))
    // );
  };

  arrayToAverages = freqArray => {
    let freqs = Array.from(freqArray);
    freqs = freqs.slice(0, 500);
    const averages = [];
    const perAverage = Math.floor(freqs.length / this.controlPoints);
    while (freqs.length >= perAverage) {
      const a = freqs.splice(0, perAverage);
      const ave =
        a.reduce((ac, cur) => Math.floor(ac) + Math.floor(cur)) / a.length;
      averages.push(ave);
    }

    // Slice last 10 to get more all-around
    return averages;
  };

  createCircleCoordinates = averages => {
    let coords = [];
    const radius = 50;
    const startCoord = [180, 180];
    let key = 0;
    const step = (2 * Math.PI) / this.controlPoints;

    // Loop 2 radians
    for (let i = step; i < 2 * Math.PI + step; i += step) {
      coords.push([
        (radius + averages[key] / 2) * Math.sin(i) + startCoord[0],
        (radius + averages[key] / 2) * Math.cos(i) + startCoord[1],
        (radius + averages[key]) * Math.sin(i) + startCoord[0],
        (radius + averages[key]) * Math.cos(i) + startCoord[1],
      ]);
      key++;
    }
    return coords;
  };

  createBarCoordinates = averages => {
    let coords = [];
    const radius = 70;
    const startCoord = [180, 180];
    let key = 0;
    const step = (2 * Math.PI) / this.controlPoints;

    // Loop 2 radians
    for (let i = step; i <= 2 * Math.PI; i += step) {
      coords.push([
        radius * Math.sin(i) + startCoord[0],
        radius * Math.cos(i) + startCoord[1],
        (radius + averages[key] / 2) * Math.sin(i) + startCoord[0],
        (radius + averages[key] / 2) * Math.cos(i) + startCoord[1],
      ]);
      key++;
    }
    return coords;
  };

  drawCircle = coords => {
    const canvas = this.canvasRef.current;

    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.translate(ctx.width / 2, ctx.height / 2);

      const startCoordinates = [coords[0][0] - 100, coords[0][1]] - 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(startCoordinates[0], startCoordinates[1]);
      coords.map(coord => {
        ctx.quadraticCurveTo(coord[2], coord[3], coord[0], coord[1]);
      });
      ctx.quadraticCurveTo(
        coords[0][2],
        coords[0][3],
        coords[0][0],
        coords[0][1]
      );
      ctx.closePath();
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#000';
      ctx.stroke();
    }
  };
  drawBars = coords => {
    const canvas = this.canvasRef.current;

    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.translate(ctx.width / 2, ctx.height / 2);

      const gradient = ctx.createRadialGradient(300, 300, 0.0, 300, 300, 200.0);
      gradient.addColorStop(0.0, 'rgba(10, 0, 178, 1.000)');
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1.000)');
      gradient.addColorStop(1.0, 'rgba(255, 252, 0, 1.000)');

      const startCoordinates = coords[0];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      coords.map(coord => {
        ctx.moveTo(coord[0], coord[1]);
        ctx.lineTo(coord[2], coord[3]);
      });
      ctx.lineWidth = 40;
      ctx.strokeStyle = '#000';
      ctx.fillStyle = '#000';
      ctx.stroke();
    }
  };

  render() {
    const { ui } = this.props;
    const appMenuItems = [
      {
        title: 'Aloita alusta',
        onClick: this.props.openConfirmation,
      },
    ];

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={true}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
          menuItems={appMenuItems}
        />
        <Drinkmusic
          videoRef={this.videoRef}
          canvasRef={this.canvasRef}
          onToggleSong={this.handleMusicToggle}
          isMobile={this.isMobile}
        />
        <Confirm
          open={ui.showConfirmation}
          onConfirm={this.handleBingoReset}
          onCancel={this.props.closeConfirmation}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  ...drinkmusicActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkmusicContainer);
