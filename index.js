// fs = require('fs');
// const path = require('path');

// const filePathings = [process.argv[2],process.argv[3]];

// if(filePathings){
//     console.log()
//     // filePathings.forEach(filePathing => {

//     //     const ext = path.extname(filePathing);
//     //     console.log("path :",ext);

//     //     fs.readFile(filePathing, 'utf8' , (err, data) => {
//     //         if (err) {
//     //           console.error(err)
//     //           return
//     //         }
//     //         console.log(data)
//     //     })
//     // }) 
// }

jsonObj = {
    languague : "Aceita qualquer palavra que termina em 1",
    alphabet : ["0","1"],
    states : ["q0","q1"],
    q0:{
        start : true,
        end : false,
        path : ["q0","q1"] //path está relacionado com alfabeto
    },
    q1:{
        start : false,
        end : true,
        path : ["q0","q1"]
    }
  }
  
// jsonObj = {
//     languague : "Aceita qualquer palavra com numero par de 1",
//     alphabet : ["0","1"],
//     states : ["even","odd"],
//     even:{
//         start : true,
//         end : true,
//         path : ["even","odd"] //path está relacionado com alfabeto
//     },
//     odd:{
//         start : false,
//         end : false,
//         path : ["odd","even"]
//     }
//   }

  txtArray = [[0,0,0,0],[0,0,1,0],[0,1,1,1],[0,1,0,0],[1,1,1,1]];
  
  processWord(jsonObj,txtArray)
  
  function processWord(jsonObj,txtArray){
    const jsonStates = verifyJsonStates(jsonObj);
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
        console.log("isValid :",isValid)
    });
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