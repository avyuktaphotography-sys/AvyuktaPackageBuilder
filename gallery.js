/* ===========================================
   Avyuktaphotography Gallery
   =========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const images = document.querySelectorAll(".gallery img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    let currentIndex = 0;

    // Open Image
    images.forEach((img, index) => {

        img.addEventListener("click", function () {

            currentIndex = index;

            lightbox.style.display = "flex";

            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;

            document.body.style.overflow = "hidden";

        });

    });

    // Close Button
    closeBtn.addEventListener("click", closeLightbox);

    // Click Outside Image
    lightbox.addEventListener("click", function (e) {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

    function closeLightbox() {

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";

    }

    // Keyboard Support
    document.addEventListener("keydown", function (e) {

        if (lightbox.style.display !== "flex") return;

        if (e.key === "Escape") {

            closeLightbox();

        }

        if (e.key === "ArrowRight") {

            nextImage();

        }

        if (e.key === "ArrowLeft") {

            previousImage();

        }

    });

    function nextImage() {

        currentIndex++;

        if (currentIndex >= images.length) {

            currentIndex = 0;

        }

        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;

    }

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = images.length - 1;

        }

        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;

    }

});