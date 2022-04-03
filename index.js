fs = require('fs');
const path = require('path');
const filePathings = [process.argv[2],process.argv[3]];

main(filePathings);


function main(filePathings){
    if(filePathings){
        const jsonObj =  readFile(filePathings[0]);
        const txtArray =  readFile(filePathings[1]);

        return processWord(jsonObj,txtArray)
    }

    console.log("sem caminhos");
}

function readFile(filePathing){
    const ext = path.extname(filePathing);
    try{
        const data = fs.readFileSync(filePathing, 'utf8')
        if(ext == ".json")return JSON.parse(data);
        if(ext == ".txt")return formatTxtArray( Array.from(data));
    }catch(err){
        console.error(err);
    }
}

function formatTxtArray(txtArray){
    let txtArrayFormatted = [];
    let line = [];
    let j = 0;
    for(let i = 0;i <= txtArray.length - 1;i++){
        if(txtArray[i] == "\r"){
            txtArrayFormatted.push(line);
            line = [];
            i += 2;
            j = 0;
        }
        
        line[j] = txtArray[i];
        j++;

        if( txtArray.length - 1  == i)txtArrayFormatted.push(line)
    }

    return txtArrayFormatted;
}

  function processWord(jsonObj,txtArray){
    const jsonStates = verifyJsonStates(jsonObj);
    let afdAnswers = [];
    txtArray.forEach(word => {
        let currentState = jsonStates.startState[0];
        const wordLength = word.length;
        let isValid;
        word.forEach((character,characterPositionRelatedToWord) => {
            if(!jsonObj.alphabet.find(alphabetLetter => alphabetLetter == character))console.log("letra não existe no alfabeto");//retornar um erro dizendo que a palavra não é valida
            const characterPositionRelatedToAlphabet = jsonObj.alphabet.indexOf(character.toString());
  
            currentState = changeCurrentState(characterPositionRelatedToAlphabet,currentState,jsonStates);
            
            if(characterPositionRelatedToWord == wordLength - 1)isValid = currentState.end == true;
        })
        afdAnswers.push({passed : isValid,word : word});
    });
    printFinalValue(jsonObj.language,afdAnswers);
  }
  
  function verifyJsonStates(jsonObj){
    let startState = [];
    const endState = [];
    const intermediaryStateCase = [];
    for(var i = 0;i < jsonObj.states.length;i++){
        const stateKey = jsonObj.states[i];
        if(jsonObj[stateKey].start == true)startState.push({state :stateKey,...jsonObj[stateKey]});
        if(jsonObj[stateKey].end == true)endState.push({state :stateKey,...jsonObj[stateKey]});
        if(jsonObj[stateKey].end == false && jsonObj[stateKey].end == false)intermediaryStateCase.push({state :stateKey,...jsonObj[stateKey]})
    }
    
    return {startState,endState,intermediaryStateCase}
  }
  
  function changeCurrentState(wordPosition,currentState,jsonStates){
    let newState;
    const stateToGo = currentState.path[wordPosition];
    Object.values(jsonStates).map(jsonState => {
        if(jsonState.find(value => value.state == stateToGo)){
            newState = jsonState.find(value => value.state == stateToGo);
        }
    });
    return newState;
  }

  function printFinalValue(language,afdAnswers){
      console.log("\n------------------------------------------------ \n")
    console.log(language+"\n");
    afdAnswers.forEach(afdAnswer => {
        console.log(`${afdAnswer.word} -> ${afdAnswer.passed ? 'Passed' : 'Rejected'} \n`);
    })
  }