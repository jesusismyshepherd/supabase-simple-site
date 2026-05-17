import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://juqhnrqhrdqswvgqoful.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cWhucnFocmRxc3d2Z3FvZnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTY5NzUsImV4cCI6MjA5NDU5Mjk3NX0.-KqzU7cK_g1aW4GIhgHb8aTwzoIwYJK6kTN_GRXzQbQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const list = document.getElementById('messages-list');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const status = document.getElementById('status');

async function loadMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('id, text, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    list.innerHTML = `<li class="empty">Could not load messages: ${error.message}</li>`;
    return;
  }
  if (!data.length) {
    list.innerHTML = '<li class="empty">No messages yet. Add one above!</li>';
    return;
  }
  list.innerHTML = data
    .map(m => `<li>${escapeHtml(m.text)}</li>`)
    .join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  status.textContent = 'Saving...';
  const { error } = await supabase.from('messages').insert({ text });
  if (error) {
    status.textContent = `Error: ${error.message}`;
    return;
  }
  input.value = '';
  status.textContent = 'Saved!';
  setTimeout(() => (status.textContent = ''), 2000);
  await loadMessages();
});

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

loadMessages();
