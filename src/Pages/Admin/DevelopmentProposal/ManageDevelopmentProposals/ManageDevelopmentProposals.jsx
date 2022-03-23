import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios, { BASE_URI } from '../../../../api/axios';

const ManageDevelopmentProposal = () => {
  const [development, setDevelopment] = useState([]);

  useEffect(() => {
    axios.get('/developmentProposal/all').then((response) => {
      setDevelopment(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    swal({
      icon: 'warning',
      confirm: 'You want to delete this development proposal',
      dangerMode: true,
    }).then(() => {
      axios.delete(`/development/deleteDevelopment/${id}`).then((response) => {
        if (response?.data?.deletedCount) {
          Swal.fire({
            title: 'Your Development Proposal has been deleted!',
            confirmButtonText: 'Okay',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      });
    });
  };

  return (
    <article className="flex flex-wrap justify-evenly items-center gap-6">
      {development.map((data) => (
        <div className="bg-white rounded-xl p-4 relative max-w-[400px] shadow-2xl dark:bg-dark_primary ">
          <div className="overflow-hidden rounded-xl h-52 cursor-pointer">
            <img
              className="transform hover:scale-125 transition duration-700 w-full h-full object-cover"
              src={`${BASE_URI}/${data?.image?.path}`}
              alt={''}
            />
          </div>

          <div className="flex flex-col flex-grow">
            {/* title and description */}
            <div className="flex flex-col space-y-1 my-4">
              <h2 className="text-gray-700 font-primary text-lg dark:text-white">
                {data?.title.slice(0, 30)}...
              </h2>
              <p className="text-gray-500 text-sm dark:text-gray-300">
                {data?.description.slice(0, 30)}
              </p>
            </div>
          </div>

          {/* card footer  */}
          <div className="flex items-center justify-between pt-3">
            <button className="w-100 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(data._id)}
              className="w-100 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </article>
  );
};

export default ManageDevelopmentProposal;
