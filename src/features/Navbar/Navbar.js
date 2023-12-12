import { Fragment, useEffect, useMemo, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../Cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const [activeNavItem, setActiveNavItem] = useState("");

  // console.log("userinfo ", userInfo.role);

  const navigation = useMemo(
    () => [
      { name: "Products", link: "#", user: true },
      {
        name: "Manage Products",
        link: "/admin",
        admin: true,
        current: activeNavItem === "Manage Products",
      },
      {
        name: "All Orders",
        link: "/admin/orders",
        admin: true,
        current: activeNavItem === "All Orders",
      },
    ],
    [activeNavItem]
  );

  useEffect(() => {
    const pathname = window.location.pathname;
    const activeItem = navigation.find((item) => item.link === pathname);
    if (activeItem) {
      setActiveNavItem(activeItem.name);
    }
  }, [navigation]);

  return (
    <>
      <div className="min-h-full">
        {userInfo ? (
          userInfo.role === "admin" ? (
            <div className="flex bg-red-500 justify-center space-x-5">
              <h1 className="text-white text-base font-medium p-2">
                Access Granted: Admin Privileges Activated
              </h1>
            </div>
          ) : null
        ) : null}
        <Disclosure
          as="nav"
          className="bg-white"
          style={{
            boxShadow:
              "0px 1px 0px rgba(27, 31, 35, 0.04), 0px 1px 0px rgba(255, 255, 255, 0.25) inset",
          }}
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/" className="flex gap-x-2">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                        <h1 className="text-2xl items-center flex justify-center font-faturaLight  text-gray-700 uppercase">
                          SimpleMart
                        </h1>
                      </Link>
                    </div>
                    <div className="hidden md:block ml-64">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) =>
                          item[userInfo?.role] ? (
                            <Link
                              to={item.link}
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "text-black border-b-2 border-PrimaryColor"
                                  : "text-gray-700 border-b-2 border-transparent hover:border-b-2 hover:border-PrimaryColor",
                                "px-3 py-2 text-base font-normal  "
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full p-1 text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View Cart</span>
                          <ShoppingCartIcon
                            className="h-7 w-7"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-3 first-letter: bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/10">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={userInfo?.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) =>
                    item[userInfo?.role] ? (
                      <Link
                        to={item.link}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-white-300 text-gray-800"
                            : "text-gray-800 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ) : null
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={userInfo?.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-black">
                        {userInfo?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-800">
                        {userInfo?.email}
                      </div>
                    </div>
                    <Link to="/cart">
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full p-1 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md mb-7 -ml-3 first-letter: bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        as="a"
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Lower header hidden */}
        {/* 
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              SimpleMart
            </h1>
          </div>
        </header> */}
        <main>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
