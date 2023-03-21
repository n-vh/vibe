import Button from '../components/Button';

export function Index() {
  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex">
        <img src="/wave.svg" className="absolute h-[120px] w-full"></img>
        <h1 className="absolute top-1/2 left-1/2 mt-12 flex -translate-x-1/2 -translate-y-1/2 transform font-days text-6xl text-white">
          vibe
        </h1>
      </div>
      <div className="mx-6 mt-36 mb-4 flex flex-col items-center rounded-[16px] bg-white bg-opacity-70 shadow-md">
        <img src="/bluesmiley.svg" className="mt-6 mb-3 h-[48px] w-full"></img>
        <div className="m-2 flex h-[55vh] w-64 overflow-scroll">
          <p className="justify-self-center text-justify font-roboto text-lg font-light tracking-wider text-blue">
            <p className="font-roboto text-lg font-medium tracking-wider text-blue">
              Welcome to Vibe, a social media platform dedicated to sharing positive and
              uplifting news from around the world.
            </p>
            <br />
            We believe that the world needs more positivity and hope. Therefore our
            mission is to provide a space where people can come together to share stories,
            inspire one another, and spread joy.
            <br />
            <br />
            On Vibe, you'll find a community of like-minded individuals who are also
            passionate about making a difference and creating a better world. Whether it's
            heartwarming stories of kindness, inspiring moments of triumph, or uplifting
            news from your local community, we believe that every positive story has the
            power to make a difference and change lives.
            <br />
            <br />
            Join us today and become a part of the Vibe community. Share your own stories,
            connect with others, and spread positivity to the world. Together, we can make
            a difference and create a brighter future for all.
          </p>
        </div>
      </div>
      <div className="mx-6 mt-4 flex flex-row justify-between">
        <Button
          className="rounded-[16px]  border-opacity-60 bg-white bg-opacity-70  py-2 px-12 font-roboto text-xl font-bold text-blue text-opacity-60 shadow-md"
          text="LOGIN"
        />
        <Button
          className="rounded-[16px] border-opacity-60 bg-white bg-opacity-70  py-3 px-10 font-roboto text-xl font-bold text-blue text-opacity-60 shadow-md"
          text="SIGN UP"
        />
      </div>
    </div>
  );
}
