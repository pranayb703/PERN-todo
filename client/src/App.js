import "./App.css";
import InputNewTodo from "./components/InputNewTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <>
      <div className="p-5">
        <InputNewTodo />
        <ListTodo />
      </div>
    </>
  );
}

export default App;
