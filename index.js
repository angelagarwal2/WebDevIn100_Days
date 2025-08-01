function filterProjects() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const rows = document.querySelector('tbody').querySelectorAll('tr'); // Choose all rows in the table body
    let hasResults = false;

    rows.forEach(row => {
        const projectName = row.querySelector('.project-name')?.innerText.toLowerCase();

        if (projectName && projectName.includes(filter)) {
            row.style.display = '';
            hasResults = true;
        } else if (row.id !== 'table-subheader') {
            row.style.display = 'none';
        }
    });

    const subheader = document.querySelector('.subheader');
    const noProjectsMessage = document.getElementById('no-projects');

    if (hasResults) {
        subheader.style.display = 'block';
        noProjectsMessage.style.display = 'none';
    } else {
        document.getElementById('table-subheader').style.display = 'none';
        subheader.style.display = 'none';
        noProjectsMessage.style.display = 'block';
    }
}

// Update Navbar for Login Status
const buttons = document.getElementsByClassName('buttons')[0]; // Refers to the section on NavBar where buttons will get appended based on login status

function updateNavbar() {
    let currentUser = null;
    try {
        const raw = localStorage.getItem('currentUser');
        if (raw && /^[\x20-\x7E]+$/.test(raw)) {
            currentUser = JSON.parse(raw);
        }
    } catch (e) {
        currentUser = null;
    }
    if (currentUser) {
        buttons.innerHTML = `
        <button class="button is-success is-dark has-text-weight-bold">
            <span class="icon">
                <i class="fas fa-user"></i>
            </span>
            <span>Welcome ${currentUser.fullName}</span>
        </button>
        <button class="button is-danger is-dark" id='logout'>
            <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
        </button>
        <a class="button is-primary is-dark" href="https://github.com/ruchikakengal">
            <span class="icon">
                <i class="fab fa-github"></i>
            </span>
            <span>GitHub</span>
        </a>
        <a class="button is-primary is-dark" href="contributors/contributor.html">
            <span class="icon">
                <i class="fas fa-users"></i>
            </span>
            <span>Contributors</span>
        </a>`;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            updateNavbar();
            // Optional: Redirect to home page after logout
            window.location.reload();
        });
    } else {
        buttons.innerHTML = `
        <a class="button is-primary is-dark" href="contributors/contributor.html">
            <span class="icon">
                <i class="fas fa-users"></i>
            </span>
            <span>Contributors</span>
        </a>
        <a class="button is-primary is-dark" href="https://github.com/ruchikakengal">
            <span class="icon">
                <i class="fab fa-github"></i>
            </span>
            <span>GitHub</span>
        </a>
        <a class="button is-success is-light" href="/public/Login.html">
            <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
            </span>
            <span>Log in</span>
        </a>`;
    }
}

// Populate the table with project data
function fillTable() {
    const data = [
        ["Day 1", "To-Do List", " /public/TO_DO_LIST/todolist.html"],
        ["Day 2", "Digital Clock", " /public/digital_clock/digitalclock.html"],
        ["Day 3", "ASCII Art Generator (by Amaan Syed)", "./public/AsciiArtGenerator/index.html",],
        ["Day 3", "ASCII Art Generator (by Amaan Syed)", "./public/AsciiArtGenerator/index.html",],
        ["Day 4", "Password Strength Visualizer (by Adwitya)", " /public/password_visualizer/index.html"],
        ["Day 5", "Physics Simulation (by Vishisht Dwivedi)", " /public/physics_simulation/index.html"],
        ["Day 6", "Quote Generator (by Sania Rajput)", " /public/QuoteGenerator/index.html"],
        ["Day 7", "Character Word Counter (by Anchal Chaturvedi)", " /public/CharacterWordCounter/index.html"],
        ["Day 8", "Dice Roll Simulator"," /public/DICEROLLSIMULATOR/index.html"],
        ["Day 9", "Guess My Number (by Pahima R Uchil)", "./public/Guess_My_Number/index.html"],
        ["Day 10", "Stopwatch (by Angel Agarwal)", " /public/Stopwatch/index.html"],
        ["Day 11", "WeatherApp (by Kushagra Chavel)", "./public/WeatherApp/index.html"],
        ["Day 12", "Countdown Banner (by Priyanshi)", "https://countdown-banner.vercel.app/",], 
        ["Day 12", "Countdown Banner (by Priyanshi)", "https://countdown-banner.vercel.app/",], 
        ["Day 13", "Coin Flip Heads/Tails (by Radhika Dodain) ","./public/Coin_Flip/index.html"],
        ["Day 14", " ",],
        ["Day 63", "WaterMedic (By Dee) ","https://github.com/dipmanmajumdar/WaterMedic"],
        ["Day 64", "URL Shortner","https://github.com/ANTIK-007/URL-Shortener"],
        ["Day 17", "E- waste Management Hub(by Abhirup Nandi)","https://e-waste-management-hub.netlify.app/"],
        ["Day 19", "Currency Converter (by Maulik Gupta)", "./Currency_Converter/index.html"],
        ["Day 20", "Random User Generator (by Maulik Gupta)", "./Random_User_Generator/index.html"],
        ["Day 21", "Image Search App (by Maulik Gupta)", "./Image_Search_App/index.html"],
        ["Day 72","Interactive Portfolio (by Priya Katariya)","/public/portfolio/index.html"],
        ["Day 100", "Candy Crush","public/candycrush/candy_crush.html"],

    ];




    const tbody = document.getElementById('tableBody');

    data.forEach(e => {
        const row = document.createElement('tr');
        const days = document.createElement('td');
        const nameP = document.createElement('td');
        const link = document.createElement('td');
        const a = document.createElement('a');

        days.innerText = e[0];
        nameP.innerText = e[1];
        a.href = e[2];
        a.innerText = 'Here';
        a.target = '_blank'; // Open link in a new tab
        nameP.classList.add('project-name');

        link.appendChild(a);
        row.appendChild(days);
        row.appendChild(nameP);
        row.appendChild(link);

        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    fillTable();
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check if the user has a saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
} else {
    body.classList.add('light-theme');  // Explicitly set light theme
    themeToggle.textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});
