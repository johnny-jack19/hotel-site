//Format date into day strings for room table
function formatDay(date) {
    return `${date.getFullYear()}-${
        (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
        date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
}

//Modal
const modal = document.getElementById('modal');

function closeModal() {
    modal.classList.add('hidden');
    currentRoom = null;
    updateToday();
}

//Get form data
function getForm(store, id) {
    let formData = new FormData(document.getElementById(id));
    for ([key, value] of formData) {
        store[key] = value;
    }
    document.getElementById(id).reset();
}