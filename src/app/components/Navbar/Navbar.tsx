import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { IoPersonOutline, IoSearchSharp, IoCartOutline } from "react-icons/io5";
import PocketBase from 'pocketbase';
import ImagenLogin from '@/app/public/img/logo.png';

// Singleton PocketBase instance
const pb = new PocketBase('https://kevinklein.pockethost.io');

// Cached user state
let cachedUser = {
  isAuthenticated: false,
  data: null,
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(cachedUser.isAuthenticated);
  const [userData, setUserData] = useState(cachedUser.data);
  const [loading, setLoading] = useState(!cachedUser.data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const profileIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (cachedUser.data) {
        // If cached data exists, use it
        setIsLoggedIn(true);
        setUserData(cachedUser.data);
        setLoading(false);
        return;
      }

      try {
        const isAuthenticated = pb.authStore.isValid;

        if (isAuthenticated && pb.authStore.model) {
          const userId = pb.authStore.model.id;
          const record = await pb.collection('users').getOne(userId);

          const userDetails = {
            avatar: record.avatar || '',
            username: record.username || '',
            role: record.rol || '',
          };

          cachedUser = {
            isAuthenticated: true,
            data: userDetails,
          };

          setIsLoggedIn(true);
          setUserData(userDetails);
        } else {
          cachedUser = { isAuthenticated: false, data: null };
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication or fetching user data:', error);
        cachedUser = { isAuthenticated: false, data: null };
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const baseUrl = 'https://kevinklein.pockethost.io/api/files/users/';

  return (
    <header className="bg-black">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <a href="/">
            <Image
              src={ImagenLogin}
              alt="logo"
              height={64}
              width={64}
              className="w-16 cursor-pointer"
            />
          </a>
        </div>

        <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
          <ul className="text-white flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 font-montserrat">
            <li>
              <Link href="/" className="hover:text-gray-200">
                INICIO
              </Link>
            </li>
            <li>
              <Link href="/Homepage" className="hover:text-gray-200">
                HOMBRE
              </Link>
            </li>
            <li>
              <Link href="/Homepage" className="hover:text-gray-200">
                MUJER
              </Link>
            </li>
            <li>
              <Link href="/preguntar-frecuentes" className="hover:text-gray-200">
                NOSOTROS
              </Link>
            </li>
          </ul>
        </div>

        <div id="dropdownmenu" className="flex items-center gap-6 relative">
          <IoSearchSharp size={20} className="text-white" />
          {isLoggedIn ? (
            <div className="relative">
              <button
                ref={profileIconRef}
                onClick={toggleDropdown}
                className="text-white flex items-center gap-2"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    {userData?.avatar && (
                      <img
                        src={`${baseUrl}${pb.authStore.model?.id}/${userData.avatar}`}
                        alt="user avatar"
                        className="rounded-full w-6 h-6"
                      />
                    )}
                    <p>{userData?.username || 'Loading...'}</p>
                  </>
                )}
              </button>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/configuration"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Configuration
                    </Link>
                  </li>
                  {userData?.role === 'admin' && (
                    <li>
                      <Link
                        href="/admon/Dashboard"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        pb.authStore.clear();
                        setIsLoggedIn(false);
                        setIsDropdownOpen(false);
                        cachedUser = { isAuthenticated: false, data: null };
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <a href="/auth/Login">
              <IoPersonOutline size={20} className="text-white" />
            </a>
          )}
          <a href="/ShoppingCart">
            <IoCartOutline size={20} className="text-white" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
