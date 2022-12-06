import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  // Outlet will render the nested route component
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
