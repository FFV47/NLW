const btnAddField = document.getElementById("add-time");
const timeList = document.getElementById("schedule-list");

btnAddField.addEventListener("click", () => {
	/** @type {HTMLDivElement} */
	const timeNode = document.querySelector(".schedule-time");
	const newItem = timeNode.cloneNode(true);
	const itemInputs = newItem.querySelectorAll("input");

	for (let i = 0, len = itemInputs.length; i < len; i++) {
		itemInputs[i].value = "";
	}
	timeList.appendChild(newItem);
});
