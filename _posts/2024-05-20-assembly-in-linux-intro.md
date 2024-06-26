
## $ ./AssemblyInLinuxIntro
*By [AvaLikesBread](https://github.com/YourAva)*
*Average read time is roughly 12m20s*

### Intro
Heya, and welcome to BitCrunch. Today we're going to be going over how to program asm in linux's x64 architecture. For this tutorial I highly recommend that you use a [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine), as it's always good practice to run assembly in a protected space where it won't harm your actual hardware. To do this, I'm personally using [Virtualbox](https://www.virtualbox.org/) along with a VM initialised with the [Ubuntu 24.04 LTS ISO](https://ubuntu.com/download/server). In additon to this, this article assumes you have some knowledge of C, **HOWEVER** I've tried to make it as readable as possible for those who don't know C or are relatively new to programming and still want to learn assembly.

> I have only recently started learning assembly. If I make any mistakes please feel free to join my [Discord](https://discord.com/invite/jzMxbK3pv4) and DM me what I've explained in a convoluted way, or incorrectly and I will try my best to correct it.

Now, first we should get a good understanding of **what assembly actually is**. Assembly is a low level language that allows us to get extremely close to actual machine code, without actually flipping the bits ourself. This offers extreme control over our machines and means we can run some processes that take extreme accuracy. In addition to this, it also allows a way for malicious code to be ran on computers where it will be less detectable.

<img src="https://i.imgur.com/ChSvTBT.png" width=500px>

### Starting to program

So, how do we actually begin to program in assembly? Well, firstly load into whatever [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) (Integrated Development Environment) you use. Personally, I'm going to use Neovim. Once we're in our IDE we're going to make a file. I'm going to call mine `asem.asm` (.asm being the assembly file extension) Now, let's get to programming.

Our goal for this code is going to be to take the user's input and output it back to them, along with adding some pretty formatting along with it! So, here's the break down of what we're going to need to do...
 - Output, asking for the user to input something
 - Take the user input
 - Print out the user input back to then
 - Exit the code 'peacefully'
 - Compile and run our program

### Outputting a string

So, our first goal is going to be outputting something to the user. Easy enough! Before we do this we're going to need to define what we're outputting to the user in a variable, spesifically, a [constant](https://www.advancedchemtech.com/what-is-a-constant-variable-in-science/). To define a constant in our program we need to define a section in our ASM called `.data`, all of our constant variables should be defined in this section. If you don't get this immediately, **DON'T WORRY! <3** This is arguably the HARDEST part of this whole article to understand.

To define our variable under this section, we're going to first give our variable name, I'm personally going to call it `userInput` but you can call it whatever you like providing when you reference it in the code later you name it what you named it. After we enter our variable name we're going to write a colon and then `db`. Now, what does db stand for? Well it's quite simple..! It stands for "define byte", in short, we're preparing the program to put our next input and store it in memory. So, let's give it something to store, by writing a [string](https://en.wikipedia.org/wiki/String_(computer_science)). Once we've done that, we need to finally give an exit code. If you don't know what an exit code is, it tells the program what to do after printing the string. For us, we want it to stay on the same line for :sparkles: **pretty formatting reasons** :sparkles:, so we're going to give it the code `0` to tell it to do so. However, we can also do the equivelant of `\n` (dropping a line after print) with the code `10`

Almost done defining now! Now, we need to get the length of our userInput variable, so we start by defining a variable named userInputLen, however, instead of defining it with `db` this time we need to use `equ`. This is because `db` defines space in memory for data before the program even runs. However, we can't get the length of userInput until the program has ran since there's nothing in the memory address. Essentially, `equ` waits for "Please enter a string: " to be assigned to userInput before it checks the length. We then use $ to get the 'current location counter', essentially this is where the variable userInput starts in memory. We then minus that by where it ends in memory to get the full length. It's like having a sentence and finding the length of a word in it by finding out it starts at the 20th character and ends at the 30th character, so doing 30-20 to find out it's 10 characters long.

Congrats! You defined a variable in assembly! Here's the code you should have, don't worry about what happens after the semi colons (;) also, they're comments that the program ignores and they're there for you to get a better understanding into what happens line by line:
```
section .data                                        ; Constants
    userInput: db "Please enter a string: ", 0       ; Reserve 128 bytes for a variable named 'buffer'
    userInputLen: equ $-userInput                    ; Get the length of askForInp
```
Now, time to get a little bit techy. We need to do a little bit of code to help our linker *(This is what compiles our code & makes it run)* know where to start in the code. So, we're going to define another section called .text, this is a special indicator of where the entry point for our program is. Our entry point is going to be called _start, so we'll write global _start under it. (Global to define _start can be referenced globally.) Here's the final code for that.
```
section .text            ; give an entry point for our linker
    global _start
```
Now, it's time to get into the **fun** part! We're going to be programming our main code now. As stated earlier, we firstly want to output something. So, we need to call up on the [Kernel](https://en.wikipedia.org/wiki/Kernel) with the sys_write function that will allow us to write to the console. To do this we need to write to a few different registers to meet some requirements before we print. When trying to do this, documentation such as this [Linux system call table](https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/) can be extremely helpful. Under this webpage, we can find this graph for sys_write and sys_read. (We will use sys_read later.)
<img src="https://i.imgur.com/sGyQeHD.png">
So, in this graph we can see multiple of these 3 character words starting with a %. These are registers. If you're unsure on what a register is. I highly recommend you [read up about them](https://www.totalphase.com/blog/2023/05/what-is-register-in-cpu-how-does-it-work/), or do your own research. Now, we can see under these registers what we have to input into them to reference the syscalls to be executed, so let's get to programming.

Firstly, we need to use the `mov` instruction to send a piece of data to a specified register. We're first going to want to send the integer 1 to the register `rax`, so we're going to write `mov rax, 1`. This is done to  reference the sys_write instruction so the kernel knows what all the other inputs into the other registers are for. It's a bit like calling a function's name in a high level language!

We're then going to reference the standard output file descriptor, which is stored in 1, and send that to the register. After this we can see in the graph it wants a `const char *buf` and `size_t count`. All this means is it wants...

 1. What we're going to output
 2. The length of the variable we're outputting.

So, let's get to it! we're going to write the userInput variable's content to the ``%rsi`` register by using the `mov` instruction again. Leading to `mov rsi, userInput`. Finally, we need to give the length which we defined earlier on with `mov rdx, userInputLen`. Finally, we need to call the kernel to pickup the instructions we've given and execute them, which can easily be done by using the instruction `syscall`. **We need to make sure all of these instructions are done under _start, as they will not run otherwise.**

```
_start:
    mov rax, 1                ; sys_write
    mov rdi, 1                ; File descriptor 1 (stdout)
    mov rsi, userInput        ; Pointer to variable on what to output
    mov rdx, userInputLen     ; Length of what's to be outputted.
    syscall                   ; Call kernel
```
And there we have it..! We've written code to output something to our terminal. However, we're not done just yet.
<img src="https://i.imgur.com/C36wrav.png" width=500px>

### Taking a user input
Now, if you've ever taken a user input in another program before you'll know we need to make a variable for the user input to be written in. So, we need to make a new section like we did for our constant earlier. We're going to do this by making another section! **((Make sure the section is written outside of main next to where we wrote our constants. If you don't understand this, check the bottom of the article for the final code.))** For this section we're going to call it `.bss`, which in "ye' olde tech jargen" stands for Block Started by Symbol. In English and not nerd speak, what this means is a variable that isn't defined on boot of the program. Under our new `section .bss` we're going to give a name for where our user is going to input the variable. I'm going to call it `buffer` but once again you can call it whatever you like. Then, we're going to use an instruction called  `resb`  and pass the integer `128` after it. This simply tells the program to save a 128 byte space in memory under the variable called `buffer`. It's a bit like saving a seat for your friend in a cinema, excpet the cinema is your RAM, and everyone there is data! Once we've done this we should end up with this code.
```
section .bss            	; Variables
    buffer resb 128       	; Reserve 128 bytes under the variable 'buffer'
```
Now we've saved a space in memory for our data to be saved we're going to go ahead and take the user input, and write their input into that space in memory. We're going to do this with another `syscall`.  If we remember that graph from [this helpful website](https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/) that you saw earlier, we can use the same concepts we used for sys_write for sys_read. Which should leave us with referencing the file descriptor of 0 for (stdin), a pointer to our buffer variable and how many bytes we allocated it earlier. *((We're going to be writing back in main again))*
```
mov rax, 0               	; sys_read
mov rdi, 0               	; File descriptor 1 (stdin)
mov rsi,  buffer        	; Pointer to the buffer
mov rdx, 128            	; Number of bytes to read
syscall                   	; Call kernel
```
Boom! We've stored our user input in memory! Now just to output it back to the user and exit the program peacefully!
### Outputting the user's input
This is almost **exactly** the same as printing our variable earlier, except this time we're doing it with our buffer variable. I'll spare you the explanation as by now I'm sure you understand how printing works. If you don't however. Don't get disheartened..! If you're feeling a little overwhelmed it's okay to come back later or ask for help in [my lovely Discord community](https://discord.com/invite/jzMxbK3pv4) <3. Now, here's the code you'll have to output the user input.
```
mov rax, 1                ; sys_write
mov rdi, 1                ; File descriptor 1 (stdout)
mov rsi, buffer           ; Pointer to where the user input was allocated
mov rdx, 128              ; Length of the users input
syscall                   ; Call kernel
```

### Exiting the program peacefully
If you've ever coded in C, you'll know all about error codes. However if you don't, here's a quick rundown. When a program finishes we normally return a number which can be interpreted as different things. For example, 0 is interpreted as the program finishing successfully, however, -1 can be  interpreted as an error on the program. Obviously, if the program has made it to this point it's ran successfully. So, we're going to go ahead and return `0` using the `sys_exit` function. If you think you can, go ahead and try to do this yourself. If not, feel free to follow along.
<img src="https://i.imgur.com/XMFkA4Z.png">
```
mov rax, 60                ; sys_exit
mov rdi, 0                 ; Exit code (0 = Successfull)
syscall                    ; Call Kernel
```

### Compiling our code -- Dependencies
We're **so** close to finishing! It's time to run some bash to compile our code to make it ready to run. You may be able to do this in your IDE or may need to open a new terminal. Before we can compile we need to make sure we have the packages that we need to use to actuall make the program run. To do this, run
```
$ nasm
```
and
```
$ ld
```
Assuming you have both of these packages, your outputs should look a little something like this.
```
alb@PC:~$ nasm
nasm: fatal: no input file specified
Type nasm -h for help.
alb@PC:~$ ld
ld: no input files
```
If your outputs don't look like this, then make sure to run these commands... *(Obviously don't include the $, it's just for show <3)*
```
$ sudo apt install nasm
$ sudo apt install ld
```
### Compiling our code
Time to compile! First we're going to want to make sure that we're in our **root folder**, A.K.A. The folder in which the file we've been programming in this whole time is held. Once there, run the following in the terminal one after the other, making sure to replace `asem.asm` with your own filename if you decided to call it something else at the start of the tutorial.
```
nasm -felf64 asem.asm
ld asem.o -o asem
```
Now, if we run `ls` in our terminal we're going to see a few files have outputted. The one that we're most interested in is the one named `asem` (this may change depending on what you did on `ld asem.o -o asem`, basically, it's the one that doesn't have a file extension at the end.) to run this file, we're going to run `./asem`. Once we've done this, we should get an output along these lines...
```
Please enter a string: My Blahaj is so cute!
My Blahaj is so cute!
```
And there it is, you've written your first piece of assembly code. If you're still having issues, consult the debugging section, or check your code with my final code ((If both of our codes are the same, you have an issue with how you're compiling your code)). Before you go, if you want to learn more and maybe look into how you could improve this code or learn more, read along into the notes section.

### Final Code
```
section .bss				; Variables
    buffer resb 128        	; Reserve 128 bytes under the variable 'buffer'

section .data                                        ; Constants
    userInput: db "Please enter a string: ", 0       ; Reserve 128 bytes for a variable named 'buffer'
    userInputLen: equ $-userInput                    ; Get the length of askForInp

section .text            ; give an entry point for our linker (GCC)
    global _start

_start:
    ; sys_write
    mov rax, 1                ; sys_write
    mov rdi, 1                ; File descriptor 1 (stdout)
    mov rsi, userInput        ; Pointer to variable on what to output
    mov rdx, userInputLen    	; Length of what's to be outputted.
    syscall                  	; Call kernel

    ; sys_read
    mov rax, 0                ; sys_read
    mov rdi, 0                ; File descriptor 1 (stdin)
    mov rsi,  buffer          ; Pointer to the buffer
    mov rdx, 128              ; Number of bytes to read
    syscall                   ; Call kernel

    ; sys_write
    mov rax, 1                ; sys_write
    mov rdi, 1                ; File descriptor 1 (stdout)
    mov rsi, buffer           ; Pointer to where the user input was allocated
    mov rdx, 128              ; Length of the users input
    syscall                   ; Call kernel

    ; sys_exit
    mov rax, 60               ; sys_exit
    mov rdi, 0                ; Exit code (0 = Successfull)
    syscall                   ; Call Kernel
```

### Notes

This entire time you may have been wondering, why am I writing my comments in one straight line? Well it's the industry standard. Everyone does it! It makes the comments easier to read, and makes programming and reading asm just that little bit easier for everyone involved.

>"Why do I see some people doing ``userInput: db "Please enter a string: ", 0x0A`` and ``userInput: db "Please enter a string: ", ENDL``?"

Well, it's quite simple, 0x0A is exit code `10` (AKA \n) in hex. There's no difference to writing ``userInput: db "Please enter a string: ", 10``, except you look cooler and your friends who don't know ASM will think you're 10x more of a nerd. As for ENDL, this is using a macro, which you can learn more about [here](https://www.geeksforgeeks.org/macros-and-its-types-in-c-cpp/). Most likely somewhere in their code you'll find something along the lines of ``%define ENDL, 0x0A`` or ``%define ENDL, 10``.

>"Is there any way I can compile my code faster rather than running the 3 commands you said earlier?"

Yes! By using a [shell script](https://www.techtarget.com/searchdatacenter/definition/shell-script) you can run these 3 commands with just one. Firstly, copy this code into a file called `./compile.sh` that's placed in your root folder, as always, make sure the name of asem.asm is matched up to whatever you've named your assembly file.
```
nasm -felf64 asem.asm
ld asem.o -o asem
./asem
```
once this is done, save it and enter your terminal, then run ``$ chmod +x compile.sh`` which will make it an executable. Then, run ``$ ./compile.sh`` to run it. It will build and run your program.

### Debugging

Issues with your code? No problem. Here's a list of things you can do.
>"I'm getting an error during my compiling"

 - Make sure you have the correct dependencies installed as stated in ``Compiling our code -- Dependencies``
 - Make sure you have entered the correct file names. If you're using asem.asm when you've called the file you're coding in something else it won't work. It **must** be named after the file you're coding in.
 - Google the error your compiler is giving
 - This tutorial is for x64 Operating Systems. If you're on x86, this tutorial will (most likely) not work.
 - Ask for help in the [Discord](https://discord.com/invite/jzMxbK3pv4) -- *Please make sure you've tried the other options first, and check the Discord's forum for other people that have had the same issue as you before you post.*

> "I can't setup VirtualBox!"

 - Follow [this tutorial](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) from the official ubuntu website.
### Thanks for Reading. Happy Hacking! <3

