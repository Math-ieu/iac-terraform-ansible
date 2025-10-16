// Charger les tâches au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Charger toutes les tâches
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        displayTasks(tasks);
        updateStats(tasks);
    } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
    }
}

// Afficher les tâches
function displayTasks(tasks) {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: white;">
                <p style="font-size: 1.2rem;">Aucune tâche pour le moment</p>
                <p style="opacity: 0.8;">Ajoutez votre première tâche ci-dessus !</p>
            </div>
        `;
        return;
    }

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        container.appendChild(taskCard);
    });
}

// Créer une carte de tâche
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    
    const priorityLabels = {
        high: '🔴 Haute',
        medium: '🟡 Moyenne',
        low: '🟢 Basse'
    };

    card.innerHTML = `
        <input type="checkbox" 
               class="task-checkbox" 
               ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id}, this.checked)">
        <div class="task-content">
            <div class="task-header">
                <span class="task-title">${escapeHtml(task.title)}</span>
                <span class="priority-badge priority-${task.priority}">
                    ${priorityLabels[task.priority]}
                </span>
            </div>
            ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
            <div class="task-date">Créée le ${task.created_at}</div>
        </div>
        <div class="task-actions">
            <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Supprimer</button>
        </div>
    `;
    
    return card;
}

// Ajouter une nouvelle tâche
async function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
        alert('Veuillez entrer un titre pour la tâche');
        return;
    }

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority })
        });

        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskPriority').value = 'medium';
            loadTasks();
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
}

// Basculer l'état de complétion d'une tâche
async function toggleTask(taskId, completed) {
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        loadTasks();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
}

// Supprimer une tâche
async function deleteTask(taskId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        return;
    }

    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        loadTasks();
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
    }
}

// Mettre à jour les statistiques
function updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Échapper le HTML pour éviter les injections XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Permettre d'ajouter une tâche avec la touche Entrée
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.id === 'taskTitle') {
        addTask();
    }
});