let currentPage = 1;
let totalPages = 0;
let pageCounter = document.querySelector(`p`)
keyPress(13)
keyPress(37)
keyPress(39)

document.querySelector(`button.search`).addEventListener(`click`, async () =>{
    //hämta bilder
    let images = await getImages();
    //uppdatera UI
    showButtons()
    updateUI(images);
    pages()


})

document.querySelector(`img.logo`).addEventListener(`click`, () => {
    let main = document.querySelector(`main`)
    main.innerHTML=``
    document.querySelector(`input`).value = ``
    pageCounter.innerHTML=""
    currentPage = 1
    totalPages = 0
    showButtons()
})

document.querySelector(`.overlay`).addEventListener(`click`, () => {

    //Tömma overlay
    document.querySelector(`.overlay`).innerHTML = ``;

    //ändrar overlay till display: none;
    document.querySelector(`.overlay`).classList.add(`hide`);
    document.querySelector(`.overlay`).classList.remove(`show`);

})

document.querySelector(`button.next`).addEventListener(`click`, async () => {
    
    if(currentPage <= totalPages){
    currentPage++;
    let images = await getImages();
    pages()
    showButtons()
    updateUI(images);
    }
});

async function keyPress(key){
    if(key == 13){
        document.querySelector(`input`).addEventListener(`keyup`, async () =>{
            if(event.keyCode == 13){
            //hämta bilder
            let images = await getImages();
            //uppdatera UI
            pages()
            showButtons()
            updateUI(images);
        }    
        })
    }
    if(key == 39){
        window.addEventListener(`keyup`, async () => {

            if(event.keyCode == 39){
            if(currentPage <= totalPages){
            currentPage++;
            let images = await getImages();
            pages()
            showButtons()
            updateUI(images);
                }
        }}
        );
    }
    if(key == 37){
        window.addEventListener(`keyup`, async () => {

            if(event.keyCode == 37){
            
            if(currentPage <= totalPages){
            currentPage--;
            let images = await getImages();
            pages()
            showButtons()
            updateUI(images);
                }
        }}
        );
    }

}







document.querySelector(`button.previous`).addEventListener(`click`, async () => {
    if(currentPage >= 1){
    currentPage--;
    let images = await getImages();
    showButtons()
    pages()
    updateUI(images);
    }
});

function showButtons(){
    if(currentPage <= totalPages){
        document.querySelector(`button.next`).style.visibility=`visible`
    }
    else{
        document.querySelector(`button.next`).style.visibility=`hidden`
    }
    if(currentPage >= 2){
        document.querySelector(`button.previous`).style.visibility=`visible`
    }
    else{
        document.querySelector(`button.previous`).style.visibility=`hidden`
    }
}

function pages(){
    pageCounter.innerHTML=``
    pageCounter.innerHTML= `Page ${currentPage} of ${totalPages}`
}

async function getImages(){
    const apiKey = `2af54aca22ccb9c902078adc64b47907`;
    let method = `flickr.photos.search`;
    let search = document.querySelector(`input`).value; 
    const baseUrl = `https://api.flickr.com/services/rest`;
    let perPage = document.querySelector(`#perpage`).value
    let content = document.querySelector(`#content`).value

    let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${search}&page=${currentPage}&content_type=${content}&per_page=${perPage}&format=json&nojsoncallback=1`

    try {
        let resp = await fetch(url);
        let data = await resp.json();
        totalPages = data.photos.pages;

        return await data;
        
    }
        catch(err){
            console.error(err)
        }

};

function imgUrl(img, size){
    let imgSize = `thumb`
    if(size == `thumb`) {imgSize = `q`}
    if(size == `large`) {imgSize = `b`}
    

    let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`


    return url;
}

function updateUI(data){

    let main = document.querySelector(`main`)
    main.innerHTML = ``
        
            data.photos.photo.forEach(img => {
                if(img.farm !== 0){

                let el = document.createElement(`img`)
                el.setAttribute(`src`, imgUrl(img, `thumb`));
                el.setAttribute(`alt`, img.title);

                    el.addEventListener(`click`, () => {
                        //Create img-element
                        let lightbox = document.createElement(`img`);
                
                        //Lägger till src på img-elementet
                        lightbox.setAttribute(`src`, imgUrl(img, `large`));
                        
                
                        //Lägger till img i .overlay
                        document.querySelector(`.overlay`).appendChild(lightbox);
                
                
                        //Lägger till class show på .overlay
                        document.querySelector(`.overlay`).classList.add(`show`)
                        document.querySelector(`.overlay`).classList.remove(`hide`);
                
                    })

                main.appendChild(el)

                }
       
});
} 





