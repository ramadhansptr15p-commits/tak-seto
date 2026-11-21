let keranjang = {};

// Pindah kategori menu (Makanan Utama, Minuman, Dessert)
function bukaKategori(evt, namaKategori) {
    const semuaKategori = document.getElementsByClassName("menu-category");
    for (let i = 0; i < semuaKategori.length; i++) {
        semuaKategori[i].classList.remove("active");
    }

    const semuaTab = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < semuaTab.length; i++) {
        semuaTab[i].classList.remove("active");
    }

    document.getElementById(namaKategori).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Tambah menu (+)
function pilihMenu(namaMenu, harga) {
    if (keranjang[namaMenu]) {
        keranjang[namaMenu].jumlah += 1;
    } else {
        keranjang[namaMenu] = {
            harga: harga,
            jumlah: 1
        };
    }
    perbaruiTampilanPesanan();
}

// Kurang menu (-)
function kurangMenu(namaMenu, harga) {
    if (keranjang[namaMenu]) {
        keranjang[namaMenu].jumlah -= 1;
        if (keranjang[namaMenu].jumlah <= 0) {
            delete keranjang[namaMenu];
        }
        perbaruiTampilanPesanan();
    }
}

// Update kolom input menu & total harga di formulir reservasi
function perbaruiTampilanPesanan() {
    const daftarItem = [];
    let totalHarga = 0;

    for (const [nama, detail] of Object.entries(keranjang)) {
        daftarItem.push(`${nama} (${detail.jumlah}x)`);
        totalHarga += detail.harga * detail.jumlah;
    }

    const menuInput = document.getElementById("menuInput");
    const totalPriceInput = document.getElementById("totalPriceInput");

    if (menuInput) {
        menuInput.value = daftarItem.join(", ");
    }
    if (totalPriceInput) {
        totalPriceInput.value = "Rp " + totalHarga.toLocaleString("id-ID");
    }
}

// Reset semua pesanan
function resetPesanan() {
    keranjang = {};
    perbaruiTampilanPesanan();
}

// Kirim pesanan ke WhatsApp cabang terpilih
function handleReservation(event) {
    event.preventDefault();

    const branchData = document.getElementById("branchSelect").value.split("|");
    const waNumber = branchData[0];
    const branchName = branchData[1];

    const custName = document.getElementById("custName").value;
    const menuOrdered = document.getElementById("menuInput").value;
    const totalPrice = document.getElementById("totalPriceInput").value;
    const guestCount = document.getElementById("guestCount").value;
    const visitDate = document.getElementById("visitDate").value;
    const visitTime = document.getElementById("visitTime").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const notes = document.getElementById("notes").value || "-";

    if (!menuOrdered) {
        alert("Silakan pilih minimal 1 menu dengan menekan tombol + pada gambar menu.");
        return;
    }

    const pesan = `Halo *${branchName}*, saya ingin melakukan pemesanan/reservasi:%0A%0A` +
        `*Nama:* ${custName}%0A` +
        `*Menu Dipesan:* ${menuOrdered}%0A` +
        `*Total Harga:* ${totalPrice}%0A` +
        `*Jumlah Tamu:* ${guestCount} Orang%0A` +
        `*Tanggal:* ${visitDate}%0A` +
        `*Jam:* ${visitTime}%0A` +
        `*Pembayaran:* ${paymentMethod}%0A` +
        `*Catatan:* ${notes}%0A%0A` +
        `Terima kasih!`;

    const waUrl = `https://wa.me/${waNumber}?text=${pesan}`;
    window.open(waUrl, "_blank");
}