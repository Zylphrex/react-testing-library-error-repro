import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMTestUtils from "react-dom/test-utils";

function Component() {
  useEffect(() => () => {}, []); // make sure to return a cleanup
  return <>x</>;
}

let baseElement = null;
let container = null;
beforeEach(() => {
  baseElement = document.body;
  container = baseElement.appendChild(document.createElement("div"));
});
afterEach(() => {
  ReactDOMTestUtils.act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  baseElement.removeChild(container);
  container = null;
});

it("it", function () {
  ReactDOMTestUtils.act(() => {
    ReactDOM.render(<Component />, container);
  });

  return Promise.resolve().then(() => {
    return ReactDOMTestUtils.act(() => {
      return Promise.resolve();
    }).then(() => {});
  });
}, 1); // force a timeout
