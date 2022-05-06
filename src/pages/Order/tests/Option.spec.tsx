import userEvent from "@testing-library/user-event";
import { render, findByRole, screen } from "../../../test-util";
import Types from "../Types";

describe("option test", () => {
  it("should click option", async () => {
    render(<Types orderType='option' />);

    const check = await screen.findByRole("checkbox", {
      name: "Insurance",
    });

    const option = await screen.findByText("totalOption", { exact: false });
    expect(option).toHaveTextContent("0");

    userEvent.click(check);
    expect(option).toHaveTextContent("500");

    const di = await screen.findByRole("checkbox", {
      name: "Dinner",
    });

    userEvent.click(di);
    expect(option).toHaveTextContent("1000");

    userEvent.click(di);
    expect(option).toHaveTextContent("500");
  });
});
