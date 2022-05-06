import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/products", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:4000/options", (_, res, ctx) => {
    return res(ctx.json([{ name: "Insurance" }, { name: "Dinner" }]));
  }),

  rest.post("http://localhost:4000/order", (req, res, ctx) => {
    let data = [{ orderNumber: 12345, price: 2000 }];
    return res(ctx.json(data));
  }),
];
