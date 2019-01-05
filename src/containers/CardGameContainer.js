import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import * as cardGameActions from '../actions/cardGame';
import * as uiActions from '../actions/ui';

import CardGame from '../components/CardGame';
import Navigation from '../components/Navigation';
import Confirm from '../components/Confirm';

const Wrapper = styled.div``;

class CardGameContainer extends Component {
  state = {
    showCardAnimation: false,
  };

  componentDidMount() {
    if (this.props.cardGame.pack.length <= 0) {
      this.props.initialisePack();
    }
  }

  handleCardReset = () => {
    this.props.initialisePack();
    this.props.closeConfirmation();
  };

  handleNewCard = () => {
    // Ugly way to make styled-components animations work when clicked
    this.setState(state => ({ ...state, showCardAnimation: true }));
    setTimeout(
      () => this.setState(state => ({ ...state, showCardAnimation: false })),
      500
    );
    this.props.addNewCard();
  };

  render() {
    const { ui, cardGame } = this.props;
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
        <CardGame
          currentCard={cardGame.currentCard}
          onNewCard={this.handleNewCard}
          showAnimation={this.state.showCardAnimation}
          emptyPack={cardGame.emptyPack}
        />
        <Confirm
          open={ui.showConfirmation}
          onConfirm={this.handleCardReset}
          onCancel={this.props.closeConfirmation}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  cardGame: state.cardGame,
  ui: state.ui,
});

const mapDispatchToProps = {
  ...cardGameActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardGameContainer);
