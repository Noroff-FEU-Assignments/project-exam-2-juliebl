import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { HeadingSmaller } from '../../../components/common/Heading';
import Head from '../../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { BASE_URL } from '../../../constants/api';
import moment from 'moment';

function SingleMessage() {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  });
  const { id } = router.query;
  const url = BASE_URL + 'messages/' + id;
  const token = auth.jwt;
  console.log(token);

  const fetcher = (url, token) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const { data, error } = useSWR([url, token], fetcher, {
    refreshInterval: 5000,
  });

  function readMessage(id) {
    const { data } = axios.put(
      BASE_URL + 'messages/' + id,
      {
        new: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  if (error) {
    console.log(error);
    return (
      <AdminLayout>
        <Head title="Messages | Dashboard" />
        <div className="w-full">
          <h1 className="font-semibold text-lg">Messages</h1>
          <div className=" shadow m-10 border-b border-gray-200 sm:rounded-lg overflow-hidden">
            {error}
          </div>
        </div>
      </AdminLayout>
    );
  }
  if (!data)
    return (
      <AdminLayout>
        <Head title="Messages | Dashboard" />
        <div className="w-full">
          <h1 className="font-semibold text-lg">Messages</h1>
          <div className=" shadow m-10 border-b border-gray-200 sm:rounded-lg overflow-hidden">
            Loading....
          </div>
        </div>
      </AdminLayout>
    );
  console.log(data);

  const date = moment(data.created_at, moment.ISO_8601).format(
    'dddd, MMMM Do YYYY, HH:mm'
  );
  const dateFromNow = moment(data.created_at, moment.ISO_8601).fromNow();
  console.log(date);
  return (
    <>
      <AdminLayout>
        <Head title="Messages | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">{data.title}</h1>
            </div>
            <div className="p-6 flex flex-row justify-between flex-wrap text-sm">
              <p>
                <span className="font-bold">{data.name}</span> {data.email}
              </p>
              <p>
                {date} ({dateFromNow})
              </p>
            </div>
            <p className="p-6 leading-relaxed">{data.message}</p>
            <p className="p-6 font-semibold text-sm cursor-pointer">
              <a onClick={() => router.back()}>Go back to messages</a>
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default SingleMessage;
