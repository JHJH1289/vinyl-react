import Header from "../components/common/Header";
import PosterSlider from "../components/common/PosterSlider";
import ReservationForm from "../components/common/ReservationForm";
import VenueMap from "../components/venue/VenueMap";
import Footer from "../components/common/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <PosterSlider />
      <ReservationForm />
      <VenueMap />
      <Footer />
    </>
  );
}

export default HomePage;