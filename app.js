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
    .then(result=>console.log(result))
    .catch(error=> console.log(error))