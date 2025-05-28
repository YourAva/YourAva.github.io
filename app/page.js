"use client";
import { useRouter } from "next/navigation.js";
import Quote from "./components/quote/quote.js"
import GlitchHeader from "./components/glitch-header/glitch-header.js"
import Social from "./components/social/social.js"
import Time from "./components/time/time.js"
import ClientDisclaimer from "./components/client-disclaimer/client-disclaimer.js";
import blogPosts from "./data/blogdata.js";

export default function Home() {
  const router = useRouter();

  return (
        <div>
          <ClientDisclaimer>
            <div>
              <iframe width="0" height="0" src="https://www.youtube.com/embed/oxJrBTITnLg?si=j9oVnguKQ8h5gcJh&autoplay=1&loop=1" volume="0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <div className="lines"></div>
              <div>
              <marquee direction="left" className="w-1/1 border-solid border-b-4">
                <div className="flex">
                  <p className="marquee-border">/</p>
                    <p className="pr-8 pl-8">Ava was here</p>
                  <p className="marquee-border">/</p>
                    <p className="pr-8 pl-8 font-bold text-green-500">Kael's feet smell</p>
                  <p className="marquee-border">/</p>
                    <div className="ml-96"/>
                  <p className="marquee-border">/</p>
                    <a className="pr-8 pl-8 font-bold text-red-800" href="https://open.spotify.com/artist/2OWIoPkGaQLHWxHSeFTfYi?si=y4wSvsreRhef925zP0ytPQ">♫ End Of The Deep Web -- Ohm-N-I ♫</a>
                  <p className="marquee-border">/</p>
                  <p className="pr-8 pl-8">&#60;-- CLICK IT!</p>
                  <p className="marquee-border">/</p>
                </div>
              </marquee>
                <div className="w-1/1 h-96 object-cover border-solid relative">
                  <img src="header.png" className="w-full h-full object-cover"/>
                  <div className="h-6 absolute top-0 left-10 z-10" style={{transform: "translate(0px, -4px)"}}>
                    <img src="/borderdrop.png" className="w-1/1 h-1/1"></img>
                    <div className="absolute top-0 left-0 pl-3 -translate-y-0.5">
                      <Time></Time>
                    </div>
                  </div>
                  <div className="h-6 absolute top-0 left-0">
                    <a href="/">
                      <img src="/homebutton.png" className="w-35 -z-10 -translate-y-2 -translate-x-2"></img>
                    </a>
                  </div>
                  <div className="inline-block absolute bottom-0 left-0 ml-16 bg-amber-400 p-0.5 text-black rounded-tr-lg rounded-tl-lg">
                    <Quote items={
                      ["No matter where you go, everyone's connected",
                      "If you're not remembered, then you never existed",
                      "The physical body exists at a less evolved plane only to verify one’s existence in the universe",
                      "I don't have mail... I don't get it.",
                      "Present day... Present time!!!"]
                      }>gwga</Quote>
                  </div>
                </div>
                <div>
                  <div className="w-full bg-amber-400 h-2"></div>
                </div>
                
                <div>
                  <GlitchHeader title="welcome traveller"></GlitchHeader>
                </div>
                <div className="w-1/2 h-20 flex p-2 self-center m-auto">
                  <div className="flex h-12 m-auto">
                    <Social text="Bsky" link="https://bsky.app/profile/avalikesbread.bsky.social" image="logos/bskylogo.png"></Social>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-1/2">
                {Object.entries(blogPosts).map(([slug, post], index) => (
                  <a href={`/blog/${slug}`}>
                    <div key={index} className="p-4 border rounded">
                      <h2 className="text-xl font-bold">{post.title}</h2>
                      <p className="text-sm text-gray-500">{post.date}</p>
                      <p className="mt-2">{post.description.slice(0, 100)}...</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ClientDisclaimer>
        </div>
  );
}
