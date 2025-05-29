"use client";
import { useParams } from "next/navigation.js";
import blogPosts from "../../data/blogdata.js";

import Quote from "../../components/quote/quote.js"
import GlitchHeader from "../../components/glitch-header/glitch-header.js"
import Social from "../../components/social/social.js"
import Time from "../../components/time/time.js"

//
// POST
// > title
// > content
// > song
// > songAuthor
// > songLink
//
//
//
//
//

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts[slug];
  const baseUrl = post.songLink.split("?")[0];
  const videoId = baseUrl.split("/").pop();
  if (!post) {
    return <div className="p-4 text-red-500">404: Post not found</div>;
  }
  if (post.image === null) {
    post.image="/header.png"
  }

  return (
    <div>
      <iframe width="0" height="0" src={post.songLink + "&autoplay=1&loop=1&playlist=" + videoId} volume="0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
              <a className="pr-8 pl-8 font-bold text-red-800" href={post.songLink}>♫ {post.song} -- {post.songAuthor} ♫</a>
            <p className="marquee-border">/</p>
              <p className="pr-8 pl-8">&#60;-- CLICK IT!</p>
            <p className="marquee-border">/</p>
        </div>
      </marquee>
      <div className="w-1/1 h-96 object-cover border-solid relative">
        <img src={post.image} className="w-full h-full object-cover"/>
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
            }></Quote>
        </div>
      </div>
      <div>
        <div className="w-full bg-amber-400 h-2"></div>
      </div>
      <h1 className="text-2xl font-bold post-title">{post.title}</h1>
      <div className="w-1/2 flex items-center justify-center mx-auto pb-96" style={{fontSize:"25px"}}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      </div>
      <div className="bottom-0 w-full h-3.5 p-32">
        <p className="text-gray-900 pb-6 text-center hover:text-gray-400 transition">If you're an artist and want your music removed from the site, contact me on bsky and It'll be taken down &#60;3<br/>Do keep in mind that views are still given when the music is played in the background.</p>
      </div>
    </div>
  );
}
