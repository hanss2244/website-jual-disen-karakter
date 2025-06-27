// Cek apakah URL punya query ?admin=rahasia
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'rahasia') {
  isAdmin = true;
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("uploadSection").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    renderGallery();
  });
}


let isAdmin = false;
let desainList = [];

function loginAdmin() {
  const password = document.getElementById("adminPassword").value;
  if (password === "admin123") {
    isAdmin = true;
    document.getElementById("uploadSection").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    renderGallery();
  } else {
    alert("Password salah!");
  }
}

function uploadDesain() {
  const fileInput = document.getElementById('uploadFile');
  const deskripsi = document.querySelector('textarea').value;
  const harga = document.getElementById('harga').value;
  const waktu = document.getElementById('waktu').value;
  const status = document.getElementById('status').value;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const desain = {
        gambar: e.target.result,
        deskripsi,
        harga,
        waktu,
        status
      };
      desainList.push(desain);
      renderGallery();
    };
    reader.readAsDataURL(file);
  }
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  desainList.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
  <img src="${item.gambar}" alt="Desain ${index + 1}" />
  <div class="card-content">
    <p>${item.deskripsi}</p>
    <p>💰 Harga: Rp${item.harga}</p>
    <p>⏳ Waktu: ${item.waktu}</p>
    <p class="${item.status === 'sold' ? 'sold' : 'available'}">
      ${item.status === 'sold' ? 'Sudah Dijual' : 'Belum Dijual'}
    </p>

    <a class="whatsapp-btn" href="https://wa.me/6285810188169?text=${encodeURIComponent(`Halo, saya tertarik dengan desain ini:

🖼️ Gambar: ${item.gambar}
📄 Deskripsi: ${item.deskripsi}
💰 Harga: Rp${item.harga}
⏳ Waktu pengerjaan: ${item.waktu}

Terima kasih.`)}" target="_blank">Order via WhatsApp</a>

    ${isAdmin ? `
      <div>
        <button onclick="toggleStatus(${index})">Ubah Status</button>
        <button onclick="hapusDesain(${index})">Hapus</button>
      </div>` : ''
    }
  </div>
`;


    gallery.appendChild(card);
  });
}

function toggleStatus(index) {
  if (desainList[index].status === 'sold') {
    desainList[index].status = 'available';
  } else {
    desainList[index].status = 'sold';
  }
  renderGallery();
}

function hapusDesain(index) {
  if (confirm("Yakin ingin menghapus desain ini?")) {
    desainList.splice(index, 1);
    renderGallery();
  }
}
