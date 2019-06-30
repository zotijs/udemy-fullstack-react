import React, { Component } from "react";
import { reduxForm } from "redux-form"; //used for form clear onCancel
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

//surveynew shows surveyform and surveyformreview
class SurveyNew extends Component {
  //component level state initialization
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
