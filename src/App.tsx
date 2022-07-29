import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.route";
import Navigation from "./routes/navigation/navigation.route";
import SignIn from "./routes/sign-in/sign-in.route";

const Shop = () => {
  return (
    <div>
      <h1>Shop Page</h1>
    </div>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
