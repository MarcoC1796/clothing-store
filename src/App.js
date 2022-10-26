import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";

const Shop = () => {
  return <h1>I am the Shop page</h1>;
};

const App = () => {
  return (
    // Nested Paths
    // Parental components will render always unless told otherwise
    // To render child path route components we need to sepcify it inside the parent component
    <Routes>
      <Route path="/home" element={<Home />}>
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
