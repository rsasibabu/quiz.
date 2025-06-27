const startScreen = document.getElementById("startscreen");
const quizScreen = document.getElementById("quizscreen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questions = document.getElementById("questions");
const options = document.getElementById("options");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const resultScoredSpan = document.getElementById("resultscored");
const totalScoreSpan = document.getElementById("totalscore");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress-bar");

const quizQuestions=[
    {
    question: "Which is the oldest known civilization in India?",
    answers: [
      { text: "Indus Valley Civilization", correct: true },
      { text: "Vedic Civilization", correct: false },
      { text: "Maurya Empire", correct: false },
      { text: "Gupta Empire", correct: false },
    ],
  },
  {
    question: "In which year was the first general election held in independent India?",
    answers: [
      { text: "1951–52", correct: true },
      { text: "1947", correct: false },
      { text: "1950", correct: false },
      { text: "1955", correct: false },
    ],
  },
  {
    question: "Who was the first Indian to win a Nobel Prize?",
    answers: [
      { text: "Rabindranath Tagore", correct: true },
      { text: "C.V. Raman", correct: false },
      { text: "Amartya Sen", correct: false },
      { text: "Mother Teresa", correct: false },
    ],
  },
  {
    question: "Which Indian state has the highest number of official languages?",
    answers: [
      { text: "Sikkim", correct: false },
      { text: "Karnataka", correct: false },
      { text: "Maharashtra", correct: false },
      { text: "Nagaland", correct: true },
    ],
  },
  {
    question: "Which Indian ruler is known as the Napoleon of India?",
    answers: [
      { text: "Samudragupta", correct: true },
      { text: "Ashoka", correct: false },
      { text: "Chandragupta Maurya", correct: false },
      { text: "Harshavardhana", correct: false },
    ],
  },
  {
    question: "Which was the first satellite launched by India?",
    answers: [
      { text: "Rohini", correct: false },
      { text: "INSAT-1A", correct: false },
      { text: "Aryabhata", correct: true },
      { text: "Bhaskara I", correct: false },
    ],
  },
  {
    question: "Who was the first female governor of an Indian state?",
    answers: [
      { text: "Sarojini Naidu", correct: true },
      { text: "Indira Gandhi", correct: false },
      { text: "Sucheta Kripalani", correct: false },
      { text: "Vijaya Lakshmi Pandit", correct: false },
    ],
  },
  {
    question: "Which Indian classical dance form originated in Kerala?",
    answers: [
      { text: "Bharatanatyam", correct: false },
      { text: "Kathakali", correct: true },
      { text: "Manipuri", correct: false },
      { text: "Kuchipudi", correct: false },
    ],
  },
  {
    question: "Which Indian leader is called the 'Father of the Indian Constitution'?",
    answers: [
      { text: "Jawaharlal Nehru", correct: false },
      { text: "Mahatma Gandhi", correct: false },
      { text: "B.R. Ambedkar", correct: true },
      { text: "Rajendra Prasad", correct: false },
    ],
  },
  {
    question: "Which city is known as the 'Silicon Valley of India'?",
    answers: [
      { text: "Bengaluru", correct: true },
      { text: "Hyderabad", correct: false },
      { text: "Pune", correct: false },
      { text: "Chennai", correct: false },
    ],
  },
];

let currentQuestionindex = 0;
let score = 0;
let answerdisabled = false;

totalQuestionsSpan.textContent= quizQuestions.length;
totalScoreSpan.textContent= quizQuestions.length;

startButton.addEventListener("click",startquiz)
restartButton.addEventListener("click",restartquiz)


function startquiz(){
    console.log("quiz started")
    currentQuestionindex =0;
    score=0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active")
    showquestion()
}
    function showquestion(){
        answerdisabled=false
        const currentQuestion = quizQuestions[currentQuestionindex]
        currentQuestionSpan.textContent=currentQuestionindex+1

        const progresspercent =(currentQuestionindex/quizQuestions.length)*100
        progressBar.style.width = progresspercent +"%"
        questions.textContent=currentQuestion.question

        options.innerHTML="";

        currentQuestion.answers.forEach(answer => {
            const button=document.createElement("button")
        button.textContent=answer.text
        button.classList.add("answer-button")   
        
        button.dataset.correct = answer.correct
        button.addEventListener("click",selectanswer)

        options.appendChild(button)
            
        });

    }

    function selectanswer(event){
      if(answerdisabled) return
      answerdisabled=true
      const selectedbutton=event.target;
      const iscorrect=selectedbutton.dataset.correct === "true"
        
      Array.from(options.children).forEach(button =>  {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        } 
        else if (button === selectedbutton){
            button.classList.add("incorrect");
        }
    });

    if(iscorrect){
        score++;
      
    }

    setTimeout(() =>{
      currentQuestionindex++;

      if (currentQuestionindex<quizQuestions.length){
        showquestion()
      } else{
        showresults()
      }
    },300)
}
function showresults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    resultScoredSpan.textContent = score;
    totalScoreSpan.textContent = quizQuestions.length;

    const percentage =(score/quizQuestions.length)*100

    if(percentage === 100)
    {
        resultMessage.textContent = "Great job!";
    }
    else if (percentage >=80)
    {
        resultMessage.textContent="Good job";
    }
    else if (percentage >=60)
    {
        resultMessage.textContent="Good effort";
    }
    else
    {
        resultMessage.textContent="You can try again";
    }
}


function restartquiz(){
    console.log("quiz re started")
    resultScreen.classList.remove("active");

    startquiz();

}
