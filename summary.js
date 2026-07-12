/* ==========================================
   AVYUKTAPHOTOGRAPHY
   SUMMARY PAGE
========================================== */

const booking = JSON.parse(localStorage.getItem("booking"));

if (!booking) {
    alert("Booking not found.");
    window.location.href = "index.html";
}

const customer = booking.customer;

document.getElementById("custName").textContent = customer.name;
document.getElementById("custPhone").textContent = customer.phone;
document.getElementById("custSession").textContent =
    customer.category.charAt(0).toUpperCase() +
    customer.category.slice(1);

document.getElementById("custDate").textContent =
    customer.preferredDate;


/* -----------------------------
   PACKAGE DETAILS
------------------------------ */

const includedThemes = 4;

const basePrice = booking.basePrice;

const selectedThemes = booking.themes.length;

const extraThemes = Math.max(
    0,
    selectedThemes - includedThemes
);

const extraThemePrice =
    (
        customer.category === "studio" ||
        customer.category === "home"
    )
    ? 1500
    : 2000;

const extraCost =
    extraThemes *
    extraThemePrice;

const total =
    booking.total;


/* -----------------------------
   SHOW PACKAGE
------------------------------ */

document.getElementById(
    "basePrice"
).innerHTML =
    "₹" +
    Number(basePrice).toLocaleString("en-IN");

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
    "₹" +
    extraCost.toLocaleString("en-IN");

document.getElementById(
    "total"
).innerHTML =
    Number(total).toLocaleString("en-IN");


/* -----------------------------
   DETERMINE IMAGE FOLDER
------------------------------ */

let folder = "";

if (customer.babyAge === "newborn") {

    folder = "newborn";

}
else if (customer.babyAge === "3to6") {

    folder = "baby3to6";

}
else {

    if (
        customer.category === "outdoor" ||
        customer.category === "mix"
    ) {

        folder = "toddlerOutdoor";

    }
    else {

        folder = "toddlerIndoor";

    }

}


/* -----------------------------
   FORMAT TITLE
------------------------------ */

function formatTitle(text){

    return text
        .replace(/[_-]/g," ")
        .replace(
            /\b\w/g,
            function(c){
                return c.toUpperCase();
            }
        );

}


/* -----------------------------
   LOAD IMAGES
------------------------------ */

const gallery =
document.getElementById(
    "themeGallery"
);

booking.themes.forEach(function(theme){

    gallery.innerHTML += `

    <div class="item">

        <img

            src="images/${folder}/${theme}.jpeg"

            onerror="
                this.onerror=null;
                this.src='images/${folder}/${theme}.JPG';
            ">

        <p>

            ${formatTitle(theme)}

        </p>

    </div>

    `;

});


/* -----------------------------
   WHATSAPP
------------------------------ */

document
.getElementById(
    "sendBtn"
)
.addEventListener(

    "click",

    function(){

        let message =

`Hello Avyuktaphotography,

📸 Booking Request

Name :
${customer.name}

Phone :
${customer.phone}

Preferred Date :
${customer.preferredDate}

Session :
${customer.category}

Selected Themes

${booking.themes
.map(formatTitle)
.join("\n")}

Base Package :
₹${basePrice}

Additional Themes :
${extraThemes}

Additional Cost :
₹${extraCost}

Total Package :
₹${total}

Thank You.
`;

        window.open(

            "https://wa.me/919008203206?text=" +

            encodeURIComponent(message)

        );

    }

);