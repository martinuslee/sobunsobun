'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAppStore } from '@/stores/appStore';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const router = useRouter();
  const setCurrentUserName = useAppStore((state) => state.setCurrentUserName);
  const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const emailValid = EMAIL_PATTERN.test(email.trim());

  useEffect(() => {
    const storedUserName = localStorage.getItem('sobunsobun_current_user_name');
    if (!storedUserName) return;

    setCurrentUserName(storedUserName);
    setHasSeenLanding(true);
    router.replace('/');
  }, [router, setCurrentUserName, setHasSeenLanding]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailValid || password.length < 8) {
      setMessage('이메일과 비밀번호를 확인해주세요.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const user = await api.login({ email: email.trim(), password });
      const storage = rememberLogin ? localStorage : sessionStorage;
      storage.setItem('sobunsobun_current_user_name', user.name);
      storage.setItem('sobunsobun_seen_landing', '1');
      if (!rememberLogin) localStorage.removeItem('sobunsobun_current_user_name');
      setCurrentUserName(user.name);
      setHasSeenLanding(true);
      router.push('/');
    } catch {
      setMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
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
          <h1 className="text-[28px] leading-tight font-extrabold mb-2">로그인</h1>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block text-[13px] font-bold mb-1.5">이메일</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full h-12 rounded-xl border border-[#c1c9b6] bg-white px-4 text-[15px] outline-none focus:border-[#316b00]"
              placeholder="green@example.com"
            />
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

          <label className="flex items-center gap-2 text-[13px] font-bold text-[#41493a]">
            <input
              type="checkbox"
              checked={rememberLogin}
              onChange={(event) => setRememberLogin(event.target.checked)}
              className="size-4 accent-[#316b00]"
            />
            자동로그인
          </label>

          {message && <p className="text-[13px] font-bold text-[#ba1a1a]">{message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-[#316b00] text-white text-[16px] font-extrabold shadow-md disabled:opacity-50 active:scale-[0.99]"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>

          <p className="text-center text-[13px] text-[#41493a]">
            아직 계정이 없나요?{' '}
            <Link href="/signup" className="font-extrabold text-[#316b00]">
              회원가입
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
