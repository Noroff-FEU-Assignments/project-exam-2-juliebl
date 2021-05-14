import { PrimaryButton } from '../../../common/Buttons';
import {
  PlusCircleIcon,
  ViewGridIcon,
  MailIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  LogoutIcon,
  ArrowCircleLeftIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { useContext, useState } from 'react';
import AuthContext from '../../../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { BASE_URL } from '../../../../constants/api';
import { fetchAdminData } from '../../../../hooks/useApi';

function Sidebar() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  function logout() {
    setAuth(null);
    router.push('/');
  }

  const { data, error } = fetchAdminData('messages?new=true');

  if (error) {
    console.log(error);
  }
  let newMessages;
  if (data) {
    newMessages = data.length;
  }

  return (
    <>
      {auth && (
        <div className="bg-secondary-dark text-white w-80 h-full flex flex-col justify-between items-center">
          <div className="flex flex-col w-full items-center">
            <Link href="/">
              <a>
                <img
                  src="/logo_white.svg"
                  alt="Holidaze Logo"
                  className="w-36 mt-8 mb-14"
                />
              </a>
            </Link>
            <div className="mb-8">
              <PrimaryButton type="">
                <PlusCircleIcon className="inline w-5 mr-3" />
                Add new place
              </PrimaryButton>
            </div>

            <ul className="w-full">
              <li>
                <Link href="/admin">
                  <a
                    className={
                      router.pathname == '/admin'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <ViewGridIcon className="inline w-5 mr-3" />
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admin/editplaces">
                  <a
                    className={
                      router.pathname == '/admin/editplaces'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <LocationMarkerIcon className="inline w-5 mr-3" />
                    Places
                  </a>
                </Link>
              </li>
              <li className="relative">
                <Link href="/admin/messages">
                  <a
                    className={
                      router.pathname == '/admin/messages'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <MailIcon className="inline w-5 mr-3" />
                    Messages
                  </a>
                </Link>
                {newMessages > 0 && (
                  <>
                    <svg
                      className="absolute left-4 top-2 text-primary fill-current w-4"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="50" />
                    </svg>
                    <span className="absolute left-4 top-2 px-1 text-xs font-medium">
                      {newMessages}
                    </span>
                  </>
                )}
              </li>
              <li>
                <Link href="/admin/enquiries">
                  <a
                    className={
                      router.pathname == '/admin/enquiries'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <QuestionMarkCircleIcon className="inline w-5 mr-3" />
                    Enquiries
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admin/hosts">
                  <a
                    className={
                      router.pathname == '/admin/hosts'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <UsersIcon className="inline w-5 mr-3" />
                    Hosts
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="w-full border-t-2 border-secondary">
              <li className="dashboard__link cursor-pointer" onClick={logout}>
                <LogoutIcon className="inline w-5 mr-3" />
                Sign out
              </li>
              <li>
                <Link href="/">
                  <a
                    className={
                      router.pathname == '/'
                        ? 'dashboard__link--active'
                        : 'dashboard__link'
                    }>
                    <ArrowCircleLeftIcon className="inline w-5 mr-3" />
                    Back to website
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center pb-8 bg-secondary w-full">
            <img
              className="h-16 w-16 ml-3 -mt-8 rounded-full"
              src={auth.user.avatar.url}
              alt={`${auth.user.firstname}
            ${auth.user.lastname}`}
            />
            <p>
              <span className="mr-1"> {auth.user.firstname}</span>

              {auth.user.lastname}
            </p>
            <p className="text-xs text-secondary-light opacity-70">
              {auth.user.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
