const savebtn = document.querySelector('.savebtn');
const InputEl = document.querySelector('.input');
const todoel = document.querySelector('.todoel');


const savenote = () => {
    const note = InputEl.value.trim();
    const confirmationEl = document.querySelector('.confirmation');
    
    if (note === '') {
        alert('Please enter a note');
        return;
    }

    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');

    // Store the date as a custom attribute
    const creationDate = new Date().toISOString();
    newTodo.setAttribute('data-date', creationDate);

    const noteText = document.createElement('span');
    noteText.textContent = note;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editNote(newTodo, noteText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteNote(newTodo);

    newTodo.appendChild(noteText);
    newTodo.appendChild(editBtn);
    newTodo.appendChild(deleteBtn);
    todoel.appendChild(newTodo);
    
    // Save the note to localStorage
    saveNoteToLocalStorage(note, creationDate);
    
    // Clear the input
    InputEl.value = '';

    // Show confirmation message
    confirmationEl.style.display = 'block';
    setTimeout(() => {
        confirmationEl.style.display = 'none';
    }, 2000);
}

// Helper function to save notes to localStorage
const saveNoteToLocalStorage = (note, date) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ text: note, date: date });
    localStorage.setItem('notes', JSON.stringify(notes));
};

const editNote = (todoItem, noteText) => {
    const newNote = prompt("Edit your note:", noteText.textContent);
    if (newNote !== null && newNote.trim() !== '') {
        noteText.textContent = newNote;

        // Show confirmation message
        const updateConfirmationEl = document.querySelector('.update-confirmation');
        updateConfirmationEl.style.display = 'block';
        
        // Hide the message after 2 seconds
        setTimeout(() => {
            updateConfirmationEl.style.display = 'none';
        }, 2000); // 2000 milliseconds = 2 seconds
    }
};


const deleteNote = (todoItem) => {
    const confirmation = confirm("Are you sure you want to delete this note?");
    if (confirmation) {
        const noteText = todoItem.querySelector('span').textContent;
        
        // Remove the note from localStorage
        deleteNoteFromLocalStorage(noteText);
        
        todoItem.remove(); // Remove the todo item from the DOM

        // Show delete confirmation message
        const deleteConfirmationEl = document.querySelector('.delete-confirmation');
        deleteConfirmationEl.style.display = 'block';
        setTimeout(() => {
            deleteConfirmationEl.style.display = 'none';
        }, 2000);
    }
};

// Helper function to delete a note from localStorage
const deleteNoteFromLocalStorage = (noteText) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note.text !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
};
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach(item => {
        const noteText = item.querySelector('span').textContent.toLowerCase();
        if (noteText.includes(searchTerm)) {
            item.style.display = 'block'; // Show note if it matches the search term
        } else {
            item.style.display = 'none'; // Hide note if it doesn't match
        }
    });
});
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved theme in localStorage
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    // Toggle theme
    document.body.classList.toggle('dark-mode');
    
    // Save preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

savebtn.addEventListener('click', savenote);
const exportBtn = document.querySelector('.export-btn');

exportBtn.addEventListener('click', () => {
    const todoItems = document.querySelectorAll('.todo-item span');
    let notesText = '';

    todoItems.forEach((item) => {
        notesText += `${item.textContent}\n`; // Append each note to the text
    });

    // Create a blob with the notes text
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
const sortAlphabeticalBtn = document.querySelector('.sort-alphabetical');
const sortDateBtn = document.querySelector('.sort-date');

sortAlphabeticalBtn.addEventListener('click', sortAlphabetically);
sortDateBtn.addEventListener('click', sortByDate);
const sortAlphabetically = () => {
    const todoItems = Array.from(document.querySelectorAll('.todo-item'));
    todoItems.sort((a, b) => {
        const textA = a.querySelector('span').textContent.toLowerCase();
        const textB = b.querySelector('span').textContent.toLowerCase();
        return textA.localeCompare(textB);
    });
    todoItems.forEach(item => todoel.appendChild(item));
};

const sortByDate = () => {
    const todoItems = Array.from(document.querySelectorAll('.todo-item'));
    todoItems.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        return dateA - dateB; // Change to `dateB - dateA` for descending order
    });
    todoItems.forEach(item => todoel.appendChild(item));
};
