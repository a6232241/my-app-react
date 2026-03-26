import { useOptimistic, useState, startTransition } from "react";
import { Main } from "../components/layout";
import { Counter } from '../components/ui';

interface Todo {
  id: string;
  text: string;
  isPending?: boolean;
  isError?: boolean;
}

const UseOptimisticPage = () => {
  const [count, setCount] = useState(0);
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);

  const handleSetCount = () => {
    startTransition(async () => {
      setOptimisticCount((prev) => prev + 1);
      await new Promise((res) => setTimeout(res, 1000));
      startTransition(() => {
        setCount((prev) => prev + 1);
      })
    });
  }
  const isPending = count !== optimisticCount;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (prev, newTodo: Todo) => {
    return [...prev, {...newTodo, isPending: true}];
  });

  const handleIncrementTodos = () => {
    const newTodo = {id: crypto.randomUUID(), text: "new todo"};

    startTransition(async () => {
      setOptimisticTodos(newTodo);
      await new Promise((res) => setTimeout(res, 1000));
      try {
        if (Math.random() > 0.5) throw new Error("Something went wrong");

        startTransition(() => {
          setTodos((prev) => [...prev, newTodo]);
        })
      } catch {
        startTransition(() => {
          setTodos((prev) => [...prev, {...newTodo, isError: true}]);
        })
      }
    });
  }

  return (
    <Main>
      <h1>useOptimistic</h1>
      <Counter isPending={isPending} count={optimisticCount} setCount={handleSetCount} />
      <button onClick={handleIncrementTodos}>Add Todo</button>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ color: todo.isError ? "red" : "white" }}>{todo.text} {todo.isPending && "(pending)"}</li>
        ))}
      </ul>
    </Main>
  );
};

export default UseOptimisticPage;
