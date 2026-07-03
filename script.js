const babyAge =
    document.querySelectorAll(
        'input[name="babyAge"]'
    );

const categorySection =
    document.getElementById(
        'categorySection'
    );

babyAge.forEach(function(age){

    age.addEventListener(
        'change',
        function(){

            categorySection.style.display =
                'block';

            const outdoor =
                document.querySelector(
                    '.outdoor'
                );

            const mix =
                document.querySelector(
                    '.mix'
                );

            if(
                this.value ===
                    'newborn'
                ||
                this.value ===
                    '3to6'
            ){

                outdoor.style.display =
                    'none';

                mix.style.display =
                    'none';

            }
            else{

                outdoor.style.display =
                    'block';

                mix.style.display =
                    'block';

            }

            document
                .querySelectorAll(
                    'input[name="category"]'
                )
                .forEach(function(x){

                    x.checked = false;

                });

        }

    );

});

function continueToThemes(){

    const name =
        document
            .getElementById(
                'customerName'
            )
            .value
            .trim();

    const phone =
        document
            .getElementById(
                'phone'
            )
            .value
            .trim();

    const date =
        document
            .getElementById(
                'preferredDate'
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
        !name ||
        !phone ||
        !date ||
        !age ||
        !category
    ){

        alert(
            'Please fill all mandatory fields.'
        );

        return;
    }

    const customer = {

        name:name,
        phone:phone,
        preferredDate:date,
        babyAge:age.value,
        category:category.value

    };

    localStorage.setItem(
        'customer',
        JSON.stringify(customer)
    );

    window.location =
        'themes.html';
}