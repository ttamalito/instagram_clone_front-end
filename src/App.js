import {BrowserRouter} from "react-router-dom";

import BaseRoutes from "./routes/BaseRoutes";

// import the styles
import './styles/base.css';
import Header from "./components/Header";
export default function App() {
  // how to change the title of the webpage
  document.title = 'Hola Putos';
  return (
      <>
          <Header />
          <BrowserRouter>
              <BaseRoutes />
          </BrowserRouter>
      </>
  );
}
