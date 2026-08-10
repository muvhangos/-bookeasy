import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function BusinessRegister() {

  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {

    e.preventDefault();

    try {

      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "businesses", user.user.uid), {

        businessName,
        ownerName,
        service,
        phone,

        email,

        bank,
        accountNumber,
        accountHolder,

        verified: false,
        role: "business",

        createdAt: new Date()

      });

      navigate("/business/dashboard");

    } catch (err) {

      alert(err.message);

    }

  };

  return (

    <div className="auth">

      <div className="authCard">

        <h2>Business Registration</h2>

        <form onSubmit={register}>

          <input
            placeholder="Business Name"
            onChange={(e)=>setBusinessName(e.target.value)}
          />

          <input
            placeholder="Owner Name"
            onChange={(e)=>setOwnerName(e.target.value)}
          />

          <input
            placeholder="Business Phone"
            onChange={(e)=>setPhone(e.target.value)}
          />

          <select
            onChange={(e)=>setService(e.target.value)}
          >

            <option>Select Business Type</option>

            <option>Barbershop</option>
            <option>Salon</option>
            <option>Gym</option>
            <option>Doctor</option>
            <option>Dentist</option>
            <option>Therapist</option>
            <option>Massage</option>
            <option>Tutor</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Mechanic</option>
            <option>Cleaning</option>
            <option>Photography</option>
            <option>Construction</option>
            <option>Other</option>

          </select>

          <hr />

          <h3>Banking Details</h3>

          <input
            placeholder="Bank Name"
            onChange={(e)=>setBank(e.target.value)}
          />

          <input
            placeholder="Account Holder"
            onChange={(e)=>setAccountHolder(e.target.value)}
          />

          <input
            placeholder="Account Number"
            onChange={(e)=>setAccountNumber(e.target.value)}
          />

          <hr />

          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button>
            Create Business Account
          </button>

        </form>

      </div>

    </div>

  );

}