/*==========================================
AVYUKTA PHOTOGRAPHY
Homepage Script
==========================================*/

function comingSoon() {

    const phone = "917406109829";

    const message =
`Hello Team,

I would like to enquire about a photography session.

Could you please share your package details and availability?

Thank you.`;

    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );

}


/*==========================================
SMOOTH SCROLL FOR MENU
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==========================================
SCROLL ANIMATION
==========================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});


document.querySelectorAll(

".statCard,.reviewCard,.galleryGrid a,.faqItem"

).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


/*==========================================
IMAGE HOVER EFFECT
==========================================*/

document.querySelectorAll(".galleryGrid a").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});


/*==========================================
COUNTER ANIMATION
==========================================*/

const counters = document.querySelectorAll(".statCard h3");

const speed = 40;

const counterObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = parseInt(counter.innerText);

let count = 0;

const update = ()=>{

if(count < target){

count += Math.ceil(target/speed);

counter.innerText = count + "+";

requestAnimationFrame(update);

}
else{

counter.innerText = target + "+";

}

};

update();

counterObserver.unobserve(counter);

}

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*==========================================
BACK TO TOP
==========================================*/

const topButton = document.createElement("div");

topButton.innerHTML="⬆";

topButton.className="topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.classList.add("topShow");

}
else{

topButton.classList.remove("topShow");

}

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};