import AdminLayout from '../../../components/admin/layout/AdminLayout';
import Head from '../../../components/layout/Head';
import { useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../constants/api';
import { fetchAdminData } from '../../../hooks/useApi';
import ImageUpload from '../../../components/admin/editplace/form/FeaturedImageUpload';
import { getToken, getAuth } from '../../../hooks/useLocalStorage';
import { BigMessage, Message } from '../../../components/common/Message';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

function EditPlace() {
  const [auth, setAuth] = getAuth();
  const [token, setToken] = getToken();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { data, error } = fetchAdminData('places/' + id);
  if (error) return <BigMessage message={`${error}`} style="danger" />;
  if (!data && !error)
    return <BigMessage message="Loading..." style="loading" />;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required(<Message message="Please enter a title" style="warning" />),
    address: yup
      .string()
      .required(<Message message="Please enter an address" style="warning" />),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  async function onSubmit(data) {
    console.log(data);
    /*     setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      router.push('/admin');
    } catch (error) {
      console.log('error', error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    } */
  }
  return (
    <>
      <AdminLayout>
        <Head title="Edit place | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">Edit {data.title}</h1>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={submitting}>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700">
                          Title:
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700">
                          Address:
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700">
                          Type:
                        </label>
                        <input
                          type="text"
                          name="type"
                          id="type"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="host"
                          className="block text-sm font-medium text-gray-700">
                          Host:
                        </label>
                        <input
                          type="text"
                          name="host"
                          id="host"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700">
                          Price:
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="guests"
                          className="block text-sm font-medium text-gray-700">
                          Guests:
                        </label>
                        <input
                          type="number"
                          name="guests"
                          id="guests"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="Bedrooms"
                          className="block text-sm font-medium text-gray-700">
                          Bedrooms:
                        </label>
                        <input
                          type="number"
                          name="Bedrooms"
                          id="Bedrooms"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="bathrooms"
                          className="block text-sm font-medium text-gray-700">
                          Bathrooms:
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          id="bathrooms"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="latitude"
                          className="block text-sm font-medium text-gray-700">
                          Latitude:
                        </label>
                        <input
                          type="number"
                          name="latitude"
                          id="latitude"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <div>
                        <label
                          htmlFor="longitude"
                          className="block text-sm font-medium text-gray-700">
                          Longitude:
                        </label>
                        <input
                          type="number"
                          name="longitude"
                          id="longitude"
                          ref={register}
                          className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700">
                        Description:
                      </label>
                      <textarea
                        type="number"
                        name="description"
                        id="description"
                        ref={register}
                        className="mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md w-full"></textarea>
                    </div>
                    <ImageUpload />
                    <ImageUpload />
                  </div>
                </fieldset>
              </form>
            </div>
            {/*             <p className="p-6 font-semibold text-sm cursor-pointer">
              <a onClick={() => router.back()}>Go back to places</a>
            </p> */}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default EditPlace;
