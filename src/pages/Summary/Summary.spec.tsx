import { render, screen } from "@testing-library/react";
import { server } from "../../mocks/server";
import { render as customRender } from "../../test-util";
import Summary from "./Summary";
import SummaryPage from "./SummaryPage";
const mockFunc = jest.fn();

describe("summary", () => {
  test("click confirm button", async () => {
    render(<Summary setStage={mockFunc} />);
    const checkBox = (await screen.findByRole("checkbox", {
      name: "check",
    })) as HTMLInputElement;

    expect(checkBox.checked).toEqual(false);

    const checkButton = (await screen.findByRole("button", {
      name: "confirm",
    })) as HTMLButtonElement;

    expect(checkButton.disabled).toBeTruthy();
  });
});
