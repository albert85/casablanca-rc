import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import tourSetup from "../../../../included/onboarding/initTour";
import onboarding from "../../../../included/onboarding/onboarding";

// TODO: Delete this, and do it the react way - Mike M.
async function openSearchModalLegacy(props) {
  if (Meteor.isClient) {
    const { Blaze } = await import("meteor/blaze");
    const { Template } = await import("meteor/templating");
    const { $ } = await import("meteor/jquery");
    const searchTemplate = Template[props.searchTemplate];

    Blaze.renderWithData(searchTemplate, {}, $("html").get(0));

    $("body").css("overflow", "hidden");
    $("#search-input").focus();
  }
}

class NavBar extends Component {
  static propTypes = {
    brandMedia: PropTypes.object,
    hasProperPermission: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    shop: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.startTour = this.startTour.bind(this);
    this.startOnboarding = this.startOnboarding.bind(this);
  }

  state = {
    navBarVisible: false
  }

  toggleNavbarVisibility = () => {
    const isVisible = this.state.navBarVisible;
    this.setState({ navBarVisible: !isVisible });
  }

  handleCloseNavbar = () => {
    this.setState({ navBarVisible: false });
  }

  handleOpenSearchModal = () => {
    openSearchModalLegacy(this.props);
  }

  renderLanguage() {
    return (
      <div className="languages hidden-xs">
        <Components.LanguageDropdown />
      </div>
    );
  }

  renderCurrency() {
    return (
      <div className="currencies hidden-xs">
        <Components.CurrencyDropdown />
      </div>
    );
  }

  renderBrand() {
    const shop = this.props.shop || { name: "" };
    const logo = this.props.brandMedia && this.props.brandMedia.url();

    return (
      <Components.Brand
        logo={logo}
        title={shop.name}
      />
    );
  }

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div className="search">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
        </div>
      );
    }
  }

  renderOnboardingButton() {
    if (!Reaction.hasPermission("admin") && window.location.pathname.indexOf("/tag/") === 0) {
      return (
        <div className="takeTour search">
          <button onClick={this.startOnboarding} className="rui btn btn-default flat button" type="button" kind="flat">
            Take A Tour
          </button></div>
      );
    }
  }

  startOnboarding(e) {
    e.preventDefault();
    onboarding.initManualTour();
  }

  renderNotificationIcon() {
    if (this.props.hasProperPermission) {
      return (
        <Components.Notification />
      );
    }
  }

  renderTourButton() {
    if ((Reaction.hasPermission("seller") || (Reaction.hasPermission("owner"))) && window.location.pathname.indexOf("/tag/") === 0) {
      return (
        <div className="takeTour search">
          <button onClick={this.startTour} className="rui btn btn-default flat button" type="button" kind="flat">
            Take A Tour
          </button>
        </div>
      );
    }
  }

  renderCartContainerAndPanel() {
    return (
      <div className="cart-container">
        <div className="cart">
          <Components.CartIcon />
        </div>
        <div className="cart-alert">
          <Components.CartPanel />
        </div>
      </div>
    );
  }

  renderMainDropdown() {
    return (
      <Components.MainDropdown />
    );
  }

  renderHamburgerButton() {
    return (
      <div className="showmenu"><Components.Button icon="bars" onClick={this.toggleNavbarVisibility} /></div>
    );
  }

  renderTagNav() {
    return (
      <div className="menu">
        <Components.TagNav
          isVisible={this.state.navBarVisible}
          closeNavbar={this.handleCloseNavbar}
        >
          <Components.Brand />
        </Components.TagNav>
      </div>
    );
  }

  startTour(event) {
    event.preventDefault();
    tourSetup.initManualTour();
  }

  renderStaticPages() {
    return (
      <Components.StaticPagesComponent />
    );
  }

  render() {
    // console.log(this.props, 'no props here ')
    return (
      <div className="rui navbar">
        {this.renderHamburgerButton()}
        {this.renderBrand()}
        {this.renderTagNav()}
        {this.renderSearchButton()}
        {this.renderTourButton()}
        {this.renderNotificationIcon()}
        {this.renderOnboardingButton()}
        {this.renderStaticPages()}
        {this.renderLanguage()}
        {this.renderCurrency()}
        {this.renderMainDropdown()}
        {this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

export default NavBar;
