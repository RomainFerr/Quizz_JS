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
//const sectionNext = document.querySelector('#next')
const sectionResultat = document.querySelector('#tableau')

let Theme
let NbDeQuestion
let reponsesArray = []
let reponses

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
    } else if(NbDeQuestion < 0){
        NbDeQuestion =NbDeQuestion*(-1)
        sectionNb_Questions.classList.add('displayNone')
        sectionQuestions.classList.remove('displayNone')
    }
    else {
        NbDeQuestion=null
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
            let bonneReponses = 0;
            let i = 0;
            let okReponse;
            let nbQuestionsMax = questions.length;

            const displayNextQuestion = () => {
                if (i === nbQuestionsMax) {
                    NbDeQuestion=questions.length;
                    displayResult(bonneReponses);
                } else {

                    const questionTitre = document.createElement('h1');
                    questionTitre.textContent = questions[i].intitule;
                    questionTitre.classList.add(
                        'border-d',
                        'rounded-pill',
                        'd-flex',
                        'justify-content-center',
                        'text-primary',
                        'mb-4'
                    );
                    sectionQuestionsIntitule.appendChild(questionTitre);
                    shuffle(questions[i].reponses)
                    questions[i].reponses.forEach((reponse) => {
                        okReponse = questions[i].bonnereponse;
                        const p_reponse = document.createElement('button');
                        p_reponse.textContent = reponse;
                        p_reponse.classList.add(
                            'shadowfort',
                            'btn',
                            'btn-primary',
                            'm-3',
                            'rounded-pill',
                            'bg-gradient',
                            'border',
                            'border-primary',
                            'text-white',
                            'opacity-75',
                            'col-10',
                            'col-lg-4',
                            'col-xl-2'
                        );
                        sectionReponses.appendChild(p_reponse);


                        p_reponse.addEventListener('click', function () {



                            reponseDonne = this.textContent;

                             reponses = `A la question : ${questions[i].intitule} Vous avez dit : ${reponseDonne}, La bonne réponse était : ${questions[i].bonnereponse} `
                            reponsesArray.push(reponses)

                            if (reponseDonne === questions[i].bonnereponse) {
                                bonneReponses++;
                            }
                            i++;
                            sectionQuestionsIntitule.innerHTML = '';
                            sectionReponses.innerHTML = '';
                            if (i < NbDeQuestion) {
                                displayNextQuestion();

                            } else {
                                displayResult(bonneReponses);

                            }





                        });
                    }
                    );

                }

            };

            displayNextQuestion();

        };
    }
})

const displayResult = (bonneReponses) =>{

    // afficher le score final ici

    //sectionNext.classList.add('displayNone')
    sectionResultat.classList.remove('displayNone')
    const result = document.createElement('h1');
    result.textContent = `Vous avez ${bonneReponses} bonne(s) réponse(s) sur ${NbDeQuestion} questions`
    result.classList.add("border-d", "rounded-pill", "d-flex", "justify-content-center", "text-primary", "mb-4")
    sectionQuestionsIntitule.appendChild(result)
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Recommencer ?';
    refreshButton.classList.add('btn', 'rounded-pill', 'mt-3', 'mx-auto', 'd-flex', 'justify-content-center','shadowfort','btn-primary','bg-gradient', 'text-white','grosBtn');
    refreshButton.addEventListener('click', () => {
        location.reload();
    });

    sectionQuestionsIntitule.appendChild(refreshButton);
    reponsesArray.forEach( repArray =>{

    const divRep = document.createElement('div')
        divRep.classList.add('col-9','d-flex', 'mt-3','alert','alert-primary')
        divRep.textContent = repArray
        sectionResultat.appendChild(divRep);

    } )

}







function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
