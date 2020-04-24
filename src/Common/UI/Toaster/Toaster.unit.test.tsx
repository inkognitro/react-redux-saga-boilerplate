import React from "react";
import { Toaster } from "Common/UI/Toaster/Toaster";
import { shallow } from "enzyme";
import { ToastTypes } from "Common/Domain/Toaster/Types";

describe("Toaster", () => {
  it("should render", () => {
    shallow(
      <Toaster
        toasts={[
          {
            id: "foo",
            type: ToastTypes.INFO,
            messages: [
              {
                id: "foo123",
                canBeClosedManually: true,
                automaticCloseDelayInMs: null,
                content: "bar",
              },
            ],
          },
        ]}
        onRemoveMessage={() => {}}
      />
    );
  });
});
