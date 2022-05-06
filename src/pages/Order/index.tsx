import { FC } from "react";
import { useOrder } from "../../contexts/OrderContext";
import Types from "./Types";

interface props {
  setStage: () => void;
}

const Order: FC<props> = ({ setStage }) => {
  const state = useOrder();
  return (
    <div>
      <h1>Trvel</h1>
      <h1>
        {`totalPrice:${state?.[0]?.total.total ? state?.[0]?.total.total : 0}`}
      </h1>
      <div>
        <Types orderType='product' />
      </div>
      <div>
        <div>
          <Types orderType='option' />
        </div>
        <div>
          <button onClick={setStage}>주문</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
