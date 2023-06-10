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