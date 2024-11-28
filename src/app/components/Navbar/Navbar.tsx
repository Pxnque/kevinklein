import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { IoPersonOutline, IoSearchSharp, IoCartOutline } from "react-icons/io5";
import PocketBase from 'pocketbase';
import ImagenLogin from '@/app/public/img/logo.png';

const Navbar = () => {
  const pb = new PocketBase('https://kevinklein.pockethost.io');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<{ avatar: string, username: string, role: string }>({ avatar: '', username: '', role: '' });
  const [loading, setLoading] = useState(true); // Loading state for user data
  const dropdownRef = useRef<HTMLUListElement>(null);
  const profileIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    setIsLoggedIn(pb.authStore.isValid);
    setId(pb.authStore.model.id);
    if (pb.authStore.isValid) {
      // Fetch user data after confirming the user is logged in
      const fetchUserData = async () => {
        try {
          const record = await pb.collection('users').getOne(pb.authStore.model.id);
          setUserData({
            avatar: record.avatar || '', // Set the avatar (adjust based on your field name)
            username: record.username || '', // Set the username (adjust based on your field name)
            role: record.rol || '', // Set the user role (adjust based on your field name)
          });
          console.log(record.username);
          console.log(record.avatar);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false); // If not logged in, stop loading
    }
  }, [pb.authStore.isValid]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          profileIconRef.current && !profileIconRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  
  const baseUrl = 'https://kevinklein.pockethost.io/api/files/users/';
  
  return (
    <header className="bg-black">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <a href="/">
            <Image src={ImagenLogin} alt="logo" height={64} width={64} className="w-16 cursor-pointer" />
          </a>
        </div>

        <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
          <ul className="text-white flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 font-montserrat">
            <li><Link href="/" className="hover:text-gray-200">INICIO</Link></li>
            <li><Link href="/Homepage" className="hover:text-gray-200">HOMBRE</Link></li>
            <li><Link href="/Homepage" className="hover:text-gray-200">MUJER</Link></li>
            <li><Link href="/preguntar-frecuentes" className="hover:text-gray-200">NOSOTROS</Link></li>
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
                  <span>Loading...</span> // Show loading text until data is fetched
                ) : (
                  <>
                    {userData.avatar && (
                      <img
                        src={`${baseUrl}${id}/${userData.avatar}`}
                        alt="user avatar"
                        className="rounded-full w-6 h-6"
                      />
                    )}
                    <p>{userData.username || 'Loading...'}</p>
                  </>
                )}
              </button>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg"
                >
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">My Profile</Link>
                  </li>
                  <li>
                    <Link href="/configuration" className="block px-4 py-2 hover:bg-gray-200">Configuration</Link>
                  </li>
                  {userData.role === 'admin' && (
                    <li>
                      <Link href="/admon" className="block px-4 py-2 hover:bg-gray-200">Admin Panel</Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        pb.authStore.clear(); // Log the user out
                        setIsLoggedIn(false);
                        setIsDropdownOpen(false); // Close the dropdown when signing out
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

