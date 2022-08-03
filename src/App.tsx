import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.route";
import Navigation from "./routes/navigation/navigation.route";
import Auth from "./routes/auth/auth.route";
import Shop from "./routes/shop/shop.route";
import Checkout from "./routes/checkout/checkout.route";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
