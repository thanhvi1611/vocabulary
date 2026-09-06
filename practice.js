document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENT REFS ---
  const tabPracticeBtn = document.getElementById('tab-practice-btn');
  const tabManageBtn = document.getElementById('tab-manage-btn');
  const practiceView = document.getElementById('practice-view');
  const manageView = document.getElementById('manage-view');

  const typeBadge = document.getElementById('type-badge');
  const progressText = document.getElementById('progress-text');
  const speechRateSelect = document.getElementById('speech-rate-select');
  const autoAudioToggle = document.getElementById('auto-audio-toggle');
  const audioToggleLabel = document.getElementById('audio-toggle-label');

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

  // --- STATE VARIABLES ---
  let fullVocabList = [];
  let currentSessionList = [];
  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let isAnswered = false;

  // --- HÀM XỬ LÝ DỮ LIỆU LOCALSTORAGE (THAY CHO CHROME STORAGE) ---
  function getStoredVocab() {
    const data = localStorage.getItem('vocabList');
    return data ? JSON.parse(data) : [];
  }

  function saveStoredVocab(list) {
    localStorage.setItem('vocabList', JSON.stringify(list));
  }

  // --- 1. CHUYỂN TAB ---
  tabPracticeBtn.addEventListener('click', () => {
    tabPracticeBtn.classList.add('active');
    tabManageBtn.classList.remove('active');
    practiceView.style.display = 'block';
    manageView.style.display = 'none';
  });

  tabManageBtn.addEventListener('click', () => {
    tabManageBtn.classList.add('active');
    tabPracticeBtn.classList.remove('active');
    practiceView.style.display = 'none';
    manageView.style.display = 'block';
    renderDayList();
  });

  // --- 2. KHỞI TẠO BÀI HỌC ---
  function loadVocabData(customList = null) {
    fullVocabList = getStoredVocab();

    if (customList) {
      currentSessionList = customList;
    } else {
      currentSessionList = [...fullVocabList];
    }

    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;

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

  // --- 3. HIỂN THỊ CÂU HỎI HIỆN TẠI ---
  function renderCurrentQuestion() {
    if (currentIndex >= currentSessionList.length) {
      showCompletionScreen();
      return;
    }

    const item = currentSessionList[currentIndex];
    isAnswered = false;

    typeBadge.textContent = item.date ? `Ngày: ${item.date}` : 'Từ mới';
    progressText.textContent = `${currentIndex + 1} / ${currentSessionList.length} từ`;

    meaningDiv.textContent = item.meaning;
    phoneticDiv.textContent = item.phonetic || '';

    typeInput.value = '';
    typeInput.className = '';
    typeInput.focus();
    hintDiv.textContent = 'Nhấn Enter để kiểm tra';
    hintDiv.style.color = '#777';

    // Tự động phát âm nếu bật
    if (autoAudioToggle.checked) {
      speakWord(item.word);
    }
  }

  // --- 4. HÀM PHÁT ÂM (DÙNG WEB SPEECH API CHUẨN) ---
  function speakWord(text) {
    if (!text || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Dừng phát âm cũ nếu đang phát
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(speechRateSelect.value) || 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // --- 5. KIỂM TRA KẾT QUẢ GÕ ---
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
      typeInput.className = 'correct';
      hintDiv.textContent = '🎉 Chính xác! Nhấn Enter để tiếp tục.';
      hintDiv.style.color = '#34a853';
      correctCount++;
      speakWord(item.word);
    } else {
      typeInput.className = 'incorrect';
      hintDiv.innerHTML = `❌ Chưa đúng! Đáp án đúng: <b style="color:#d93025;">${item.word}</b> (Nhấn Enter để tiếp tục)`;
      hintDiv.style.color = '#ea4335';
      wrongCount++;
      speakWord(item.word);
    }
  }

  // --- 6. MÀN HÌNH HOÀN THÀNH ---
  function showCompletionScreen() {
    quizArea.style.display = 'none';
    completedArea.style.display = 'block';
    completeDetail.innerHTML = `Luyện tập xong <b>${currentSessionList.length}</b> từ.<br>Đúng: <span style="color:#34a853; font-weight:bold;">${correctCount}</span> | Sai: <span style="color:#ea4335; font-weight:bold;">${wrongCount}</span>`;
  }

  restartBtn.addEventListener('click', () => {
    loadVocabData(currentSessionList);
  });

  // --- 7. BÀI HỌC THEO NGÀY (TAB 2) + TÍNH NĂNG SỬA NGHĨA & XÓA ---
  function renderDayList() {
    const list = getStoredVocab();
    dayListContainer.innerHTML = '';

    if (list.length === 0) {
      dayListContainer.innerHTML = '<p style="color:#666;">Chưa có dữ liệu từ vựng.</p>';
      return;
    }

    // Nhóm từ vựng theo ngày
    const grouped = {};
    list.forEach((item, originalIndex) => {
      const day = item.date || 'Chưa phân ngày';
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({ ...item, originalIndex });
    });

    // Hiển thị danh sách từng ngày
    Object.keys(grouped).forEach(day => {
      const dayWords = grouped[day];
      const card = document.createElement('div');
      card.className = 'day-card';

      let wordsHTML = dayWords.map((item) => {
        const idx = item.originalIndex;
        return `
          <div style="
            border-bottom: 1px dashed #eee;
            padding: 8px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
          ">
            <div>
              <strong style="color: #1a73e8; font-size: 15px;">${item.word}</strong>
              ${item.phonetic ? `<span style="color: #666; font-size: 12px; margin-left: 6px;">${item.phonetic}</span>` : ''}
              <span id="meaning-text-${idx}" style="color: #333; font-weight: 500; margin-left: 10px;">👉 ${item.meaning}</span>
            </div>

            <!-- Thao tác Sửa / Xóa -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn-edit-meaning" data-index="${idx}" style="
                background: none; border: none; cursor: pointer; color: #1a73e8; font-size: 12px; text-decoration: underline;
              ">✏️ Sửa nghĩa</button>

              <button class="btn-delete-word" data-index="${idx}" style="
                background: none; border: none; cursor: pointer; color: #ea4335; font-size: 13px;
              " title="Xóa từ này">🗑️</button>
            </div>

            <!-- Khung nhập chỉnh sửa nghĩa -->
            <div id="edit-box-${idx}" style="display: none; width: 100%; margin-top: 6px; gap: 6px;">
              <input type="text" id="input-meaning-${idx}" value="${item.meaning}" style="
                flex: 1; padding: 4px 8px; border: 1px solid #1a73e8; border-radius: 4px; font-size: 13px;
              " />
              <button class="btn-save-meaning" data-index="${idx}" style="
                background: #34a853; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;
              ">Lưu</button>
              <button class="btn-cancel-meaning" data-index="${idx}" style="
                background: #757575; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;
              ">Hủy</button>
            </div>
          </div>
        `;
      }).join('');

      card.innerHTML = `
        <div class="day-header">
          <span class="day-title">📅 Ngày: ${day} (${dayWords.length} từ)</span>
          <button class="btn-sm btn-play-sm btn-play-day" data-day="${day}">▶ Học lại bài ngày này</button>
        </div>
        <div class="words-container">${wordsHTML}</div>
      `;

      dayListContainer.appendChild(card);
    });

    // --- GẮN SỰ KIỆN NÚT THAO TÁC ---
    
    // Nút học lại theo ngày
    document.querySelectorAll('.btn-play-day').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = e.target.getAttribute('data-day');
        const dayWords = list.filter(item => (item.date || 'Chưa phân ngày') === day);
        tabPracticeBtn.click();
        loadVocabData(dayWords);
      });
    });

    // Nút Bật khung chỉnh sửa
    document.querySelectorAll('.btn-edit-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        document.getElementById(`edit-box-${idx}`).style.display = 'flex';
      });
    });

    // Nút Hủy chỉnh sửa
    document.querySelectorAll('.btn-cancel-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        document.getElementById(`edit-box-${idx}`).style.display = 'none';
      });
    });

    // Nút Lưu nghĩa mới vào LocalStorage
    document.querySelectorAll('.btn-save-meaning').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        const newMeaning = document.getElementById(`input-meaning-${idx}`).value.trim();

        if (!newMeaning) return;

        const vocabList = getStoredVocab();
        if (vocabList[idx]) {
          vocabList[idx].meaning = newMeaning;
          saveStoredVocab(vocabList);
          renderDayList();
        }
      });
    });

    // Nút Xóa từ
    document.querySelectorAll('.btn-delete-word').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (confirm('Thầy có chắc chắn muốn xóa từ vựng này khỏi sổ tay?')) {
          const vocabList = getStoredVocab();
          vocabList.splice(idx, 1);
          saveStoredVocab(vocabList);
          renderDayList();
        }
      });
    });
  }

  // --- 8. LẮNG NGHE SỰ KIỆN NÚT VÀ PHÍM TẮT ---
  speakBtn.addEventListener('click', () => {
    if (currentSessionList[currentIndex]) {
      speakWord(currentSessionList[currentIndex].word);
    }
  });

  autoAudioToggle.addEventListener('change', () => {
    audioToggleLabel.innerHTML = `🔊 Âm thanh: <b>${autoAudioToggle.checked ? 'Bật' : 'Tắt'}</b>`;
  });

  typeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  // Phím tắt bàn phím
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.code === 'Space') {
      e.preventDefault();
      speakBtn.click();
    }
    if (e.ctrlKey && e.code === 'KeyM') {
      e.preventDefault();
      autoAudioToggle.checked = !autoAudioToggle.checked;
      autoAudioToggle.dispatchEvent(new Event('change'));
    }
  });

  // Khởi chạy bài học
  loadVocabData();
});