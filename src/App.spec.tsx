import {
  findByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

import { rest } from "msw";
import { server } from "./mocks/server";

describe("app test", () => {
  it("should switch page", async () => {
    render(<App />);

    const england = await screen.findByRole("spinbutton", {
      name: "England",
    });

    const product = await screen.findByText("totalProduct", { exact: false });
    const option = await screen.findByText("totalOption", { exact: false });
    const total = await screen.findByText("totalPrice", { exact: false });

    expect(product).toHaveTextContent("0");
    expect(option).toHaveTextContent("0");
    expect(total).toHaveTextContent("0");

    userEvent.clear(england);
    userEvent.type(england, "3");

    expect(product).toHaveTextContent("3000");
    expect(total).toHaveTextContent("3000");

    const insurance = await screen.findByRole("checkbox", {
      name: "Insurance",
    });

    userEvent.click(insurance);
    expect(option).toHaveTextContent("500");
    expect(total).toHaveTextContent("3500");

    const orderButton = await screen.findByRole("button", {
      name: "주문",
    });

    userEvent.click(orderButton);

    const summaryHead = screen.getByRole("heading", { name: "주문확인" });
    expect(summaryHead).toBeInTheDocument();

    const productTotal = screen.getByRole("heading", { name: "product:3000" });
    expect(productTotal).toBeInTheDocument();

    const optionTotal = screen.getByRole("heading", { name: "option500" });
    expect(optionTotal).toBeInTheDocument();

    expect(screen.getByText("3:England")).toBeInTheDocument();
    expect(screen.getByText("1:Insurance")).toBeInTheDocument();

    const check = screen.getByRole("checkbox", { name: "check" });
    const button = screen.getByRole("button", {
      name: "confirm",
    }) as HTMLButtonElement;
    expect(button).toBeDisabled();
    userEvent.click(check);
    expect(button.disabled).toBeFalsy();
    userEvent.click(button);

    // const loading = screen.getByText(/loading/i);
    // expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const completedHeader = await screen.findByRole("heading", {
      name: "주문완료",
    });
    expect(completedHeader).toBeInTheDocument();

    // const prdLoading = screen.queryByText("loading");
    // expect(prdLoading).not.toBeInTheDocument();

    const back = screen.getByRole("button", {
      name: "되돌아가기",
    });

    userEvent.click(back);

    await screen.findByRole("spinbutton", { name: "America" });
  });
});
