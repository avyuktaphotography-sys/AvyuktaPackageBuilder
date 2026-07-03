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
        customer.category === "studio"
        ? 3000
        : 5000;

    let additional =
        customer.category === "studio"
        ? 1500
        : 2000;

    let includedThemes = 2;

    let total = base;

    let html = `

        Base Package :
        ₹${base}

        <br><br>

        Included Themes :
        ${includedThemes}

        <br><br>

        Selected Themes :
        ${selected.length}

    `;

    if(selected.length > includedThemes){

        const extra =
            selected.length
            - includedThemes;

        const extraCost =
            extra
            * additional;

        total += extraCost;

        html += `

            <br><br>

            Additional Themes :
            ${extra}

            <br><br>

            Additional Cost :
            ₹${extraCost}

        `;
    }

    html += `

        <br><br>

        Family Pictures :
        2 Included

        <br><br>

        Edited Photos :
        5 Included

        <br><br>

        Soft Copies :
        Included

    `;

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