/*==========================================================
AVYUKTAPHOTOGRAPHY
LANDING PAGE
==========================================================*/


/*=========================================
PAGE LOADED
=========================================*/

window.addEventListener(

    "load",

    function(){

        document.body.style.opacity="1";

        console.log(

            "Avyuktaphotography Loaded Successfully."

        );

    }

);



/*=========================================
ENQUIRY BUTTON

(Temporary)

We'll replace this later
=========================================*/

function comingSoon(){

    alert(

`Enquiry Page

Coming Soon 😊

You will soon be able to:

• Ask Questions

• Check Packages

• Chat on WhatsApp

• Schedule a Call

Stay Tuned!

Avyuktaphotography`

    );

}



/*=========================================
PRELOAD BOOK PAGE

Makes navigation faster
=========================================*/

const preload =

document.createElement(

"link"

);

preload.rel="prefetch";

preload.href="book.html";

document.head.appendChild(

preload

);



/*=========================================
BUTTON ANIMATION
=========================================*/

document

.querySelectorAll(

".buttons button"

)

.forEach(

function(button){

button.addEventListener(

"mouseenter",

function(){

button.style.transform=

"translateY(-5px) scale(1.03)";

}

);

button.addEventListener(

"mouseleave",

function(){

button.style.transform=

"translateY(0px) scale(1)";

}

);

}

);



/*=========================================
WELCOME MESSAGE
=========================================*/

setTimeout(

function(){

console.log(

"Welcome to Avyuktaphotography"

);

},

1000

);



/*=========================================
SCROLL LOCK

(Removable later when homepage grows)
=========================================*/

window.addEventListener(

"wheel",

function(e){

if(

document.body.scrollHeight

<=

window.innerHeight

){

e.preventDefault();

}

},

{

passive:false

}

);



/*=========================================
KEYBOARD

Future Ready
=========================================*/

document.addEventListener(

"keydown",

function(e){

if(

e.key==="Enter"

){

const bookButton=

document.querySelector(

".booking"

);

if(

document.activeElement===bookButton

){

window.location.href="book.html";

}

}

});



/*=========================================
END
=========================================*/

console.log(

"Landing Page Ready."

);