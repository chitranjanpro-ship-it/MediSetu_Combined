// Load tickets from localStorage
function loadTickets() {
  const stored = localStorage.getItem('tickets');
  return stored ? JSON.parse(stored) : [];
}

// Save tickets to localStorage
function saveTickets(tickets) {
  localStorage.setItem('tickets', JSON.stringify(tickets));
}

let tickets = loadTickets();
const ticketForm = document.getElementById('ticketForm');
const ticketsTableBody = document.getElementById('ticketsTableBody');

if (ticketForm) {
  ticketForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('ticketName').value.trim();
    const email = document.getElementById('ticketEmail').value.trim();
    const role = document.getElementById('ticketRole').value;
    const subject = document.getElementById('ticketSubject').value.trim();
    const description = document.getElementById('ticketDescription').value.trim();
    const attachment = document.getElementById('ticketAttachment').files[0];

    if (!name || !email || !role || !subject || !description) {
      alert('Please fill all required fields!');
      return;
    }

    const ticket = {
      id: tickets.length + 1,
      name: name,
      email: email,
      role: role,
      subject: subject,
      description: description,
      attachment: attachment ? attachment.name : null,
      status: 'Open',
      date: new Date().toISOString()
    };

    tickets.push(ticket);
    saveTickets(tickets);
    renderTickets();
    ticketForm.reset();
    alert('Ticket submitted successfully! Ticket ID: ' + ticket.id);
  });
}

function renderTickets() {
  if (!ticketsTableBody) return;
  
  ticketsTableBody.innerHTML = '';
  
  if (tickets.length === 0) {
    ticketsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No tickets submitted yet.</td></tr>';
    return;
  }
  
  // Sort tickets by date (newest first)
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  sortedTickets.forEach(t => {
    const tr = document.createElement('tr');
    const statusClass = t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'warning' : 'danger';
    tr.innerHTML = `
      <td>#${t.id}</td>
      <td>${t.name}</td>
      <td>${t.role}</td>
      <td>${t.subject}</td>
      <td><span class="badge bg-${statusClass}">${t.status}</span></td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewTicket(${t.id})">View</button>
        ${t.status !== 'Resolved' ? `<button class="btn btn-sm btn-success" onclick="resolveTicket(${t.id})">Resolve</button>` : ''}
        <button class="btn btn-sm btn-danger" onclick="deleteTicket(${t.id})">Delete</button>
      </td>
    `;
    ticketsTableBody.appendChild(tr);
  });
}

function viewTicket(id) {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    alert(`Ticket #${ticket.id}\n\nName: ${ticket.name}\nEmail: ${ticket.email}\nRole: ${ticket.role}\nSubject: ${ticket.subject}\nDescription: ${ticket.description}\nStatus: ${ticket.status}\nDate: ${new Date(ticket.date).toLocaleString()}`);
  }
}

function resolveTicket(id) {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = 'Resolved';
    saveTickets(tickets);
    renderTickets();
    alert('Ticket marked as resolved!');
  }
}

function deleteTicket(id) {
  if (confirm('Are you sure you want to delete this ticket?')) {
    tickets = tickets.filter(t => t.id !== id);
    saveTickets(tickets);
    renderTickets();
  }
}

// Initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTickets);
} else {
  renderTickets();
}
