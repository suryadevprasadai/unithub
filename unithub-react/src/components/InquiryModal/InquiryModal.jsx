import "./InquiryModal.css";

import { useState } from "react";
import { supabase } from "../../services/supabase";

function InquiryModal({product,onClose}){

const [loading,setLoading]=useState(false);

const [form,setForm]=useState({

buyer_name:"",

buyer_email:"",

buyer_phone:"",

message:""

});

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  console.log("Logged User:", user);

  console.log("Product Object:", product);

setLoading(true);

console.log("Product Object:", product);

const inquiry = {
  product_id: product.id,
  company_id: product.company_id,
  buyer_name: form.buyer_name,
  buyer_email: form.buyer_email,
  buyer_phone: form.buyer_phone,
  message: form.message
};

console.log("Inquiry Data:", inquiry);

const { data, error } = await supabase
  .from("inquiries")
  .insert([inquiry])
  .select();

console.log("Inserted:", data);
console.log("Insert Error:", error);

setLoading(false);

if(error){

alert(error.message);

return;

}

alert("Inquiry Sent Successfully ✅");

onClose();

};

return(

<div className="modal-overlay">

<div className="modal-box">

<h2>

Send Inquiry

</h2>

<p>

{product.product_name}

</p>


<form onSubmit={handleSubmit}><input
type="text"
name="buyer_name"
placeholder="Your Name"
value={form.buyer_name}
onChange={handleChange}
required
/>

<input
type="email"
name="buyer_email"
placeholder="Your Email"
value={form.buyer_email}
onChange={handleChange}
required
/>

<input
type="text"
name="buyer_phone"
placeholder="Your Phone Number"
value={form.buyer_phone}
onChange={handleChange}
required
/>

<textarea
name="message"
placeholder="Write your inquiry..."
rows="5"
value={form.message}
onChange={handleChange}
required
/>

<div className="modal-buttons">

<button
type="button"
className="cancel-btn"
onClick={onClose}
>

Cancel

</button>

<button
type="submit"
className="send-btn"
>

{

loading

?

"Sending..."

:

"Send Inquiry"

}

</button>

</div>

</form>

</div>

</div>

);

}

export default InquiryModal;