let notes = JSON.parse(localStorage.getItem('notes')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentUser = null;
let currentRole = null;

// Demo Users
const demoUsers = {
  student: { username: 'student', password: 'pass123', role: 'student' },
  teacher: { username: 'teacher', password: 'admin123', role: 'teacher' }
};

// Login
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if(demoUsers[username] && demoUsers[username].password === password && demoUsers[username].role === role){
    currentUser = username;
    currentRole = role;

    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('welcomeMsg').textContent = `Welcome ${currentUser} (${role.toUpperCase()})`;

    if(role === 'student'){
      document.getElementById('uploadNotesForm').classList.remove('hidden');
      document.getElementById('uploadProjectForm').classList.remove('hidden');
    }

    loadNotes();
    loadProjects();
  } else {
    alert('Invalid credentials!');
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function(){
  currentUser = null;
  currentRole = null;
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('loginForm').reset();
});

// Notes Upload
document.getElementById('notesUploadForm').addEventListener('submit', function(e){
  e.preventDefault();
  const year = document.getElementById('year').value;
  const course = document.getElementById('course').value;
  const title = document.getElementById('noteTitle').value;
  const file = document.getElementById('noteFile').files[0];

  if(file){
    const note = { id: Date.now(), year, course, title, fileName: file.name, uploadedBy: currentUser };
    notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    this.reset();
    alert('Note uploaded!');
  }
});

function loadNotes(){
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';
  notes.forEach(note=>{
    const div = document.createElement('div');
    div.className = 'p-2 mb-2 border';
    div.innerHTML = `<strong>${note.title}</strong> - ${note.course} (${note.year})<br>Uploaded by: ${note.uploadedBy}<br>File: ${note.fileName}`;
    container.appendChild(div);
  });
}

// Projects Upload
document.getElementById('projectUploadForm').addEventListener('submit', function(e){
  e.preventDefault();
  const title = document.getElementById('projectTitle').value;
  const subject = document.getElementById('projectSubject').value;
  const desc = document.getElementById('projectDesc').value;
  const file = document.getElementById('projectFile').files[0];

  if(file){
    const project = { id: Date.now(), title, subject, desc, fileName: file.name, submittedBy: currentUser };
    projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
    this.reset();
    alert('Project submitted!');
  }
});

function loadProjects(){
  const container = document.getElementById('projectsContainer');
  container.innerHTML = '';
  projects.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'p-2 mb-2 border';
    div.innerHTML = `<strong>${p.title}</strong> - ${p.subject}<br>Submitted by: ${p.submittedBy}<br>${p.desc}<br>File: ${p.fileName}`;
    container.appendChild(div);
  });
}
