import React from 'react';
import { usePrivacyContext } from '../hooks';
import Button from './Button';

const PrivacyModal: React.FC = () => {
  const { setShowPrivacy } = usePrivacyContext();

  const handlePrivacy = () => {
    setShowPrivacy(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div className="animate__animated animate__bounceInUp relative flex h-[80%] w-[90%] rounded-[16px] bg-white p-8 shadow-custom md:w-[80%] lg:w-[40%]">
        <Button
          onClick={handlePrivacy}
          className="absolute flex h-[35px] w-[35px] items-center justify-around rounded-[16px] border border-pink shadow-custom"
        >
          <svg
            fill="#C0A0A0"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#C0A0A0"
            className="flex h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>{' '}
        </Button>

        <div className="flex h-full flex-col items-center gap-4">
          <h2 className="pt-8 pb-4 font-gothic text-lg text-dark-pink">
            Cookie Privacy Policy
          </h2>
          <div className="scrollbar-hide m-2 mb-6 flex overflow-auto">
            <div className="text-md justify-self-center pr-4 text-justify font-roboto font-light tracking-wider text-blue">
              <p className="text-md text-center font-roboto font-medium tracking-wider text-blue">
                Welcome to Vibe, a social media platform dedicated to sharing positive and
                uplifting news. This Privacy Policy explains how we use cookies and
                similar technologies on our website to collect and store certain
                information about your use of our website. By accessing or using our
                website, you consent to the use of cookies and other tracking technologies
                as described in this Policy.
              </p>
              <br />
              <p className="font-medium">What are Cookies?</p>
              Cookies are small text files that are stored on your device when you visit a
              website. They are commonly used to improve website functionality,
              personalize content and ads, and analyze website traffic.
              <br />
              <br />
              <p className="font-medium">How We Use Cookies</p>
              We use cookies and similar technologies for various purposes, including:
              <b>Essential Cookies:</b> These cookies are necessary for the operation of
              our website and enable you to access and navigate our website and use its
              features. Without these cookies, our website may not function properly.
              <br />
              <b>Analytical Cookies:</b> These cookies help us understand how visitors use
              our website by collecting information about the number of visitors, the
              pages visited, and the source of the traffic. This information is used to
              analyze website performance and improve our website.
              <br />
              <b>Functional Cookies:</b> These cookies allow our website to remember
              choices you make, such as your username, language preference, or region, and
              provide enhanced features and personalized content.
              <br />
              <b>Advertising Cookies:</b> These cookies are used to deliver relevant
              advertisements to you based on your interests and online activities. They
              are also used to limit the number of times you see an ad and measure the
              effectiveness of our advertising campaigns.
              <br />
              <b>Third-Party Cookies: </b>
              We may also allow third-party service providers to place cookies on our
              website to provide us with analytics, advertising, and other services. These
              third-party cookies are subject to the privacy policies of the respective
              service providers.
              <br />
              <br />
              <p className="font-medium">Cookie Settings and Opt-Out</p>
              You can control and manage cookies by adjusting your browser settings or
              using opt-out mechanisms provided by some third-party analytics and
              advertising providers. However, please note that disabling cookies may
              affect the functionality of our website and your ability to access certain
              features.
              <br />
              <br />
              <p className="font-medium">Your Consent</p>
              By continuing to use our website, you consent to the use of cookies and
              similar technologies as described in this Policy.
              <br />
              <br />
              <p className="font-medium">Updates to this Policy</p>
              We may update this Policy from time to time. Any changes will be posted on
              our website with a revised effective date. We encourage you to review this
              Policy periodically to stay informed about our use of cookies.
              <br />
              This Cookie Privacy Policy was last updated on 14/04/2023.
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
