import "./Contact.css";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { supabase } from "../../services/supabase";

function Contact() {

const [loading,setLoading]=useState(false);

const [formData,setFormData]=useState({

name:"",
email:"",
subject:"",
message:""

});

function handleChange(e){

setFormData({

...formData,
[e.target.name]:e.target.value

});

}

async function handleSubmit(e){

e.preventDefault();

if(
!formData.name ||
!formData.email ||
!formData.subject ||
!formData.message
){

alert("Please fill all fields.");
return;

}

setLoading(true);

const { error } = await supabase

.from("contact_messages")

.insert([

{

name:formData.name,

email:formData.email,

subject:formData.subject,

message:formData.message

}

]);

setLoading(false);

if(error){

alert(error.message);

return;

}

alert("✅ Message Sent Successfully");

setFormData({

name:"",
email:"",
subject:"",
message:""

});

}

return(

<>

<Navbar/>

<section className="contact-page">

<div className="contact-container">

<div className="contact-left">

<h1>Contact Us</h1>

<p>

Have any questions or business inquiries?

Feel free to contact UnitHub.

</p>

<div className="contact-info">

<p>📧 connect.unithub@gmail.com</p>

<p>📞 +91 XXXXX XXXXX</p>

<p>📍 India</p>

</div>

</div>

<div className="contact-right">

<form onSubmit={handleSubmit}>

<input

type="text"

name="name"

placeholder="Your Name"

value={formData.name}

onChange={handleChange}

required

/>

<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

required

/>

<input

type="text"

name="subject"

placeholder="Subject"

value={formData.subject}

onChange={handleChange}

required

/>

<textarea

name="message"

placeholder="Your Message"

rows="7"

value={formData.message}

onChange={handleChange}

required

/>

<button

type="submit"

disabled={loading}

>

{loading ? "Sending..." : "Send Message"}

</button>

</form>

</div>

</div>

</section>

<Footer/>

</>

);

}

export default Contact;