(function() {
    // Configuration
    const CONFIG = {
        username: 'admin',
        password: 'mad', // Simple password for now
        secretKey: 'mad_access', // ?access=mad_access
        sessionKey: 'mad_authorized'
    };

    // Check if already authorized
    function isAuthorized() {
        // Check session storage
        if (sessionStorage.getItem(CONFIG.sessionKey) === 'true') return true;

        // Check URL for secret key
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('access') === CONFIG.secretKey) {
            sessionStorage.setItem(CONFIG.sessionKey, 'true');
            return true;
        }

        return false;
    }

    // Initialize lock
    function init() {
        if (isAuthorized()) return;

        // Add locked class to body to prevent scrolling and hide content
        document.documentElement.classList.add('locked-html');
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
                // Remove overlay and locked classes
                overlay.remove();
                document.documentElement.classList.remove('locked-html');
                document.body.classList.remove('locked');
            } else {
                errorMsg.style.display = 'block';
                // Reset password field
                document.getElementById('lock-pass').value = '';
                // Shake effect
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
            }
        });

        // Debug info (hidden from UI)
        console.log("Access Restricted. Admin Credentials: admin / mad");
        console.log("Secret Link: " + window.location.origin + "/?access=mad_access");
    }

    // Run as soon as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
