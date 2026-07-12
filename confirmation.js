/*==========================================
AVYUKTAPHOTOGRAPHY
CONFIRMATION PAGE
==========================================*/

const booking = JSON.parse(
    localStorage.getItem("booking")
);

if (!booking) {

    alert("Booking details not found.");

    window.location.href = "book.html";

}


/*------------------------------------------
CUSTOMER DETAILS
------------------------------------------*/

document.getElementById("custName").innerHTML =
booking.customer.name;

document.getElementById("custPhone").innerHTML =
booking.customer.phone;

document.getElementById("custDate").innerHTML =
booking.customer.preferredDate;

document.getElementById("custSession").innerHTML =
booking.customer.category
.charAt(0)
.toUpperCase()
+
booking.customer.category.slice(1);


/*------------------------------------------
THEMES
------------------------------------------*/

const list =
document.getElementById(
    "themeList"
);

booking.themes.forEach(

    function(theme){

        list.innerHTML +=

        `<li>${formatTitle(theme)}</li>`;

    }

);



/*------------------------------------------
PACKAGE
------------------------------------------*/

const includedThemes = 4;

const extraThemes =

Math.max(

0,

booking.themes.length
-
includedThemes

);


const extraThemePrice =

booking.customer.category==="studio"

||

booking.customer.category==="home"

?

1500

:

2000;


const extraCost =

extraThemes
*
extraThemePrice;


document.getElementById(
"basePrice"
).innerHTML =

"₹"
+
booking.basePrice
.toLocaleString(
"en-IN"
);


document.getElementById(
"extraThemes"
).innerHTML =

extraThemes;


document.getElementById(
"extraCost"
).innerHTML =

"₹"
+
extraCost
.toLocaleString(
"en-IN"
);


document.getElementById(
"total"
).innerHTML =

booking.total
.toLocaleString(
"en-IN"
);



/*------------------------------------------
FORMAT TITLE
------------------------------------------*/

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



/*------------------------------------------
WHATSAPP
------------------------------------------*/

document
.getElementById(
"whatsappBtn"
)
.addEventListener(

"click",

function(){


const message =

`📸 *New Photography Booking*

👤 Name:
${booking.customer.name}

📞 Phone:
${booking.customer.phone}

📅 Preferred Date:
${booking.customer.preferredDate}

📷 Session:
${booking.customer.category}

🎨 Selected Themes:
${booking.themes
.map(formatTitle)
.join("\n")}

💰 Total Package:
₹${booking.total}

Thank you.
`;


/* CHANGE NUMBER */

const whatsapp =

"919008203206";


window.open(

"https://wa.me/"

+

whatsapp

+

"?text="

+

encodeURIComponent(
message
)

);


}

);



/*------------------------------------------
BACK
------------------------------------------*/

document
.getElementById(
"backBtn"
)
.addEventListener(

"click",

function(){

window.location.href =
"index.html";

}

);