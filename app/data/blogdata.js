// POST
// > title
// > content
// > song
// > songAuthor
// > songLink

const blogPosts = {
    "guide-to-xss": {
      title: "What_is_XSS?.blg",
      description: "This guide goes over the fundamentals of XSS (Cross-site scripting) and how it works, along with how it can be exploited.",
      song: "Is your online persona an untamed unfiltered version of yourself?",
      songAuthor: "Pisca",
      songLink: "https://www.youtube.com/embed/JKs--_lKYeo?si=0d2Hj7MbZG0Zzzez",
      image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff08bfeb5-7faa-4270-a9e1-b81d353ec22d_1200x675.jpeg",
      date: "29-05-2025",
      content: `<p>XSS (A.K.A. Cross-site scripting) is the method of using html tags in a websites user input to display arbitrary data within a webpage, for example, using <code>&lt;h1&gt;Header&lt;h1/&gt;</code> within a comment in a
      blog to make your text a header element rather than what it would normally be display as.</p><br/>
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
    "file-upload-vulnerabilities": {
      title: "File_Upload_Vulnerabilities.blg",
      description: "This guide will explain what a file upload vulnerability is and how one can use this vulnerability to gain access to a webapp using a reverse shell.",
      song: "Pills",
      songAuthor: "Yung Lain",
      songLink: "https://www.youtube.com/embed/oYaxzvr0Vrs?si=UOaolYTam0FIUJsk",
      image: "https://w.wallhaven.cc/full/1j/wallhaven-1jl6gw.png",
      date: "01-08-2025",
      content: `<p>A file upload vulnerability occurs when a server allows the uploading of files to its filesystem and doesn't correctly sanitise the uploaded media. Failing to properly sanitise the uploaded file can lead to the execution
      of arbitrary scripts that could enable remote code execution.</p>
      <h1>How are these exploitable?</h1>
      <p>Access to a filesystem could be enough to deface a website entirely, it really just depends on how the server handles the upload in the backend and how a threat actor exploits it. However, the most common use of a file upload vulnerability
      you'll find is the uploading of a reverse shell. A reverse shell attack is a type of cyberattack where a threat actor establishes a connection to a target's machine by opening a connection remotely and then connecting to it. This
      open connection will then give them shell access; instantiating a foothold within the target machine that can be used to move vertically.</p>
      <h1>POST Requests</h1>
      <p>There are quite a few types of HTML requests you can make to a server that dictate what the server should do based on the request. The one that file uploads use is a POST request. Before we can exploit file uploads it's important
      we understand the structure of a POST request.</p>
      <img style="display: block; margin: auto; width: 80%; padding: 10px;" src="/blogdata/01-08-25/POST_Request_ANNOTATED.png"/>
      <p>- <b>POST REQUEST HEADER: </b>This is an indicator that this HTML request to the target is in fact a POST request.<br/><br/>
      - <b>TARGET DIR: </b>The directory that HTML request is trying to POST to.<br/><br/>
      - <b>TARGET: </b>The domain name of the site this request is being sent to.<br/><br/>
      - <b>FILENAME: </b>The name of the file being uploaded INCLUDING the file extension name.<br/><br/>
      - <b>MIME TYPE: </b>This specifies the type of file being uploaded and will differ between files being uploaded. For example, a JPG will have the MIME type of 'image/jpg' whereas a PDF would have 'application/pdf'. For a full guide
      to file types and their corresponding MIME types, <a href="https://developer.mozilla.org/en-US/docs/We/bHTTP/Guides/MIME_types/Common_types">Click here.</a><br/><br/>
      - <b>RAW BIN IMG DATA: </b>The raw data of the file being sent. The raw binary data of files hold byte sequences at the beginning of itself indicating what file type the file is. For example, the raw binary data of a PNG file would
      always preceed with <code>"‰PNG␍␊␚␊"</code>/<code>89 50 4E 47 0D 0A 1A 0A</code> before the actual raw image data.<br/><br/>
      - <b>DESCRIPTION OF IMAGE/USERNAME OF POSTER: </b>This is some extra information fed to the server with the request. In this specific scenario it was trying to dictate a description of the image being uploaded and the username of the
      user uploading it.<br/><br/></p>
      <h1>Validating Files</h1>
      <p>So, now we know all the information the HTTP server will receive, we can look at ways to use this data to confirm if an uploaded file is wanted or not. You may have noticed two important components of the POST request for this,
      those being the filename, MIME type and actual raw binary data. We can look at the contents of these and validate if the posted file holds the same contents of the file we want. So, let's go over how we'd validate these two
      properties.
      <br/><br/>- <b>MIME Type</b>: For this all we need to do is find the MIME type of the files we want to include, so, if we only wanted to receive PNG's we'd run an if statement to see if the MIME type is equal to 'image/png'. If it
      is then we can confirm that the uploaded file is legitimate in that regard.
      <br/><br/>- <b>Filename</b>: This one's a little more tricky, and it will mainly boil down to how the string is handled. But generally we want to check whatever follows the final "." within the filename and ensure that it's of
      a wanted file type. So, if the proceeding characters of the "." character in this string are "p","n" and "g" we can confirm that this is a png filetype.</p>
      <br/><br/>- <b>Magic Bytes</b>: These magic bytes found within the raw binary data can be cross referenced with the magic bytes of the file type you want. If you're only allowing a PNG upload and someone uploads a file
      with the magic bytes of a PHP file type then you can block the upload as it's not a PNG.</p>
      <h1>Bypassing Protection</h1>
      <p>Now we understand how files are sanitised, we can look at how we can manipulate the POST request to try and exploit bad implications of these defences. It's very important that you have some software setup to modify your
      POST requests before you send them to the server, one of the best softwares to do this is <a href="https://portswigger.net/burp/communitydownload">Burp Suite</a>.<br/><br/>
      Let's say we're trying to upload a .php file when a server is expecting a .png, as mentioned earlier, the server will most likely be expecting a MIME type of 'image/png', however since we're uploading a php file our MIME type
      will (by default) be 'application/x-httpd-php', so, we'll need to manually jump into the request and change the MIME type to image/png so the server doesn't pick up on this and allows us to pass the check. <i>Remember, the MIME
      type is stored under 'Content-Type' under the POST request!</i>. It's important to note under the right conditions, changing the MIME type may mangle the data inside as the server may treat the data differently as it interprets
      it as another file type.<br/><br/>
      <p>Now we can look at the filename property. If you've ever tried bypassing sanitisation on strings, you'll know there are plenty of possible methods to get around this, it's just about finding the right ones. I'll list a few
      below...<br/><br/>
      - <b>URL Encoding:</b> You could attempt to replace the "." before a file extension with "%2", the server may then see the filename as something such as 'file%2php' and then actually save the file decoded as 'file.php' getting around
      the string check.<br/><br/>
      - <b>Adding an extension:</b> A server may check a filename from left to right and look for a "." then the proceeding characters. As long as it finds the characters it wants after it may allow the file to pass. We can manipulate this
      by simply adding another file extension past the first one, making the filename look something like 'file.png.php'. Due to this the file would be saved as .php on the server and the '.png' would just become a part of the files actual
      name.<br/><br/>
      - <b>Null byte characters:</b> We may be able to force the server to cut off a certain part of the string. If we make the file name something like 'file.php%00.png' or 'file.php;.png' it will see that the end of the file has the
      wanted filename however when it goes to save it it could cut off the end of the filename due to the null byte character, saving it as 'file.php'<br/><br/>
      - <b>Trailing Characters:</b> Including something such as a '.' at the end of your filename making it something like 'file.php.' can make the server interpret the extension to not include a certain file extension if it's working
      via a blacklist compared to a whitelist.<br/><br/>
      - <b>Multibyte Unicode Characters:</b> Translating your file extension to its unicode form may allow it to pass the checks without being noticed however it may be translated to their plaintext form upon saving.<br/><br/>
      Finally, we can talk about Magic Bytes. I wont go into a deep explenation about how we can bypass checks regarding magic bytes as they're quite similar to the ones we just listed above. But the general idea is that your file should
      have the magic bytes of the file you're trying to mimic. So, if we were trying to upload a php file passed off as a .png we'd want to add the PNG magic bytes at the start of the raw binary data of the file (<code>"‰PNG␍␊␚␊"</code>).</p>
      <h1>Building Our Payload</h1>
      <p>Okay, here comes the main exploit, actually writing in our payload. In this example I'm going to show a simple shell php extension that will give us a remote handle the shell to execute arbitrary commands. When we're defining
      our payload it should be in the pervious mentioned 'Raw bin img data' section.<br/><br/>Here, i'm going to write <code>&lt;?php echo system($_GET['command']); ?&gt;</code>. Once this is done and I've put in the necessary edits to
      bypass the servers authentication i'll upload it and jump to the directory it's been uploaded on the server. (This tends to be publicly available on any website as long as the element is loaded somewhere, you could also just
      FUZZ to find the directory.)<br/><br/>
      Once we've found our file we can make a request that passes to the variable "command" we wrote the file to execute. So, if we wanted to do something like find out what user we're running under, we could make a GET request like this
      <code>website.com/example/exploit.php?command=whoami</code> which should return the user the program is running off. Now, this is *technically* shell access-- however, if we wanted to get a real shell into the server we could use a
      simple revshell (You can easily make commands for this at) <a href="https://www.revshells.com/">revshells.com</a> and just run that command as we listen for it on our own machine.<br/><br/>When it comes down to it, the payload isn't
      really the main part of this exploit-- we primarily just want to upload something that isn't supposed to be there. However most of the time upon finding an issue like this we'd want to probe deeper into the server which is why i've
      explained the reverse shell</p>
      <h1>Conclusion</h1>
      <p>A file upload vulnerability is a great way to get a foothold into a website however it requires an intricate knowledge of a servers backend or lazy sanitisation techniques to exploit. If you want to go further with some real
      resources or try out what you've learned in some labs I heavily recommend (as always) <a href="https://portswigger.net/web-security/file-upload">PortSwiggers documentation</a> on the vulnerability along with the labs they have
      to offer along with it. If you see any misinformation or things that could do with clarifying on this post feel free to contact me wherever is linked around the website.</p>`
    }
  };
  
  export default blogPosts;