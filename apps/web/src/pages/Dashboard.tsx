import { Footer, Nav } from '../components';
import { useAppSelector } from '../redux/hooks';
import { MyOrders } from '../components/MyOrder';

const Dashboard = () => {
  const useerInfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <>
      <Nav />
      <div className='min-h-screen max-w-screen-lg mx-auto py-10'>
        <h6 className='text-3xl font-semibold'>
          Hi, Welcome: {useerInfo?.email}
        </h6>
        <MyOrders />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
