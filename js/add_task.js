// Warten bis das Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Initialisierungsfunktion aufrufen
    init();

    // Event-Listener für den "Create Task"-Button hinzufügen
    const createTaskButton = document.getElementById('createTaskButton');
    createTaskButton.addEventListener('click', createTask);
});

// Initialisierungsfunktion
function init() {
    // Hier können Sie Initialisierungscodes schreiben, z.B. das Laden von Daten aus einer Datenbank
    console.log('Initialisierung abgeschlossen');
}

// Globales Array zum Speichern der Aufgaben
let tasksArray = [];

// Funktion zum Erstellen einer neuen Aufgabe
function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const category = document.getElementById('category').value;

    // Überprüfen, ob die erforderlichen Felder ausgefüllt sind
    if (!title || !description) {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
        return;
    }

    // Aufgabe zum Array hinzufügen
    const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        assignedTo: assignedTo,
        category: category
    };
    tasksArray.push(task);

    // JSON-Array aktualisieren
    const tasksJSON = JSON.stringify(tasksArray);
    document.getElementById('tasksOutput').innerHTML = tasksJSON;

    console.log('Aufgabe hinzugefügt:', task);
}


// Funktion zum Hinzufügen einer neuen Unteraufgabe
function addSubtask() {
    const subtaskInput = document.querySelector('.new-subtask-textfield');
    const subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        alert('Bitte geben Sie eine Unteraufgabe ein.');
        return;
    }

    // Unteraufgabe zur Liste hinzufügen (mit innerHTML)
    const subtasksContainer = document.querySelector('.subtasks-container');
    const newSubtask = document.createElement('div');
    newSubtask.innerHTML = `
        <div class="subtask-item">
            <input type="checkbox">
            <span>${subtaskValue}</span>
        </div>
    `;
    subtasksContainer.appendChild(newSubtask);

    // Eingabefeld leeren
    subtaskInput.value = '';
    console.log('Unteraufgabe hinzugefügt:', subtaskValue);
}
