import { useActionState, useState } from 'react';


const login = async (previousState: any, formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (username === "admin" && password === "password") {
    return { success: true, message: "Login success" };
  }

  return { success: false, message: "Login failed" };
}

const responseDataInitial = {
  success: false,
  message: "",
}

const UseActionStatePage = () => {
  const [state, formAction, isPending] = useActionState(login, responseDataInitial);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>
      <h1>useActionState</h1>

      <form action={formAction}>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={isPending}>{isPending ? "Logging in..." : "Login"}</button>
      </form>

      {state.success && <p>{state.message}</p>}
      {!state.success && <p>{state.message}</p>}
    </div>
  )
}

export default UseActionStatePage