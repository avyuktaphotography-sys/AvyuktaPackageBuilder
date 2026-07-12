/*==================================================
 AVYUKTAPHOTOGRAPHY
 PACKAGE BUILDER V2
==================================================*/


const customer =
JSON.parse(
localStorage.getItem(
"customer"
));


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



/*-----------------------------------------
PACKAGE DETAILS
-----------------------------------------*/

const includedThemes = 4;


let basePrice = 7000;

if(

    customer.category==="home"

    ||

    customer.category==="outdoor"

    ||

    customer.category==="mix"

){

    basePrice = 10000;

}



const extraThemePrice =

customer.category==="studio"

||

customer.category==="home"

?

1500

:

2000;



document.getElementById(
"packagePrice"
).innerHTML =
"₹"
+
basePrice.toLocaleString();


document.getElementById(
"extraPrice"
).innerHTML =
"₹"
+
extraThemePrice.toLocaleString()
+
" / Theme";



/*-----------------------------------------
DETERMINE IMAGE FOLDER
-----------------------------------------*/

let folder="";


if(

customer.babyAge==="newborn"

){

folder="newborn";

}

else if(

customer.babyAge==="3to6"

){

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



const container=

document.getElementById(
"themeContainer"
);



let selected=[];



function titleCase(text){

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

/*-----------------------------------------
LOAD THEMES
-----------------------------------------*/

const themes = themeData[folder] || [];

themes.forEach(function(theme){

    container.innerHTML += `

    <div class="card">

        <img
            src="images/${folder}/${theme}.jpeg"
            alt="${titleCase(theme)}"

            onerror="loadNextImage(this,'${folder}','${theme}')">

        <div class="cardBody">

            <h3>

                ${titleCase(theme)}

            </h3>

            <label>

                <input
                    type="checkbox"
                    class="theme"
                    value="${theme}">

                Select Theme

            </label>

        </div>

    </div>

    `;

});



/*-----------------------------------------
IMAGE FALLBACK
-----------------------------------------*/

function loadNextImage(img,folder,name){

    const files=[

        ".jpeg",
        ".jpg",
        ".JPEG",
        ".JPG",
        ".png",
        ".PNG"

    ];

    let step=parseInt(img.dataset.step||0);

    step++;

    if(step>=files.length){

        img.onerror=null;

        img.src="images/no-image.png";

        return;

    }

    img.dataset.step=step;

    img.src=
    `images/${folder}/${name}${files[step]}`;

}


/*-----------------------------------------
THEME SELECTION
-----------------------------------------*/

document.addEventListener(

    "change",

    function(e){

        if(

            !e.target.classList.contains(
                "theme"
            )

        ){

            return;

        }

        const card =
            e.target.closest(
                ".card"
            );

        const value =
            e.target.value;


        if(
            e.target.checked
        ){

            if(
                !selected.includes(
                    value
                )
            ){

                selected.push(
                    value
                );

            }

            card.classList.add(
                "selected"
            );

        }

        else{

            selected =
                selected.filter(

                    x =>

                    x !== value

                );

            card.classList.remove(
                "selected"
            );

        }

        updateProgress();

        updateCart();

    }

);



/*-----------------------------------------
UPDATE PROGRESS BAR
-----------------------------------------*/

function updateProgress(){

    document
    .getElementById(
        "selectedCount"
    )
    .innerHTML =
    selected.length;


    let percentage =

        (
            selected.length
            /
            includedThemes
        )

        *100;


    if(
        percentage>100
    ){

        percentage=100;

    }


    document
    .getElementById(
        "progressBar"
    )
    .style.width =
    percentage
    +
    "%";


    if(

        selected.length
        >=
        includedThemes

    ){

        document
        .getElementById(
            "progressBar"
        )
        .style.background =

        "#2ecc71";

    }

    else{

        document
        .getElementById(
            "progressBar"
        )
        .style.background =

        "#d62828";

    }

}

/*-----------------------------------------
LIVE CART
-----------------------------------------*/

function updateCart(){

    const extraThemes =

        Math.max(

            0,

            selected.length
            -
            includedThemes

        );


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
        "cartDetails"
    )
    .innerHTML =

`

<div class="cartRow">

<b>Base Package</b>

<span>

₹${basePrice.toLocaleString("en-IN")}

</span>

</div>


<div class="cartRow">

<b>Included Themes</b>

<span>

${includedThemes}

</span>

</div>


<div class="cartRow">

<b>Selected Themes</b>

<span>

${selected.length}

</span>

</div>


<div class="cartRow">

<b>Additional Themes</b>

<span>

${extraThemes}

</span>

</div>


<div class="cartRow">

<b>Additional Cost</b>

<span>

₹${extraCost.toLocaleString("en-IN")}

</span>

</div>


<hr>


<div class="cartRow">

Family Pictures

<span>

2 Included

</span>

</div>


<div class="cartRow">

Edited Photos

<span>

5 Included

</span>

</div>


<div class="cartRow">

Soft Copies

<span>

Included

</span>

</div>

`;


    document
    .getElementById(
        "total"
    )
    .innerHTML =

    total.toLocaleString(
        "en-IN"
    );

}



/*-----------------------------------------
INITIAL LOAD
-----------------------------------------*/

updateProgress();

updateCart();



/*-----------------------------------------
CONTINUE BUTTON
-----------------------------------------*/

document
.getElementById(
    "continueBtn"
)
.addEventListener(

    "click",

    function(){

        if(

            selected.length===0

        ){

            alert(

                "Please select at least one theme."

            );

            return;

        }


        const booking={

            customer:

                customer,

            themes:

                selected,

            basePrice:

                basePrice,

            includedThemes:

                includedThemes,

            extraThemePrice:

                extraThemePrice,

            total:

                Number(

                    document
                    .getElementById(
                        "total"
                    )
                    .innerHTML
                    .replace(
                        /,/g,
                        ""
                    )

                )

        };


        localStorage.setItem(

            "booking",

            JSON.stringify(
                booking
            )

        );


        window.location.href=

            "confirmation.html";

    }

);
