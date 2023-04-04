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
const sectionNb_Questions = document.querySelector('#Nb_Questions')
const BtnCommencer = document.querySelector('#BtnCommencer')
const sectionQuestions = document.querySelector('#Questions')
let Theme
let NbDeQuestion

const displayThemes = (themes) => {

    const div = document.querySelector('#Choisir')


    themes.forEach(theme => {
        const p_theme = document.createElement('button');
        p_theme.textContent = theme.libelle
        p_theme.classList.add("shadowfort", "btn", "btn-primary", "m-3", "rounded-pill", "bg-gradient", "border", "border-primary", "text-white", "opacity-75", "col-10", 'col-lg-4', 'col-xl-2')
        div.appendChild(p_theme)
        p_theme.addEventListener("click", function () {
            Theme = this.textContent;
            if (Theme) {
                sectionNb_Questions.classList.remove('displayNone')
                sectionChoisirTheme.classList.add('displayNone')
            }
        })
    })
}

BtnCommencer.addEventListener("click", function (){
    NbDeQuestion = document.getElementById('NombreInput').value
    if (NbDeQuestion) {
        sectionNb_Questions.classList.add('displayNone')
        sectionQuestions.classList.remove('displayNone')
    }
    if (NbDeQuestion && Theme) {

        const getQuestions = ()=>{
            return  fetch('http://127.0.0.1:8000/api/themes/'+Theme+'/'+NbDeQuestion)//fetch renvoie une promesse (resultat en json ou une erreur

                .then( response =>{
                    if (response.ok){
                        return response.json()
                    }
                    throw new Error('une erreur est survenu, vérifiez votre endpoint')
                })


        }
// je vais rendre disponible cette fonction dans d'autres modules

        getQuestions()
            .then(result=>displayQuestions(result))
            .catch(error=> console.log(error))



        const displayQuestions = (questions) => {

            let i = 0
//mettre ici pour afficher la question et les reponses et regarder si la reponse est bon.
            console.log(questions[i])




        }


    }
})


