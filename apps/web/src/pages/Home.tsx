import {
  Header,
  BannerGrid,
  ProductCarousel,
  Values,
  Banner,
  Newsletter,
  NotificationBar,
  Nav,
  Footer,
  Slider,
} from '../components';

const Home = () => {
  return (
    <>
      {' '}
      <NotificationBar />
      <Nav />
      <Slider />
      <Header />
      <BannerGrid />
      <ProductCarousel />
      <Values />
      {/* <Blog /> */}
      <Banner />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
