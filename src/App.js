import {BrowserRouter} from "react-router-dom";

import BaseRoutes from "./routes/BaseRoutes";
export default function App() {
  // how to change the title of the webpage
  document.title = 'Hola Putos';
  return (
      <>
          <BrowserRouter>
              <BaseRoutes />
          </BrowserRouter>
      </>
  );
}
