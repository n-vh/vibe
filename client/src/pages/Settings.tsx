import { useState } from 'react';
import { useAuthContext } from '../hooks';
import { Mutation, Query, useMutation, useQuery } from '../graphql';
import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

export const avatars = [
  'ghibli',
  'bear',
  'avocado',
  'cactus',
  'cloud',
  'coffee',
  'geisha',
  'alien',
  'spider',
  'sloth',
  'sheep',
  'pencil',
];

export function Settings() {
  const { changeAvatar } = useAuthContext();

  const [meQuery, executeMeQuery] = useQuery({
    query: Query.Me,
    requestPolicy: 'network-only',
  });

  const [inputValue, setInputValue] = useState('');

  const [avatarModal, setAvatarModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);

  const [modifySettings, executeModifySettings] = useMutation(Mutation.ModifySettings);

  //* AVATAR *//

  const avatarChanged = async () => {
    await executeModifySettings({ input: { avatar: inputValue } });
    setAvatarModal(false);
    executeMeQuery();
    changeAvatar(inputValue);
  };

  //* EMAIL *//

  const emailChanged = async () => {
    await executeModifySettings({ input: { email: inputValue } });
    setEmailModal(false);
    executeMeQuery();
  };

  //* PASSWORD *//

  const passwordChanged = async () => {
    await executeModifySettings({ input: { password: inputValue } });
    setPasswordModal(false);
    executeMeQuery();
    setConfirmPasswordChanged(true);
  };

  //* DELETE ACCOUNT *//

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />

      <div id="centerDiv" className="mx-auto flex w-[355px] flex-col gap-6 md:w-[600px]">
        <div
          id="settingsDiv"
          className="mt-8 flex flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 px-6 py-8 shadow-custom md:p-10"
        >
          {/* AVATAR */}

          <div className="flex items-center gap-6">
            <img
              src={`/avatars/${meQuery.data?.me?.avatar}.svg`}
              alt="avatar"
              className="h-16 w-16 md:h-24 md:w-24"
            ></img>
            <Button
              className="h-8 rounded-lg border-2 border-dark-pink border-opacity-70 px-4 font-roboto text-sm font-bold tracking-wider text-dark-pink hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:h-12 md:text-lg lg:text-base"
              text="CHANGE AVATAR"
              onClick={() => {
                setAvatarModal(true), setInputValue('');
              }}
            ></Button>
          </div>

          {avatarModal && (
            <ConfirmModal
              textAction="Confirm"
              action={avatarChanged}
              closeModal={() => setAvatarModal(false)}
            >
              <div className="flex flex-wrap justify-center gap-6">
                {avatars.map((avatar) => (
                  <img
                    src={`/avatars/${avatar}.svg`}
                    alt="avatar"
                    className={`h-16 w-16 md:h-28 md:w-28 ${
                      inputValue === avatar &&
                      'rounded-full ring-4 ring-dark-pink ring-offset-2'
                    }`}
                    onClick={() => setInputValue(avatar)}
                  ></img>
                ))}
              </div>
            </ConfirmModal>
          )}

          {/* EMAIL */}

          <div className="flex flex-col gap-2 pl-2 md:gap-3">
            <p className="pt-2 font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:pt-4 md:text-xl lg:text-lg">
              E-mail:
              <span className="pl-2 pb-4 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:pt-0 md:text-lg lg:text-sm">
                {meQuery.data?.me?.email}
              </span>
            </p>
            <Button
              className="h-8 w-[70%] rounded-lg border-2 border-dark-pink border-opacity-70 px-4 font-roboto text-sm font-bold tracking-wider text-dark-pink hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:h-10 md:text-lg lg:w-[50%] lg:text-base"
              text="CHANGE E-MAIL"
              onClick={() => {
                setEmailModal(true), setInputValue('');
              }}
            ></Button>

            {emailModal && (
              <ConfirmModal
                textAction="Confirm"
                action={emailChanged}
                closeModal={() => setEmailModal(false)}
              >
                <p className="pb-4 font-roboto text-xl font-medium tracking-wider text-blue">
                  New e-mail
                </p>
                <input
                  className="w-[90%] rounded-[8px] border-2 border-pink p-2 md:w-[80%]"
                  value={inputValue}
                  placeholder="Email"
                  onChange={(e) => setInputValue(e.target.value)}
                  type="email"
                  required
                />
              </ConfirmModal>
            )}

            {/* PASSWORD */}

            <p className="pt-2 font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:pt-3 md:text-xl lg:text-lg">
              Password:
              {modifySettings.data && !modifySettings.error && confirmPasswordChanged && (
                <span className="pl-2 pb-4 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:pt-0 md:text-lg lg:text-sm">
                  successfully changed!
                </span>
              )}
            </p>
            <Button
              className="h-8 w-[70%] rounded-lg border-2 border-dark-pink border-opacity-70 px-4 font-roboto text-sm font-bold tracking-wider text-dark-pink hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:h-10 md:text-lg lg:w-[50%] lg:text-base"
              text="CHANGE PASSWORD"
              onClick={() => {
                setPasswordModal(true), setInputValue('');
              }}
            ></Button>

            {passwordModal && (
              <ConfirmModal
                textAction="Confirm"
                action={passwordChanged}
                closeModal={() => setPasswordModal(false)}
              >
                <p className="pb-4 font-roboto text-xl font-medium tracking-wider text-blue">
                  New password
                </p>
                <input
                  className="w-[90%] rounded-[8px] border-2 border-pink p-2 md:w-[80%]"
                  placeholder="Password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  required
                />
              </ConfirmModal>
            )}

            {/* DELETE ACCOUNT */}

            <p className="pt-3 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:text-lg lg:text-sm">
              Want to leave vibe?
            </p>
            <Button
              className="h-8 w-[50%] rounded-lg border-2 border-dark-pink border-opacity-70 px-4 font-roboto text-xs font-bold tracking-wider text-dark-pink hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:h-10 md:text-lg lg:w-[40%] lg:text-base"
              text="DELETE ACCOUNT"
              onClick={() => {
                setDeleteAccountModal(true), setInputValue('');
              }}
            ></Button>

            {deleteAccountModal && (
              <ConfirmModal
                textAction="Delete"
                action={() => console.log('coucou')}
                closeModal={() => setDeleteAccountModal(false)}
              >
                <p className="pb-4 font-roboto text-xl font-medium tracking-wider text-blue">
                  We're sad to see you go
                </p>
              </ConfirmModal>
            )}
          </div>
        </div>
      </div>

      <RightSidebar />
      <Navbar />
    </div>
  );
}
