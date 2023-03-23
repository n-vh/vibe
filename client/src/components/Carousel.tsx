import React, { Component } from 'react';
import Slider from 'react-slick';

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <p className="text-center font-gothic text-lg font-bold tracking-wider text-blue md:text-xl">
              Welcome to Vibe, a social media platform dedicated to sharing positive and
              uplifting news from around the world.
            </p>
          </div>
          <div>
            <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
              We believe that the world needs more positivity and hope. Therefore our
              mission is to provide a space where people can come together to share
              stories, inspire one another, and spread joy.
            </p>
          </div>
          <div>
            <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
              We believe that the world needs more positivity and hope. Therefore our
              mission is to provide a space where people can come together to share
              stories, inspire one another, and spread joy.
            </p>
          </div>
          <div>
            <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
              On Vibe, you'll find a community of like-minded individuals who are also
              passionate about making a difference and creating a better world. Whether
              it's heartwarming stories of kindness, inspiring moments of triumph, or
              uplifting news from your local community, we believe that every positive
              story has the power to make a difference and change lives.
            </p>
          </div>
          <div>
            <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
              Join us today and become a part of the Vibe community. Share your own
              stories, connect with others, and spread positivity to the world. Together,
              we can make a difference and create a brighter future for all..
            </p>
          </div>
        </Slider>
      </div>
    );
  }
}
