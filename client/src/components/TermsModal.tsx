import React from 'react';
import { useTermsContext } from '../hooks';
import Button from './Button';

const TermsModal: React.FC = () => {
  const { setShowTerms } = useTermsContext();

  const handleTerms = () => {
    setShowTerms(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div className="animate__animated animate__bounceInUp relative flex h-[80%] w-[90%] rounded-[16px] bg-white p-8 shadow-custom md:w-[80%] lg:w-[40%]">
        <Button onClick={handleTerms} className="absolute flex">
          <img src="/close_icon.svg" alt="close" className="flex h-8 md:h-10"></img>
        </Button>

        <div className="flex h-full flex-col items-center gap-4">
          <h2 className="pt-8 pb-4 font-gothic text-lg text-dark-pink">
            Terms & Conditions
          </h2>
          <div className="scrollbar-hide m-2 mb-6 flex overflow-auto">
            <div className="text-md justify-self-center pr-4 text-justify font-roboto font-light tracking-wider text-dark-grey text-opacity-60">
              <p className="text-md text-center font-roboto font-medium tracking-wider text-dark-grey text-opacity-60">
                Welcome to Vibe, a social media platform dedicated to sharing positive and
                uplifting news By using our service, you agree to the following terms and
                conditions:
              </p>
              <br />
              <p className="font-medium">1. Intellectual Property</p>
              All intellectual property rights in the website and service are owned by us
              or our licensors. You may use the website and service for your own personal
              and non-commercial use only.
              <br />
              <br />
              <p className="font-medium">2. User Conduct</p>
              You must not use the website or service in any way that is unlawful,
              illegal, fraudulent or harmful, or in connection with any unlawful, illegal,
              fraudulent or harmful purpose or activity. You must not use the website or
              service to copy, store, host, transmit, send, use, publish or distribute any
              material that consists of or is linked to any spyware, computer virus,
              Trojan horse, worm, keystroke logger, rootkit or other malicious computer
              software.
              <br />
              <br />
              <p className="font-medium">3. Content</p>
              You are solely responsible for the content you post on Vibe, and you grant
              us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide
              license to use, copy, modify, create derivative works based on, distribute,
              publicly display, publicly perform, and otherwise exploit in any manner such
              content in all formats and distribution channels now known or hereafter
              devised (including in connection with Vibe and our business and on
              third-party sites and services), without further notice to or consent from
              you, and without the requirement of payment to you or any other person or
              entity.
              <br />
              <br />
              <p className="font-medium">4. Limitations</p>
              You may not post content that is false, misleading, or defamatory, or that
              violates the privacy, publicity, or other rights of any person. You may not
              use Vibe to harass, bully, or intimidate others. You may not use Vibe to
              distribute spam, chain letters, or other unsolicited communications. We
              reserve the right to remove any content from Vibe that we believe violates
              these terms and conditions or is otherwise inappropriate or offensive.
              <br />
              <br />
              <p className="font-medium">5. Limitation of Liability</p>
              We will not be liable to you for any direct, indirect or consequential loss
              or damage arising out of or in connection with the use of the website or
              service, including loss of profits, loss of business, business interruption
              or loss of data.
              <br />
              <br />
              <p className="font-medium">6. Privacy</p>
              We respect your privacy and will only use your personal information in
              accordance with our privacy policy.
              <br />
              <br />
              <p className="font-medium">7. Termination</p>
              We may terminate your use of the website or service at any time and for any
              reason, without notice.
              <br />
              <br />
              <p className="font-medium">8. Amendments</p>
              We may update these terms and conditions from time to time by posting a new
              version on our website. You should check this page occasionally to ensure
              you are familiar with any changes.
              <br />
              <br />
              <p className="font-medium">8. Governing Law</p>
              These terms and conditions shall be governed by and construed in accordance
              with the laws of Belgium. Any disputes arising out of or in connection with
              these terms and conditions shall be subject to the exclusive jurisdiction of
              the courts of Belgium.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
