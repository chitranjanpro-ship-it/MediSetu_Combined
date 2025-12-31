// Load partners from localStorage or use default
function loadPartners() {
  const stored = localStorage.getItem('partners');
  if (stored) {
    return JSON.parse(stored);
  }
  // Default partners
  return [
    {id:1, name:"Dr. Sharma", role:"doctor", status:"Active", pending:3},
    {id:2, name:"MediStore 101", role:"vendor", status:"Active", pending:5},
    {id:3, name:"Rahul Kumar", role:"delivery", status:"Inactive", pending:2},
    {id:4, name:"Logistics Co.", role:"logistics", status:"Active", pending:4},
    {id:5, name:"City Medical Partner", role:"medical", status:"Active", pending:6}
  ];
}

function savePartners(partners) {
  localStorage.setItem('partners', JSON.stringify(partners));
}

let partners = loadPartners();
const partnerTableBody = document.getElementById('partnerTableBody');
const roleFilter = document.getElementById('roleFilter');

function renderPartners(filter="all"){
  if (!partnerTableBody) return;
  
  partnerTableBody.innerHTML = '';
  const filtered = filter === "all" ? partners : partners.filter(p => p.role === filter);
  
  if (filtered.length === 0) {
    partnerTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No partners found.</td></tr>';
    return;
  }
  
  filtered.forEach(p=>{
    const tr = document.createElement('tr');
    const statusClass = p.status === 'Active' ? 'success' : 'secondary';
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.role}</td>
      <td><span class="badge bg-${statusClass}">${p.status}</span></td>
      <td>${p.pending}</td>
      <td><button class="btn btn-sm btn-success" onclick="assignPartner(${p.id})">Assign</button></td>
    `;
    partnerTableBody.appendChild(tr);
  });
}

function assignPartner(id) {
  const partner = partners.find(p => p.id === id);
  if (partner) {
    alert(`Partner ${partner.name} assigned successfully!`);
  }
}

if (roleFilter) {
  roleFilter.addEventListener('change', ()=>renderPartners(roleFilter.value));
}

// Initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => renderPartners());
} else {
  renderPartners();
}
