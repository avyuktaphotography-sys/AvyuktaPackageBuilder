/*==================================================
AVYUKTAPHOTOGRAPHY
SUMMARY PAGE
==================================================*/


const booking = JSON.parse(

    localStorage.getItem(
        "booking"
    )

);


if(!booking){

    alert(
        "Booking not found."
    );

    window.location.href =
        "index.html";

}



/*==================================================
CUSTOMER
==================================================*/

const customer =
    booking.customer;


document.getElementById(
    "custName"
).innerHTML =
customer.name;


document.getElementById(
    "custPhone"
).innerHTML =
customer.phone;


document.getElementById(
    "custSession"
).innerHTML =

customer.category

.charAt(0)

.toUpperCase()

+

customer.category

.slice(1);


document.getElementById(
    "custDate"
).innerHTML =
customer.preferredDate;



/*==================================================
BOOKING ID
==================================================*/

const today =
new Date();

const yyyy =
today.getFullYear();

const mm =
String(
today.getMonth()+1
).padStart(
2,
"0"
);

const dd =
String(
today.getDate()
).padStart(
2,
"0"
);

const bookingId =

"AVY-"

+

yyyy

+

mm

+

dd

+

"-"

+

Math.floor(

100

+

Math.random()

*

900

);


document.getElementById(
"bookingId"
).innerHTML =
bookingId;



/*==================================================
PACKAGE
==================================================*/

const includedThemes = 4;

const basePrice =
booking.basePrice;

const selectedThemes =
booking.themes.length;

const extraThemes =

Math.max(

0,

selectedThemes
-
includedThemes

);


const extraThemePrice =

customer.category==="studio"

||

customer.category==="home"

?

1500

:

2000;


const extraCost =

extraThemes
*
extraThemePrice;


const total =

basePrice
+
extraCost;



document.getElementById(
"basePrice"
).innerHTML =
"₹"
+
basePrice.toLocaleString(
"en-IN"
);


document.getElementById(
"selectedThemes"
).innerHTML =
selectedThemes;


document.getElementById(
"extraThemes"
).innerHTML =
extraThemes;


document.getElementById(
"extraCost"
).innerHTML =
"₹"
+
extraCost.toLocaleString(
"en-IN"
);


document.getElementById(
"total"
).innerHTML =
total.toLocaleString(
"en-IN"
);

/*==================================================
IMAGE FOLDER
==================================================*/

let folder = "";

if(
    customer.babyAge === "newborn"
){

    folder = "newborn";

}
else if(
    customer.babyAge === "3to6"
){

    folder = "baby3to6";

}
else{

    if(

        customer.category === "outdoor"

        ||

        customer.category === "mix"

    ){

        folder = "toddlerOutdoor";

    }

    else{

        folder = "toddlerIndoor";

    }

}



/*==================================================
FORMAT TITLE
==================================================*/

function formatTitle(text){

    return text

        .replace(
            /[_-]/g,
            " "
        )

        .replace(

            /\b\w/g,

            function(letter){

                return letter.toUpperCase();

            }

        );

}



/*==================================================
LOAD SELECTED THEMES
==================================================*/

const gallery =

document.getElementById(
    "themeGallery"
);



booking.themes.forEach(

    function(theme){

        gallery.innerHTML +=

`

<div class="item">

<img

src="images/${folder}/${theme}.jpeg"

alt="${theme}"

onerror="loadNextImage(this,'${folder}','${theme}')"

>

<p>

${formatTitle(theme)}

</p>

</div>

`;

    }

);



/*==================================================
IMAGE FALLBACK

Supports

jpeg
jpg
JPEG
JPG
png
PNG

==================================================*/

function loadNextImage(

img,

folder,

name

){

    const files=[

        ".jpeg",

        ".jpg",

        ".JPEG",

        ".JPG",

        ".png",

        ".PNG"

    ];



    let step =

        parseInt(

            img.dataset.step

            ||

            0

        );



    step++;



    if(

        step>=files.length

    ){

        img.onerror=null;

        img.src="images/no-image.png";

        return;

    }



    img.dataset.step=step;



    img.src=

    `images/${folder}/${name}${files[step]}`;

}

/*==================================================
WHATSAPP MESSAGE
==================================================*/

document
.getElementById(
    "sendBtn"
)
.addEventListener(

    "click",

    function(){

        let message =

`📸 *AVYUKTAPHOTOGRAPHY*

Booking ID
${bookingId}

━━━━━━━━━━━━━━━━━━

👤 Customer

Name :
${customer.name}

Phone :
${customer.phone}

Preferred Date :
${customer.preferredDate}

Photography Session :
${formatTitle(customer.category)}

━━━━━━━━━━━━━━━━━━

📸 Selected Themes

${booking.themes
.map(function(theme){

return "• " + formatTitle(theme);

})
.join("\n")}

━━━━━━━━━━━━━━━━━━

💰 Package Details

Base Package :
₹${basePrice.toLocaleString("en-IN")}

Included Themes :
${includedThemes}

Selected Themes :
${selectedThemes}

Additional Themes :
${extraThemes}

Additional Cost :
₹${extraCost.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━

💵 GRAND TOTAL

₹${total.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━

Thank you for choosing
Avyuktaphotography ❤️

`;

        window.open(

            "https://wa.me/91XXXXXXXXXX?text="

            +

            encodeURIComponent(
                message
            )

        );

    }

);



/*==================================================
SHARE BOOKING
==================================================*/

document
.getElementById(
    "shareBtn"
)
.addEventListener(

    "click",

    async function(){

        if(

            navigator.share

        ){

            try{

                await navigator.share({

                    title:
                    "Avyuktaphotography Booking",

                    text:

                    "Booking ID : "

                    +

                    bookingId

                    +

                    "\\nTotal : ₹"

                    +

                    total

                });

            }

            catch(e){}

        }

        else{

            alert(

                "Sharing is not supported on this browser."

            );

        }

    }

);



/*==================================================
DOWNLOAD PDF

(Opens Print Dialog)

==================================================*/

document
.getElementById(
    "pdfBtn"
)
.addEventListener(

    "click",

    function(){

        window.print();

    }

);



/*==================================================
ANIMATION
==================================================*/

document
.querySelectorAll(

    ".item"

)
.forEach(

    function(card,index){

        card.style.opacity="0";

        card.style.transform="translateY(40px)";

        setTimeout(

            function(){

                card.style.transition=".5s";

                card.style.opacity="1";

                card.style.transform="translateY(0px)";

            },

            index*120

        );

    }

);



/*==================================================
CONSOLE
==================================================*/

console.log(

"Booking Summary Loaded"

);