import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div id="gradient" className="fixed z-[100] flex h-screen w-screen flex-col">
      <div className="animate__animated animate__slideInDown relative flex h-[30%] w-screen items-center justify-center">
        <img src="/wave.svg" alt="wave" className="absolute z-30 h-full w-full"></img>
        <img
          src="/404.svg"
          alt="404"
          className="animate__animated animate__jello animate__delay-1s absolute z-40 h-32 md:h-44 lg:h-36"
        ></img>
      </div>

      <div className="mx-auto flex flex-col items-center justify-evenly gap-16 pt-16 md:pt-24 lg:flex-row lg:pt-28 xl:gap-40">
        <div className="flex -rotate-6 items-center rounded-[16px] bg-white bg-opacity-80 p-10 shadow-custom md:mx-0 md:h-[300px] md:w-[500px]">
          <p className="text-center font-hubballi text-2xl tracking-wide text-blue md:text-4xl">
            Uh Oh! <br /> Looks like you were vibing <br /> too hard and got lost.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row lg:flex-col">
          <p className="font-titan text-5xl text-white md:pr-6 md:pt-4 md:text-6xl lg:pr-0 lg:pt-0 lg:pb-8">
            Go back to
          </p>
          <Link to="/">
            <img
              src="/logo.svg"
              alt="vibe"
              className="animate__animated animate__pulse animate__infinite w-[180px] pt-6 md:w-[200px] md:pt-0 lg:w-[240px]"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
