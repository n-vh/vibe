import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col pt-28">
      <div className="my-auto flex flex-col gap-4 md:w-4/6 md:self-center lg:flex-row">
        <div className="mx-6 flex flex-col items-center rounded-[16px] bg-white bg-opacity-80 shadow-md lg:w-5/6">
          <img src="/bluesmiley.svg" className="mt-6 mb-3 h-[48px] w-full"></img>
          <div className="m-2 mb-6 flex h-[55vh] overflow-auto px-10 md:w-5/6">
            <p className="justify-self-center text-justify font-gothic text-lg font-light tracking-wider text-blue">
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
            </p>
          </div>
        </div>
        <div className="mx-6 mt-4 flex flex-row justify-between lg:w-1/4 lg:flex-col lg:justify-center lg:gap-4">
          <Button
            className="rounded-[16px] border-opacity-60 bg-white bg-opacity-80  py-3 px-10 font-roboto text-lg font-bold tracking-wider text-blue shadow-md"
            text="LOG IN"
            onClick={() => navigate('/login')}
          />
          <Button
            className="rounded-[16px] border-opacity-60 bg-white bg-opacity-80  py-3 px-10 font-roboto text-lg font-bold tracking-wider text-blue shadow-md"
            text="SIGN UP"
            onClick={() => navigate('/signup')}
          />
        </div>
      </div>
    </div>
  );
}
