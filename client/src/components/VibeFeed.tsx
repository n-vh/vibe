import React from 'react';
import Button from './Button';

const VibeFeed: React.FC = () => {
  return (
    <div className="shadow-m mx-auto mt-12 flex min-h-[90px] w-[355px] flex-shrink-0 flex-col rounded-[16px] bg-white bg-opacity-90 p-3 md:min-h-[190px] md:w-[500px] md:p-4">
      <div className="flex">
        <div className="flex h-12 w-12 pr-3 md:h-14 md:w-14">
          <img src="/avatars/coffee.svg" alt="avatar"></img>
        </div>

        <div>
          <h1>Name</h1>
          <h2>Date</h2>
        </div>

        <div>
          <p>420</p>
          <div className="flex w-44">
            <Button className="flex self-start">
              <img
                src="/pinksmiley.svg"
                alt="like"
                className="h-[30px] w-full md:h-[35px]"
              ></img>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-[300px] flex-wrap md:w-[375px]">
        <p className="max-w-full break-words text-left font-roboto font-light tracking-wider md:text-lg">
          “Hopeful”: Historic U.N. High Seas Treaty Will Protect 30% of World's Oceans
          from Biodiversity Loss: https://www.democracynow.org/2023/3/6/historic_un_
          agreement_protecting_marine_ biodiversity
        </p>
      </div>

      <div className="flex">
        <p> 10 comments</p>
        <p>reply</p>
      </div>
    </div>
  );
};

export default VibeFeed;
