const getThemes = () => {
    return fetch('http://127.0.0.1:8000/api/themes')//fetch renvoie une promesse (resultat en json ou une erreur

        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('une erreur est survenu, vérifiez votre endpoint')
        })


}
// je vais rendre disponible cette fonction dans d'autres modules

getThemes()
    .then(result => displayThemes(result))
    .catch(error => console.log(error))

const sectionChoisirTheme = document.querySelector('#ChoisirLeTheme')
const sectionNb_Questions = document.querySelector('#Nb_Questions')
const BtnCommencer = document.querySelector('#BtnCommencer')
const sectionQuestions = document.querySelector('#Questions')
const sectionQuestionsIntitule = document.querySelector('#QuestionsIntitule')
const sectionReponses = document.querySelector('#Reponses')
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

BtnCommencer.addEventListener("click", function () {
    NbDeQuestion = document.getElementById('NombreInput').value
    if (NbDeQuestion > 0) {
        sectionNb_Questions.classList.add('displayNone')
        sectionQuestions.classList.remove('displayNone')
    } else {
        sectionNb_Questions.classList.add('displayNone')
        sectionChoisirTheme.classList.remove('displayNone')
    }
    if (NbDeQuestion && Theme) {

        const getQuestions = () => {
            return fetch('http://127.0.0.1:8000/api/themes/' + Theme + '/' + NbDeQuestion)//fetch renvoie une promesse (resultat en json ou une erreur

                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('une erreur est survenu, vérifiez votre endpoint')
                })


        }
// je vais rendre disponible cette fonction dans d'autres modules

        getQuestions()
            .then(result => displayQuestions(result))
            .catch(error => console.log(error))


        const displayQuestions = (questions) => {

            let bonneReponses = 0
            let i = 0
            let okReponse




            const questionTitre = document.createElement('h1');
            questionTitre.textContent = questions[i].intitule
            questionTitre.classList.add("border-d", "rounded-pill", "d-flex", "justify-content-center", "text-primary", "mb-4")
            sectionQuestionsIntitule.appendChild(questionTitre)

            questions[i].reponses.forEach(
                reponse => {
                    okReponse = questions[i].bonnereponse
                    const p_reponse = document.createElement('button');
                    p_reponse.textContent = reponse
                    p_reponse.classList.add("shadowfort", "btn", "btn-primary", "m-3", "rounded-pill", "bg-gradient", "border", "border-primary", "text-white", "opacity-75", "col-10", 'col-lg-4', 'col-xl-2')
                    sectionReponses.appendChild(p_reponse)
                    p_reponse.addEventListener("click", function () {
                        reponseDonne = this.textContent;

                        if (reponseDonne === questions[i].bonnereponse) {
                            bonneReponses = bonneReponses + 1
                        }
                    })
                }
            )
        }


    }
})


