import React from 'react';
import Lottie from 'react-lottie';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import animationData from '../../../../lotties/s1_schedule.json';

const Step1 = () => {
  const isTablet = useMediaQuery('(min-width: 656px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="w-full md:w-1/2 border-1 rounded-lg">
      <div className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center py-2 px-2 md:px-10 ">
        {/* banner description */}
        <div className=" flex flex-col  justify-start items-start    text-left py-16 ">
          <h3 className="text-start text-lg md:text-2xl ">
            Step <span className=" text-xl md:text-4xl text-blue-700 ">1</span>
          </h3>
          <h6 className=" text-start text-sm text-blue-700">
            {' '}
            Select appointments
          </h6>
          <p className=" text-start text-sm w-2/3 md:w-full ">
            Using the calender select your appointments according to specific
            date
          </p>
        </div>

        {/* banner svg */}
        <div className="w-full md:w-1/3 pointer-events-none  ">
          <div className="w-fit flex items-center md:items-end  mx-0 md:mx-auto ">
            <Lottie
              options={defaultOptions}
              isClickToPauseDisabled={true}
              width={isDesktop ? 250 : isTablet ? 100 : 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
