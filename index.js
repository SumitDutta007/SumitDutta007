

console.log("Hello")



// *******  Toggle Navbar  ********* 

const toggle = document.querySelector('.toggle');
const toggleText = document.querySelector('.toggleText');
const links = document.querySelectorAll('.link');
const navbarToggle = document.querySelector('.navbarToggle');

const getState = ()=>{
    if(toggleText.style.display === "flex"){
        return false;
    }
    else return true;
}

toggle.addEventListener('click',()=>{
    if(getState()){
        toggleText.style.display = "flex";
        navbarToggle.style.boxShadow = "5px 5px 10px var(--togglShadow)";
        navbarToggle.style.background ="var(--navbarBackgroundColor)";

        links.forEach((e)=>{
            e.addEventListener('click',()=>{
            toggleText.style.display = "none";
            navbarToggle.style.boxShadow = "none";
            navbarToggle.style.background ="none";
        })})
    }
    else{
        navbarToggle.style.boxShadow = "none";
        navbarToggle.style.background ="none";
        toggleText.style.display = "none";
    }
})
// *******************************************

// ********  Color Tool *************

const colorTool = document.querySelector('.colorTool');
const form = document.querySelector('.colorPallete');

//checks current display of colorPallete - (flex/none)
const checkDisplay = ()=>{
    if(form.style.display === "flex") return false;
    else return true;
}

colorTool.addEventListener('click',()=>{
    if(checkDisplay()) form.style.display = "flex";
    else form.style.display = "none";
})

// ************* Scroll Reveal **************
ScrollReveal({
    reset : true,
    delay : 150,
    duration : 1500,
    distance : '60px'
});

ScrollReveal().reveal('.aboutMe , .projects-heading , .contact-heading',{origin:'top' , delay:50});
ScrollReveal().reveal('.right-context, .Tic-Tac-Toe, .form',{origin:'right'});
ScrollReveal().reveal('.portfolio , .bars ',{origin:'bottom'});
ScrollReveal().reveal('.debugIt ,.footer',{origin:'left'});
ScrollReveal().reveal('.buttons',{origin:'top'});
ScrollReveal().reveal('.arrow',{origin:'top'});

// ******************** Music button functionality *******************//

const music = document.querySelector('.music')
const search = document.querySelector('.btn-group')
const artistButton = document.querySelector('.dropdown-toggle-split')
const artistInput = document.querySelector('#artist')
const dropdown_menu = document.querySelector('.dropdown-menu')

music.addEventListener('click',()=>{
    if(search.style.display === "none"){
        search.style.display = "block"
    }
    else search.style.display = "none"
})

// ************** SPOTIFY API ************************* //

const clientId = 'f315670f63f342e1841d0d71bf8e3998';
const clientSecret = '8c8df760cc584d6ab3c445efddbbe337';

//GET TOKEN
const getToken = async()=>{
    const result = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers:{
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:'grant_type=client_credentials'
    });
    const data = await result.json();
    console.log(data.access_token)
    return data.access_token;
}

//GET ARTIST ID
let country;
const getArtist = async(token,artistName)=>{
    const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,{
        method:'GET',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await result.json();
    return data.artists.items[0].id;
}

//GET TRACKS
let songs=[]
const getTrack = async(token,artistId)=>{
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=ES`,{
        method:'GET',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await result.json();
    data.tracks.forEach((e)=>{
        songs[e.album.name]=e.album.external_urls.spotify;
    })
}

let artistName = ""

artistButton.addEventListener('click',()=>{
        
    artistName = artistInput.value
    console.log(artistName)
    const getDetails = async()=>{
        let token = await getToken()
        
        let artistToken = await getArtist(token,artistName)
        await getTrack(token , artistToken)

        dropdown_menu.innerHTML=""
        for(let key in songs){
            dropdown_menu.innerHTML += `<li><a class="dropdown-item" href="${songs[key]}">${key}</a></li>
            <li><hr class="dropdown-divider"></li>
            `
        }
    }
    getDetails();
    for(let keys in songs){
        delete songs[keys]
    }
        
})