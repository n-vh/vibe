import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';

export function Terms() {
  return (
    <div className="flex h-screen flex-col pt-28">
      <Title text="Terms & Conditions – vibe" />
      <div className="my-auto flex flex-col items-center gap-4 md:w-4/6 md:self-center">
        <div className="mx-6 flex flex-col items-center rounded-[16px] bg-white bg-opacity-80 shadow-custom lg:w-5/6">
          <h2 className="pt-8 pb-4 font-gothic text-lg text-dark-pink">
            Terms & Conditions
          </h2>
          <div className="m-2 mb-6 flex h-[55vh] w-64 overflow-auto md:w-5/6">
            <p className="text-md justify-self-center pr-4 text-justify font-roboto font-light tracking-wider text-blue">
              <p className="text-md text-center font-roboto font-medium tracking-wider text-blue">
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
