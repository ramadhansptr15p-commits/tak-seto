function openMenu(evt, categoryName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(categoryName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

const daftarCabang = [
    { nama: "Neosantara - Bandung (Cisangkuy)", alamat: "Jl. Cisangkuy No.60, Bandung", wa: "62895403299384" },
    { nama: "Neosantara - Bekasi Utara", alamat: "Jl. Bulevar Bekasi CBD, Bekasi", wa: "6285869015168" },
    { nama: "Neosantara - Jakarta Selatan", alamat: "Jl. Ampera Raya No.9, Jakarta Selatan", wa: "6289504156425" },
    { nama: "Neosantara - Makassar", alamat: "Jl. Mutiara Boulevard, Makassar", wa: "6282124960502" },
    { nama: "Neosantara - Jakarta Utara", alamat: "Jl. Yos Sudarso Lorong X, Jakarta Utara", wa: "6287786917494" },
    { nama: "Neosantara - Bandar Lampung", alamat: "Jl. Griya Utama No. 57, Lampung", wa: "6283193450697" }
];

let daftarPesanan = {};

// Tambah Pesanan (+)
function pilihMenu(namaMenu, harga) {
    if (daftarPesanan[namaMenu]) {
        daftarPesanan[namaMenu].qty += 1;
    } else {
        daftarPesanan[namaMenu] = { qty: 1, harga: harga };
    }
    perbaruiTampilanPesanan();
}

// Kurang/Batalkan Pesanan (-)
function kurangMenu(namaMenu, harga) {
    if (daftarPesanan[namaMenu]) {
        daftarPesanan[namaMenu].qty -= 1;
        if (daftarPesanan[namaMenu].qty <= 0) {
            delete daftarPesanan[namaMenu];
        }
    }
    perbaruiTampilanPesanan();
}

// Perbarui Tampilan Input dan Harga Otomatis
function perbaruiTampilanPesanan() {
    let ringkasan = [];
    let totalBayar = 0;

    for (let menu in daftarPesanan) {
        let item = daftarPesanan[menu];
        ringkasan.push(`${item.qty}x ${menu}`);
        totalBayar += item.qty * item.harga;
    }

    const inputPesanan = document.getElementById('pesanan');
    if (inputPesanan) {
        inputPesanan.value = ringkasan.join(', ');
    }

    const inputTotal = document.getElementById('totalHarga');
    if (inputTotal) {
        inputTotal.value = `Rp ${totalBayar.toLocaleString('id-ID')}`;
    }
}

// Reset Pesanan
function resetPesanan() {
    daftarPesanan = {};
    perbaruiTampilanPesanan();
    alert("Pesanan berhasil direset.");
}

function pesanSekarangCabang(indexCabang) {
    const cabang = daftarCabang[indexCabang];
    const teksPesan = `Halo Admin *${cabang.nama}*,\nSaya ingin memesan menu Neosantara. Mohon info ketersediaannya, terima kasih!`;
    window.open(`https://wa.me/${cabang.wa}?text=${encodeURIComponent(teksPesan)}`, '_blank');
}

function handleReservation(event) {
    event.preventDefault();
    
    const indexCabang = document.getElementById('cabangPilihan').value;
    const cabang = daftarCabang[indexCabang];
    const nama = document.getElementById('nama').value;
    const pesanan = document.getElementById('pesanan').value;
    const totalHarga = document.getElementById('totalHarga').value;
    const jumlah = document.getElementById('jumlah').value;
    const tanggal = document.getElementById('tanggal').value;
    const jam = document.getElementById('jam').value;
    const pembayaran = document.getElementById('pembayaran').value;
    const catatan = document.getElementById('catatan').value || "Tidak ada catatan khusus";

    if (!pesanan) {
        alert("Silakan pilih menu terlebih dahulu dengan menekan tombol (+) pada gambar menu!");
        return;
    }

    let teksPesan = `Halo Admin *${cabang.nama}*,\n` +
                    `Alamat: ${cabang.alamat}\n\n` +
                    `*Data Pemesanan & Reservasi:*\n` +
                    `- Nama: ${nama}\n` +
                    `- Menu Dipesan: ${pesanan}\n` +
                    `- *Total Pembayaran: ${totalHarga}*\n` +
                    `- Jumlah Tamu: ${jumlah} Orang\n` +
                    `- Tanggal: ${tanggal}\n` +
                    `- Waktu: ${jam} WIB\n` +
                    `- Pembayaran: ${pembayaran}\n` +
                    `- Catatan Khusus: ${catatan}\n\n` +
                    `Mohon konfirmasi pesanan saya, terima kasih!`;

    window.open(`https://wa.me/${cabang.wa}?text=${encodeURIComponent(teksPesan)}`, '_blank');
}