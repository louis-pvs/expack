import React, { Suspense } from "react";

const Article = React.lazy(() =>
  import(/* webpackChunkName: "lazy/Article" */ "./Article")
);

export default class App extends React.PureComponent {
  state = {
    shown: false
  };
  renderExtraContent() {
    if (!this.state.shown) return null;
    return <Article />;
  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.setState(({ shown }) => ({ shown: !shown }))}
        >
          Click me!
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          {this.renderExtraContent()}
        </Suspense>
      </div>
    );
  }
}
