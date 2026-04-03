document.addEventListener('load', () => {

    let pet = "";
    pet.style.backgroundColor = "red";
    pet.width = 100;
    pet.height = 100;
    pet.style.position = "absolute";

    let petSpeed = 1;

    document.appendChild(pet);
    
    function startFollow(pet) {
        pet.top += petSpeed;
        pet.right += petSpeed;
    }
   
    requestAnimationFrame(startFollow());
})