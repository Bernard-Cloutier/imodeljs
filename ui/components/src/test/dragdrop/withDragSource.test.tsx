/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import TestBackend from "react-dnd-test-backend";
import ReactTestUtils from "react-dom/test-utils";
import * as sinon from "sinon";
import { cleanup, render } from "@testing-library/react";
import { DragSourceArguments, withDragSource } from "../../ui-components";

describe("withDragSource", () => {

  /**
   * Wraps a component into a DragDropContext that uses the TestBackend.
   */
  function wrapInTestContext(DecoratedComponent: React.ComponentType<any>) {// eslint-disable-line @typescript-eslint/naming-convention
    class TestContextContainer extends React.Component {
      public render() {
        return <DecoratedComponent {...this.props} />;
      }
    }

    return DragDropContext(TestBackend)(TestContextContainer);
  }

  class TestComponent extends React.Component<any> {
    public render(): React.ReactNode {
      return <div> test </div>;
    }
  }
  afterEach(cleanup);

  describe("Wrapped component", () => {
    const testDragSource = withDragSource(TestComponent);
    const BaseComponent = testDragSource.DecoratedComponent; // eslint-disable-line @typescript-eslint/naming-convention
    it("mounts wrapped component", () => {
      render(<BaseComponent dragProps={{}} connectDragSource={(e: any) => e} />);
    });
  });
  describe("Drag functionality", () => {
    const TestDragSource = withDragSource(TestComponent); // eslint-disable-line @typescript-eslint/naming-convention
    const ContextTestDragSource = wrapInTestContext(TestDragSource) as any; // eslint-disable-line @typescript-eslint/naming-convention
    const onDragSourceBegin = (args: DragSourceArguments) => {
      args.dataObject = { test: true };
      return args;
    };
    const beginSpy = sinon.spy(onDragSourceBegin);
    const onDragSourceEnd = sinon.fake();
    const root = ReactTestUtils.renderIntoDocument(<ContextTestDragSource dragProps={{ onDragSourceBegin: beginSpy, onDragSourceEnd, objectType: "test" }} />);

    // Obtain a reference to the backend
    const backend = (root as any).getManager().getBackend();
    const instance = ReactTestUtils.findRenderedComponentWithType(root as any, TestDragSource) as any;
    it("calls onDragSourceBegin correctly", () => {
      backend.simulateBeginDrag([instance.getHandlerId()]);
      expect(beginSpy).to.have.been.calledOnce;
      expect(beginSpy).to.have.been.calledWith(sinon.match({ dataObject: { test: true } }));

    });
    it("calls onDragSourceEnd correctly", () => {
      backend.simulateEndDrag();
      expect(onDragSourceEnd).to.have.been.calledOnce;
      expect(onDragSourceEnd).to.have.been.calledWith(sinon.match({ dataObject: { test: true } }));
    });
  });
});
