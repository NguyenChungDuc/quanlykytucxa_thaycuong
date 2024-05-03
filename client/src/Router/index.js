import AdminLayout from '../Layouts/AdminLayout';
import ManagerUser from '../Pages/AdminPages/ManagerUser';
import MangerRooms from '../Pages/AdminPages/ManagerRooms';
import Profile from '../Pages/AdminPages/Profile';
// import AddRoomsPage from '../Pages/AdminPages/AddRooms';
import ManagerLayout from '../Layouts/ManagerLayout';
import UserLayout from '../Layouts/UserLayout';
import ContactPage from '../Pages/UserPages/Contact';
import DormitoryLayout from '../Layouts/DormitoryLayout';
import SeeRooms from '../Pages/DormitoryPages/SeeRooms';
import LoginStudent from '../Pages/LoginStudent';
import LoginTeacher from '../Pages/LoginTeacher';
import PageNotFound from '../Pages/PageNotFound';
import AboutPage from '../Pages/UserPages/About';
import HomePage from '../Pages/UserPages/Home';
import Test from '../Pages/DormitoryPages/test';
import DormitoryRegistration from '../Pages/DormitoryPages/DormitoryRegistration';
import InstructPage from '../Pages/DormitoryPages/Instruct';

const InitRouter = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      // {
      //   path: '/admin',
      //   element: <AddRoomsPage />,
      // },
      {
        path: '/admin/manageruser',
        element: <ManagerUser />,
      },
      {
        path: '/admin/managerooms',
        element: <MangerRooms />,
      },
      {
        path: '/admin/profile',
        element: <Profile />,
      },
    ],
  },

  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
    ],
  },

  {
    path: '/manager',
    element: <ManagerLayout />,
  },
  {
    path: '/dormitory',
    element: <DormitoryLayout />,
    children: [
      {
        path: '/dormitory/room',
        element: <SeeRooms />,
      },
      {
        path: '/dormitory/registration',
        element: <DormitoryRegistration />,
      },
      {
        path: '/dormitory/test',
        element: <Test />,
      },
      {
        path: '/dormitory/instruct',
        element: <InstructPage />,
      },
    ],
  },
  {
    path: '/loginstudent',
    element: <LoginStudent />,
  },
  {
    path: '/loginteacher',
    element: <LoginTeacher />,
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
];

export default InitRouter;
