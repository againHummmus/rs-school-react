import { Outlet } from 'react-router-dom';
import Header from '../../components/widgets/header/Header';
import { useState } from 'react';
import SelectedItems from '../../components/widgets/selected-items/SelectedItems';

export default function Layout() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="relative flex flex-col gap-4">
      <Header setShowPopup={setShowPopup} />
      <div className="container my-8 lg:my-12">
        <Outlet />
      </div>
      {showPopup && <SelectedItems setShowPopup={setShowPopup} />}
    </div>
  );
}
