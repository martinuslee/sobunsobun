'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAppStore } from '@/stores/appStore';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupPage() {
  const router = useRouter();
  const setCurrentUserName = useAppStore((state) => state.setCurrentUserName);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const emailValid = EMAIL_PATTERN.test(email.trim());
  const passwordValid = password.length >= 8;
  const passwordMatches = password === passwordConfirm;

  const checkEmail = async () => {
    if (!emailValid) {
      setMessage('올바른 이메일을 입력해주세요.');
      return;
    }

    setIsCheckingEmail(true);
    setMessage('');
    try {
      const result = await api.checkEmail(email.trim());
      setEmailChecked(true);
      setEmailAvailable(result.available);
      setMessage(result.available ? '사용 가능한 이메일입니다.' : '이미 가입된 이메일입니다.');
    } catch {
      setEmailChecked(false);
      setEmailAvailable(false);
      setMessage('올바른 이메일을 입력해주세요.');
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setMessage('이름을 입력해주세요.');
      return;
    }
    if (!emailValid || !emailChecked || !emailAvailable) {
      setMessage('이메일 중복 확인을 완료해주세요.');
      return;
    }
    if (!passwordValid || !passwordMatches) {
      setMessage('비밀번호는 8자 이상이며 확인 값과 같아야 합니다.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const user = await api.signup({ name: name.trim(), email: email.trim(), password, passwordConfirm });
      sessionStorage.setItem('sobunsobun_current_user_name', user.name);
      sessionStorage.setItem('sobunsobun_seen_landing', '1');
      setCurrentUserName(user.name);
      setHasSeenLanding(true);
      router.push('/');
    } catch {
      setMessage('회원가입에 실패했습니다. 이메일 또는 이름 중복을 확인해주세요.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[#f7fbed] text-[#191d15] flex items-center justify-center px-5 py-8">
      <section className="w-full max-w-sm">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#316b00] font-extrabold text-[20px] mb-5">
            <span className="w-9 h-9 rounded-xl bg-[#316b00] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] fill-1">eco</span>
            </span>
            <span>소분소분</span>
          </div>
          <h1 className="text-[28px] leading-tight font-extrabold mb-2">회원가입</h1>
          <p className="text-[14px] leading-6 text-[#41493a]">동네 소분 모집을 시작할 프로필을 만들어주세요.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block text-[13px] font-bold mb-1.5">이름</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full h-12 rounded-xl border border-[#c1c9b6] bg-white px-4 text-[15px] outline-none focus:border-[#316b00]"
              placeholder="초록이웃"
            />
          </label>

          <label className="block">
            <span className="block text-[13px] font-bold mb-1.5">이메일</span>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailChecked(false);
                  setEmailAvailable(false);
                }}
                className="min-w-0 flex-1 h-12 rounded-xl border border-[#c1c9b6] bg-white px-4 text-[15px] outline-none focus:border-[#316b00]"
                placeholder="green@example.com"
              />
              <button
                type="button"
                onClick={checkEmail}
                disabled={!emailValid || isCheckingEmail}
                className="h-12 px-4 rounded-xl bg-[#e6eadc] text-[#316b00] text-[13px] font-extrabold disabled:opacity-40"
              >
                중복 확인
              </button>
            </div>
          </label>

          <label className="block">
            <span className="block text-[13px] font-bold mb-1.5">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full h-12 rounded-xl border border-[#c1c9b6] bg-white px-4 text-[15px] outline-none focus:border-[#316b00]"
              placeholder="8자 이상"
            />
          </label>

          <label className="block">
            <span className="block text-[13px] font-bold mb-1.5">비밀번호 확인</span>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              className="w-full h-12 rounded-xl border border-[#c1c9b6] bg-white px-4 text-[15px] outline-none focus:border-[#316b00]"
              placeholder="비밀번호 재입력"
            />
          </label>

          {message && (
            <p className={`text-[13px] font-bold ${emailAvailable && emailChecked ? 'text-[#316b00]' : 'text-[#ba1a1a]'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-[#316b00] text-white text-[16px] font-extrabold shadow-md disabled:opacity-50 active:scale-[0.99]"
          >
            {isSubmitting ? '가입 중...' : '가입하기'}
          </button>
        </form>
      </section>
    </main>
  );
}
