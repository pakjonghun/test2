import { useCallback, useState } from "react";
import { OrderContextProvider } from "./contexts/OrderContext";
import Completed from "./pages/Complete";
import Order from "./pages/Order";
import SummaryPage from "./pages/Summary/SummaryPage";

function App() {
  const [stage, setStage] = useState(0);

  const changeStage = useCallback(() => {
    setStage((pre) => (pre < 2 ? pre + 1 : 0));
  }, []);

  return (
    <OrderContextProvider>
      {stage === 0 && <Order setStage={changeStage} />}
      {stage === 1 && <SummaryPage setState={changeStage} />}
      {stage === 2 && <Completed setStage={changeStage} />}
    </OrderContextProvider>
  );
}

export default App;
