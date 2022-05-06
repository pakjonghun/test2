import {
  findAllByRole,
  findByRole,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import App from "../../../App";
import { server } from "../../../mocks/server";
import Types from "../Types";

describe("display Images from server", () => {
  it("should", async () => {
    render(<Types orderType='product' />);

    const imageList = (await screen.findAllByRole("img", {
      name: /product$/i,
    })) as HTMLImageElement[];

    expect(imageList).toHaveLength(2);

    const altTextList = imageList.map((ele) => ele.alt);
    expect(altTextList).toEqual(["America product", "England product"]);
  });

  it("should catch error", async () => {
    server.resetHandlers(
      rest.get("http://localhost:4000/products", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Types orderType='product' />);
    const errorBanner = await screen.findByTestId("error");
    expect(errorBanner).toHaveTextContent("error");
  });

  it("shoule option length 2", async () => {
    render(<Types orderType='option' />);

    const optionList = await screen.findAllByRole("checkbox");

    expect(optionList).toHaveLength(2);
  });

  it("should catch option error", async () => {
    server.resetHandlers(
      rest.get("http://localhost:4000/options", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Types orderType='option' />);

    const error = await screen.findByTestId("error");

    expect(error).toHaveTextContent("error");
  });
});
