const accessKey = "IGaj44_P6UK3Be5tLlYBD27zI-9Qe4Ij_N5axLOqczI";

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const gallery = document.getElementById("images");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", searchImages);

searchInput.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        searchImages();

    }

});

async function searchImages(){

    const query = searchInput.value.trim();

    if(query===""){

        alert("Please enter image name");

        return;

    }

    gallery.innerHTML="";

    loading.style.display="block";

    try{

        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12`,{

            headers:{

                Authorization:`Client-ID ${accessKey}`

            }

        });

        if(!response.ok){

            throw new Error("Failed to fetch");

        }

        const data = await response.json();

        loading.style.display="none";

        if(data.results.length===0){

            gallery.innerHTML=`<h2 class="no-data">No Images Found 😔</h2>`;

            return;

        }

        data.results.forEach(photo=>{

            const card=document.createElement("div");

            card.className="card";

            card.innerHTML=`

                <img src="${photo.urls.small}" alt="${photo.alt_description || "Image"}">

                <div class="info">

                    <h3>📸 ${photo.user.name}</h3>

                    <p>${photo.alt_description || "Beautiful Image from Unsplash"}</p>

                    <div class="buttons">

                        <a href="${photo.links.html}" target="_blank" class="view-btn">

                            View

                        </a>

                        <a href="${photo.urls.full}" target="_blank" class="download-btn">

                            Download

                        </a>

                    </div>

                </div>

            `;

            gallery.appendChild(card);

        });

    }

    catch(error){

        loading.style.display="none";

        gallery.innerHTML=`<h2 class="no-data">Something Went Wrong 😔</h2>`;

        console.log(error);

    }

}