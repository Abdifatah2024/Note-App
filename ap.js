const savebtn = document.querySelector('.savebtn');
const InputEl = document.querySelector('.input');
const todoel = document.querySelector('.todoel');

const savenote = () => {
    const note = InputEl.value.trim();
    if (note === '') {
        alert('Please enter a note');
        return;
    }

    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');
    
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
    
    InputEl.value = '';
}

const editNote = (todoItem, noteText) => {
    const newNote = prompt("Edit your note:", noteText.textContent);
    if (newNote !== null && newNote.trim() !== '') {
        noteText.textContent = newNote;
    }
}

const deleteNote = (todoItem) => {
    // Confirm if the user really wants to delete the note
    const confirmation = confirm("Are you sure you want to delete this note?");
    if (confirmation) {
        todoItem.remove(); // Remove the todo item from the DOM if confirmed
    }
}
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
