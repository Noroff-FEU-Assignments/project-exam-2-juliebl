import AdminLayout from '../../../components/admin/layout/AdminLayout';
import Head from '../../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../constants/api';
import { fetchAdminData } from '../../../hooks/useApi';
import ImageUpload from '../../../components/admin/editplace/form/ImageUpload';

function SingleMessage() {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  });
  const { slug } = router.query;
  const url = 'places?slug=' + slug;

  const { data, error } = fetchAdminData(url);
  const place = data[0];
  if (error) {
    console.log(error);
    return (
      <AdminLayout>
        <Head title="Messages | Dashboard" />
        <p>error</p>
      </AdminLayout>
    );
  }
  if (!data)
    return (
      <AdminLayout>
        <Head title="Edit place | Dashboard" />
        <p>loading...</p>
      </AdminLayout>
    );
  console.log(data);
  return (
    <>
      <AdminLayout>
        <Head title="Edit place | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">{place.title}</h1>
            </div>
            <div className="p-6">
              <form>
                <fieldset>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                    </div>
                  </div>
                  <div>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
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
                        className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                    </div>
                  </div>
                </fieldset>
              </form>
              {/* <ImageUpload /> */}
            </div>
            <p className="p-6 font-semibold text-sm cursor-pointer">
              <a onClick={() => router.back()}>Go back to places</a>
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default SingleMessage;
