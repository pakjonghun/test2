import { FC } from "react";
import { useOrder } from "../../contexts/OrderContext";

interface props {
  name: string;
}

const Option: FC<props> = ({ name }) => {
  const state = useOrder();

  const setState = (value: boolean) => {
    if (!state?.[1]) return;
    state[1]({ type: "option", itemName: name, itemCount: value ? 1 : 0 });
  };

  return (
    <label htmlFor={name}>
      <input
        onChange={(e) => {
          setState(e.target.checked);
        }}
        type='checkbox'
        id={name}
        value={name}
      />
      {name}
    </label>
  );
};

export default Option;
