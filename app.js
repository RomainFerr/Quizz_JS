const getThemes = ()=>{
    return  fetch('http://127.0.0.1:8000/api/themes')//fetch renvoie une promesse (resultat en json ou une erreur

        .then( response =>{
            if (response.ok){
                return response.json()
            }
            throw new Error('une erreur est survenu, vérifiez votre endpoint')
        })


}
// je vais rendre disponible cette fonction dans d'autres modules

getThemes()
    .then(result=>displayThemes(result))
    .catch(error=> console.log(error))

const sectionChoisirTheme = document.querySelector('#ChoisirLeTheme')

const displayThemes = (themes) =>{

    const div = document.querySelector('#Choisir')


    themes.forEach(theme=>{

        const p_theme = document.createElement('p');
        p_theme.textContent = theme.libelle
        p_theme.classList.add("shadowfort","btn","btn-primary","m-3","rounded-pill","bg-gradient","border", "border-primary","text-white","opacity-75","col-10",'col-lg-4','col-xl-2')
        p_theme.addEventListener()
        div.appendChild(p_theme)
    })
}


/*
document.onclick = function(event) {
    if (event===undefined) event= window.event;

    var target= 'target' in event? event.innerText : event.srcElement;
    console.log(target)
}
*/

