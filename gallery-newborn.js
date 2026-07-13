const gallery=document.getElementById("galleryContainer");

newbornImages.forEach(item=>{

gallery.innerHTML+=`

<div class="card">

<img
src="images/newborngallery/${item.image}"
alt="${item.alt}"
loading="lazy">

</div>

`;

});