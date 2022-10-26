import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component";

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet />
    </div>
  );
};

const Shop = () => {
  return <h1> I am the shop page</h1>;
};

const App = () => {
  return (
    // Nested Paths
    // Parental components will render always unless told otherwise
    // To render child path route components we need to sepcify it inside the parent component
    // index set to true means that the child route will also render along the parent route
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
