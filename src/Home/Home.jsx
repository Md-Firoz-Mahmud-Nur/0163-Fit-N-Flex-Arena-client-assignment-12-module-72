import AboutSection from "./AboutSection";
import Banner from "./Banner";
import FeaturedSection from "./FeaturedSection";

const Home = () => {
  return (
    <div className="container mx-auto my-20">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <AboutSection></AboutSection>
    </div>
  );
};

export default Home;
