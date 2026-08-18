import React from 'react';

const line = (className: string) => (
  <div className={`rounded-full bg-[#e0e4d7] ${className}`} />
);

export function LoadingSkeleton({ type = 'list' }: { type?: 'list' | 'detail' | 'chat' }) {
  if (type === 'chat') {
    return (
      <main className="min-h-screen bg-[#f7fbed] p-4 animate-pulse">
        <div className="h-12 mb-5 flex items-center justify-center">{line('h-5 w-28')}</div>
        <div className="bg-white rounded-2xl border border-[#e0e4d7] p-3 flex gap-3 mb-5">
          <div className="w-14 h-14 rounded-xl bg-[#e0e4d7]" />
          <div className="flex-1 space-y-2 py-1">{line('h-4 w-2/3')}{line('h-3 w-1/2')}</div>
        </div>
        <div className="space-y-3">
          <div className="ml-auto w-2/3 h-12 rounded-2xl bg-[#c6ee6b]" />
          <div className="w-3/4 h-12 rounded-2xl bg-white border border-[#e0e4d7]" />
          <div className="ml-auto w-1/2 h-10 rounded-2xl bg-[#c6ee6b]" />
        </div>
      </main>
    );
  }

  if (type === 'detail') {
    return (
      <main className="min-h-screen bg-[#f7fbed] p-4 animate-pulse">
        <div className="h-64 rounded-2xl bg-[#e0e4d7] mb-4" />
        <div className="bg-white rounded-2xl border border-[#e0e4d7] p-5 space-y-4">
          {line('h-6 w-4/5')}
          {line('h-8 w-1/2')}
          {line('h-4 w-full')}
          {line('h-4 w-3/4')}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbed] p-4 animate-pulse">
      <div className="h-11 rounded-full bg-white border border-[#e0e4d7] mb-5" />
      <div className="space-y-3">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-2xl border border-[#e0e4d7] p-3 flex gap-3">
            <div className="w-32 h-32 rounded-xl bg-[#e0e4d7] shrink-0" />
            <div className="flex-1 py-1 space-y-3">
              {line('h-5 w-4/5')}
              {line('h-3 w-1/2')}
              <div className="pt-8">{line('h-6 w-2/3')}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
