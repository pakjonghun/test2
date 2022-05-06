import { FC, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Error from "../../components/Error";
import Option from "./Options";
import { useOrder } from "../../contexts/OrderContext";

interface props {
  orderType: "product" | "option";
}

const Types: FC<props> = ({ orderType }) => {
  const [item, setItem] = useState<{ name: string; imagePath: string }[]>([]);
  const [isError, setIsError] = useState(false);
  const state = useOrder();

  useEffect(() => {
    loadItem(orderType);
  }, [orderType]);

  const loadItem = async (orderType: "product" | "option") => {
    try {
      const res = await axios.get<{ name: string; imagePath: string }[]>(
        `http://localhost:4000/${orderType}s`
      );
      setItem(res.data);
    } catch (err) {
      setIsError(true);
    }
  };

  if (!orderType) return null;

  if (isError) return <Error message='error' />;

  return (
    <>
      <h1>
        {`total${orderType}:${
          state[0]?.total[orderType] ? state[0]?.total[orderType] : 0
        }`}
      </h1>

      <div style={{ display: "flex" }}>
        {orderType === "product"
          ? item.map(({ name, imagePath }) => (
              <Products key={name} name={name} imagePath={imagePath} />
            ))
          : item.map(({ name }) => <Option key={name} name={name} />)}
      </div>
    </>
  );
};

export default Types;
