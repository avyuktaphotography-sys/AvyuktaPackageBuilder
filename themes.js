/* =========================================
   CUSTOMER DETAILS
========================================= */

const customer =
    JSON.parse(
        localStorage.getItem(
            "customer"
        )
    );

document
    .getElementById(
        "custName"
    )
    .innerHTML =
    customer.name;

document
    .getElementById(
        "custPhone"
    )
    .innerHTML =
    customer.phone;

document
    .getElementById(
        "custSession"
    )
    .innerHTML =
    customer.category
        .charAt(0)
        .toUpperCase()
    +
    customer.category
        .slice(1);

document
    .getElementById(
        "custDate"
    )
    .innerHTML =
    customer.preferredDate;


/* =========================================
   DETERMINE FOLDER
========================================= */

let folder = "";

if(
    customer.babyAge
    ===
    "newborn"
){

    folder =
        "newborn";
}
else if(
    customer.babyAge
    ===
    "3to6"
){

    folder =
        "baby3to6";
}
else{

    if(
        customer.category
        ===
        "outdoor"
        ||
        customer.category
        ===
        "mix"
    ){

        folder =
            "toddlerOutdoor";
    }
    else{

        folder =
            "toddlerIndoor";
    }
}


/* =========================================
   LOAD THEMES
========================================= */

const themes =
    themeData;

const container =
    document.getElementById(
        "themeContainer"
    );


function formatTitle(
    text
){

    return text

        .replace(
            /[_-]/g,
            " "
        )

        .replace(
            /\b\w/g,
            function(c){

                return c
                    .toUpperCase();

            });
}


if(
    themes[folder]
){

    themes[folder]
    .forEach(

        function(
            theme
        ){

            container
                .innerHTML +=

`
<div class="card">

    <img

        src=
        "images/${folder}/${theme}.jpeg"

        onerror="
            this.onerror=null;
            this.src='images/${folder}/${theme}.jpg';
        ">

    <div class="cardBody">

        <h3>
            ${formatTitle(
                theme
            )}
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

        }

    );
}


/* =========================================
   CART
========================================= */

let selected =
    [];


/* =========================================
   THEME SELECTION
========================================= */

document
.addEventListener(

    "change",

    function(e){

        if(

            e.target
            .classList
            .contains(
                "theme"
            )

        ){

            const card =

                e.target
                    .closest(
                        ".card"
                    );

            if(
                e.target
                .checked
            ){

                card
                    .classList
                    .add(
                        "selected"
                    );

                if(

                    !selected
                    .includes(
                        e.target
                            .value
                    )

                ){

                    selected
                        .push(

                            e.target
                                .value

                        );
                }

            }
            else{

                card
                    .classList
                    .remove(
                        "selected"
                    );

                selected =

                    selected
                    .filter(

                        x =>

                        x
                        !==

                        e.target
                            .value
                    );
            }

            updateCart();
        }

    }

);


/* =========================================
   UPDATE CART
========================================= */

function updateCart(){

    const base =

        customer
        .category
        ===
        "studio"

        ?

        3000

        :

        5000;


    const additional =

        customer
        .category
        ===
        "studio"

        ?

        1500

        :

        2000;


    const included =
        2;


    const extra =

        Math.max(

            0,

            selected
                .length
            -
            included
        );


    const extraCost =

        extra
        *
        additional;


    const total =

        base
        +
        extraCost;


    document
        .getElementById(
            "cartDetails"
        )
        .innerHTML =

`
<div>

<b>Package :</b>
₹${base}

&nbsp;&nbsp;&nbsp;

<b>Included :</b>
${included}

</div>

<br>

<div>

<b>Selected :</b>
${selected.length}

&nbsp;&nbsp;&nbsp;

<b>Extra :</b>
${extra}

</div>

<br>

<div>

<b>Extra Cost :</b>
₹${extraCost}

&nbsp;&nbsp;&nbsp;

<b>Family :</b>
2

</div>

<br>

<div>

<b>Edited :</b>
5

&nbsp;&nbsp;&nbsp;

<b>Soft :</b>
Included

</div>
`;


    document
        .getElementById(
            "total"
        )
        .innerHTML =
            total;
}


/* =========================================
   INITIAL LOAD
========================================= */

updateCart();

document
    .getElementById(
        "continueBtn"
    )
    .addEventListener(

        "click",

        function(){

            localStorage
                .setItem(

                    "booking",

                    JSON.stringify({

                        customer:
                            customer,

                        themes:
                            selected,

                        total:
                            document
                            .getElementById(
                                "total"
                            )
                            .innerHTML
                    })
                );

            location.href =
                "confirmation.html";
        }
    );