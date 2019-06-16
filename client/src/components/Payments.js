import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  //the default currency is USD if we want to change it we can add the currency prop like:
  //currency="EUR"
  //amount prop works with cents so 5$ = 500
  //token prop value is a callback that has the token that we receive from stripe
  //name prop is the header of the payment popup
  //description prop selfexplanatory
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="5$ for 5 survey credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
