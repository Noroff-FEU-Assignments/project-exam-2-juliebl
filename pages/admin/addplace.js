import AdminLayout from '../../components/admin/layout/AdminLayout';
import Head from '../../components/layout/Head';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '../../components/common/Buttons';
import FeaturedImageUpload from '../../components/admin/editplace/form/FeaturedImageUpload';
import { BigMessage, Message } from '../../components/common/Message';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import HostDropdown from '../../components/admin/editplace/form/HostDropdown';
import TypeDropdown from '../../components/admin/editplace/form/TypeDropdown';
import AuthContext from '../../context/AuthContext';

function AddPlace() {
  const [auth, setAuth] = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [host, setHost] = useState('');
  const router = useRouter();

  if (!auth) {
    router.push('/login');
    return (
      <BigMessage message="Oops! Did you forget to log in?" style="danger" />
    );
  }

  const schema = yup.object().shape({
    title: yup
      .string()
      .required(<Message message="Please enter a title" style="warning" />),
    address: yup
      .string()
      .required(<Message message="Please enter an address" style="warning" />),
    type: yup
      .string()
      .required(<Message message="Please select a type" style="warning" />),
    host: yup
      .string()
      .required(<Message message="Please choose a host" style="warning" />),
    price: yup
      .number()
      .required(<Message message="Please enter a price" style="warning" />),
    guests: yup
      .number()
      .required(
        <Message message="Please enter number of guests" style="warning" />
      ),
    bedrooms: yup
      .number()
      .required(
        <Message message="Please enter number of bedrooms" style="warning" />
      ),
    bathrooms: yup
      .number()
      .required(
        <Message message="Please enter number of bathrooms" style="warning" />
      ),
    latitude: yup
      .number()
      .required(<Message message="Please enter a latitude" style="warning" />),
    longitude: yup
      .number()
      .required(<Message message="Please enter a longitude" style="warning" />),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);
    const token = auth.jwt;
    try {
      const response = await axios.post(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        data
      );
      console.log(response);
    } catch (error) {
      console.log('error', error);
      setSubmitError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  return (
    <>
      <AdminLayout>
        <Head title="Add new place | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">Add new place</h1>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                      <TypeDropdown register={register} />
                      <HostDropdown register={register} />
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                          className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mt-1 mb-4">
                      <input
                        id="breakfast"
                        name="breakfast"
                        type="checkbox"
                        className="focus:ring-primary h-6 w-6 text-primary border-gray-300 rounded-md cursor-pointer"
                      />
                      <label
                        htmlFor="breakfast"
                        className="ml-2 block text-sm font-medium text-gray-700">
                        Breakfast
                      </label>
                    </div>
                    <div className="flex items-center mt-1 mb-4">
                      <input
                        id="kitchen"
                        name="kitchen"
                        type="checkbox"
                        className="focus:ring-primary h-6 w-6 text-primary border-gray-300 rounded-md cursor-pointer"
                      />
                      <label
                        htmlFor="kitchen"
                        className="ml-2 block text-sm font-medium text-gray-700">
                        Kitchen
                      </label>
                    </div>
                    <div className="flex items-center mt-1 mb-4">
                      <input
                        id="wifi"
                        name="wifi"
                        type="checkbox"
                        className="focus:ring-primary h-6 w-6 text-primary border-gray-300 rounded-md cursor-pointer"
                      />
                      <label
                        htmlFor="wifi"
                        className="ml-2 block text-sm font-medium text-gray-700">
                        WIFI
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="min-h-full">
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
                        className="w-full mt-1 mb-4 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></textarea>
                    </div>
                    <FeaturedImageUpload register={register} />
                  </div>
                  <div>
                    <div className="pr-4">
                      {submitError ? (
                        <Message message={submitError} style="danger" />
                      ) : null}
                    </div>
                    {submitting ? (
                      <PrimaryButton type="submit">
                        <RefreshIcon className="animate-spin-reverse inline w-5 mr-2" />
                        Creating place
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton type="submit">
                        Create new place
                      </PrimaryButton>
                    )}
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

export default AddPlace;
