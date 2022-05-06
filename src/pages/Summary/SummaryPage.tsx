import React, { FC, useCallback } from "react";
import { useOrder } from "../../contexts/OrderContext";
import Summary from "./Summary";

interface props {
  setState: () => void;
}

const SummaryPage: FC<props> = ({ setState }) => {
  const [data] = useOrder();

  return (
    <div>
      <h1>주문확인</h1>
      <h3>product:{data?.total.product}</h3>
      <ul>
        {data &&
          Array.from(data.product).map(([key, value]) => (
            <li key={`${value}:${key}`}>{`${value}:${key}`}</li>
          ))}
      </ul>
      <h3>option{data?.total.option}</h3>
      <ul>
        {data &&
          Array.from(data.option).map(([key, value]) => (
            <li key={`${value}:${key}`}>{`${value}:${key}`}</li>
          ))}
      </ul>
      <Summary setStage={setState} />
    </div>
  );
};

export default SummaryPage;
