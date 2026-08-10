import React, { useEffect, useState } from 'react';
import { useAppData } from '../context/AppContext';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CgShoppingBag, CgShoppingCart } from 'react-icons/cg';
import { BiMapPin, BiSearch } from 'react-icons/bi';

const Navbar = () => {
  const { isAuth } = useAppData();
  const currentLocation = useLocation();

  const isHomePage = currentLocation.pathname === '/';
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSearchParams({ search });
      } else {
        setSearchParams({});
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-full shadow-sm bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold bg-[#E23774] cursor-pointer">
          Tomato
        </Link>
        <div className=" flex items-center gap-4">
          <Link to="/cart" className="relative">
            <CgShoppingCart className="w-6 h-6 bg-[#E23774] " />
            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs bg-[#E23774] text-white font-semibold">
              0
            </span>
          </Link>
          {isAuth ? (
            <Link to="/account" className="bg-[#E23774] font-medium">
              Account
            </Link>
          ) : (
            <Link to="/Login" className="bg-[#E23774] font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
      {isHomePage && (
        <div className=" border-t px-4 py-3">
          <div className="mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm ">
            <div className="flex items-center gap-2 px-3 border-r text-gray-700 ">
              <BiMapPin className="w-4 h-4 text-[#E23774]" />
              <span className="text-sm scrollbar-track-current">city</span>
            </div>
            <div className="flex flex-1 items-center gap-2 px-3">
              <BiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                placeholder="Search for Restaurant "
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2 text-sm outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
