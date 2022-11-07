import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";

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
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
