const questions = [
    {
        question: "What is the EPC rating of your house?",
        type: "select",
        options: ["C or above", "D-G"],
        validate: (answer) => {
            if (answer === "C or above") {
                alert("You are not qualified.");
                document.getElementById("next-btn").style.display = "none";
            }
            return answer !== "C or above";
        },
    },
    {
        question: "What is the status of your home?",
        type: "select",
        options: ["Social rented", "Private rented", "Owner"],
        additionalInfo: {
            "Social rented": "Required: EPC rating D-G, verification for property rented below market rate.",
            "Private rented": "Required: Permission from landlord, EPC rating E-G.",
            Owner: "Required: EPC rating D-G.",
        },
    },
    {
        question: "What is your income?",
        type: "text",
        placeholder: "Enter your annual income in GBP",
        validate: (answer) => {
            if (parseInt(answer) < 31000) {
                return "Required: Bank statement.";
            }
            return null;
        },
    },
];

const responses = {};
let currentQuestionIndex = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");

function showQuestion(index) {
    questionContainer.innerHTML = "";

    if (index >= questions.length) {
        prepareSubmission();
        return;
    }

    const question = questions[index];
    const label = document.createElement("label");
    label.textContent = question.question;
    questionContainer.appendChild(label);

    let input;

    if (question.type === "select") {
        input = document.createElement("select");
        question.options.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            input.appendChild(opt);
        });
    } else {
        input = document.createElement("input");
        input.type = question.type;
        input.placeholder = question.placeholder || "";
    }

    input.id = "answer";
    questionContainer.appendChild(input);
}

function prepareSubmission() {
    nextButton.style.display = "none";
    submitButton.style.display = "block";
    questionContainer.innerHTML = "<p>Thank you! Review your answers and submit the form.</p>";

    Object.keys(responses).forEach((key) => {
        const p = document.createElement("p");
        p.textContent = `${key}: ${responses[key]}`;
        questionContainer.appendChild(p);
    });
}

nextButton.addEventListener("click", () => {
    const input = document.getElementById("answer");
    const answer = input ? input.value : null;

    if (!answer) {
        alert("Please answer the question.");
        return;
    }

    const question = questions[currentQuestionIndex];
    responses[question.question] = answer;

    if (question.validate && !question.validate(answer)) {
        return;
    }

    if (question.additionalInfo && question.additionalInfo[answer]) {
        alert(question.additionalInfo[answer]);
    }

    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
});

showQuestion(currentQuestionIndex);
