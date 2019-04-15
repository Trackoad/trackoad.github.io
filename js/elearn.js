const ByPass = {
  nextButtonName:"Next Button",
  terminateButtonName:"Terminer",
  responseText:"",
  output:[{
    name:"survey_1",
    questions:[{
      name:"TODO",
      responses:[
        "philipe"
      ]
    }]
  },{
    name:"survey_2",
    questions:[{
      name:"Cherubin"
    }]
  }],
  currentSurvey:undefined
};

ByPass.getQuestion = () => {
  return "TODO";
};

ByPass.forceClickButton = (textButton) => {
  let buttons = document.getElementsByTagName("input");
  for(let button of buttons){
    if(button.value.includes(textButton)){
      button.click();
      return 1;
    }
  }
};

ByPass.checkAllResponses = (type = "checkbox") => {
  let inputs = document.getElementsByTagName("input");
  for(let input of inputs) {
      if(input.type == type) {
          input.checked = true;
          return;
      }
  }
  if(type !== "radio")
    ByPass.checkAllResponses("radio");
};

ByPass.getResponses = () => {
  ByPass.currentSurvey = {
    name:"Inconnu",
    questions:[]
  };
  let i=0;
  while(ByPass.forceClickButton(ByPass.nextButtonName) && i < 42){
    ByPass.checkAllResponses();

    i++;
  }
};

ByPass.isGoodSurvey = (survey, question) => {
  if(!survey.questions){
    return;
  }
  for(let questionSurvey of survey.questions){
    if(questionSurvey.name.includes(question)){
      return true;
    }
  }
};

ByPass.findQuestionAtSurvey = (currentQuestion) => {
  for(let question of ByPass.currentSurvey.questions){
    if(question.name.includes(currentQuestion)){
      return question.responses;
    }
  }
};

ByPass.responseAtTheQuestion = (currentQuestion = ByPass.getQuestion()) => {
  let responses = ByPass.findQuestionAtSurvey(currentQuestion);
  if(!responses){
    return;
  }
  for(let response of responses){
    console.log(response, "TODO checkbox");
  }
};

ByPass.getSurvey = () => {
  let question = ByPass.getQuestion();
  for(let survey of ByPass.output){
    if(ByPass.isGoodSurvey(survey, question)){
      ByPass.currentSurvey = survey;
      return;
    }
  }
}

ByPass.doResponse = () => {
  ByPass.getSurvey();
  if(!ByPass.currentSurvey){
    console.log("didn't find survey");
    return;
  }
  let i=0;
  while(ByPass.forceClickButton(ByPass.nextButtonName) && i < 42){
    ByPass.responseAtTheQuestion(ByPass.getQuestion());
    i++;
  }
};
