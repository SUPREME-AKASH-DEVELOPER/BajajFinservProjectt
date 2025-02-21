import { useState } from "react";
import InputForm from "./components/InputForm";
import ResponseDisplay from "./components/ResponseDisplay";

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="container">
      <h1>BFHL Data Processor</h1>
      <InputForm setResponse={setResponse} />
      {response && <ResponseDisplay response={response} />}
    </div>
  );
}

export default App;
