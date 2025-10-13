// Smooth reveal on scroll
const onIntersect = (entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(onIntersect, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
if (toggle){
  toggle.addEventListener('click', () => {
    const links = document.querySelector('.links');
    if(links){ links.style.display = links.style.display === 'block' ? 'none' : 'block'; }
  });
}

// Chat widget
const chatFab = document.getElementById('chat-fab');
const chatBox = document.getElementById('chat-box');
const chatSendBtn = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

if(chatFab){
  chatFab.addEventListener('click', () => {
    chatBox.hidden = !chatBox.hidden;
    if(!chatBox.hidden){ chatInput?.focus(); }
  });
}

function pushBubble(role, text){
  if(!chatBody) return;
  const div = document.createElement('div');
  div.className = `bubble ${role === 'agent' ? 'agent' : 'user'}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

if(chatSendBtn){
  chatSendBtn.addEventListener('click', () => {
    if(!chatInput.value.trim()) return;
    pushBubble('user', chatInput.value.trim());
    chatInput.value='';
    setTimeout(()=>pushBubble('agent','Thanks! Our consultant will reply via email/WhatsApp shortly.'), 400);
  });
}
if(chatInput){
  chatInput.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ e.preventDefault(); chatSendBtn.click(); }
  });
}

// FAQ toggles
document.querySelectorAll('.faq-item .faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    item.classList.toggle('open');
  });
});

// WhatsApp link dynamic message
const wa = document.getElementById('whatsapp-link');
if(wa){
  const msg = encodeURIComponent('Hi Notting Hill Voyages! I would like help with my travel/visa.');
  wa.href = `https://wa.me/447385608114?text=${msg}`;
}

// Contact form (front-end only)
const contact = document.getElementById('contact-form');
if(contact){
  contact.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contact.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(()=>{
      btn.textContent = 'Sent ✓';
      const note = document.getElementById('contact-note');
      if(note) note.textContent = 'Your message is recorded. We will reach out shortly.';
    }, 700);
  });
}

// Ensure page starts at top on load
window.scrollTo(0,0);

// Newsletter mock
const nlBtn = document.getElementById('nl-btn');
if(nlBtn){
  nlBtn.addEventListener('click', () => {
    const note = document.getElementById('nl-note');
    if(note) note.textContent = 'Subscribed. Welcome aboard!';
  });
}
