import { FC, useCallback } from "react";
import { useOrder } from "../../contexts/OrderContext";

interface props {
  name: string;
  imagePath: string;
}

const Products: FC<props> = ({ name, imagePath }) => {
  const state = useOrder();

  const update = useCallback(
    (value: number) => {
      if (!state?.[1]) return;
      state[1]({ itemName: name, type: "product", itemCount: value });
    },
    [name, state]
  );

  return (
    <div style={{ marginLeft: "5px" }}>
      <img
        width={200}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />
      <form>
        <label htmlFor={name}>
          {name}
          <input
            onChange={(e) => update(+e.target.value)}
            id={name}
            type='number'
            min='0'
            defaultValue={0}
          />
        </label>
      </form>
    </div>
  );
};

export default Products;
