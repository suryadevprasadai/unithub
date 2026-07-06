import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../services/supabase";

function ResetPassword(){

const navigate = useNavigate();

const [password,setPassword] = useState("");

const [confirmPassword,setConfirmPassword] = useState("");

const [loading,setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

async function handleUpdate(e){

e.preventDefault();

if(password!==confirmPassword){

alert("Passwords do not match");

return;

}

setLoading(true);

const { error } = await supabase.auth.updateUser({

password: password,

});

setLoading(false);

if(error){

alert(error.message);

return;

}

alert("Password Updated Successfully");

navigate("/login");

}

return (

<section className="reset-page">

  <div className="reset-box">

    <h1>Reset Password</h1>

    <p>Create your new password</p>

    <form onSubmit={handleUpdate}>

      {/* New Password */}

      <div className="password-box">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <span onClick={()=>setShowPassword(!showPassword)}>
          {
            showPassword
            ?
            <FaEyeSlash/>
            :
            <FaEye/>
          }
        </span>

      </div>

      {/* Confirm Password */}

      <div className="password-box">

        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        />

        <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
          {
            showConfirmPassword
            ?
            <FaEyeSlash/>
            :
            <FaEye/>
          }
        </span>

      </div>

      {
        confirmPassword && (

          <p
            className={
              password===confirmPassword
              ?
              "password-success"
              :
              "password-error"
            }
          >

            {
              password===confirmPassword
              ?
              "✓ Passwords Match"
              :
              "✗ Passwords do not match"
            }

          </p>

        )
      }

      <button type="submit">

        {
          loading
          ?
          "Updating..."
          :
          "Update Password"
        }

      </button>

    </form>

  </div>

</section>

);

}

export default ResetPassword;