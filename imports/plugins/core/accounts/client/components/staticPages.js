import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/lib/api";

class StaticPagesComponent extends Component {
  static propTypes = {
    pages: PropTypes.array
  };
  goToStaticPage(page) {
    return Reaction.Router.go(`/pages/${page.pageAddress}`);
  }

  renderStaticPagesComponent() {
    const { pages } = this.props;
    return (
      <div className="static-pages dropdown" role="menu" data-delay="1000">
        <div className="dropdown-toggle tog" data-toggle="dropdown">
          About
          <span className="caret" />
        </div>
        <ul className="dropdown-menu">
          {pages.map(page => {
            return (
              <li key={page._id}>
                <a className="static-dropdown" onClick={() => this.goToStaticPage(page)}>
                  {page.pageName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="static-pages" role="menu">
        {this.renderStaticPagesComponent()}
      </div>
    );
  }
}

registerComponent("StaticPagesComponent", StaticPagesComponent);

export default StaticPagesComponent;
