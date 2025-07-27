import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const r = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const res = await r.text(); // or .json() if response is JSON
      console.log(data, res);
    } catch (err) {
      console.error("Request failed:", err);

      // if(data.username === "kushal"){
      //   setError("blocked", {message:"This user is blocked"});
      // }
      // else if(data.username != "sahil"){
      //   setError("myform", {message:"Only admin is allowed"})
      // }
    }
  };




  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="username"
            autoComplete="username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 8, message: "Maximum length is 8" },
            })}
          />
          {errors.username && <div className="error">{errors.username.message}</div>}
          <br />

          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum password length is 8" },
            })}
          />
          {errors.password && <div className="error">{errors.password.message}</div>}
          <br />

          <input disabled={isSubmitting} type="submit" value="submit" />
          {errors.myform && <div className="error">{errors.myform.message}</div>}
          {errors.blocked && <div className="error">{errors.blocked.message}</div>}
        </form>
      </div>
    </>
  );
}

export default App;
