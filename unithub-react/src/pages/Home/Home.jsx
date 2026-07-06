import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import Categories from "../../components/Categories/Categories";
import FeaturedCompanies from "../../components/FeaturedCompanies/FeaturedCompanies";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Stats from "../../components/Stats/Stats";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

function Home(){

return(

<>

<Navbar/>

<Hero/>

<SearchBar/>

<Categories />

<FeaturedCompanies />

<FeaturedProducts/>

<WhyChoose/>

<Stats/>

<Testimonials/>

<CTA />

<Footer />

</>

);

}

export default Home;