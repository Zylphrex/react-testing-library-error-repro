import React, {useEffect} from "react";
import { render } from "@testing-library/react";

function Component() {
  useEffect(() => () => {}, []); // make sure to return a cleanup
  return <>x</>;
}

it("it", function () {
  const {findByText} = render(<Component />);
  return findByText("x").then(() => {
  // the test should have timed out at this point
    return findByText("x");
  });
}, 1); // force a timeout of 1ms so that by the time the second `findByText` is called, the test should've failed
