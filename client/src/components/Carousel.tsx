import React from 'react';
import { Carousel as CarouselComponent } from 'flowbite-react';

const Carousel: React.FC = () => {
  return (
    <div className="m-2 mb-6 flex h-[55vh] w-64 self-center rounded-md shadow-custom md:w-5/6 lg:w-[850px]">
      <CarouselComponent slide={false} indicators={false}>
        <div className="flex h-full flex-col justify-center gap-8 bg-white bg-opacity-80">
          <img src="/bluesmiley.svg" alt="smiley" className="h-[80px]"></img>
          <p className="mx-12 text-center font-titan text-lg font-bold tracking-wider text-pink md:text-4xl">
            Welcome to vibe, a social media platform dedicated to sharing positive and
            uplifting news from around the world.
          </p>
        </div>
        <div>
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        </div>
        <div>
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        </div>
      </CarouselComponent>
    </div>
  );
};

export default Carousel;

{
  /* <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
              <p className="text-center font-gothic text-lg font-bold tracking-wider text-blue md:text-xl">
                Welcome to Vibe, a social media platform dedicated to sharing positive and
                uplifting news from around the world.
              </p>
              <br />
              We believe that the world needs more positivity and hope. Therefore our
              mission is to provide a space where people can come together to share
              stories, inspire one another, and spread joy.
              <br />
              <br />
              On Vibe, you'll find a community of like-minded individuals who are also
              passionate about making a difference and creating a better world. Whether
              it's heartwarming stories of kindness, inspiring moments of triumph, or
              uplifting news from your local community, we believe that every positive
              story has the power to make a difference and change lives.
              <br />
              <br />
              Join us today and become a part of the Vibe community. Share your own
              stories, connect with others, and spread positivity to the world. Together,
              we can make a difference and create a brighter future for all.
            </p> */
}
