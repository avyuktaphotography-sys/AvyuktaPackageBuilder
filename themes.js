const customer =
    JSON.parse(
        localStorage.getItem(
            "customer"
        )
    );

document
.getElementById(
    "customerInfo"
)
.innerHTML =

`
<b>Name :</b>
${customer.name}

<br><br>

<b>Phone :</b>
${customer.phone}

<br><br>

<b>Session :</b>
${customer.category}

<br><br>

<b>Date :</b>
${customer.preferredDate}
`;

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

const themes = themeData;

const container =
    document.getElementById(
        "themeContainer"
    );

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
"images/${folder}/${theme}.jpeg">

<div class="cardBody">

<h3>
${theme}
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

let selected = [];

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

            if(
                e.target
                .checked
            ){

                selected
                .push(
                    e.target
                    .value
                );
            }
            else{

                selected =
                    selected
                    .filter(

                        x=>

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

function updateCart(){

    let base =

        customer
        .category
        ===
        "studio"

        ?

        3000

        :

        5000;

    let additional =

        customer
        .category
        ===
        "outdoor"

        ||

        customer
        .category
        ===
        "mix"

        ?

        1500

        :

        1200;

    let total =
        base;

    let html =

`
Base Package :
₹${base}

<br><br>

Selected Themes :
${selected.length}
`;

    if(
        selected.length
        >
        1
    ){

        const extra =
            selected
            .length
            -1;

        total +=
            extra
            *
            additional;

        html +=

`
<br><br>

Additional Themes :
${extra}

<br>

Extra Cost :
₹${extra*additional}
`;
    }

    document
    .getElementById(
        "cartDetails"
    )
    .innerHTML =
        html;

    document
    .getElementById(
        "total"
    )
    .innerHTML =
        total;
}

updateCart();