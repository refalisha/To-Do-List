console.log("Aplikasi To-Do List Dimulai!");

// Aktivitas 1: DOM Selection / Seleksi Elemen
// harus "menangkap element" sebelum memanipulasi HTML
// Ambil elemen -> simpan di dalam variabel

// 1. Mengambil elemen input & tombol tambah
// document.getElementById("...") -> ambil elemen HTML berdasarkan ID
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");

// 2. Mengambil elemen daftar tugas (<ul>)
// document.querySelector("#...") menargetkan ID berdasarkan atribut ID
// tanda (#) artinya menargetkan ID
const daftarTugas = document.querySelector("#daftar-tugas");

// 3. Mengambil elemen angka statistik
const statTotal = document.getElementById("stat-total");
const statSelesai = document.getElementById("stat-selesai");
const statBelum = document.getElementById("stat-belum");

// 4. Mengambil elemen gambar info (daftar kosong & semua selesai)
const pesanKosong = document.getElementById("pesan-kosong");
const pesanSelesai = document.getElementById("pesan-selesai");

// Aktivitas 2: Membuat To-Do List dinamis & rekap statistik
// Di bagian ini membuat elemen <li> baru lewat JavaScript,
// memberi checkbox & tombol hapus, lalu menghitung jumlah tugas

// Langkah 1: Membuat variabel penampung jumlah tugas
// (dipakai untuk statistik & menentukan gambar mana yang muncul)
// "let" digunakan karena nilainya akan berubah-ubah
let totalTugas = 0;
let tugasSelesai = 0;

// Langkah 2: Membuat fungsi untuk memperbarui statistik & gambar info
// Fungsi ini dipanggil setiap ada perubahan (tambah, centang, hapus)
function perbaruiTampilan() {
  // Belum selesai = total tugas dikurangi tugas yang sudah selesai
  const tugasBelum = totalTugas - tugasSelesai;

  // Masukkan angka terbaru ke dalam elemen HTML statistik
  statTotal.innerText = totalTugas;
  statSelesai.innerText = tugasSelesai;
  statBelum.innerText = tugasBelum;

  // Percabangan kondisi: gambar mana yang ditampilkan?
  if (totalTugas === 0) {
    // Belum ada tugas -> tampilkan gambar "kosong"
    pesanKosong.classList.remove("hidden");
    pesanSelesai.classList.add("hidden");
  } else if (tugasBelum === 0) {
    // Semua tugas sudah selesai -> tampilkan gambar "hore"
    pesanKosong.classList.add("hidden");
    pesanSelesai.classList.remove("hidden");
  } else {
    // Masih ada tugas yang belum selesai -> sembunyikan keduanya
    pesanKosong.classList.add("hidden");
    pesanSelesai.classList.add("hidden");
  }
}

// Langkah 3: Membuat fungsi untuk menambahkan tugas baru
function tambahTugas() {
  // 3.1 inputTugas.value -> mengambil teks yang diketik user
  // .trim() -> menghapus spasi kosong di awal dan akhir teks
  const isiTugas = inputTugas.value.trim();

  // 3.2 Validasi input: jika kosong, tampilkan alert
  if (isiTugas === "") {
    alert("Catatan Anda tidak boleh kosong");
    return; // hentikan fungsi jika input kosong
  }

  // 3.3 createElement("li") -> membuat elemen <li> baru di JavaScript
  const liBaru = document.createElement("li");
  liBaru.className = "task-item"; // memberi class agar tampilannya sesuai CSS

  // 3.4 innerHTML -> mengisi <li> dengan checkbox, teks tugas, dan tombol hapus
  // Tanda backtick (`) agar bisa menyisipkan variabel dengan ${namaVariabel}
  liBaru.innerHTML = `
    <label class="task-label">
      <input type="checkbox" class="task-check" />
      <span class="task-teks">${isiTugas}</span>
    </label>
    <button class="btn-hapus" title="Hapus tugas">×</button>
  `;

  // 3.5 Mengambil checkbox & tombol hapus yang ada di dalam <li> ini
  // querySelector(".nama-class") -> tanda (.) artinya menargetkan class
  const checkbox = liBaru.querySelector(".task-check");
  const btnHapus = liBaru.querySelector(".btn-hapus");

  // 3.6 Fitur tandai selesai (saat checkbox dicentang)
  checkbox.addEventListener("click", function () {
    // .classList.toggle("completed") -> saklar ON/OFF, teks dicoret lewat CSS
    liBaru.classList.toggle("completed");

    // checkbox.checked bernilai true jika dicentang, false jika tidak
    if (checkbox.checked) {
      tugasSelesai++;
      console.log(`DOM Tugas "${isiTugas}" ditandai selesai`);
    } else {
      tugasSelesai--;
      console.log(`DOM Tugas "${isiTugas}" batal ditandai selesai`);
    }

    perbaruiTampilan();
  });

  // 3.7 Fitur hapus tugas
  btnHapus.addEventListener("click", function () {
    // Jika tugas yang dihapus sudah selesai, jumlah tugas selesai ikut dikurangi
    if (checkbox.checked) {
      tugasSelesai--;
    }

    liBaru.remove(); // menghapus elemen <li> dari layar
    totalTugas--; // mengurangi jumlah tugas
    perbaruiTampilan(); // memperbarui statistik & gambar info
    console.log(`DOM Tugas "${isiTugas}" telah dihapus`);
  });

  // 3.8 .appendChild(liBaru) -> menempelkan <li> baru ke dalam <ul>
  daftarTugas.appendChild(liBaru);

  // 3.9 Mengosongkan input setelah tugas ditambahkan
  inputTugas.value = "";

  // 3.10 Menambah jumlah tugas lalu memperbarui tampilan
  totalTugas++;
  perbaruiTampilan();

  console.log(`DOM Tugas baru ditambahkan: "${isiTugas}"`);
}

// Langkah 4: Event Listener untuk tombol tambah
// Ketika tombol "Tambah" diklik, jalankan fungsi tambahTugas
btnTambah.addEventListener("click", function () {
  tambahTugas();
});

// Langkah 5: Event Listener untuk tombol "Enter" di kolom input
inputTugas.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    tambahTugas();
  }
});
