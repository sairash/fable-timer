import { IconArrowLeft } from "@tabler/icons-react";


export default function About() {
  return (
    <>
      <section className="-mt-px border-y border-gray-200 bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-2">
          <a href="https://github.com/sairas/tiktask" rel="noreferrer" target="_blank" className="flex items-center justify-center gap-1.5 transition hover:opacity-75">
            <span className="text-sm/none font-medium">Enjoy TikTask? Give it a star on GitHub</span>
            <span aria-hidden="true" role="img">🎉</span>
          </a>
        </div>
      </section>

      <div className="mt-2 pl-2">
        <a href="/" className="flex gap-2" ><IconArrowLeft className="mt-1" size={20} /> Back</a>
      </div>
      <main className="bg-white">
        <section className="bg-white text-center">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
            <div className="flex flex-col space-y-4 space-y-reverse">
              <h1 className="order-last text-lg text-gray-700">Time, Task &amp; Music</h1>
              <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl">TikTask</h2>
            </div>
            <div className="mx-auto mt-6 max-w-xl space-y-6">
              <p className="text-base/relaxed text-pretty text-gray-700">
                Welcome to TikTask, your delightful new productivity companion! 
                We offer a customizable Pomodoro timer with unique animated stickers that change with your focus, break, and idle times. 
                Keep track of your progress effortlessly with our picture-in-picture mode. 
                Enhance your concentration with soothing zen audio or your favorite music via our YouTube player. 
                Plus, easily manage your tasks with our integrated to-do list, all within a beautiful and minimalist interface.
              </p>
              <ul className="flex items-center justify-center gap-6">
                <li className="inline-flex items-center gap-1"><span role="img" aria-hidden="true">✅</span><span className="text-sm font-medium text-gray-900">No install</span></li>
                <li className="inline-flex items-center gap-1"><span role="img" aria-hidden="true">✅</span><span className="text-sm font-medium text-gray-900">Free</span></li>
                <li className="inline-flex items-center gap-1"><span role="img" aria-hidden="true">✅</span><span className="text-sm font-medium text-gray-900">Open</span></li>
              </ul>
            </div>
          </div>
        </section>
        <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🍅</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Customizable Pomodoro Timer</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Tailor your focus and break times to perfectly fit your workflow, including short breaks, long breaks, and 4-cycle intervals.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🪄</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Animated Sticker Companions</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Enjoy a delightful visual experience with unique stickers for every timer state - idle, active, and rest.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🖼️</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Picture-in-Picture Mode</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Keep your timer visible and stay on track even when you're working in other applications.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🌳</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Zen Audio Library</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Immerse yourself in a variety of calming natural soundscapes like forests, rivers, and rain to enhance focus.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">▶️</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Integrated YouTube Player</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Listen to your favorite YouTube videos or entire playlists directly within TikTask for personalized background music.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🫙</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Simple To-Do List Management</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Easily add, delete, and mark tasks as complete to keep your priorities in check.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🎨</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Minimalist & Beautiful UI</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">Experience a clean, intuitive, and aesthetically pleasing interface designed for effortless use.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">🚀</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Boosted Focus & Productivity</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">unique blend of features helps you stay concentrated and get more done.</time>
                </div>
            </li>
            <li>
                <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-amber-400 sm:p-6 cursor-default">
                  <span aria-hidden="true" role="img" className="text-xl sm:text-2xl">😊</span>
                  <div className="mt-4 line-clamp-2"><strong className="font-medium text-pretty text-gray-900 sm:text-lg">Delightful User Experience</strong></div>
                  <time className="mt-1 block text-sm text-gray-700">We've combined practicality with charm to make your productivity journey enjoyable.</time>
                </div>
            </li>
          </ul>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
          <a href="/">
            <div className="inline-flex gap-1.5 text-lg"><span className="font-medium text-gray-900">TikTask</span><span aria-hidden="true" role="img">⏰</span></div>
          </a>
          <div className="mt-6">
            <p className="max-w-md leading-relaxed text-pretty text-gray-700">Where delightful animated stickers, zen sounds, and seamless task management make mastering your focus an absolute joy.</p>
            <div className="mt-4 lg:flex lg:items-end lg:justify-end">
              
              <p className="mt-4 text-sm text-gray-700 lg:mt-0">
                Created By: 
                <a href="https://sairashgautam.com.np" rel="noreferrer" target="_blank" className="inline-block font-medium hover:text-gray-900 ml-2">Sairash Sharma Gautam</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}
