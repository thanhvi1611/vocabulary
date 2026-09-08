// ==========================================
// 1. DỮ LIỆU BỘ 44 ÂM IPA CHUẨN
// ==========================================
const ipaData = [
  // NGUYÊN ÂM ĐƠN (12)
  { symbol: "/iː/", type: "Nguyên âm dài", guide: "Môi kéo dài sang hai bên như mỉm cười, lưỡi nâng cao gần chạm ngạc trên.", examples: [{w: "See", i: "/siː/"}, {w: "Tea", i: "/tiː/"}, {w: "Read", i: "/riːd/"}] },
  { symbol: "/ɪ/", type: "Nguyên âm ngắn", guide: "Môi hơi mở, thả lỏng hơn /iː/, lưỡi hạ thấp hơn một chút, âm ngắn gọn.", examples: [{w: "Sit", i: "/sɪt/"}, {w: "Hit", i: "/hɪt/"}, {w: "Big", i: "/bɪɡ/"}] },
  { symbol: "/ʊ/", type: "Nguyên âm ngắn", guide: "Môi hơi tròn nhô ra phía trước, lưỡi lùi về sau, phát âm ngắn dứt khoát.", examples: [{w: "Put", i: "/pʊt/"}, {w: "Book", i: "/bʊk/"}, {w: "Look", i: "/lʊk/"}] },
  { symbol: "/uː/", type: "Nguyên âm dài", guide: "Môi tròn và chu ra rõ rệt, lưỡi nâng cao về phía sau, phát âm kéo dài.", examples: [{w: "Too", i: "/tuː/"}, {w: "Blue", i: "/bluː/"}, {w: "Food", i: "/fuːd/"}] },
  { symbol: "/e/", type: "Nguyên âm ngắn", guide: "Miệng mở rộng hơn âm /ɪ/, lưỡi hạ thấp hơn, âm phát ra ngắn tựa như 'e'.", examples: [{w: "Bed", i: "/bed/"}, {w: "Pen", i: "/pen/"}, {w: "Red", i: "/red/"}] },
  { symbol: "/ə/", type: "Nguyên âm ngắn (Schwa)", guide: "Miệng mở tự nhiên, lưỡi và môi thả lỏng ở trung tâm, âm phát rất nhẹ ngắn.", examples: [{w: "About", i: "/əˈbaʊt/"}, {w: "Teacher", i: "/ˈtiːtʃər/"}] },
  { symbol: "/ɜː/", type: "Nguyên âm dài", guide: "Miệng mở vừa, môi thả lỏng, lưỡi đặt giữa khoang miệng, ngân dài.", examples: [{w: "Bird", i: "/bɜːd/"}, {w: "Shirt", i: "/ʃɜːt/"}, {w: "Learn", i: "/lɜːn/"}] },
  { symbol: "/ɔː/", type: "Nguyên âm dài", guide: "Tròn môi rõ rệt, lưỡi hạ thấp lùi sâu về sau, âm ngân dài.", examples: [{w: "Door", i: "/dɔːr/"}, {w: "Saw", i: "/sɔː/"}, {w: "More", i: "/mɔːr/"}] },
  { symbol: "/æ/", type: "Nguyên âm ngắn", guide: "Mở rộng miệng (kết hợp 'a' và 'e'), hạ cằm thấp, lưỡi nằm sát đáy miệng.", examples: [{w: "Cat", i: "/kæt/"}, {w: "Bad", i: "/bæd/"}, {w: "Apple", i: "/ˈæpl/"}] },
  { symbol: "/ʌ/", type: "Nguyên âm ngắn", guide: "Miệng mở vừa phải, lưỡi nâng nhẹ lùi về sau, âm gọn giống 'ă/â'.", examples: [{w: "Cup", i: "/kʌp/"}, {w: "Bus", i: "/bʌs/"}, {w: "Sun", i: "/sʌn/"}] },
  { symbol: "/ɑː/", type: "Nguyên âm dài", guide: "Miệng mở rộng tối đa chiều dọc, lưỡi đè thấp, phát âm sâu từ cổ họng.", examples: [{w: "Car", i: "/kɑːr/"}, {w: "Far", i: "/fɑːr/"}, {w: "Heart", i: "/hɑːt/"}] },
  { symbol: "/ɒ/", type: "Nguyên âm ngắn", guide: "Miệng mở rộng, môi tròn nhẹ, lưỡi hạ thấp lùi về sau, âm dứt khoát.", examples: [{w: "On", i: "/ɒn/"}, {w: "Hot", i: "/hɒt/"}, {w: "Stop", i: "/stɒp/"}] },

  // NGUYÊN ÂM ĐÔI (8)
  { symbol: "/ɪə/", type: "Nguyên âm đôi", guide: "Chuyển mượt từ âm /ɪ/ (hẹp) sang âm /ə/ (thả lỏng), âm đầu rõ dài hơn.", examples: [{w: "Ear", i: "/ɪər/"}, {w: "Near", i: "/nɪər/"}, {w: "Here", i: "/hɪər/"}] },
  { symbol: "/eɪ/", type: "Nguyên âm đôi", guide: "Chuyển mượt từ âm /e/ (mở vừa) sang âm /ɪ/ (kéo ngang môi sang hai bên).", examples: [{w: "Say", i: "/seɪ/"}, {w: "Name", i: "/neɪm/"}, {w: "Rain", i: "/reɪn/"}] },
  { symbol: "/ʊə/", type: "Nguyên âm đôi", guide: "Chuyển mượt từ âm /ʊ/ (môi tròn nhô) sang âm /ə/ (thả lỏng trung tâm).", examples: [{w: "Pure", i: "/pjʊər/"}, {w: "Tour", i: "/tʊər/"}, {w: "Cure", i: "/kjʊər/"}] },
  { symbol: "/ɔɪ/", type: "Nguyên âm đôi", guide: "Chuyển từ âm /ɔː/ (tròn môi) sang âm /ɪ/ (dẹt môi nhẹ sang hai bên).", examples: [{w: "Boy", i: "/bɔɪ/"}, {w: "Toy", i: "/tɔɪ/"}, {w: "Voice", i: "/vɔɪs/"}] },
  { symbol: "/əʊ/", type: "Nguyên âm đôi", guide: "Chuyển từ âm /ə/ (thả lỏng) sang âm /ʊ/ (môi thu hẹp tròn lại).", examples: [{w: "Go", i: "/ɡəʊ/"}, {w: "Home", i: "/həʊm/"}, {w: "No", i: "/nəʊ/"}] },
  { symbol: "/eə/", type: "Nguyên âm đôi", guide: "Chuyển mượt từ âm /e/ (mở miệng vừa) sang âm /ə/ (thả lỏng).", examples: [{w: "Hair", i: "/heər/"}, {w: "Chair", i: "/tʃeər/"}, {w: "Where", i: "/weər/"}] },
  { symbol: "/aɪ/", type: "Nguyên âm đôi", guide: "Bắt đầu bằng /a/ (mở rộng) rồi thu hẹp khẩu hình trượt lên âm /ɪ/.", examples: [{w: "My", i: "/maɪ/"}, {w: "Time", i: "/taɪm/"}, {w: "Sky", i: "/skaɪ/"}] },
  { symbol: "/aʊ/", type: "Nguyên âm đôi", guide: "Bắt đầu bằng /a/ (mở rộng) rồi tròn môi trượt sang âm /ʊ/.", examples: [{w: "Cow", i: "/kaʊ/"}, {w: "Now", i: "/naʊ/"}, {w: "House", i: "/haʊs/"}] },

  // PHỤ ÂM (24)
  { symbol: "/p/", type: "Phụ âm vô thanh", guide: "Khép hai môi chặn không khí, bật mạnh hơi ra ngoài. Không rung cổ họng.", examples: [{w: "Pen", i: "/pen/"}, {w: "Pop", i: "/pɒp/"}, {w: "Map", i: "/mæp/"}] },
  { symbol: "/b/", type: "Phụ âm hữu thanh", guide: "Môi khép bật âm giống /p/, nhưng phát âm CÓ rung cổ họng.", examples: [{w: "Bad", i: "/bæd/"}, {w: "Big", i: "/bɪɡ/"}, {w: "Cab", i: "/kæb/"}] },
  { symbol: "/t/", type: "Phụ âm vô thanh", guide: "Đầu lưỡi chạm gờ răng trên chặn khí, bật hơi ra. Không rung cổ họng.", examples: [{w: "Tea", i: "/tiː/"}, {w: "Ten", i: "/ten/"}, {w: "Cat", i: "/kæt/"}] },
  { symbol: "/d/", type: "Phụ âm hữu thanh", guide: "Vị trí lưỡi giống âm /t/ nhưng bật âm CÓ rung cổ họng.", examples: [{w: "Do", i: "/duː/"}, {w: "Dog", i: "/dɒɡ/"}, {w: "Red", i: "/red/"}] },
  { symbol: "/tʃ/", type: "Phụ âm vô thanh", guide: "Môi chu ra trước, đầu lưỡi chạm gờ răng trên bật hơi mạnh. Không rung cổ.", examples: [{w: "Chair", i: "/tʃeər/"}, {w: "Church", i: "/tʃɜːtʃ/"}] },
  { symbol: "/dʒ/", type: "Phụ âm hữu thanh", guide: "Khẩu hình môi và lưỡi giống /tʃ/, nhưng phát âm CÓ rung cổ họng.", examples: [{w: "Job", i: "/dʒɒb/"}, {w: "Joy", i: "/dʒɔɪ/"}, {w: "Age", i: "/eɪdʒ/"}] },
  { symbol: "/k/", type: "Phụ âm vô thanh", guide: "Cuống lưỡi nâng lên chạm ngạc mềm chặn khí, bật hơi ra. Không rung cổ.", examples: [{w: "Key", i: "/kiː/"}, {w: "Cat", i: "/kæt/"}, {w: "Back", i: "/bæk/"}] },
  { symbol: "/ɡ/", type: "Phụ âm hữu thanh", guide: "Vị trí cuống lưỡi giống /k/, bật âm CÓ rung cổ họng.", examples: [{w: "Go", i: "/ɡəʊ/"}, {w: "Get", i: "/ɡet/"}, {w: "Bag", i: "/bæɡ/"}] },
  { symbol: "/f/", type: "Phụ âm vô thanh", guide: "Răng cửa trên chạm nhẹ môi dưới, đẩy hơi qua kẽ răng. Không rung cổ.", examples: [{w: "Fish", i: "/fɪʃ/"}, {w: "Food", i: "/fuːd/"}] },
  { symbol: "/v/", type: "Phụ âm hữu thanh", guide: "Răng và môi đặt giống /f/, đẩy hơi CÓ rung cổ họng.", examples: [{w: "Voice", i: "/vɔɪs/"}, {w: "Very", i: "/ˈveri/"}, {w: "Love", i: "/lʌv/"}] },
  { symbol: "/θ/", type: "Phụ âm vô thanh", guide: "Đặt đầu lưỡi giữa hai hàng răng cửa, thổi luồng hơi ra. Không rung cổ.", examples: [{w: "Think", i: "/θɪŋk/"}, {w: "Bath", i: "/bɑːθ/"}] },
  { symbol: "/ð/", type: "Phụ âm hữu thanh", guide: "Đặt đầu lưỡi giữa hai hàng răng giống /θ/, nhưng phát âm CÓ rung cổ.", examples: [{w: "This", i: "/ðɪs/"}, {w: "That", i: "/ðæt/"}, {w: "Mother", i: "/ˈmʌðər/"}] },
  { symbol: "/s/", type: "Phụ âm vô thanh", guide: "Hai hàm răng khép gần sát, xì hơi qua kẽ răng. Không rung cổ họng.", examples: [{w: "Sun", i: "/sʌn/"}, {w: "See", i: "/siː/"}, {w: "Bus", i: "/bʌs/"}] },
  { symbol: "/z/", type: "Phụ âm hữu thanh", guide: "Khẩu hình giống /s/, xì hơi CÓ rung cổ họng (như tiếng ong kêu).", examples: [{w: "Zoo", i: "/zuː/"}, {w: "Zip", i: "/zɪp/"}, {w: "Rose", i: "/rəʊz/"}] },
  { symbol: "/ʃ/", type: "Phụ âm vô thanh", guide: "Môi tròn chu ra trước, uốn nhẹ lưỡi thổi hơi mạnh. Không rung cổ.", examples: [{w: "She", i: "/ʃiː/"}, {w: "Shoe", i: "/ʃuː/"}, {w: "Fish", i: "/fɪʃ/"}] },
  { symbol: "/ʒ/", type: "Phụ âm hữu thanh", guide: "Khẩu hình giống /ʃ/, nhưng xì hơi CÓ rung cổ họng.", examples: [{w: "Vision", i: "/ˈvɪʒn/"}, {w: "Measure", i: "/ˈmeʒər/"}] },
  { symbol: "/m/", type: "Phụ âm hữu thanh (Âm mũi)", guide: "Khép hai môi, hơi thoát hoàn toàn qua đường mũi. Rung cổ họng.", examples: [{w: "Man", i: "/mæn/"}, {w: "Moon", i: "/muːn/"}] },
  { symbol: "/n/", type: "Phụ âm hữu thanh (Âm mũi)", guide: "Đầu lưỡi chạm gờ răng trên, hơi thoát qua đường mũi. Rung cổ họng.", examples: [{w: "No", i: "/nəʊ/"}, {w: "Name", i: "/neɪm/"}] },
  { symbol: "/ŋ/", type: "Phụ âm hữu thanh (Âm mũi)", guide: "Cuống lưỡi nâng chặn khoang miệng, hơi thoát qua mũi. Rung cổ họng.", examples: [{w: "Sing", i: "/sɪŋ/"}, {w: "Long", i: "/lɒŋ/"}] },
  { symbol: "/h/", type: "Phụ âm vô thanh", guide: "Miệng mở tự nhiên, đẩy hơi nhẹ từ cổ họng ra như thở dốc. Không rung.", examples: [{w: "Hat", i: "/hæt/"}, {w: "Hot", i: "/hɒt/"}] },
  { symbol: "/l/", type: "Phụ âm hữu thanh", guide: "Đầu lưỡi chạm gờ răng trên, hơi thoát ra hai bên cạnh lưỡi. Rung cổ.", examples: [{w: "Leg", i: "/leɡ/"}, {w: "Love", i: "/lʌv/"}] },
  { symbol: "/r/", type: "Phụ âm hữu thanh", guide: "Đầu lưỡi uốn cong về sau (không chạm ngạc), môi hơi tròn. Rung cổ.", examples: [{w: "Red", i: "/red/"}, {w: "Run", i: "/rʌn/"}] },
  { symbol: "/w/", type: "Phụ âm hữu thanh", guide: "Môi tròn chu ra giống /uː/, sau đó nhanh chóng mở rộng ra. Rung cổ.", examples: [{w: "Wet", i: "/wet/"}, {w: "Win", i: "/wɪn/"}] },
  { symbol: "/j/", type: "Phụ âm hữu thanh", guide: "Nâng thân lưỡi lên gần ngạc cứng giống /iː/, hạ lưỡi thoát khí. Rung cổ.", examples: [{w: "Yes", i: "/jes/"}, {w: "You", i: "/juː/"}] }
];

let currentIpaIndex = 0;

// ==========================================
// 2. CẤU HÌNH FIREBASE & BIẾN TOÀN CỤC
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDBYya0brt3P_vvqU9Qfwub7RRPl7fpDGo",
  authDomain: "hoctuvungtienganh.firebaseapp.com",
  databaseURL: "https://hoctuvungtienganh-default-rtdb.firebaseio.com",
  projectId: "hoctuvungtienganh",
  storageBucket: "hoctuvungtienganh.firebasestorage.app",
  messagingSenderId: "171769209995",
  appId: "1:171769209995:web:639a3e5d2a061793fbe08e",
  measurementId: "G-CD3H20WE4V"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

let SYNC_CODE = localStorage.getItem('user_sync_code') || 'DefaultCode';
let userHasInteracted = false;
let wakeLock = null;

// ==========================================
// 3. KHỞI TẠO VÀ XỬ LÝ SỰ KIỆN CHÍNH
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // ELEMENT REFS - TAB NAVIGATION
  const tabAddBtn = document.getElementById('tab-add-btn');
  const tabPracticeBtn = document.getElementById('tab-practice-btn');
  const tabManageBtn = document.getElementById('tab-manage-btn');
  const tabIpaBtn = document.getElementById('tab-ipa-btn');

  const addView = document.getElementById('add-view');
  const practiceView = document.getElementById('practice-view');
  const manageView = document.getElementById('manage-view');
  const ipaView = document.getElementById('ipa-view');

  // ELEMENT REFS - FORM & QUIZ
  const syncInput = document.getElementById('sync-code-input');
  const btnSaveSyncCode = document.getElementById('btn-save-sync-code');
  const inputWord = document.getElementById('input-word');
  const inputMeaning = document.getElementById('input-meaning');
  const inputPhonetic = document.getElementById('input-phonetic');
  const btnTranslate = document.getElementById('btn-translate');
  const btnSaveVocab = document.getElementById('btn-save-vocab');
  const statusDiv = document.getElementById('status');

  const typeBadge = document.getElementById('type-badge');
  const progressText = document.getElementById('progress-text');
  const speechRateSelect = document.getElementById('speech-rate-select');
  const autoAudioToggle = document.getElementById('auto-audio-toggle');
  const speakBtn = document.getElementById('speak-btn');
  const meaningDiv = document.getElementById('meaning');
  const phoneticDiv = document.getElementById('phonetic');
  const typeInput = document.getElementById('type-input');
  const hintDiv = document.getElementById('hint');

  const quizArea = document.getElementById('quiz-area');
  const completedArea = document.getElementById('completed-area');
  const completeDetail = document.getElementById('complete-detail');
  const restartBtn = document.getElementById('restart-btn');
  const dayListContainer = document.getElementById('day-list-container');

  let currentSessionList = [];
  let isCustomSession = false; // Biến cờ chống Firebase ghi đè khi học bài theo ngày
  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let isAnswered = false;

  if (syncInput) syncInput.value = SYNC_CODE;

  // --- WAKE LOCK ---
  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {}
  }
  requestWakeLock();

  document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
  });

  // --- LOCALSTORAGE & FIREBASE UTILS ---
  function getStoredVocab() {
    const data = localStorage.getItem('vocabList');
    return data ? JSON.parse(data) : [];
  }

  function saveStoredVocab(list) {
    localStorage.setItem('vocabList', JSON.stringify(list));
    if (SYNC_CODE && db) {
      db.ref('users/' + SYNC_CODE).set(list)
        .catch(err => console.error('Lỗi lưu Firebase:', err));
    }
  }

  function updateDueCountBadge() {
    const fullList = getStoredVocab();
    const todayStr = new Date().toISOString().split('T')[0];
    const dueWords = fullList.filter(item => !item.nextReview || item.nextReview <= todayStr);

    const badgeEl = document.getElementById('due-count-badge');
    if (badgeEl) {
      if (dueWords.length > 0) {
        badgeEl.textContent = dueWords.length;
        badgeEl.style.display = 'inline-block';
      } else {
        badgeEl.style.display = 'none';
      }
    }
  }

  function listenToCloudData() {
    if (!SYNC_CODE || !db) return;

    db.ref('users/' + SYNC_CODE).off();
    db.ref('users/' + SYNC_CODE).on('value', (snapshot) => {
      const cloudData = snapshot.val();
      if (cloudData && Array.isArray(cloudData)) {
        localStorage.setItem('vocabList', JSON.stringify(cloudData));
        updateDueCountBadge();

        // Chỉ tự động tải lại phiên học mặc định nếu người dùng KHÔNG ở trong bài học tùy chỉnh theo ngày
        if (!isCustomSession) {
          loadVocabData();
        }

        if (manageView && manageView.style.display !== 'none') {
          renderDayList();
        }
      }
    });
  }

  if (btnSaveSyncCode) {
    btnSaveSyncCode.addEventListener('click', () => {
      const code = syncInput.value.trim();
      if (code) {
        localStorage.setItem('user_sync_code', code);
        SYNC_CODE = code;
        alert('🎉 Đã cập nhật Mã đồng bộ! Đang tải dữ liệu mới...');
        listenToCloudData();
      }
    });
  }

  // --- ĐIỀU HƯỚNG TAB ---
  function switchTab(activeBtn, activeView) {
    [tabAddBtn, tabPracticeBtn, tabManageBtn, tabIpaBtn].forEach(btn => btn?.classList.remove('active'));
    [addView, practiceView, manageView, ipaView].forEach(view => { if (view) view.style.display = 'none'; });

    if (activeBtn) activeBtn.classList.add('active');
    if (activeView) activeView.style.display = 'block';
  }

  if (tabAddBtn) tabAddBtn.addEventListener('click', () => switchTab(tabAddBtn, addView));
  if (tabPracticeBtn) tabPracticeBtn.addEventListener('click', () => switchTab(tabPracticeBtn, practiceView));
  if (tabManageBtn) {
    tabManageBtn.addEventListener('click', () => {
      switchTab(tabManageBtn, manageView);
      renderDayList();
    });
  }
  if (tabIpaBtn) {
    tabIpaBtn.addEventListener('click', () => {
      switchTab(tabIpaBtn, ipaView);
      renderIpaCard(currentIpaIndex);
    });
  }

  // --- DỊCH VÀ THÊM TỪ VỰNG ---
  function isVietnamese(text) {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text);
  }

  if (btnTranslate) {
    btnTranslate.addEventListener('click', async () => {
      const word = inputWord?.value.trim();
      if (!word) return;

      if (statusDiv) {
        statusDiv.textContent = '⏳ Đang dịch...';
        statusDiv.style.color = '#1a73e8';
      }

      const isVi = isVietnamese(word);
      const sl = isVi ? 'vi' : 'en';
      const tl = isVi ? 'en' : 'vi';

      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(word)}`);
        const data = await res.json();
        const translatedText = data[0].map(item => item[0]).join('');

        if (isVi) {
          if (inputWord) inputWord.value = translatedText;
          if (inputMeaning) inputMeaning.value = word;
        } else {
          if (inputMeaning) inputMeaning.value = translatedText;
        }

        const engWord = isVi ? translatedText : word;
        if (engWord.split(/\s+/).length === 1 && inputPhonetic) {
          try {
            const ipaRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(engWord)}`);
            if (ipaRes.ok) {
              const ipaDataArr = await ipaRes.json();
              inputPhonetic.value = ipaDataArr[0]?.phonetic || ipaDataArr[0]?.phonetics?.find(p => p.text)?.text || '';
            }
          } catch(e) {}
        }

        if (statusDiv) {
          statusDiv.textContent = '✨ Đã dịch xong!';
          statusDiv.style.color = '#34a853';
        }
      } catch (err) {
        if (statusDiv) {
          statusDiv.textContent = '❌ Lỗi kết nối dịch thuật!';
          statusDiv.style.color = '#ea4335';
        }
      }
    });
  }

  if (inputWord) {
    inputWord.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && btnTranslate) btnTranslate.click();
    });
  }

  if (btnSaveVocab) {
    btnSaveVocab.addEventListener('click', () => {
      const word = inputWord?.value.trim();
      const meaning = inputMeaning?.value.trim();
      const phonetic = inputPhonetic?.value.trim();

      if (!word || !meaning) {
        if (statusDiv) {
          statusDiv.textContent = '⚠️ Vui lòng điền đủ Từ và Nghĩa!';
          statusDiv.style.color = '#ea4335';
        }
        return;
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const list = getStoredVocab();

      list.unshift({ word, meaning, phonetic, date: todayStr, interval: 1, repetition: 0, nextReview: todayStr });
      saveStoredVocab(list);

      if (statusDiv) {
        statusDiv.textContent = '💾 Đã lưu & đồng bộ từ vựng thành công!';
        statusDiv.style.color = '#34a853';
      }

      if (inputWord) inputWord.value = '';
      if (inputMeaning) inputMeaning.value = '';
      if (inputPhonetic) inputPhonetic.value = '';

      loadVocabData();
      updateDueCountBadge();
    });
  }

  // --- LOGIC SRS SPACED REPETITION ---
  function calculateSRS(item, isCorrect) {
    const today = new Date();
    let interval = item.interval || 1;
    let repetition = item.repetition || 0;

    if (isCorrect) {
      repetition += 1;
      if (repetition === 1) interval = 1;
      else if (repetition === 2) interval = 6;
      else interval = Math.round(interval * 2.2);
    } else {
      repetition = 0;
      interval = 1;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + interval);
    return { ...item, interval, repetition, nextReview: nextDate.toISOString().split('T')[0] };
  }

  // --- KHUNG ÔN TẬP LUYỆN GÕ ---
  function loadVocabData(customList = null) {
    const fullList = getStoredVocab();
    const todayStr = new Date().toISOString().split('T')[0];

    if (customList) {
      currentSessionList = customList;
      isCustomSession = true;
    } else {
      currentSessionList = fullList.filter(item => !item.nextReview || item.nextReview <= todayStr);
      isCustomSession = false;
    }

    currentIndex = 0; correctCount = 0; wrongCount = 0;

    if (!quizArea || !completedArea) return;

    if (currentSessionList.length === 0) {
      quizArea.style.display = 'none';
      completedArea.style.display = 'block';
      if (completeDetail) completeDetail.innerHTML = '🎉 <b>Tuyệt vời!</b> Thầy đã hoàn thành hết các từ trong bài học này.';
      return;
    }

    if (typeInput) typeInput.disabled = false;
    quizArea.style.display = 'block';
    completedArea.style.display = 'none';
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    if (currentIndex >= currentSessionList.length) {
      quizArea.style.display = 'none';
      completedArea.style.display = 'block';
      if (completeDetail) {
        completeDetail.innerHTML = `Hoàn thành <b>${currentSessionList.length}</b> từ.<br>Đúng: <span style="color:#34a853; font-weight:bold;">${correctCount}</span> | Sai: <span style="color:#ea4335; font-weight:bold;">${wrongCount}</span>`;
      }
      return;
    }

    const item = currentSessionList[currentIndex];
    isAnswered = false;

    if (typeBadge) typeBadge.textContent = item.date ? `Ngày tạo: ${item.date}` : 'Từ mới';
    if (progressText) progressText.textContent = `${currentIndex + 1} / ${currentSessionList.length} từ`;
    if (meaningDiv) meaningDiv.textContent = item.meaning;
    if (phoneticDiv) phoneticDiv.textContent = item.phonetic || '';
    if (typeInput) {
      typeInput.value = '';
      typeInput.className = 'quiz-input';
      typeInput.focus();
    }
    if (hintDiv) {
      hintDiv.textContent = 'Nhấn Enter để kiểm tra';
      hintDiv.style.color = '#777';
    }

    if (autoAudioToggle?.checked) speakWord(item.word);
  }

  // --- ÂM THANH & PHÁT ÂM CHUẨN TỰ NHIÊN ---
  const unlockAudio = () => {
    userHasInteracted = true;
    const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
    silentAudio.play().catch(() => {});
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('keydown', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  function speakWord(text) {
    if (!text) return;
    const rate = parseFloat(speechRateSelect?.value) || 1.0;
    const cleanText = text.trim();

    const isSlow = rate < 0.9;
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en&client=tw-ob${isSlow ? '&ttsspeed=0.24' : ''}`;
    
    const audio = new Audio();
    audio.src = audioUrl;
    audio.playbackRate = isSlow ? 1.0 : rate;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        speakWithNaturalVoice(cleanText, rate);
      });
    }
  }

  function speakWithNaturalVoice(text, rate) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
      v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    );

    if (naturalVoice) utterance.voice = naturalVoice;
    window.speechSynthesis.speak(utterance);
  }

  // --- CHECK ANSWER & PHÍM TẮT ---
  function checkAnswer() {
    if (!currentSessionList || currentSessionList.length === 0 || !currentSessionList[currentIndex]) {
      return;
    }

    const item = currentSessionList[currentIndex];
    if (!item || !item.word) return;

    const userTyping = typeInput?.value.trim().toLowerCase();
    const targetWord = item.word.trim().toLowerCase();
    
    if (!userTyping) return;

    if (isAnswered) {
      currentIndex++;
      renderCurrentQuestion();
      return;
    }

    const isCorrect = (userTyping === targetWord);

    if (isCorrect) {
      isAnswered = true;
      const updatedItem = calculateSRS(item, true);
      const fullList = getStoredVocab();
      const targetIndex = fullList.findIndex(v => v.word.toLowerCase() === item.word.toLowerCase());
      
      if (targetIndex !== -1) {
        fullList[targetIndex] = updatedItem;
        saveStoredVocab(fullList);
      }

      if (typeInput) typeInput.className = 'quiz-input correct';
      if (hintDiv) {
        hintDiv.textContent = `🎉 Chính xác! Nhấn Enter để sang từ tiếp theo. (Lần ôn tới: ${updatedItem.nextReview})`;
        hintDiv.style.color = '#34a853';
      }
      correctCount++;
      updateDueCountBadge();
      speakWord(item.word);
    } else {
      const updatedItem = calculateSRS(item, false);
      const fullList = getStoredVocab();
      const targetIndex = fullList.findIndex(v => v.word.toLowerCase() === item.word.toLowerCase());
      
      if (targetIndex !== -1) {
        fullList[targetIndex] = updatedItem;
        saveStoredVocab(fullList);
      }

      if (typeInput) {
        typeInput.className = 'quiz-input incorrect';
        typeInput.select();
      }
      if (hintDiv) {
        hintDiv.innerHTML = `❌ Chưa đúng! Đáp án đúng là: <b style="color:#d93025; font-size: 16px;">${item.word}</b>. Hãy gõ lại cho đúng!`;
        hintDiv.style.color = '#ea4335';
      }
      wrongCount++;
      speakWord(item.word);
    }
  }

  if (typeInput) {
    typeInput.addEventListener('keydown', (e) => {
      // Ctrl + Space -> Phát âm
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        const currentItem = currentSessionList[currentIndex];
        if (currentItem) speakWord(currentItem.word);
        return;
      }

      // Enter -> Kiểm tra / Sang từ tiếp theo
      if (e.key === 'Enter') {
        checkAnswer();
      }
    });
  }

  if (speakBtn) speakBtn.addEventListener('click', () => speakWord(currentSessionList[currentIndex]?.word));
  if (restartBtn) restartBtn.addEventListener('click', () => loadVocabData(currentSessionList));

  // --- QUẢN LÝ DANH SÁCH BÀI HỌC ---
  function renderDayList() {
    const list = getStoredVocab();
    if (!dayListContainer) return;

    dayListContainer.innerHTML = '';
    if (list.length === 0) {
      dayListContainer.innerHTML = '<p style="color:#666;">Chưa có dữ liệu từ vựng.</p>';
      return;
    }

    const grouped = {};
    list.forEach((item, originalIndex) => {
      const day = item.date || 'Chưa phân ngày';
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({ ...item, originalIndex });
    });

    Object.keys(grouped).forEach(day => {
      const dayWords = grouped[day];
      const card = document.createElement('div');
      card.className = 'day-card';

      let wordsHTML = dayWords.map((item) => {
        const idx = item.originalIndex;
        return `
          <div style="border-bottom:1px dashed #eee; padding:8px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <div>
              <strong style="color:#1a73e8; font-size: 15px;">${item.word}</strong>
              <button class="btn-speak-item" data-word="${item.word}" style="background:none; border:none; cursor:pointer; font-size:16px; margin-left:4px;" title="Phát âm">🔊</button>
              ${item.phonetic ? `<span style="color:#666; font-size:12px; margin-left:4px;">${item.phonetic}</span>` : ''}
              <span style="color:#333; margin-left:8px;">👉 ${item.meaning}</span>
            </div>
            <div>
              <button class="btn-edit-meaning" data-index="${idx}" style="background:none; border:none; cursor:pointer; color:#1a73e8; font-size:12px;">✏️ Sửa</button>
              <button class="btn-delete-word" data-index="${idx}" style="background:none; border:none; cursor:pointer; color:#ea4335; font-size:12px;">🗑️ Xóa</button>
            </div>
            <div id="edit-box-${idx}" style="display:none; width:100%; margin-top:6px; gap:6px;">
              <input type="text" id="input-meaning-${idx}" value="${item.meaning}" style="flex:1; padding:4px;" />
              <button class="btn-save-meaning" data-index="${idx}" style="background:#34a853; color:white; border:none; padding:4px 8px; border-radius:4px; font-weight:bold;">Lưu</button>
            </div>
          </div>
        `;
      }).join('');

      card.innerHTML = `
        <div class="day-header" style="margin-bottom:8px;">
          <span style="font-weight:bold; color:#1a73e8;">📅 ${day} (${dayWords.length} từ)</span>
          <button class="btn-sm btn-play-sm btn-play-day" data-day="${day}">▶ Học lại bài này</button>
        </div>
        <div>${wordsHTML}</div>
      `;
      dayListContainer.appendChild(card);
    });

    document.querySelectorAll('.btn-speak-item').forEach(btn => {
      btn.addEventListener('click', (e) => speakWord(e.target.getAttribute('data-word')));
    });
// --- CẬP NHẬT SỰ KIỆN HỌC LẠI BÀI THEO NGÀY (FIX TRỰC TIẾP LỖI NHẢY TAB RESET 1 TỪ) ---
    document.querySelectorAll('.btn-play-day').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Ngăn sự kiện lan ra ngoài làm kích hoạt lại hàm load mặc định

        const selectedDay = e.target.getAttribute('data-day');
        const fullList = getStoredVocab();
        
        // Lọc toàn bộ danh sách từ vựng thuộc ngày đã chọn
        const dayWords = fullList.filter(item => {
          const itemDay = item.date || 'Chưa phân ngày';
          return itemDay === selectedDay;
        });

        if (dayWords.length > 0) {
          // 1. Chuyển tab trước
          switchTab(tabPracticeBtn, practiceView);
          
          // 2. Nạp dữ liệu danh sách bài học ngay sau đó để không bị sự kiện chuyển tab ghi đè
          setTimeout(() => {
            loadVocabData(dayWords);
          }, 50);
        } else {
          alert('Không tìm thấy từ vựng nào thuộc bài học này!');
        }
      });
    });

    document.querySelectorAll('.btn-edit-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        const editBox = document.getElementById(`edit-box-${idx}`);
        if (editBox) editBox.style.display = 'flex';
      });
    });

    document.querySelectorAll('.btn-save-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        const inputEl = document.getElementById(`input-meaning-${idx}`);
        const newMeaning = inputEl ? inputEl.value.trim() : '';
        if (!newMeaning) return;
        const vocabList = getStoredVocab();
        vocabList[idx].meaning = newMeaning;
        saveStoredVocab(vocabList);
        renderDayList();
      });
    });

    document.querySelectorAll('.btn-delete-word').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (confirm('Thầy có chắc muốn xóa từ này?')) {
          const vocabList = getStoredVocab();
          vocabList.splice(idx, 1);
          saveStoredVocab(vocabList);
          renderDayList();
          updateDueCountBadge();
        }
      });
    });
  }

  // --- KÍCH HOẠT FLASHCARD IPA ---
  initIpaFlashcard();

  // --- KHỞI CHẠY LẦN ĐẦU ---
  listenToCloudData();
  loadVocabData();
  updateDueCountBadge();
});

// ==========================================
// 4. LOGIC ĐIỀU KHIỂN FLASHCARD IPA 3D
// ==========================================
function initIpaFlashcard() {
  const ipaCard = document.getElementById('ipa-card');
  const btnPrev = document.getElementById('ipa-btn-prev');
  const btnNext = document.getElementById('ipa-btn-next');
  const btnSound = document.getElementById('ipa-btn-sound');

  if (ipaCard) {
    ipaCard.addEventListener('click', (e) => {
      if (e.target.closest('#ipa-btn-sound')) return;
      ipaCard.classList.toggle('flipped');
    });
  }

  if (btnSound) {
    btnSound.addEventListener('click', () => {
      speakIpa(ipaData[currentIpaIndex].symbol);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentIpaIndex < ipaData.length - 1) {
        currentIpaIndex++;
        renderIpaCard(currentIpaIndex);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentIpaIndex > 0) {
        currentIpaIndex--;
        renderIpaCard(currentIpaIndex);
      }
    });
  }
}

function renderIpaCard(index) {
  const cardData = ipaData[index];
  const ipaCard = document.getElementById('ipa-card');
  if (!ipaCard || !cardData) return;

  ipaCard.classList.remove('flipped');

  setTimeout(() => {
    const frontSymbol = document.getElementById('ipa-front-symbol');
    const backType = document.getElementById('ipa-back-type');
    const backGuide = document.getElementById('ipa-back-guide');
    const counter = document.getElementById('ipa-counter');
    const examplesContainer = document.getElementById('ipa-back-examples');

    if (frontSymbol) frontSymbol.textContent = cardData.symbol;
    if (backType) backType.textContent = cardData.type;
    if (backGuide) backGuide.textContent = cardData.guide;
    if (counter) counter.textContent = `${index + 1} / ${ipaData.length}`;

    if (examplesContainer) {
      examplesContainer.innerHTML = cardData.examples.map(ex => `
        <li><b>${ex.w}</b> <span style="color:#1a73e8;">${ex.i}</span></li>
      `).join('');
    }
  }, 150);
}

function speakIpa(symbol) {
  const cleanSymbol = symbol.replace(/\//g, '').trim();
  try {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanSymbol)}&tl=en&client=tw-ob`;
    const audio = new Audio(audioUrl);
    audio.play().catch(() => speakSpeechSynthesis(cleanSymbol));
  } catch (e) {
    speakSpeechSynthesis(cleanSymbol);
  }
}

function speakSpeechSynthesis(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}