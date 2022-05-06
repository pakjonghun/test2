import { render, screen } from "../../../test-util";
import userEvent from "@testing-library/user-event";
import Types from "../Types";
import Option from "../Options";
import Order from "..";
import SummaryPage from "../../Summary/SummaryPage";
import { getByRole } from "@testing-library/react";

describe("price caculator", () => {
  it("should plus price and count", async () => {
    render(<Types orderType='product' />);

    const price = await screen.findByText("totalProduct", {
      exact: false,
    });

    expect(price).toHaveTextContent("0");

    const input = await screen.findByRole("spinbutton", {
      name: "America",
    });

    userEvent.clear(input);
    userEvent.type(input, "1");

    expect(price).toHaveTextContent("1000");

    userEvent.clear(input);
    userEvent.type(input, "3");

    expect(price).toHaveTextContent("3000");
  });
});

describe("total", () => {
  const mockFunc = jest.fn();

  it("should total price", async () => {
    render(<Order setStage={mockFunc} />);

    const price = await screen.findByText("totalPrice", {
      exact: false,
    });

    expect(price).toHaveTextContent("0");
    const item = await screen.findByRole("spinbutton", {
      name: "America",
    });

    userEvent.clear(item);
    userEvent.type(item, "1");
    expect(price).toHaveTextContent("1000");

    const option = await screen.findByRole("checkbox", {
      name: "Insurance",
    });

    userEvent.click(option);
    expect(price).toHaveTextContent("1500");

    userEvent.click(option);
    expect(price).toHaveTextContent("1000");

    const dinner = await screen.findByRole("checkbox", {
      name: "Dinner",
    });

    userEvent.click(dinner);
    expect(price).toHaveTextContent("1500");
  });
});
