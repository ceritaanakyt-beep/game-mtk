import { QuizQuestion, ShapeItem, StickerReward } from '../types';

export interface NumberDetail {
  number: number;
  word: string;
  emoji: string;
  itemName: string;
  color: string;
  rhyme: string;
}

export const NUMBERS_DATA: NumberDetail[] = [
  { number: 1, word: 'Satu', emoji: '🍎', itemName: 'Apel Merah', color: 'bg-rose-500 text-white', rhyme: 'Satu seperti tiang bendera 🚩' },
  { number: 2, word: 'Dua', emoji: '🦆', itemName: 'Bebek Berenang', color: 'bg-amber-500 text-white', rhyme: 'Dua seperti bebek berenang 🦢' },
  { number: 3, word: 'Tiga', emoji: '🦋', itemName: 'Kupu-kupu', color: 'bg-emerald-500 text-white', rhyme: 'Tiga seperti burung terbang 🕊️' },
  { number: 4, word: 'Empat', emoji: '🚗', itemName: 'Mobil Cilik', color: 'bg-sky-500 text-white', rhyme: 'Empat seperti kursi terbalik 🪑' },
  { number: 5, word: 'Lima', emoji: '⭐', itemName: 'Bintang Terang', color: 'bg-violet-500 text-white', rhyme: 'Lima seperti badut berperut gendut 🤡' },
  { number: 6, word: 'Enam', emoji: '🍓', itemName: 'Stroberi Manis', color: 'bg-pink-500 text-white', rhyme: 'Enam seperti peluit ditiup 🎺' },
  { number: 7, word: 'Tujuh', emoji: '🍦', itemName: 'Es Krim Lezat', color: 'bg-teal-500 text-white', rhyme: 'Tujuh seperti cangkul Pak Tani 🌾' },
  { number: 8, word: 'Delapan', emoji: '🎈', itemName: 'Balon Terbang', color: 'bg-indigo-500 text-white', rhyme: 'Delapan seperti kacamata bulat 👓' },
  { number: 9, word: 'Sembilan', emoji: '🐱', itemName: 'Kucing Lucu', color: 'bg-orange-500 text-white', rhyme: 'Sembilan seperti tongkat kakek 🦯' },
  { number: 10, word: 'Sepuluh', emoji: '🌻', itemName: 'Bunga Matahari', color: 'bg-yellow-500 text-slate-900', rhyme: 'Sepuluh seperti jarum dan telur 🥚' },
  { number: 11, word: 'Sebelas', emoji: '🥕', itemName: 'Wortel Kelinci', color: 'bg-amber-600 text-white', rhyme: 'Sebelas, ada sepuluh tambah satu' },
  { number: 12, word: 'Dua Belas', emoji: '🍰', itemName: 'Kue Ulang Tahun', color: 'bg-rose-400 text-white', rhyme: 'Dua belas, satu puluhan dan dua satuan' },
  { number: 13, word: 'Tiga Belas', emoji: '🚀', itemName: 'Roket Angkasa', color: 'bg-blue-600 text-white', rhyme: 'Tiga belas, meluncur tinggi ke bintang' },
  { number: 14, word: 'Empat Belas', emoji: '🐠', itemName: 'Ikan Hias', color: 'bg-cyan-600 text-white', rhyme: 'Empat belas ikan berenang di kolam' },
  { number: 15, word: 'Lima Belas', emoji: '🍉', itemName: 'Semangka Segar', color: 'bg-emerald-600 text-white', rhyme: 'Lima belas potong semangka manis' },
  { number: 16, word: 'Enam Belas', emoji: '🧁', itemName: 'Kue Mangkuk', color: 'bg-fuchsia-500 text-white', rhyme: 'Enam belas kue mangkuk beraneka rasa' },
  { number: 17, word: 'Tujuh Belas', emoji: '⚽', itemName: 'Bola Sepak', color: 'bg-slate-700 text-white', rhyme: 'Tujuh belas, tanggal kemerdekaan kita' },
  { number: 18, word: 'Delapan Belas', emoji: '🍇', itemName: 'Anggur Ungu', color: 'bg-purple-600 text-white', rhyme: 'Delapan belas butir buah anggur manis' },
  { number: 19, word: 'Sembilan Belas', emoji: '🍭', itemName: 'Permen Lolipop', color: 'bg-pink-600 text-white', rhyme: 'Sembilan belas lolipop warna-warni' },
  { number: 20, word: 'Dua Puluh', emoji: '🎁', itemName: 'Kado Kejutan', color: 'bg-red-600 text-white', rhyme: 'Dua puluh, dua puluhan penuh hadiah!' },
];

export const SHAPES_DATA: ShapeItem[] = [
  {
    id: 'lingkaran',
    name: 'Lingkaran',
    sides: 0,
    corners: 0,
    color: 'border-rose-400 bg-rose-50 text-rose-600',
    description: 'Bulat sempurna tanpa sudut dan tanpa sisi lurus. Bisa menggelinding!',
    examples: [
      { name: 'Roda Sepeda', emoji: '🚲' },
      { name: 'Jam Dinding', emoji: '⏰' },
      { name: 'Koin Logam', emoji: '🪙' },
      { name: 'Pizza Bulat', emoji: '🍕' }
    ]
  },
  {
    id: 'segitiga',
    name: 'Segitiga',
    sides: 3,
    corners: 3,
    color: 'border-amber-400 bg-amber-50 text-amber-600',
    description: 'Memiliki 3 sisi lurus dan 3 sudut lancip yang saling bertemu.',
    examples: [
      { name: 'Potongan Pizza', emoji: '🍕' },
      { name: 'Atap Rumah', emoji: '🏠' },
      { name: 'Tenda Kemah', emoji: '⛺' },
      { name: 'Gantungan Baju', emoji: '🧥' }
    ]
  },
  {
    id: 'persegi',
    name: 'Persegi (Segi Empat Sama Sisi)',
    sides: 4,
    corners: 4,
    color: 'border-emerald-400 bg-emerald-50 text-emerald-600',
    description: 'Memiliki 4 sisi yang panjangnya persis sama dan 4 sudut siku-siku.',
    examples: [
      { name: 'Dadu Permainan', emoji: '🎲' },
      { name: 'Biskuit Kotak', emoji: '🍪' },
      { name: 'Ubin Lantai', emoji: '🧱' },
      { name: 'Kado Kubus', emoji: '🎁' }
    ]
  },
  {
    id: 'persegi_panjang',
    name: 'Persegi Panjang',
    sides: 4,
    corners: 4,
    color: 'border-sky-400 bg-sky-50 text-sky-600',
    description: 'Memiliki 4 sisi, 2 sisi panjang dan 2 sisi pendek yang sejajar.',
    examples: [
      { name: 'Papan Tulis', emoji: '📋' },
      { name: 'Buku Tulis', emoji: '📖' },
      { name: 'Pintu Kelas', emoji: '🚪' },
      { name: 'Uang Kertas', emoji: '💵' }
    ]
  }
];

export const PATTERNS_DATA = [
  {
    id: 'pat-1',
    sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
    nextOptions: ['🍌', '🍎', '🍇'],
    correct: '🍌',
    hint: 'Lihat selang-seling: Apel, Pisang, Apel, Pisang, Apel, lalu...?'
  },
  {
    id: 'pat-2',
    sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'],
    nextOptions: ['🔵', '🔴', '🟢'],
    correct: '🔵',
    hint: 'Merah, Biru, Merah, Biru, Merah, berikutnya warna apa?'
  },
  {
    id: 'pat-3',
    sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'],
    nextOptions: ['🌙', '⭐', '☀️'],
    correct: '🌙',
    hint: 'Bintang, Bintang, Bulan, Bintang, Bintang, berikutnya...?'
  },
  {
    id: 'pat-4',
    sequence: ['🔺', '🟢', '🔺', '🟢', '🔺'],
    nextOptions: ['🟢', '🔺', '🟦'],
    correct: '🟢',
    hint: 'Segitiga, Lingkaran, Segitiga, Lingkaran, Segitiga...?'
  }
];

export const INITIAL_STICKERS: StickerReward[] = [
  { id: 'stk-1', name: 'Bintang Kejora', emoji: '⭐', desc: 'Menyelesaikan pengenalan angka 1 sampai 10', unlocked: true },
  { id: 'stk-2', name: 'Jago Berhitung', emoji: '🧮', desc: 'Menjawab benar pada latihan hitung benda', unlocked: false },
  { id: 'stk-3', name: 'Master Tambah', emoji: '➕', desc: 'Menyelesaikan misi penjumlahan ceria', unlocked: false },
  { id: 'stk-4', name: 'Jago Balon Kurang', emoji: '🎈', desc: 'Meletuskan balon pada pengurangan', unlocked: false },
  { id: 'stk-5', name: 'Detektif Bentuk', emoji: '🔍', desc: 'Mengenal seluruh bangun datar dasar', unlocked: false },
  { id: 'stk-6', name: 'Juara Matematika', emoji: '🏆', desc: 'Menyelesaikan Kuis Bintang dengan nilai tinggi', unlocked: false },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    type: 'count',
    question: 'Ada berapa buah stroberi di bawah ini?',
    visualType: 'emojis',
    visualData: {
      items: ['🍓', '🍓', '🍓', '🍓', '🍓']
    },
    options: [
      { label: '3', value: 3 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '4', value: 4 },
    ],
    correctAnswer: 5,
    explanation: 'Hebat! Mari hitung bersama: 1, 2, 3, 4, 5. Ada 5 buah stroberi!'
  },
  {
    id: 'q-2',
    type: 'compare',
    question: 'Bandingkan jumlah apel di kiri dan jeruk di kanan:',
    visualType: 'emojis',
    visualData: {
      leftItems: ['🍎', '🍎', '🍎', '🍎'],
      rightItems: ['🍊', '🍊']
    },
    options: [
      { label: 'Lebih Banyak ( > )', value: 'lebih_banyak' },
      { label: 'Lebih Sedikit ( < )', value: 'lebih_sedikit' },
      { label: 'Sama Banyak ( = )', value: 'sama' },
    ],
    correctAnswer: 'lebih_banyak',
    explanation: 'Benar sekali! 4 apel lebih banyak daripada 2 jeruk (4 > 2).'
  },
  {
    id: 'q-3',
    type: 'addition',
    question: 'Berapa hasil dari 3 + 2?',
    visualType: 'emojis',
    visualData: {
      leftItems: ['⭐', '⭐', '⭐'],
      operator: '+',
      rightItems: ['⭐', '⭐']
    },
    options: [
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
    ],
    correctAnswer: 5,
    explanation: 'Tepat! 3 bintang ditambah 2 bintang digabung menjadi 5 bintang!'
  },
  {
    id: 'q-4',
    type: 'subtraction',
    question: 'Mula-mula ada 6 donat. Dimakan 2 donat. Sisanya berapa ya?',
    visualType: 'emojis',
    visualData: {
      leftItems: ['🍩', '🍩', '🍩', '🍩'],
      operator: '-',
      rightItems: ['🍩', '🍩']
    },
    options: [
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '2', value: 2 },
    ],
    correctAnswer: 4,
    explanation: 'Pintar! 6 dikurangi 2 sisanya adalah 4 donat.'
  },
  {
    id: 'q-5',
    type: 'shape',
    question: 'Bangun datar manakah yang berbentuk Lingkaran bulat?',
    options: [
      { label: 'Roda Sepeda', value: 'lingkaran', icon: '🚲' },
      { label: 'Buku Tulis', value: 'persegi_panjang', icon: '📖' },
      { label: 'Atap Rumah', value: 'segitiga', icon: '🏠' },
    ],
    correctAnswer: 'lingkaran',
    explanation: 'Luar biasa! Roda sepeda berbentuk lingkaran yang bulat sempurna.'
  },
  {
    id: 'q-6',
    type: 'addition',
    question: 'Berapa hasil dari 6 + 4?',
    visualType: 'emojis',
    visualData: {
      leftItems: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'],
      operator: '+',
      rightItems: ['🎈', '🎈', '🎈', '🎈']
    },
    options: [
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: '11', value: 11 },
      { label: '8', value: 8 },
    ],
    correctAnswer: 10,
    explanation: 'Keren! 6 + 4 = 10. Pasangan sepuluh yang hebat!'
  },
  {
    id: 'q-7',
    type: 'subtraction',
    question: 'Berapa hasil dari 7 - 3?',
    visualType: 'emojis',
    visualData: {
      items: ['🥕', '🥕', '🥕', '🥕', '🥕', '🥕', '🥕'],
      burstCount: 3
    },
    options: [
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
    ],
    correctAnswer: 4,
    explanation: 'Hebat! Ada 7 wortel, kelinci memakan 3 wortel, tersisa 4 wortel!'
  },
  {
    id: 'q-8',
    type: 'pattern',
    question: 'Lanjutkan pola ini: 🔴, 🟡, 🔴, 🟡, ... berikutnya apa?',
    options: [
      { label: 'Merah (🔴)', value: '🔴' },
      { label: 'Kuning (🟡)', value: '🟡' },
      { label: 'Hijau (🟢)', value: '🟢' },
    ],
    correctAnswer: '🔴',
    explanation: 'Benar! Polanya berselang-seling: merah, kuning, merah, kuning, lalu merah!'
  },
  {
    id: 'q-9',
    type: 'count',
    question: 'Berapa jumlah kelinci lucu ini?',
    visualType: 'emojis',
    visualData: {
      items: ['🐰', '🐰', '🐰', '🐰', '🐰', '🐰', '🐰']
    },
    options: [
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
    ],
    correctAnswer: 7,
    explanation: 'Tepat sekali! Ada 7 ekor kelinci yang melompat!'
  },
  {
    id: 'q-10',
    type: 'addition',
    question: 'Ibu membeli 5 kue bolu, lalu Ayah membawa 5 kue bolu lagi. Ada berapa semua kue?',
    visualType: 'emojis',
    visualData: {
      leftItems: ['🧁', '🧁', '🧁', '🧁', '🧁'],
      operator: '+',
      rightItems: ['🧁', '🧁', '🧁', '🧁', '🧁']
    },
    options: [
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: '12', value: 12 },
    ],
    correctAnswer: 10,
    explanation: 'Benar! 5 kue ditambah 5 kue = 10 kue bolu.'
  }
];
