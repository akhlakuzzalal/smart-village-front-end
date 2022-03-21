import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../Components/Pagination';
import {
  fetchAllEvent,
  setAllEventsCurrPage,
} from '../../../redux/slices/event/eventSlice';
import EventCard from '../EventCard/EventCard';

const AllEvents = () => {
  const allEvent = useSelector((state) => state.events.allEvents);
  const pageCount = useSelector((state) => state.events.allEventsPageCount);
  const currPage = useSelector((state) => state.events.allEventsCurrPage);
  const size = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvent({ currPage, size }));
  }, [currPage, size]);
  return (
    <div>
      <div className="px-4 md:px-12 lg:px-36">
        <h1 className="mb-20">All Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {allEvent &&
            allEvent.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
        </div>
        {/* pagination */}
        <Pagination
          currPage={currPage}
          setCurrPage={setAllEventsCurrPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default AllEvents;
