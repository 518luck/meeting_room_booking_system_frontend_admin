import { RouterProvider } from "react-router-dom";
import router from "@/routers";
import { StyleProvider } from "@ant-design/cssinjs";

function App() {
  return (
    <>
      <StyleProvider layer>
        <RouterProvider router={router} />
      </StyleProvider>
    </>
  );
}

export default App;
