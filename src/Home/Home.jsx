import NewsLetter from "./NewsLetter";
import AboutSection from "./AboutSection";
import Banner from "./Banner";
import FeaturedClasses from "./FeaturedClasses";
import FeaturedSection from "./FeaturedSection";
import Testimonials from "./Testimonials";
import LatestCommunityPosts from "./LatestCommunityPosts";
import Team from "./Team";

const Home = () => {
  return (
    <div className="container mx-auto my-20">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <AboutSection></AboutSection>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <LatestCommunityPosts></LatestCommunityPosts>
      <NewsLetter></NewsLetter>
      <Team></Team>
    </div>
  );
};

export default Home;
