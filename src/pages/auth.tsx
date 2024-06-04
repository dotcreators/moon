import DotcreatorsLogo from '@/components/DotcreatorsLogo';
import RiLockPasswordFill from '~icons/ri/lock-password-fill';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Auth() {
  const [accessToken, setAccessToken] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  async function checkToken() {
    try {
      let codeResponse = await fetch(
        `${process.env.API_URL}auth?accessToken=${accessToken}`,
        {
          method: 'POST',
        }
      ).then(async response => {
        let data = await response.json();
        if (data.status === 'success') {
          console.log('Success');

          fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: data.response }),
          })
            .then(() => {
              router.push('/');
            })
            .catch(e => {
              setIsError(true);
              throw new Error(
                'Failed to send access token to the server: ' + e
              );
            });
        } else {
          setIsError(true);
        }
      });
    } catch (e) {
      setIsError(true);
      console.error('Failed to send access token to the server:', e);
    }
  }
  return (
    <section className="grid h-screen w-full grid-cols-1 place-items-center items-center justify-center">
      <div className="flex w-fit flex-col items-center gap-5 rounded-2xl border border-dot-white/10 bg-dot-primary p-10">
        <DotcreatorsLogo />
        <div className="flex max-w-40 flex-col items-center gap-5">
          <p className="text-center text-sm text-zinc-400">
            Please paste code below to access the site:
          </p>
          <section className="h-15 flex flex-row items-center gap-5 rounded-2xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
            <RiLockPasswordFill />
            <input
              onChange={e => setAccessToken(e.target.value)}
              type="password"
              maxLength={7}
              placeholder="Pass here access token..."
              className="h-full bg-transparent outline-none placeholder:text-sm placeholder:text-zinc-400"
            />
            <button
              onClick={() => {
                checkToken();
              }}
            >
              <RiArrowRightLine />
            </button>
          </section>
          {isError && (
            <p className="text-center text-sm text-dot-rose">Invalid code</p>
          )}
        </div>
      </div>
    </section>
  );
}
