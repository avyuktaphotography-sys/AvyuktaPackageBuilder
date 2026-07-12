/* ============================================
   AVYUKTAPHOTOGRAPHY
   PACKAGE BUILDER V2.0
============================================ */


/* -----------------------------
   BABY AGE SELECTION
------------------------------*/

const babyAgeRadios =
    document.querySelectorAll(
        'input[name="babyAge"]'
    );

const categorySection =
    document.getElementById(
        "categorySection"
    );


babyAgeRadios.forEach(

    radio => {

        radio.addEventListener(

            "change",

            function(){

                categorySection.style.display =
                    "block";

                filterCategory();

            }

        );

    }

);


/* -----------------------------
   FILTER SESSION
------------------------------*/

function filterCategory(){

    const age =

        document.querySelector(

            'input[name="babyAge"]:checked'

        ).value;


    const studio =

        document.querySelector(

            'input[value="studio"]'

        ).closest(
            ".sessionCard"
        );


    const home =

        document.querySelector(

            'input[value="home"]'

        ).closest(
            ".sessionCard"
        );


    const outdoor =

        document.querySelector(

            'input[value="outdoor"]'

        ).closest(
            ".sessionCard"
        );


    const mix =

        document.querySelector(

            'input[value="mix"]'

        ).closest(
            ".sessionCard"
        );


    if(

        age === "newborn"

        ||

        age === "3to6"

    ){

        studio.style.display =
            "block";

        home.style.display =
            "block";

        outdoor.style.display =
            "none";

        mix.style.display =
            "none";

    }

    else{

        studio.style.display =
            "block";

        home.style.display =
            "block";

        outdoor.style.display =
            "block";

        mix.style.display =
            "block";

    }

}



/* -----------------------------
   SESSION CARD SELECT
------------------------------*/

const sessionCards =
    document.querySelectorAll(
        ".sessionCard"
    );


sessionCards.forEach(

    card => {

        card.addEventListener(

            "click",

            function(){

                sessionCards.forEach(

                    c =>

                    c.classList.remove(
                        "selected"
                    )

                );

                card.classList.add(
                    "selected"
                );

            }

        );

    }

);



/* -----------------------------
   BABY AGE CARD SELECT
------------------------------*/

const ageCards =
    document.querySelectorAll(
        ".optionCard"
    );


ageCards.forEach(

    card => {

        card.addEventListener(

            "click",

            function(){

                ageCards.forEach(

                    c =>

                    c.classList.remove(
                        "selected"
                    )

                );

                card.classList.add(
                    "selected"
                );

            }

        );

    }

);



/* -----------------------------
   VALIDATION
------------------------------*/

function validateForm(){

    const name =

        document
        .getElementById(
            "customerName"
        )
        .value
        .trim();


    const phone =

        document
        .getElementById(
            "phone"
        )
        .value
        .trim();


    const preferredDate =

        document
        .getElementById(
            "preferredDate"
        )
        .value;


    const age =

        document.querySelector(

            'input[name="babyAge"]:checked'

        );


    const category =

        document.querySelector(

            'input[name="category"]:checked'

        );


    if(

        name === ""

    ){

        alert(
            "Please enter your Name."
        );

        return false;

    }


    if(

        phone.length < 10

    ){

        alert(
            "Please enter a valid Phone Number."
        );

        return false;

    }


    if(

        preferredDate === ""

    ){

        alert(
            "Please select Preferred Date."
        );

        return false;

    }


    if(

        !age

    ){

        alert(
            "Please select Baby Age."
        );

        return false;

    }


    if(

        !category

    ){

        alert(
            "Please select Photography Session."
        );

        return false;

    }


    return true;

}



/* -----------------------------
   CONTINUE
------------------------------*/

function continueToThemes(){

    if(

        !validateForm()

    ){

        return;

    }


    const customer = {

        name:

            document
            .getElementById(
                "customerName"
            )
            .value
            .trim(),


        phone:

            document
            .getElementById(
                "phone"
            )
            .value
            .trim(),


        preferredDate:

            document
            .getElementById(
                "preferredDate"
            )
            .value,


        babyAge:

            document.querySelector(

                'input[name="babyAge"]:checked'

            ).value,


        category:

            document.querySelector(

                'input[name="category"]:checked'

            ).value

    };


    localStorage.setItem(

        "customer",

        JSON.stringify(

            customer

        )

    );


    window.location.href =

        "themes.html";

}



/* -----------------------------
   PREVENT PAST DATE
------------------------------*/

const today =

    new Date()

    .toISOString()

    .split("T")[0];


document
.getElementById(
    "preferredDate"
)
.min =
today;



/* -----------------------------
   PHONE NUMBER
------------------------------*/

document
.getElementById(
    "phone"
)
.addEventListener(

    "input",

    function(){

        this.value =

            this.value

            .replace(

                /[^0-9]/g,

                ""

            )

            .slice(

                0,

                10

            );

    }

);



/* -----------------------------
   NAME
------------------------------*/

document
.getElementById(
    "customerName"
)
.addEventListener(

    "input",

    function(){

        this.value =

            this.value

            .replace(

                /[^a-zA-Z ]/g,

                ""

            );

    }

);