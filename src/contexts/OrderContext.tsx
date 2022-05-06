import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface updateFuncArgs {
  type: "product" | "option";
  itemName: string;
  itemCount: number;
}

interface props {
  children: React.ReactNode;
}

type Value = [
  {
    product: Map<any, any>;
    option: Map<any, any>;
    total: { product: number; option: number; total: number };
  },
  (args: updateFuncArgs) => void
];

export const OrderContext = createContext<Value | null>(null);

export const OrderContextProvider: FC<props> = ({ children }) => {
  const [orderCount, setOrderCount] = useState({
    product: new Map(),
    option: new Map(),
  });

  const [total, setTotal] = useState({
    product: 0,
    option: 0,
    total: 0,
  });

  useEffect(() => {
    const product = caclulate("product", orderCount);
    const option = caclulate("option", orderCount);
    const total = product + option;
    setTotal({ product, option, total });
  }, [orderCount]);

  const updateCount = useCallback(
    ({ type, itemCount, itemName }: updateFuncArgs) => {
      const newMap = { ...orderCount };
      newMap[type].set(itemName, itemCount);
      setOrderCount(newMap);
    },
    [orderCount]
  );

  const value = useMemo(() => {
    return { ...orderCount, total };
  }, [orderCount, total]);

  return (
    <OrderContext.Provider value={[value, updateCount]}>
      {children}
    </OrderContext.Provider>
  );
};

function caclulate(
  type: "product" | "option",
  orderCount: { product: Map<any, any>; option: Map<any, any> }
) {
  const price = {
    product: 1000,
    option: 500,
  };

  let temp = 0;
  orderCount[type].forEach((p) => (temp += p));
  return temp * price[type];
}

export function useOrder() {
  const state = useContext(OrderContext);
  if (!state) return [null, null];
  return state;
}
