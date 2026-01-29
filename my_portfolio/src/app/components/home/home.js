import Image from "next/image";

export default function HomePage() {
  return (
    <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 lg:px-24 py-14">
      
      {/* LEFT SIDE TEXT */}
      <div className="max-w-xl space-y-6 text-center lg:text-left mt-10 lg:mt-0">

        {/* Hello */}
        <div className="flex items-center justify-center lg:justify-start gap-5">
          <h2 className="font-bold text-xl tracking-wide">HELLO</h2>
          <div className="w-32 md:w-40 h-[2px] bg-black"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          I AM <span className="text-black">LEPCHA</span>
        </h1>

        {/* Subtitle */}
        <p className="uppercase text-gray-800 tracking-wide font-medium leading-relaxed text-sm md:text-base">
          Currently studying in college of science and <br />
          technology
        </p>

        {/* Buttons */}
        <div className="flex justify-center lg:justify-start gap-4 md:gap-6 pt-6 flex-wrap">
          <button className="px-8 md:px-10 py-3 border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition">
            HIRE ME
          </button>

          <button className="px-8 md:px-10 py-3 border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition">
            GET CV
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="relative flex justify-center">

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-purple-200 scale-110"></div>

        {/* Image Circle */}
        <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-[10px] border-white shadow-xl relative z-10">
          <Image
            src="/profile.png"
            alt="Profile"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Expertise Badge */}
        <div className="absolute bottom-6 left-2 sm:left-[-40px] bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center gap-3 z-20">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 text-lg">
            ✨
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Expertise
            </p>
            <h3 className="font-bold text-gray-900">Tech Pro</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
