import { useNavigate } from 'react-router-dom';
import { Home } from './Home';
import { Title } from '../components/Title';
import Button from '../components/Button';
import { useAuthContext } from '../hooks/useContexts';

export function Index() {
  const navigate = useNavigate();
  const { isAuthorized, user } = useAuthContext();

  if (isAuthorized && user?.id) {
    return <Home />;
  }

  return (
    <div className="flex h-screen flex-col pt-28">
      <Title text="vibe" />

      <div className="my-auto flex flex-col gap-4 md:self-center lg:flex-row">
        {/* LOGIN BUTTON */}

        <div className="mx-6 mt-4 hidden w-1/4 flex-col justify-center lg:flex">
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 px-10 font-roboto text-2xl font-extrabold tracking-wider text-white  shadow-custom"
            text="LOG IN"
            onClick={() => navigate('/login')}
          />
        </div>

        {/* VIBES */}

        <div className="flex flex-col gap-6">
          <div className="relative flex w-[550px] flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-10 shadow-custom">
            <div className="relative mx-auto">
              <img
                src="/bluesmiley.svg"
                alt="smiley"
                className="absolute z-[40] h-[60px]"
              ></img>
              <div
                id="smileAnimation"
                className="z-[30] h-[60px] w-[60px] rounded-full"
              ></div>
            </div>

            <p className="px-12 py-8 text-center font-hubballi text-2xl tracking-wide text-blue">
              Welcome to Vibe, a social media platform dedicated to sharing positive and
              uplifting news from around the world. Share stories, inspire one another,
              and spread joy.
            </p>
          </div>
        </div>

        {/* SIGNUP BUTTON */}

        <div className="mx-6 mt-4 hidden w-1/4 flex-col justify-center lg:flex">
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 px-10 font-roboto text-2xl font-extrabold tracking-wider text-white  shadow-custom"
            text="SIGN UP"
            onClick={() => navigate('/signup')}
          />
        </div>

        {/* MOBILE BUTTONS */}

        <div className="mx-6 mt-4 flex flex-row justify-between lg:hidden">
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 px-10 font-roboto text-2xl font-extrabold tracking-wider text-white  shadow-custom"
            text="LOG IN"
            onClick={() => navigate('/login')}
          />
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 px-10 font-roboto text-2xl font-extrabold tracking-wider text-white shadow-custom"
            text="SIGN UP"
            onClick={() => navigate('/signup')}
          />
        </div>
      </div>
    </div>
  );
}
