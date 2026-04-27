(function() {
    // Configuration
    const CONFIG = {
        username: 'admin',
        password: 'mad',
        secretKey: 'mad_access',
        sessionKey: 'mad_authorized'
    };

    // Check if already authorized
    function isAuthorized() {
        if (sessionStorage.getItem(CONFIG.sessionKey) === 'true') return true;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('access') === CONFIG.secretKey) {
            sessionStorage.setItem(CONFIG.sessionKey, 'true');
            return true;
        }
        return false;
    }

    // Immediate action: Add lock class to HTML to hide content as early as possible
    if (!isAuthorized()) {
        document.documentElement.classList.add('locked-html');
    } else {
        return; // Already authorized, do nothing
    }

    // Initialize lock UI
    function init() {
        if (document.getElementById('access-lock-overlay')) return;

        // Ensure body has the locked class
        document.body.classList.add('locked');

        // Create the lock overlay
        const overlay = document.createElement('div');
        overlay.id = 'access-lock-overlay';
        overlay.innerHTML = `
            <div class="lock-container">
                <div class="lock-logo">MAD<span>.</span></div>
                <div class="lock-tagline">Auto Detailing Studio</div>
                
                <div class="lock-status">
                    <h2>Restricted Access</h2>
                    <p>This website is temporarily restricted. Please contact admin for access credentials.</p>
                </div>

                <form id="lock-form" class="lock-form">
                    <div class="lock-input-group">
                        <label for="lock-user">Username</label>
                        <input type="text" id="lock-user" placeholder="Enter username" required autocomplete="username">
                    </div>
                    <div class="lock-input-group">
                        <label for="lock-pass">Password</label>
                        <input type="password" id="lock-pass" placeholder="Enter password" required autocomplete="current-password">
                    </div>
                    <div id="lock-error" class="lock-error">Invalid credentials. Please try again.</div>
                    <button type="submit" class="lock-btn">Unlock Website</button>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        // Handle form submission
        const form = document.getElementById('lock-form');
        const errorMsg = document.getElementById('lock-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('lock-user').value;
            const pass = document.getElementById('lock-pass').value;

            if (user === CONFIG.username && pass === CONFIG.password) {
                sessionStorage.setItem(CONFIG.sessionKey, 'true');
                overlay.remove();
                document.documentElement.classList.remove('locked-html');
                document.body.classList.remove('locked');
            } else {
                errorMsg.style.display = 'block';
                document.getElementById('lock-pass').value = '';
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
            }
        });

        console.log("Access Restricted. Admin Credentials: admin / mad");
    }

    // Wait for body to exist to inject overlay
    if (document.body) {
        init();
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.body) {
                init();
                obs.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true });
    }
})();
