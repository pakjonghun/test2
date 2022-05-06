import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import Error from "../../components/Error";
import { useOrder } from "../../contexts/OrderContext";
interface props {
  setStage: () => void;
}
type Data = { orderNumber: number; price: number };
const Completed: FC<props> = ({ setStage }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [isError, setIsError] = useState(false);

  const [orderData] = useOrder();

  useEffect(() => {
    if (orderData) {
      getOrder(orderData);
    }
  }, [orderData]);

  async function getOrder(data: any) {
    try {
      setLoading(true);
      const res = await axios.post<Data[]>("http://localhost:4000/order", data);
      setData(res.data);
    } catch (err) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading</div>;

  if (isError) return <Error message='error' />;
  return (
    <div>
      <h1>주문완료</h1>
      <ul>
        {data?.map((d) => (
          <li key={d.orderNumber}>
            {d.orderNumber}:{d.price}
          </li>
        ))}
      </ul>
      <button onClick={setStage}>되돌아가기</button>
    </div>
  );
};

export default Completed;
