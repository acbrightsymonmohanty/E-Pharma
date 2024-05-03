import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import Prescription from "../../components/prescription/prescription";
import Support from "../support/Support";
import Privacy from "../privacy/Privacy";
import Description from "../description/Description";
import { Contact } from "lucide-react";


const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <Prescription/>
            <HomePageProductCard/>
            <Track/>
            <Testimonial/>
            <Support/>
            <Contact/>
            <Description/>
        </Layout>
    );
}

export default HomePage;
