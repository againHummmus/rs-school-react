import { Outlet } from 'react-router-dom';
import Header from '../../components/widgets/header/Header';

export default function Layout() {
  return (
    <div className="relative flex flex-col gap-4">
      <Header />
      <div className="container my-8 lg:my-12">
        <Outlet />
      </div>
    </div>
  );
}
