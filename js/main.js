/* =========================================================
   main.js — Motor de busca de suítes / interações do site
   Funciona 100% no navegador (dados em memória), usando as
   imagens locais da pasta /images.
   ========================================================= */

const SUITES = [
  { id: 1, name: 'Suíte Standard', capacity: 2, size_m2: 22, bed_type: 'Casal', price_per_night: 320,
    description: 'Ambiente aconchegante e funcional, ideal para viagens curtas ou executivas. Conta com toda a infraestrutura necessária para uma estadia confortável, com decoração moderna e iluminação natural.',
    short_description: 'Conforto essencial para uma estadia prática e agradável.',
    images: ['images/suite-standard-1.jpg', 'images/suite-standard-2.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'},{name:'Smart TV',icon:'bi-tv'}] },

  { id: 2, name: 'Suíte Luxo', capacity: 2, size_m2: 32, bed_type: 'Casal King', price_per_night: 480,
    description: 'Espaço amplo com decoração sofisticada, área de estar separada e banheiro completo com banheira. Perfeita para casais que buscam mais conforto e privacidade durante a viagem.',
    short_description: 'Mais espaço, requinte e uma área de estar exclusiva.',
    images: ['images/suite-luxo-1.jpg', 'images/suite-luxo-2.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'},{name:'Smart TV',icon:'bi-tv'},{name:'Frigobar',icon:'bi-cup-straw'},{name:'Serviço de quarto 24h',icon:'bi-bell'}] },

  { id: 3, name: 'Suíte Master', capacity: 3, size_m2: 45, bed_type: 'King Size', price_per_night: 690,
    description: 'Nossa suíte mais espaçosa para casais, com varanda privativa, banheira de hidromassagem e vista panorâmica da cidade. Ideal para ocasiões especiais e lua de mel.',
    short_description: 'Elegância, varanda privativa e vista panorâmica.',
    images: ['images/suite-master-1.jpg', 'images/suite-master-2.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'},{name:'Smart TV',icon:'bi-tv'},{name:'Frigobar',icon:'bi-cup-straw'},{name:'Banheira de hidromassagem',icon:'bi-droplet-half'},{name:'Varanda com vista',icon:'bi-brightness-high'},{name:'Cofre digital',icon:'bi-shield-lock'},{name:'Serviço de quarto 24h',icon:'bi-bell'}] },

  { id: 4, name: 'Suíte Família', capacity: 4, size_m2: 50, bed_type: 'Duas camas de casal', price_per_night: 590,
    description: 'Ampla suíte pensada para famílias, com duas camas de casal, sala de estar integrada e espaço extra para crianças. Todo o conforto para viajar com quem você ama.',
    short_description: 'Espaço extra e conforto para viajar em família.',
    images: ['images/suite-familia-1.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'},{name:'Smart TV',icon:'bi-tv'},{name:'Frigobar',icon:'bi-cup-straw'},{name:'Serviço de quarto 24h',icon:'bi-bell'}] },

  { id: 5, name: 'Suíte Presidencial', capacity: 4, size_m2: 80, bed_type: 'King Size + Sofá-cama', price_per_night: 1250,
    description: 'O ápice do luxo em nosso hotel. Suíte presidencial com sala de estar, sala de jantar, terraço privativo, banheira de hidromassagem e serviço de mordomo exclusivo.',
    short_description: 'A experiência mais exclusiva do hotel, sem limites de conforto.',
    images: ['images/suite-presidencial-1.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'},{name:'Smart TV',icon:'bi-tv'},{name:'Frigobar',icon:'bi-cup-straw'},{name:'Banheira de hidromassagem',icon:'bi-droplet-half'},{name:'Varanda com vista',icon:'bi-brightness-high'},{name:'Cofre digital',icon:'bi-shield-lock'},{name:'Serviço de quarto 24h',icon:'bi-bell'},{name:'Cama King Size',icon:'bi-moon-stars'}] },

  { id: 6, name: 'Suíte Econômica', capacity: 1, size_m2: 16, bed_type: 'Solteiro', price_per_night: 210,
    description: 'Opção ideal para quem busca economia sem abrir mão do conforto básico e da limpeza impecável. Perfeita para estadias curtas.',
    short_description: 'A melhor opção custo-benefício para sua viagem.',
    images: ['images/suite-economica-1.jpg'],
    amenities: [{name:'Wi-Fi gratuito',icon:'bi-wifi'},{name:'Ar-condicionado',icon:'bi-snow'}] },
];

let RESERVATIONS = [
  { suite_id: 3, checkin: '2026-08-10', checkout: '2026-08-14' },
  { suite_id: 5, checkin: '2026-08-05', checkout: '2026-08-08' },
];

function apiSearch(checkin, checkout, guests) {
    const dIn = new Date(checkin + 'T00:00:00');
    const dOut = new Date(checkout + 'T00:00:00');
    const nights = Math.round((dOut - dIn) / 86400000);

    const available = SUITES.filter(s => {
        if (s.capacity < guests) return false;
        const conflict = RESERVATIONS.some(r =>
            r.suite_id === s.id &&
            new Date(r.checkin + 'T00:00:00') < dOut &&
            new Date(r.checkout + 'T00:00:00') > dIn
        );
        return !conflict;
    }).map(s => ({ ...s, nights, total_price: Math.round(s.price_per_night * nights * 100) / 100 }))
      .sort((a, b) => a.price_per_night - b.price_per_night);

    return { success: true, nights, guests, count: available.length, suites: available };
}

function apiSuiteDetail(id) {
    const suite = SUITES.find(s => s.id === Number(id));
    return suite ? { success: true, suite } : { success: false, message: 'Suíte não encontrada.' };
}

function apiReserve(payload) {
    const { suite_id, guest_name, guest_email, guest_phone, checkin, checkout, guests } = payload;
    const suite = SUITES.find(s => s.id === Number(suite_id));
    if (!suite) return { success: false, message: 'Suíte inválida.' };
    if (!guest_name || !guest_email || !guest_phone) return { success: false, message: 'Preencha todos os campos.' };

    const dIn = new Date(checkin + 'T00:00:00');
    const dOut = new Date(checkout + 'T00:00:00');
    if (!(dIn < dOut)) return { success: false, message: 'Datas inválidas.' };
    if (Number(guests) > suite.capacity) return { success: false, message: 'Quantidade de hóspedes acima da capacidade da suíte.' };

    const conflict = RESERVATIONS.some(r =>
        r.suite_id === suite.id &&
        new Date(r.checkin + 'T00:00:00') < dOut &&
        new Date(r.checkout + 'T00:00:00') > dIn
    );
    if (conflict) return { success: false, message: 'Esta suíte não está mais disponível para o período selecionado.' };

    const nights = Math.round((dOut - dIn) / 86400000);
    const total = Math.round(suite.price_per_night * nights * 100) / 100;

    RESERVATIONS.push({ suite_id: suite.id, checkin, checkout });

    return { success: true, message: 'Reserva realizada com sucesso! Em breve entraremos em contato para confirmação.', total_price: total, nights };
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initDateConstraints();
    initSearchForm();
    initSmoothScroll();

    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);

    document.getElementById('checkin').value = formatDate(tomorrow);
    document.getElementById('checkout').value = formatDate(dayAfter);
    document.getElementById('guests').value = 2;

    runSearch(formatDate(tomorrow), formatDate(dayAfter), 2);
});

function initNavbarScroll() {
    const nav = document.querySelector('.navbar-hotel');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
}
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            if (targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            }
        });
    });
}
function initDateConstraints() {
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const todayStr = formatDate(new Date());
    checkin.min = todayStr; checkout.min = todayStr;
    checkin.addEventListener('change', () => {
        const inDate = new Date(checkin.value);
        const minOut = new Date(inDate); minOut.setDate(inDate.getDate() + 1);
        checkout.min = formatDate(minOut);
        if (!checkout.value || new Date(checkout.value) <= inDate) checkout.value = formatDate(minOut);
    });
}
function formatDate(date) {
    const y = date.getFullYear(), m = String(date.getMonth()+1).padStart(2,'0'), d = String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
}
function initSearchForm() {
    document.getElementById('searchForm').addEventListener('submit', e => {
        e.preventDefault();
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guests = document.getElementById('guests').value;
        if (!checkin || !checkout || !guests) { alert('Por favor, preencha todos os campos da busca.'); return; }
        runSearch(checkin, checkout, guests);
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    });
}
function runSearch(checkin, checkout, guests) {
    const resultsEl = document.getElementById('resultsGrid');
    const summaryEl = document.getElementById('resultsSummary');
    resultsEl.innerHTML = spinnerHTML();

    setTimeout(() => {
        const data = apiSearch(checkin, checkout, Number(guests));
        summaryEl.textContent = `${data.count} suíte(s) disponível(is) — ${data.nights} noite(s), ${data.guests} hóspede(s)`;
        if (data.count === 0) {
            resultsEl.innerHTML = emptyStateHTML('Nenhuma suíte disponível para os critérios informados. Tente outras datas ou quantidade de hóspedes.');
            return;
        }
        resultsEl.innerHTML = data.suites.map(suiteCardHTML).join('');
        document.querySelectorAll('.view-details').forEach(btn => btn.addEventListener('click', () => openSuiteModal(btn.dataset.id)));
    }, 250);
}
function spinnerHTML() {
    return `<div class="col-12 spinner-wrap"><div class="spinner-border text-success" style="width:3rem;height:3rem;"></div><p class="mt-3 text-muted">Buscando as melhores suítes para você...</p></div>`;
}
function emptyStateHTML(message) {
    return `<div class="col-12 empty-state"><i class="bi bi-emoji-frown"></i><p class="mb-0">${escapeHTML(message)}</p></div>`;
}
function suiteCardHTML(suite) {
    const amenities = suite.amenities.slice(0,4).map(a => `<span class="amenity-pill"><i class="bi ${a.icon}"></i>${escapeHTML(a.name)}</span>`).join('');
    return `
    <div class="col-md-6 col-lg-4">
        <div class="suite-card" data-id="${suite.id}">
            <div class="suite-img-wrap">
                <img src="${suite.images[0]}" alt="${escapeHTML(suite.name)}" loading="lazy">
                <span class="price-badge">R$ ${formatMoney(suite.price_per_night)} / noite</span>
            </div>
            <div class="card-body">
                <h5>${escapeHTML(suite.name)}</h5>
                <p class="meta mb-2"><i class="bi bi-people"></i>${suite.capacity} hóspedes &nbsp;<i class="bi bi-arrows-angle-expand"></i>${suite.size_m2} m² &nbsp;<i class="bi bi-moon"></i>${suite.bed_type}</p>
                <p class="small text-muted mb-3">${escapeHTML(suite.short_description)}</p>
                <div class="mb-3">${amenities}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-success">Total: R$ ${formatMoney(suite.total_price)}</span>
                    <button class="btn btn-accent btn-sm view-details" data-id="${suite.id}">Ver detalhes</button>
                </div>
            </div>
        </div>
    </div>`;
}
function openSuiteModal(suiteId) {
    const modalEl = document.getElementById('suiteModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    document.getElementById('modalBody').innerHTML = spinnerHTML();
    modal.show();
    setTimeout(() => {
        const data = apiSuiteDetail(suiteId);
        if (!data.success) { document.getElementById('modalBody').innerHTML = emptyStateHTML(data.message); return; }
        renderModal(data.suite);
    }, 150);
}
function renderModal(suite) {
    const carouselItems = suite.images.map((img,i) => `<div class="carousel-item ${i===0?'active':''}"><img src="${img}" alt="${escapeHTML(suite.name)}"></div>`).join('');
    const amenities = suite.amenities.map(a => `<span class="amenity-pill"><i class="bi ${a.icon}"></i>${escapeHTML(a.name)}</span>`).join('');
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;

    document.getElementById('modalBody').innerHTML = `
        <div id="carousel-${suite.id}" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner rounded">${carouselItems}</div>
            ${suite.images.length > 1 ? `
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${suite.id}" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${suite.id}" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>` : ''}
        </div>
        <h3 class="mb-2">${escapeHTML(suite.name)}</h3>
        <p class="text-muted">${escapeHTML(suite.description)}</p>
        <p class="meta mb-3"><i class="bi bi-people"></i> ${suite.capacity} hóspedes &nbsp;<i class="bi bi-arrows-angle-expand"></i> ${suite.size_m2} m² &nbsp;<i class="bi bi-moon"></i> ${escapeHTML(suite.bed_type)}</p>
        <div class="mb-4">${amenities}</div>
        <h5 class="mb-3">Fazer reserva</h5>
        <form id="reserveForm">
            <input type="hidden" name="suite_id" value="${suite.id}">
            <div class="row g-3">
                <div class="col-md-6"><label class="form-label small text-muted">Check-in</label><input type="date" class="form-control" name="checkin" value="${checkin}" required></div>
                <div class="col-md-6"><label class="form-label small text-muted">Check-out</label><input type="date" class="form-control" name="checkout" value="${checkout}" required></div>
                <div class="col-md-6"><label class="form-label small text-muted">Hóspedes</label><input type="number" min="1" max="${suite.capacity}" class="form-control" name="guests" value="${guests}" required></div>
                <div class="col-md-6"><label class="form-label small text-muted">Telefone</label><input type="tel" class="form-control" name="guest_phone" placeholder="(00) 00000-0000" required></div>
                <div class="col-md-6"><label class="form-label small text-muted">Nome completo</label><input type="text" class="form-control" name="guest_name" required></div>
                <div class="col-md-6"><label class="form-label small text-muted">E-mail</label><input type="email" class="form-control" name="guest_email" required></div>
            </div>
            <div id="reserveMsg" class="mt-3"></div>
            <button type="submit" class="btn btn-search mt-3"><i class="bi bi-check2-circle"></i> Confirmar reserva</button>
        </form>`;
    document.getElementById('reserveForm').addEventListener('submit', submitReservation);
}
function submitReservation(e) {
    e.preventDefault();
    const form = e.target;
    const msgEl = document.getElementById('reserveMsg');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';

    const payload = Object.fromEntries(new FormData(form).entries());

    setTimeout(() => {
        const data = apiReserve(payload);
        if (data.success) {
            msgEl.innerHTML = `<div class="alert alert-success mb-0"><i class="bi bi-check-circle"></i> ${escapeHTML(data.message)}<br><small>Total estimado: R$ ${formatMoney(data.total_price)} (${data.nights} noite(s))</small></div>`;
            form.reset();
        } else {
            msgEl.innerHTML = `<div class="alert alert-danger mb-0"><i class="bi bi-exclamation-triangle"></i> ${escapeHTML(data.message)}</div>`;
        }
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-check2-circle"></i> Confirmar reserva';
    }, 300);
}
function formatMoney(value) { return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function escapeHTML(str) { const div = document.createElement('div'); div.textContent = str ?? ''; return div.innerHTML; }
