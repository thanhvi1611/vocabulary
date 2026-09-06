document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENT REFS ---
  const tabAddBtn = document.getElementById('tab-add-btn');
  const tabPracticeBtn = document.getElementById('tab-practice-btn');
  const tabManageBtn = document.getElementById('tab-manage-btn');
  
  const addView = document.getElementById('add-view');
  const practiceView = document.getElementById('practice-view');
  const manageView = document.getElementById('manage-view');

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
  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let isAnswered = false;

  // --- LOCALSTORAGE UTILS ---
  function getStoredVocab() {
    const data = localStorage.getItem('vocabList');
    return data ? JSON.parse(data) : [];
  }

  function saveStoredVocab(list) {
    localStorage.setItem('vocabList', JSON.stringify(list));
  }

  function isVietnamese(text) {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text);
  }

  // --- 1. CHUYỂN TAB ---
  tabAddBtn.addEventListener('click', () => {
    switchTab(tabAddBtn, addView);
  });
  tabPracticeBtn.addEventListener('click', () => {
    switchTab(tabPracticeBtn, practiceView);
  });
  tabManageBtn.addEventListener('click', () => {
    switchTab(tabManageBtn, manageView);
    renderDayList();
  });

  function switchTab(activeBtn, activeView) {
    [tabAddBtn, tabPracticeBtn, tabManageBtn].forEach(btn => btn.classList.remove('active'));
    [addView, practiceView, manageView].forEach(view => view.style.display = 'none');
    activeBtn.classList.add('active');
    activeView.style.display = 'block';
  }

  // --- 2. TÍNH NĂNG DỊCH TỰ ĐỘNG & LẤY IPA ---
  btnTranslate.addEventListener('click', async () => {
    const word = inputWord.value.trim();
    if (!word) return;

    statusDiv.textContent = '⏳ Đang dịch...';
    statusDiv.style.color = '#1a73e8';

    const isVi = isVietnamese(word);
    const sl = isVi ? 'vi' : 'en';
    const tl = isVi ? 'en' : 'vi';

    try {
      // Dịch nghĩa qua Google Translate API
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(word)}`);
      const data = await res.json();
      const translatedText = data[0].map(item => item[0]).join('');

      if (isVi) {
        inputWord.value = translatedText;
        inputMeaning.value = word;
      } else {
        inputMeaning.value = translatedText;
      }

      // Lấy phiên âm IPA nếu là từ tiếng Anh đơn
      const engWord = isVi ? translatedText : word;
      if (engWord.split(/\s+/).length === 1) {
        try {
          const ipaRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(engWord)}`);
          if (ipaRes.ok) {
            const ipaData = await ipaRes.json();
            inputPhonetic.value = ipaData[0]?.phonetic || ipaData[0]?.phonetics?.find(p => p.text)?.text || '';
          }
        } catch(e) {}
      }

      statusDiv.textContent = '✨ Đã dịch xong!';
      statusDiv.style.color = '#34a853';
    } catch (err) {
      statusDiv.textContent = '❌ Lỗi kết nối dịch thuật!';
      statusDiv.style.color = '#ea4335';
    }
  });

  // --- 3. LƯU TỪ VỰNG MỚI ---
  btnSaveVocab.addEventListener('click', () => {
    const word = inputWord.value.trim();
    const meaning = inputMeaning.value.trim();
    const phonetic = inputPhonetic.value.trim();

    if (!word || !meaning) {
      statusDiv.textContent = '⚠️ Vui lòng điền đủ Từ và Nghĩa!';
      statusDiv.style.color = '#ea4335';
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const vocabList = getStoredVocab();
    
    // Thêm từ mới lên đầu danh sách
    vocabList.unshift({ word, meaning, phonetic, date: today });
    saveStoredVocab(vocabList);

    statusDiv.textContent = '💾 Đã lưu từ vựng thành công!';
    statusDiv.style.color = '#34a853';

    inputWord.value = '';
    inputMeaning.value = '';
    inputPhonetic.value = '';
    
    // Tải lại bài học
    loadVocabData();
  });

  // --- 4. LUYỆN GÕ & PHÁT ÂM ---
  function loadVocabData(customList = null) {
    const fullList = getStoredVocab();
    currentSessionList = customList || [...fullList];
    currentIndex = 0; correctCount = 0; wrongCount = 0;

    if (currentSessionList.length === 0) {
      meaningDiv.textContent = 'Sổ từ vựng đang trống!';
      phoneticDiv.textContent = '';
      typeInput.disabled = true;
      progressText.textContent = '0 / 0 từ';
      return;
    }

    typeInput.disabled = false;
    quizArea.style.display = 'block';
    completedArea.style.display = 'none';
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    if (currentIndex >= currentSessionList.length) {
      quizArea.style.display = 'none';
      completedArea.style.display = 'block';
      completeDetail.innerHTML = `Luyện xong <b>${currentSessionList.length}</b> từ.<br>Đúng: <span style="color:#34a853; font-weight:bold;">${correctCount}</span> | Sai: <span style="color:#ea4335; font-weight:bold;">${wrongCount}</span>`;
      return;
    }

    const item = currentSessionList[currentIndex];
    isAnswered = false;

    typeBadge.textContent = item.date ? `Ngày: ${item.date}` : 'Từ mới';
    progressText.textContent = `${currentIndex + 1} / ${currentSessionList.length} từ`;
    meaningDiv.textContent = item.meaning;
    phoneticDiv.textContent = item.phonetic || '';
    typeInput.value = '';
    typeInput.className = 'quiz-input';
    typeInput.focus();
    hintDiv.textContent = 'Nhấn Enter để kiểm tra';
    hintDiv.style.color = '#777';

    if (autoAudioToggle.checked) speakWord(item.word);
  }

  function speakWord(text) {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(speechRateSelect.value) || 1.0;
    window.speechSynthesis.speak(utterance);
  }

  function checkAnswer() {
    if (isAnswered) {
      currentIndex++;
      renderCurrentQuestion();
      return;
    }

    const item = currentSessionList[currentIndex];
    const userTyping = typeInput.value.trim().toLowerCase();
    const targetWord = item.word.trim().toLowerCase();
    if (!userTyping) return;

    isAnswered = true;
    if (userTyping === targetWord) {
      typeInput.className = 'quiz-input correct';
      hintDiv.textContent = '🎉 Chính xác! Nhấn Enter để tiếp tục.';
      hintDiv.style.color = '#34a853';
      correctCount++;
    } else {
      typeInput.className = 'quiz-input incorrect';
      hintDiv.innerHTML = `❌ Chưa đúng! Đáp án đúng: <b style="color:#d93025;">${item.word}</b>`;
      hintDiv.style.color = '#ea4335';
      wrongCount++;
    }
    speakWord(item.word);
  }

  // --- 5. BÀI HỌC THEO NGÀY (SỬA / XÓA) ---
  function renderDayList() {
    const list = getStoredVocab();
    dayListContainer.innerHTML = '';
    if (list.length === 0) {
      dayListContainer.innerHTML = '<p style="color:#666;">Chưa có dữ liệu.</p>';
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
              <strong style="color:#1a73e8;">${item.word}</strong>
              ${item.phonetic ? `<span style="color:#666; font-size:12px;">${item.phonetic}</span>` : ''}
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
        <div class="day-header">
          <span style="font-weight:bold; color:#1a73e8;">📅 ${day} (${dayWords.length} từ)</span>
          <button class="btn-sm btn-play-sm btn-play-day" data-day="${day}">▶ Học lại bài này</button>
        </div>
        <div>${wordsHTML}</div>
      `;
      dayListContainer.appendChild(card);
    });

    // Event Handlers
    document.querySelectorAll('.btn-play-day').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = e.target.getAttribute('data-day');
        const dayWords = list.filter(item => (item.date || 'Chưa phân ngày') === day);
        tabPracticeBtn.click();
        loadVocabData(dayWords);
      });
    });

    document.querySelectorAll('.btn-edit-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        document.getElementById(`edit-box-${idx}`).style.display = 'flex';
      });
    });

    document.querySelectorAll('.btn-save-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        const newMeaning = document.getElementById(`input-meaning-${idx}`).value.trim();
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
        }
      });
    });
  }

  // --- EVENTS ---
  speakBtn.addEventListener('click', () => speakWord(currentSessionList[currentIndex]?.word));
  restartBtn.addEventListener('click', () => loadVocabData(currentSessionList));
  typeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(); });

  // Khởi chạy
  loadVocabData();
});
