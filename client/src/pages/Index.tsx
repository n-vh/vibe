import { useNavigate } from 'react-router-dom';
import { Home } from './Home';
import { Title } from '../components/Title';
import Button from '../components/Button';
import { useAuthContext } from '../hooks/useContexts';
import { useEffect, useState } from 'react';

export function Index() {
  const navigate = useNavigate();
  const { isAuthorized, user } = useAuthContext();
  const [smileCount, setSmileCount] = useState(0);
  const [showSlides, setShowSlides] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setShowSlides((slide) => (slide === 1 ? 2 : 1));
    }, 6000);
  }, []);

  if (isAuthorized && user?.id) {
    return <Home />;
  }

  return (
    <div className="flex h-screen pt-28">
      <Title text="vibe" />

      {/* DESKTOP */}

      <div className="my-auto mx-auto hidden flex-row gap-24 lg:flex">
        {/* LEFT */}

        <div className="flex flex-col gap-14 ">
          <div className="relative flex h-[350px] w-[550px] -rotate-6 flex-col gap-4 rounded-[16px] bg-white bg-opacity-80 p-10 shadow-custom">
            {showSlides === 1 ? (
              <>
                <div className="animate__animated animate__fadeIn relative mx-auto">
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
                <p className="animate__animated animate__fadeIn px-12 py-8 text-center font-hubballi text-2xl tracking-wide text-blue">
                  Welcome to Vibe, a social media platform dedicated to sharing positive
                  and uplifting news from around the world
                </p>
              </>
            ) : (
              <>
                <p className="animate__animated animate__fadeIn -rotate-6 px-12 pt-8 font-hubballi text-2xl tracking-wide text-blue">
                  Smile to show you love other vibers' news
                </p>
                <div className="animate__animated animate__fadeIn flex justify-end pr-12 pb-6">
                  <div className="flex h-[80px] w-[150px] items-center justify-center rounded-[16px] border-2 border-dark-pink border-opacity-70 shadow-custom">
                    <p className="pr-6 font-roboto text-dark-grey text-opacity-80">
                      {smileCount}
                    </p>
                    <img
                      src="/smiled.svg"
                      alt="smiley"
                      className="animate__animated animate__infinite animate__bounce h-[30px] md:h-[35px] lg:h-[40px]"
                      onAnimationIteration={() => setSmileCount(smileCount + 1)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className=" hidden justify-center lg:flex">
            <Button
              className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 py-3 px-24 font-roboto text-2xl font-extrabold tracking-wider text-dark-pink text-opacity-80 shadow-custom hover:bg-pink hover:bg-opacity-40"
              text="LOG IN"
              onClick={() => navigate('/login')}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex flex-col gap-14">
          <div className="hidden justify-center lg:flex">
            <Button
              className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40  py-3 px-24 font-roboto text-2xl font-extrabold tracking-wider text-dark-pink text-opacity-80 shadow-custom hover:bg-yellow hover:bg-opacity-40"
              text="SIGN UP"
              onClick={() => navigate('/signup')}
            />
          </div>

          <div className="flex h-[350px] w-[550px] rotate-6 flex-col gap-48 rounded-[16px] bg-white bg-opacity-80 p-10 shadow-custom">
            {showSlides === 1 ? (
              <>
                <div className="animate__animated animate__fadeIn relative flex ">
                  <div className="absolute z-[30] flex rotate-12 justify-end pt-4">
                    <img
                      src="/vibe.png"
                      alt="vibe"
                      className=" w-[50%] rounded-[6px] "
                    ></img>
                  </div>
                  <div className="animate__animated animate__fadeIn absolute z-[40] flex -rotate-6 justify-start ">
                    <img
                      src="/vibeTwo.png"
                      alt="vibe"
                      className=" w-[50%] rounded-[6px] "
                    ></img>
                  </div>
                </div>
                <p className="animate__animated animate__fadeIn px-12 text-center font-hubballi text-2xl tracking-wide text-blue ">
                  Share stories, inspire one another, and spread joy
                </p>
              </>
            ) : (
              <>
                <div className="my-auto mx-auto flex flex-row gap-12">
                  <div className="animate__animated animate__fadeIn flex flex-col justify-center gap-6 pl-4 ">
                    <Button
                      className=" w-[126px] rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-3 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg "
                      text="FOLLOW"
                    ></Button>
                    <p className="text-center font-hubballi text-2xl tracking-wide text-blue">
                      Follow other vibers
                    </p>
                  </div>
                  <div className="animate__animated animate__fadeIn mx-6 -rotate-12 rounded-[16px] border-2 border-dark-pink border-opacity-50 "></div>
                  <div className="animate__animated animate__fadeIn flex flex-col justify-center gap-4  ">
                    <p className="px-6 text-center font-hubballi text-2xl tracking-wide text-blue">
                      Mutual followers are called
                    </p>
                    <img
                      src="/friends_text.svg"
                      alt="friends"
                      className="animate__animated animate__pulse animate__infinite h-[40px]"
                    ></img>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE */}

      <div className="flex flex-col lg:hidden">
        <div className="flex flex-col items-center gap-4 pt-12 pb-[12vh] md:gap-6">
          <div className="relative flex w-[90%] flex-col gap-4 rounded-[16px] bg-white bg-opacity-80 shadow-custom md:w-[70%]">
            <div className="relative mx-auto pt-6 md:pt-8">
              <img
                src="/bluesmiley.svg"
                alt="smiley"
                className="absolute z-[40] h-[50px] md:h-[60px]"
              ></img>
              <div
                id="smileAnimation"
                className="z-[30] h-[50px] w-[50px] rounded-full md:h-[60px] md:w-[60px]"
              ></div>
            </div>
            <p className="px-6 py-6 text-center font-hubballi text-xl tracking-wide text-blue md:text-3xl">
              Welcome to Vibe, a social media platform dedicated to sharing positive and
              uplifting news from around the world
            </p>
          </div>
          <div className="flex w-[90%] flex-col gap-4 rounded-[16px] bg-white bg-opacity-80 p-6 shadow-custom md:w-[70%]">
            <div className="flex -rotate-6 justify-start md:justify-center ">
              <img
                src="/vibeTwo.png"
                alt="vibe"
                className=" w-[90%] rounded-[6px] pt-2 md:w-[60%] "
              ></img>
            </div>
            <p className="px-4 pt-4 text-center font-hubballi text-xl tracking-wide text-blue md:mx-6 md:text-2xl">
              Share stories, inspire one another, and spread joy
            </p>
          </div>

          <div className="flex w-[90%] flex-col gap-4 rounded-[16px] bg-white bg-opacity-80 p-8 shadow-custom md:w-[70%] md:p-6">
            <p className="-rotate-6 pt-4 font-hubballi text-xl tracking-wide text-blue md:mx-10 md:pt-6 md:text-2xl">
              Smile to show you love other <br /> vibers' news
            </p>
            <div className="flex justify-end pr-4 md:pr-6 md:pb-4">
              <div className="flex items-center justify-center rounded-[16px] border-2 border-dark-pink border-opacity-70 py-4 px-8 shadow-custom">
                <p className="pr-6 font-roboto text-dark-grey text-opacity-80">
                  {smileCount}
                </p>
                <img
                  src="/smiled.svg"
                  alt="smiley"
                  className="animate__animated animate__infinite animate__bounce h-[30px] md:h-[35px] lg:h-[40px]"
                  onAnimationIteration={() => setSmileCount(smileCount + 1)}
                />
              </div>
            </div>
          </div>

          <div className="flex w-[90%] flex-col gap-4 rounded-[16px] bg-white bg-opacity-80 p-6 shadow-custom md:w-[70%] md:p-12">
            <div className="flex w-full flex-row justify-between gap-4">
              <div className="flex w-[50%] flex-col items-center justify-center gap-4 pl-2 md:pl-8">
                <Button
                  className=" w-[100px] rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-3 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r md:w-[120px] md:text-xl"
                  text="FOLLOW"
                ></Button>
                <p className="text-center font-hubballi text-xl tracking-wide text-blue md:text-2xl">
                  Follow other vibers
                </p>
              </div>
              <div className="mr-4 ml-6 -rotate-12 rounded-[16px] border-2 border-dark-pink border-opacity-50"></div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-center font-hubballi text-xl tracking-wide text-blue md:text-2xl">
                  Mutual followers
                  <br /> are called
                </p>
                <img
                  src="/friends_text.svg"
                  alt="friends"
                  className="animate__animated animate__pulse animate__infinite mx-auto w-[70%] md:w-[80%]"
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 flex h-[10vh] w-full items-center justify-center bg-light-yellow">
          <div className="mx-6 flex flex-row gap-8 md:gap-24">
            <Button
              className="h-[6vh] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink px-8 font-roboto text-xl font-bold tracking-wider text-white shadow-custom md:w-[180px] md:text-2xl"
              text="LOG IN"
              onClick={() => navigate('/login')}
            />
            <Button
              className="h-[6vh] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink px-8 font-roboto text-xl font-bold tracking-wider text-white shadow-custom md:w-[180px] md:text-2xl"
              text="SIGN UP"
              onClick={() => navigate('/signup')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
