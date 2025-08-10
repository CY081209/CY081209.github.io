document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.side-links [data-target]');
    const sections = document.querySelectorAll('.page-section');
    const main = document.getElementById('main-content');

    function showSection(id) {
        let found = false;
        sections.forEach(sec => {
            const isActive = sec.id === id;
            sec.classList.toggle('active', isActive);
            if (isActive) found = true;
        });
        if (!found && sections[0]) sections[0].classList.add('active');
        //if (main) main.focus();
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // buttons have no default navigation, but keep preventDefault for safety if markup changes
            e.preventDefault();
            const target = this.dataset.target;
            if (target) showSection(target);
        });
    });

    // allow quick keyboard navigation 1..5
    window.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        const map = { '1': 'layout', '2': 'readability', '3': 'cc', '4': 'flair' };
        if (map[e.key]) showSection(map[e.key]);
    });


    // optional: honor initial hash if present
    const hash = location.hash.replace('#', '');
    if (hash) {
        const el = document.getElementById(hash);
        if (el && el.classList.contains('page-section')) showSection(hash);
    }
});