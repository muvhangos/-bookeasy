import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Pages.css";

export default function BusinessLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/business/dashboard");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth">
      <div className="authCard">

        <h2>Business Owner Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Business Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/business/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}