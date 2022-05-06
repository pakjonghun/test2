import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { OrderContext, OrderContextProvider } from "./contexts/OrderContext";

const custom = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions
) => {
  render(ui, { wrapper: OrderContextProvider, ...options });
};

export * from "@testing-library/react";

export { custom as render };
