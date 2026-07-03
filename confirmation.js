const booking =

    JSON.parse(

        localStorage
        .getItem(
            "booking"
        )
    );


document
    .getElementById(
        "total"
    )
    .innerHTML =
    booking.total;


let html =

`
<p>
<b>Name:</b>
${booking.customer.name}
</p>

<p>
<b>Phone:</b>
${booking.customer.phone}
</p>

<p>
<b>Session:</b>
${booking.customer.category}
</p>

<p>
<b>Date:</b>
${booking.customer.preferredDate}
</p>

<p>
<b>Themes:</b>
</p>
<ul>
`;


booking.themes
.forEach(

    t => {

        html +=

        `<li>${t}</li>`;

    }
);


html +=

`
</ul>
`;


document
    .getElementById(
        "summary"
    )
    .innerHTML =
    html;


document
    .getElementById(
        "whatsapp"
    )
    .onclick =

function(){

    const message =

`
Hello Avyuktaphotography

Name:
${booking.customer.name}

Phone:
${booking.customer.phone}

Session:
${booking.customer.category}

Date:
${booking.customer.preferredDate}

Selected Themes:
${booking.themes.join(", ")}

Package:
₹${booking.total}
`;

    window.open(

        "https://wa.me/917406109829?text="

        +

        encodeURIComponent(
            message
        )

    );
};