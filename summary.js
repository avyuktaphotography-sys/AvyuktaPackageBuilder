/*==========================================================
AVYUKTAPHOTOGRAPHY
SUMMARY PAGE
==========================================================*/


const booking = JSON.parse(

    localStorage.getItem(
        "booking"
    )

);


if(

    !booking

){

    alert(

        "Booking not found."

    );

    window.location.href =
    "index.html";

}



/*==========================================================
CUSTOMER
==========================================================*/

const customer =
booking.customer;


document
.getElementById(
"custName"
).innerHTML =
customer.name;


document
.getElementById(
"custPhone"
).innerHTML =
customer.phone;


document
.getElementById(
"custSession"
).innerHTML =

customer.category

.charAt(0)

.toUpperCase()

+

customer.category

.slice(1);


document
.getElementById(
"custDate"
).innerHTML =
customer.preferredDate;



/*==========================================================
BOOKING ID
==========================================================*/

const now =
new Date();

const bookingId =

"AVY-"

+

now.getFullYear()

+

String(

now.getMonth()+1

).padStart(
2,
"0"
)

+

String(

now.getDate()

).padStart(
2,
"0"
)

+

"-"

+

Math.floor(

1000

+

Math.random()

*

9000

);


document
.getElementById(
"bookingId"
).innerHTML =
bookingId;



/*==========================================================
PACKAGE
==========================================================*/

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



document
.getElementById(
"basePrice"
).innerHTML =

"₹"

+

basePrice
.toLocaleString(
"en-IN"
);


document
.getElementById(
"selectedThemes"
).innerHTML =
selectedThemes;


document
.getElementById(
"extraThemes"
).innerHTML =
extraThemes;


document
.getElementById(
"extraCost"
).innerHTML =

"₹"

+

extraCost
.toLocaleString(
"en-IN"
);


document
.getElementById(
"total"
).innerHTML =

total
.toLocaleString(
"en-IN"
);

/*==========================================================
IMAGE FOLDER
==========================================================*/

let folder = "";

if(customer.babyAge==="newborn"){

    folder="newborn";

}
else if(customer.babyAge==="3to6"){

    folder="baby3to6";

}
else{

    if(

        customer.category==="outdoor"

        ||

        customer.category==="mix"

    ){

        folder="toddlerOutdoor";

    }
    else{

        folder="toddlerIndoor";

    }

}



/*==========================================================
FORMAT THEME NAME
==========================================================*/

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



/*==========================================================
THEME GALLERY
==========================================================*/

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

loading="lazy"

onerror="loadImage(this,'${folder}','${theme}')"

>

<p>

${formatTitle(theme)}

</p>

</div>

`;

}

);



/*==========================================================
IMAGE FALLBACK

jpeg
jpg
JPEG
JPG
png
PNG

==========================================================*/

function loadImage(

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


let index =

parseInt(

img.dataset.index

||

0

);


index++;


if(

index>=files.length

){

img.onerror=null;

img.src="images/no-image.png";

return;

}


img.dataset.index=index;


img.src=

`images/${folder}/${name}${files[index]}`;

}



/*==========================================================
IMAGE ANIMATION
==========================================================*/

setTimeout(

function(){

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

card.style.transform="translateY(0)";

},

index*120

);

}

);

},

200

);

/*==========================================================
DOWNLOAD PDF
==========================================================*/

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



/*==========================================================
SHARE BOOKING
==========================================================*/

document
.getElementById(
    "shareBtn"
)
.addEventListener(

    "click",

    async function(){

        const shareText =

`Booking ID : ${bookingId}

Customer : ${customer.name}

Session : ${formatTitle(customer.category)}

Total : ₹${total.toLocaleString("en-IN")}`;


        if(

            navigator.share

        ){

            try{

                await navigator.share({

                    title:

                    "Avyuktaphotography Booking",

                    text:

                    shareText

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            navigator.clipboard.writeText(

                shareText

            );

            alert(

                "Booking copied to clipboard."

            );

        }

    }

);



/*==========================================================
WHATSAPP BOOKING
==========================================================*/

document
.getElementById(
    "sendBtn"
)
.addEventListener(

    "click",

    function(){

        let themeList =

        booking.themes

        .map(

            function(theme){

                return "• " + formatTitle(theme);

            }

        )

        .join("\n");


        const message =

`📸 *AVYUKTAPHOTOGRAPHY*

━━━━━━━━━━━━━━━━━━

📄 Booking ID

${bookingId}

━━━━━━━━━━━━━━━━━━

👤 Customer Details

Name : ${customer.name}

Phone : ${customer.phone}

Preferred Date : ${customer.preferredDate}

Photography Session : ${formatTitle(customer.category)}

━━━━━━━━━━━━━━━━━━

📸 Selected Themes

${themeList}

━━━━━━━━━━━━━━━━━━

💰 Package Summary

Base Package : ₹${basePrice.toLocaleString("en-IN")}

Included Themes : ${includedThemes}

Selected Themes : ${selectedThemes}

Additional Themes : ${extraThemes}

Additional Cost : ₹${extraCost.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━

💵 GRAND TOTAL

₹${total.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━

Thank you for choosing
*Avyuktaphotography* ❤️`;


        const phone =

        "919008203206";   // <-- Replace if needed


        window.open(

            "https://wa.me/"

            +

            phone

            +

            "?text="

            +

            encodeURIComponent(

                message

            )

        );

    }

);



/*==========================================================
PAGE READY
==========================================================*/

window.addEventListener(

    "load",

    function(){

        document.body.style.opacity="1";

    }

);



console.log(

    "Summary Page Loaded Successfully."

);