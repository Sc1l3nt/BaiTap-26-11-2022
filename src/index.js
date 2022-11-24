import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import DanhSachSinhVien from './Pages/SinhVien/DanhSachSinhVien';
import HomeTemplate from './Templates/HomeTemplate';
import { Provider } from 'react-redux'
import { store } from './Redux/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route index element={<Home />} />
            <Route path='/sinhvien' element={<DanhSachSinhVien />} />
            <Route path='*' element={<Navigate to="" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
