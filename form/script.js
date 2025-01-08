const questions = [
    { question: "What is your name?", type: "text" },
    { question: "What is your email?", type: "email" },
    { question: "What is your phone number?", type: "tel" },
    { question: "What type of document do you need?", type: "select", options: ["Passport", "Driver's License", "ID Card"] }
];

const responses = {};
let currentQuestion = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const documentContainer = document.getElementById("document-container");
const documentList = document.getElementById("document-list");

function showQuestion(index) {
    questionContainer.innerHTML = "";
    if (index < questions.length) {
        const question = questions[index];
        const label = document.createElement("label");
        label.textContent = question.question;
        questionContainer.appendChild(label);

        let input;
        if (question.type === "select") {
            input = document.createElement("select");
            question.options.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option;
                opt.textContent = option;
                input.appendChild(opt);
            });
        } else {
            input = document.createElement("input");
            input.type = question.type;
        }
        input.id = "answer";
        questionContainer.appendChild(input);
    } else {
        showDocuments();
    }
}

function showDocuments() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    documentContainer.style.display = "block";

    const selectedDocument = responses["What type of document do you need?"];
    const li = document.createElement("li");
    li.textContent = `You selected: ${selectedDocument}`;
    documentList.appendChild(li);

    // Save contact details to server
    saveData();
}

function saveData() {
    const contactDetails = `
        Name: ${responses["What is your name?"]},
        Email: ${responses["What is your email?"]},
        Phone: ${responses["What is your phone number?"]}
    `;
    fetch("save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactDetails })
    });
}

nextButton.addEventListener("click", () => {
    const input = document.getElementById("answer");
    if (input) responses[questions[currentQuestion].question] = input.value;
    currentQuestion++;
    showQuestion(currentQuestion);
});

showQuestion(currentQuestion);
