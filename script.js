
const button = document.getElementById("button");
const output = document.getElementById("output");
const input = document.getElementById("input");
const form = document.getElementById("form");


const populate = async (word) => {
    myStr = "";
    url += `${word}`;
    let response = await fetch(url);
    let rJson = await response.json();
    myStr += `<p>${rJson[0].meanings[0].definitions[0].definition}</p>`;
    output.innerHTML = myStr;
}


button.addEventListener('click', (e) => {
    e.preventDefault();
    const word = document.querySelector("input[name='input']").value;
   
    if(input.value.length==0){
        alert("pls enter word to search");
    }
    else{
    populate(word);
    url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
    output.innerHTML = "";
    form.reset()
    }
    
    
})

