import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import BlogContextProvider from "./contexts/BlogContext";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BlogContextProvider>
          <AppRouter />
          <ToastContainer />
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
