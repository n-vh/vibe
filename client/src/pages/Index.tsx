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
