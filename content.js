// Check if we're on a Gmail page and show redirect popup
if (window.location.href.startsWith('https://mail.google.com')) {
  // Check if popup was already dismissed for this session
  const dismissed = sessionStorage.getItem('notion-mail-popup-dismissed');
  
  if (!dismissed) {
    showRedirectPopup();
  }
}

function showRedirectPopup() {
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'notion-mail-popup';
  popup.innerHTML = `
    <div class="notion-popup-content">
      <div class="notion-popup-header">
        <h3>Switch to Notion Mail?</h3>
        <button id="notion-close-btn" class="notion-close-btn">&times;</button>
      </div>
      <div class="notion-popup-body">
        <p>Consider using Notion Mail for a better email experience!</p>
        <div class="notion-popup-buttons">
          <button id="notion-redirect-btn" class="notion-btn notion-btn-primary">Go to Notion Mail</button>
          <button id="notion-dismiss-btn" class="notion-btn notion-btn-secondary">Stay Here</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Add event listeners
  document.getElementById('notion-redirect-btn').addEventListener('click', () => {
    window.location.href = 'https://mail.notion.so';
  });
  
  document.getElementById('notion-dismiss-btn').addEventListener('click', dismissPopup);
  document.getElementById('notion-close-btn').addEventListener('click', dismissPopup);
}

function dismissPopup() {
  const popup = document.getElementById('notion-mail-popup');
  if (popup) {
    popup.remove();
  }
  // Remember dismissal for this session
  sessionStorage.setItem('notion-mail-popup-dismissed', 'true');
}
