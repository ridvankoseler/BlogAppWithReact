import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
