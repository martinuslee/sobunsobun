import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-dvh bg-[#f7fbed] px-5 py-8 text-[#191d15]">
      <section className="mx-auto w-full max-w-sm">
        <Link href="/signup" className="mb-6 inline-flex items-center text-[13px] font-bold text-[#316b00]">
          회원가입으로 돌아가기
        </Link>

        <h1 className="mb-3 text-[26px] font-extrabold leading-tight">약관 및 개인정보 안내</h1>
        <p className="mb-6 text-[14px] leading-6 text-[#41493a]">
          소분소분은 MVP 검증 목적으로 운영되는 서비스입니다.
        </p>

        <div className="space-y-5 text-[14px] leading-6 text-[#2f3729]">
          <section>
            <h2 className="mb-1 font-extrabold">프로젝트 정보</h2>
            <p>본 서비스는 신인류 AI 사피엔스 경험디자인 팀프로젝트 55의 MVP 결과물입니다.</p>
          </section>

          <section>
            <h2 className="mb-1 font-extrabold">수집 정보</h2>
            <p>회원가입 시 제공한 이름과 이메일을 수집합니다.</p>
          </section>

          <section>
            <h2 className="mb-1 font-extrabold">이용 목적</h2>
            <p>서비스 테스트, 사용자 식별, 가입 및 로그인 기능 제공에만 사용합니다.</p>
          </section>

          <section>
            <h2 className="mb-1 font-extrabold">보관 기간</h2>
            <p>수집한 정보는 2026년 9월 30일까지 보관하며, 이후 폐기합니다.</p>
          </section>

          <section>
            <h2 className="mb-1 font-extrabold">주의 사항</h2>
            <p>본 서비스는 정식 상용 서비스가 아닌 MVP입니다. 민감한 개인정보는 입력하지 마세요.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
