
document.addEventListener("DOMContentLoaded", function() {
console.log("addBtn: ", document.getElementById("addBtn"));
const goalInput = document.getElementById("goalInput");
const addBtn = document.getElementById("addBtn");
const goalList = document.getElementById("goalList");
const stats = document.getElementById("stats");
const quoteBtn = document.getElementById("quoteBtn");
const quoteDisplay = document.getElementById("quote");

let goals = JSON.parse(localStorage.getItem("goals"))  || [];
const saveGoals = () => {
	localStorage.setItem("goals", JSON.stringify(goals));
};

function renderGoals()	{
	goalList.innerHTML = "";
goals.forEach((goal, index)  =>   {
goalList.innerHTML  +=  `
<li>

	${goal.completed ? "✅" : "❌"} ${goal.text}

<button onClick ="toggleGoal(${index})">
	Complete
</button>

<button onclick = "deleteGoal(${index})">
	Delete
	</button>
</li>
`;
});
updateStats();
}

function updateStats()   {
const completedGoals =
	goals.filter(goal => goal.completed);

stats.textContent =
    `Total:   ${goals.length}  | Completed:  ${completedGoals.length}`;
}

addBtn.addEventListener("click", () =>  {
const text = goalInput.value.trim();
if(text === "") return;

goals.push({
	text: text,
	completed: false
});

saveGoals();
renderGoals();

goalInput.value="";
});

window.toggleGoal = function(index)   {
goals[index].completed =
	!goals[index].completed;

saveGoals();
renderGoals();
}

window.deleteGoal = function(index)  {
	goals = goals.filter((goal,i)  => i !== index);

saveGoals();
renderGoals();
}
async function getQuote()  {
try  {
const response = await fetch("https://api.adviceslip.com/advice");
const data = await response.json();
quoteDisplay.textContent  = data.slip.advice;
}   catch(error)   {
 quoteDisplay.textContent = "Could not load quote.";
}
}

quoteBtn.addEventListener("click", getQuote);
renderGoals();
});