//select box
const select = document.querySelectorAll('select');
//translate button 
let translateButton = document.querySelector('button')
//input fromTxt
let fromTxt = document.querySelectorAll('textarea')[0]
//input toTxt
let toTxt = document.querySelectorAll('textarea')[1]
//exchange button
let exchange = document.getElementById('exchange')
//copy button
let icons = document.querySelectorAll('span')


select.forEach((x, id) => {
    //Loop through the keys in countries
    for (const key in countries) {
        let selected;
        if (key == "en-GB" && id == 0) {
            selected = 'selected'
        } else if (key == "ar-SA" && id == 1) {
            selected = 'selected'
        }
        //insert options inside select box
        let option = `  <option value="${key}" ${selected}>${countries[key]}</option>`
        x.insertAdjacentHTML('beforeend', option)
    }
})
//add event to button
translateButton.addEventListener('click', () => {
    let text = fromTxt.value;
    translateFrom = select[0].value,  //selected option  From
        translateTo = select[1].value;  //selected option  To
    toTxt.setAttribute('placeholder', 'Translating...')
    //fetch api
    let api = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(api).then(res => res.json()).then(data => {
        toTxt.value = data.responseData.translatedText;
        toTxt.setAttribute('placeholder', 'Translating...')
    })
})

//exchange between select options and input values
exchange.onclick = () => {
    let input = fromTxt.value;
    fromTxt.value = toTxt.value;
    toTxt.value = input;

    let option = select[0].value;
    select[0].value = select[1].value;
    select[1].value = option;
}

//loop through all the icons
icons.forEach(x => {
    //give the icons a event
    x.addEventListener('click', ({ target }) => {
        let voice;
        if (target.id == 'from-speech') {
            voice = new SpeechSynthesisUtterance(fromTxt.value)
            voice.lang = select[0].value;
        } else if (target.id == 'from-copy') {
            navigator.clipboard.writeText(fromTxt.value)
        } else if (target.id == 'to-speech') {
            voice = new SpeechSynthesisUtterance(toTxt.value)
            voice.lang = select[1].value;
        } else if (target.id == 'to-copy') {
            navigator.clipboard.writeText(toTxt.value)
        }
        speechSynthesis.speak(voice)
    })
})