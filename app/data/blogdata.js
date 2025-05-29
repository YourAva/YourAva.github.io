// POST
// > title
// > content
// > song
// > songAuthor
// > songLink

const blogPosts = {
    "welcome": {
      title: "Welcome",
      description: "A small overview about the author of this site and what this site actually is.",
      content: `<p>You may have stumbled across this website out of chance, someone may have invited you here. Nevertheless, you are meant to be here. The host of this blog is me, AvaLikesBread.
      I'll be talking about all types of hackery-y stuff on this website, so buckle up and enjoy the ride.</p>
      <br/>
      <h1>Who Is AvaLikesBread?</h1>
      <p>I grew up in the UK, gaming and music heavily impacting me. I loved games like watchdogs and watchdogs 2 growing up and It made me obsessed with hacking in the modern day, with me wanting
      to pursue something in that industry professionally. Cut to now; I'm learning hacking from close friends and getting better at my craft day by day. This blog is meant to help with my own
      understanding of these concepts im learning, whilst explaining them in a simple way for other people to understand who also want to get into this field.</p>`,
      song: "light at the end of the tunnel",
      songAuthor: "Sewerslvt",
      songLink: "https://www.youtube.com/embed/CSC_Dx7T6KM?si=qiRWunF3shcv8rBJ",
      date: "28-05-2025",
      image: "https://queereast.org.uk/wp-content/uploads/GITS-02.jpg"
    },
    "guide-to-xss": {
      title: "What is XSS?",
      description: "This guide goes over the fundamentals of XSS (Cross-site scripting) and how it works, along with how it can be exploited.",
      song: "Is your online persona an untamed unfiltered version of yourself?",
      songAuthor: "Pisca",
      songLink: "https://www.youtube.com/embed/JKs--_lKYeo?si=0d2Hj7MbZG0Zzzez",
      image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff08bfeb5-7faa-4270-a9e1-b81d353ec22d_1200x675.jpeg",
      content: `<p>XSS (A.K.A. Cross-site scripting) is the method of using html tags in a websites user input to display arbitrary data within a webpage, for example, using <code>&lt;h1&gt;Header&lt;h1/&gt;</code> within a comment in a
      blog to make your text a header element rather than what it would normally be display as.<p/><br/>
      <h1>Looking for XSS</h1>
      <p>So let's say we're enumerating a website looking for possible attack vectors and we come across a search bar, we enter an item into it and it says the item we entered into that search bar back at us.. We could then enter
      something such as an image by typing <code>&lt;img src="{random_image}"/&gt;</code> into the search bar. If the website then returns an image back to us then this is an XSS vulnerability and can be abused.<br/><br/>
      <img style="display: block; margin: auto; width: 50%; padding: 10px;" src="/blogdata/29-05-25/xssInjection.png"/>
      <h1>Using XSS</h1>
      <p>So, what's the actual application of XSS to a hacker? Well, a lot. This allows a hacker to control a website and tell it to render certain html tags. So, for example, we can use something such as a
      <code>&lt;script/&gt;</code> tag and run any arbitrary code within the website we desire as if the website was serving us the script itself.<br/><br/>So, let's say you find a comment section within a website and use XSS to
      put your own script into that comment. Now, anyone who loads that comment on that webpage will be forced to run that code you made on their own browser, which could redirect them to a website ran by you which grabs their cookies,
      and many other helpful pieces of data that can help you infiltrate a website or gain access to something you shouldn't have access to.
      <br/><br/>This alone is why XSS is so powerful. You could force people to download malware on their computers with it, you can basically do <b>anything</b> on the client side.
      <h1>Caviats</h1>
      <p>Obviously, a ton of websites have caught onto this popular hack by now, and they do a large amount of <b>Input validation</b> to stop users from inputting html tags, getting around thsi can be quite a pain as it will
      likely take some bruteforcing to find something that works, which is why I highly recommend using an application like <a href="https://portswigger.net/burp">Burp Suite</a> to clone packets to your target and edit them from
      there. I'll likely make a blog post going over the basics of burp suite at some point if you're not too familiar with the software.<br/><br/>Within burp suite we can use the built in <b>Repeater Module</b> (found within the top
      bar when inside an instantiated burp suite project) and place our payload within where our search parameter, then, we can use something like <a href="https://portswigger.net/web-security/cross-site-scripting/cheat-sheet">Port
      Swiggers XSS cheat sheet</a> to test every single tag and event in every possible browser to see what type of XSS tags we can get past the input validation.<br/><br/>If this didn't make sense to you, don't worry, It probably
      didn't make sense to most people because I'm bad at explaining stuff. In simpler terms, the XSS cheat sheet provides us with every possible value we could enter to get an XSS vulnerability and returns the data for every search. If
      you're familiar with the concept of a brute-force attack, it's that.
      <h1>Going Further</h1>
      <p>If you'd like to try out XSS practically for yourself within a controlled environment, I'd recommend using the <a href="https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded">Port
      Swigger XSS labs</a>.
      `
    },
  };
  
  export default blogPosts;