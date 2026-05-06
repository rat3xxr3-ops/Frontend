// 1. نظام الحسابات (محاكاة)
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const authBtn = document.getElementById('authBtn');
const userWelcome = document.getElementById('userWelcome');

function updateAuthUI() {
    if (currentUser) {
        authBtn.innerText = "خروج";
        userWelcome.innerHTML = `<h3>أهلاً بك يا ${currentUser.name}، لديك (2) كورس قيد التقدم.</h3>`;
    }
}

authBtn.addEventListener('click', () => {
    if (!currentUser) {
        let name = prompt("أدخل اسمك:");
        if (name) {
            currentUser = { name: name, progress: {}, role: 'student' };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            location.reload();
        }
    } else {
        localStorage.removeItem('currentUser');
        location.reload();
    }
});

// 2. تفعيل الوضع الليلي
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // تغيير الأيقونة
    darkToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// تحميل الثيم المفضل عند الفتح
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// 3. نظام البحث المتقدم
const mainSearch = document.getElementById('mainSearch');
if (mainSearch) {
    mainSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.course-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(term)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// تشغيل الوظائف
updateAuthUI();
// ============== بيانات الكتب مع الأسئلة ==============
const booksDatabase = [
    {
        id: 1,
        title: "أساسيات JavaScript",
        author: "أحمد السيد",
        description: "تعلم أساسيات لغة JavaScript من الصفر",
        level: "مبتدئ",
        pages: 250,
        questions: [
            { text: "ما هي الطريقة الصحيحة لكتابة دالة في JavaScript؟", options: ["function = myFunction()", "function myFunction()", "def myFunction()", "create myFunction()"], correct: 1 },
            { text: "كيف تعلن عن متغير في JavaScript؟", options: ["v myVar;", "variable myVar;", "var myVar;", "let myVar;"], correct: 2 },
            { text: "ما هي نتيجة typeof null في JavaScript؟", options: ["'null'", "'undefined'", "'object'", "'number'"], correct: 2 },
            { text: "كيف تتحقق إذا كان الرقم زوجي في JavaScript؟", options: ["num % 2 === 0", "num / 2 === 0", "num.even()", "isEven(num)"], correct: 0 },
            { text: "ما هي وظيفة console.log()؟", options: ["طباعة في وحدة التحكم", "عرض تنبيه", "تسجيل الدخول", "حفظ البيانات"], correct: 0 },
            { text: "كيف تكتب تعليق من سطر واحد؟", options: ["<!-- comment -->", "// comment", "# comment", "/* comment */"], correct: 1 },
            { text: "ما هي طريقة إنشاء مصفوفة؟", options: ["{}", "[]", "<>", "()"], correct: 1 },
            { text: "ما هو الفرق بين == و ===؟", options: ["لا فرق", "=== يقارن القيمة والنوع", "== يقارن القيمة والنوع", "كلاهما مقارنة مرجعية"], correct: 1 }
        ]
    },
    {
        id: 2,
        title: "React.js المتقدم",
        author: "سارة محمود",
        description: "تعلم React.js مع Hooks و Context API",
        level: "متقدم",
        pages: 400,
        questions: [
            { text: "ما هو React Hook المستخدم لإدارة الحالة؟", options: ["useEffect", "useState", "useContext", "useReducer"], correct: 1 },
            { text: "كيف ترسل بيانات من parent إلى child في React؟", options: ["state", "props", "context", "refs"], correct: 1 },
            { text: "ما هو الفرق بين props و state؟", options: ["لا فرق", "props للقراءة فقط، state قابل للتغيير", "state للقراءة فقط", "كلاهما قابل للتغيير"], correct: 1 },
            { text: "ما هي وظيفة useEffect؟", options: ["إدارة الحالة", "تنفيذ تأثيرات جانبية", "إنشاء مكونات", "ربط البيانات"], correct: 1 }
        ]
    },
    {
        id: 3,
        title: "Python للمبتدئين",
        author: "محمد علي",
        description: "تعلم Python من الصفر إلى الاحتراف",
        level: "مبتدئ",
        pages: 350,
        questions: [
            { text: "كيف تطبع نص في Python؟", options: ["console.log()", "print()", "echo()", "System.out.println()"], correct: 1 },
            { text: "ما هو نوع البيانات لقيمة True؟", options: ["int", "str", "bool", "float"], correct: 2 },
            { text: "كيف تكتب حلقة for في Python؟", options: ["for i in range():", "for(i=0; i<10; i++)", "foreach i in range:", "loop i in range:"], correct: 0 }
        ]
    },
    {
        id: 4,
        title: "تصميم UX/UI",
        author: "نورة خالد",
        description: "مبادئ تصميم تجربة المستخدم",
        level: "متوسط",
        pages: 280,
        questions: [
            { text: "ما المقصود بـ UX؟", options: ["User Experience", "User Interface", "User Xpert", "Ultimate X"], correct: 0 },
            { text: "ما هو الـ Prototype؟", options: ["نموذج أولي", "تصميم نهائي", "اختبار المستخدم", "بحث المستخدم"], correct: 0 }
        ]
    },
    {
        id: 5,
        title: "SQL قواعد البيانات",
        author: "عمر إبراهيم",
        description: "تعلم SQL وإدارة قواعد البيانات",
        level: "متوسط",
        pages: 320,
        questions: [
            { text: "كيف تستعلم عن جميع البيانات من جدول؟", options: ["SELECT * FROM table", "GET * FROM table", "RETURN * FROM table", "SHOW * FROM table"], correct: 0 },
            { text: "ما هي العبارة المستخدمة لإضافة بيانات؟", options: ["INSERT INTO", "ADD INTO", "UPDATE", "CREATE"], correct: 0 }
        ]
    },
    {
        id: 6,
        title: "HTML & CSS",
        author: "ليلى أحمد",
        description: "أساسيات تصميم المواقع",
        level: "مبتدئ",
        pages: 220,
        questions: [
            { text: "ما هي العلامة المستخدمة لعنوان الصفحة؟", options: ["<body>", "<head>", "<title>", "<header>"], correct: 2 },
            { text: "كيف تربط ملف CSS خارجي؟", options: ["<css>style.css</css>", "<link href='style.css'>", "<style src='style.css'>", "<script src='style.css'>"], correct: 1 }
        ]
    },
    {
        id: 7,
        title: "Node.js Backend",
        author: "خالد سعيد",
        description: "تطوير الخلفية بـ Node.js",
        level: "متقدم",
        pages: 450,
        questions: [
            { text: "كيف تنشئ خادم في Node.js؟", options: ["createServer()", "http.createServer()", "new Server()", "app.listen()"], correct: 1 },
            { text: "ما هي وظيفة npm؟", options: ["Node Package Manager", "Node Project Manager", "New Package Manager", "Node Process Manager"], correct: 0 }
        ]
    },
    {
        id: 8,
        title: "الذكاء الاصطناعي",
        author: "د. فاطمة الزهراء",
        description: "مقدمة في الذكاء الاصطناعي وتعلم الآلة",
        level: "متقدم",
        pages: 500,
        questions: [
            { text: "ما هو التعلم تحت الإشراف؟", options: ["تعلم بدون بيانات", "تعلم مع بيانات مصنفة", "تعلم مع بيانات غير مصنفة", "تعلم مع مكافآت"], correct: 1 },
            { text: "ما هي مكتبة Python الشهيرة للتعلم الآلي؟", options: ["React", "scikit-learn", "jQuery", "Bootstrap"], correct: 1 }
        ]
    }
];

// إضافة الكتب إلى الكورسات
courses.forEach((course, index) => {
    course.books = booksDatabase.slice(index * 2, index * 2 + 2);
    course.quizzes = [];
});

// ============== نظام الكتب والاختبارات العشوائية ==============
class BookQuizSystem {
    static getAllBooks() {
        return booksDatabase;
    }
    
    static getRandomQuestions(bookId, count = 25) {
        const book = booksDatabase.find(b => b.id === bookId);
        if (!book) return [];
        
        // خلط الأسئلة عشوائياً
        const shuffled = [...book.questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // أخذ أول count سؤال أو كل الأسئلة إذا كانت أقل
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
    
    static startBookQuiz(bookId) {
        const book = booksDatabase.find(b => b.id === bookId);
        if (!book) return;
        
        const questions = this.getRandomQuestions(bookId, 25);
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content quiz-modal">
                <span class="close">&times;</span>
                <h2><i class="fas fa-book"></i> اختبار: ${book.title}</h2>
                <p>${book.author} | مستوى: ${book.level}</p>
                <p>عدد الأسئلة: ${questions.length}</p>
                <div id="quizContent"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.renderBookQuiz(questions, book, modal);
        
        modal.querySelector('.close').onclick = () => modal.remove();
    }
    
    static renderBookQuiz(questions, book, modal) {
        let currentIndex = 0;
        let userAnswers = new Array(questions.length).fill(null);
        let quizStarted = false;
        
        function renderQuestion() {
            const q = questions[currentIndex];
            const container = modal.querySelector('#quizContent');
            
            container.innerHTML = `
                <div class="quiz-progress">
                    السؤال ${currentIndex + 1} من ${questions.length}
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentIndex + 1) / questions.length) * 100}%"></div>
                    </div>
                </div>
                <div class="question-container">
                    <div class="question-text">
                        <strong>السؤال:</strong> ${q.text}
                    </div>
                    <div class="options-grid">
                        ${q.options.map((opt, idx) => `
                            <div class="quiz-option" data-option="${idx}">
                                <span>${String.fromCharCode(65+idx)}.</span>
                                <span>${opt}</span>
                                ${userAnswers[currentIndex] === idx ? '<i class="fas fa-check-circle"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="quiz-stats">
                    <button class="btn-secondary" id="prevBtn" ${currentIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-right"></i> السابق
                    </button>
                    <button class="btn-primary" id="nextBtn">
                        ${currentIndex === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}
                    </button>
                </div>
            `;
            
            // إضافة مستمعي الأحداث للخيارات
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.onclick = () => {
                    const selected = parseInt(opt.dataset.option);
                    userAnswers[currentIndex] = selected;
                    
                    // تحديث واجهة الخيارات
                    document.querySelectorAll('.quiz-option').forEach(o => {
                        o.classList.remove('selected');
                        const checkIcon = o.querySelector('.fa-check-circle');
                        if (checkIcon) checkIcon.remove();
                    });
                    opt.classList.add('selected');
                    opt.innerHTML += ' <i class="fas fa-check-circle"></i>';
                };
            });
            
            // أزرار التنقل
            document.getElementById('prevBtn').onclick = () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    renderQuestion();
                }
            };
            
            document.getElementById('nextBtn').onclick = () => {
                if (userAnswers[currentIndex] === null) {
                    showNotification('الرجاء اختيار إجابة للسؤال الحالي', 'error');
                    return;
                }
                
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    renderQuestion();
                } else {
                    // حساب النتيجة
                    let score = 0;
                    questions.forEach((q, idx) => {
                        if (userAnswers[idx] === q.correct) score++;
                    });
                    const percentage = (score / questions.length) * 100;
                    
                    // حفظ النتيجة
                    if (currentUser) {
                        if (!currentUser.quizScores) currentUser.quizScores = [];
                        currentUser.quizScores.push({
                            bookId: book.id,
                            bookTitle: book.title,
                            score: score,
                            total: questions.length,
                            percentage: percentage,
                            date: new Date().toISOString()
                        });
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                    
                    // عرض النتيجة
                    let feedbackClass = '';
                    let feedbackMessage = '';
                    if (percentage >= 90) {
                        feedbackClass = 'excellent';
                        feedbackMessage = '🎉 ممتاز! مستوى عالي جداً!';
                    } else if (percentage >= 75) {
                        feedbackClass = 'good';
                        feedbackMessage = '👍 جيد جداً! يمكنك تحسين أكثر';
                    } else if (percentage >= 60) {
                        feedbackClass = 'pass';
                        feedbackMessage = '📚 مقبول! حاول دراسة أكثر';
                    } else {
                        feedbackClass = 'fail';
                        feedbackMessage = '📖 تحتاج للمزيد من الدراسة. حاول مرة أخرى!';
                    }
                    
                    const container = modal.querySelector('#quizContent');
                    container.innerHTML = `
                        <div class="result-card">
                            <h3>نتيجة اختبار ${book.title}</h3>
                            <div class="result-score">${score}/${questions.length}</div>
                            <div class="result-percentage">${percentage.toFixed(1)}%</div>
                            <div class="result-feedback ${feedbackClass}">
                                <i class="fas ${percentage >= 75 ? 'fa-smile' : 'fa-frown'}"></i>
                                ${feedbackMessage}
                            </div>
                            <div class="quiz-answers-review">
                                <h4>مراجعة الإجابات:</h4>
                                ${questions.map((q, idx) => `
                                    <div class="answer-review">
                                        <p><strong>سؤال ${idx + 1}:</strong> ${q.text}</p>
                                        <p>إجابتك: ${q.options[userAnswers[idx]]} 
                                           ${userAnswers[idx] === q.correct ? '✓' : '✗'}
                                        </p>
                                        ${userAnswers[idx] !== q.correct ? `<p>الإجابة الصحيحة: ${q.options[q.correct]}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                            <button class="btn-primary" onclick="location.reload()">إغلاق</button>
                        </div>
                    `;
                }
            };
        }
        
        renderQuestion();
    }
    
    static displayBooks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="books-grid">
                ${this.getAllBooks().map(book => `
                    <div class="book-card" onclick="BookQuizSystem.startBookQuiz(${book.id})">
                        <i class="fas fa-book"></i>
                        <h3>${book.title}</h3>
                        <p class="book-meta">${book.author}</p>
                        <p class="book-meta">مستوى: ${book.level}</p>
                        <p>${book.description.substring(0, 60)}...</p>
                        <div class="book-meta">
                            <i class="fas fa-file-alt"></i> ${book.pages} صفحة
                            <i class="fas fa-question-circle"></i> ${book.questions.length} سؤال
                        </div>
                        <button class="btn-primary" onclick="event.stopPropagation(); BookQuizSystem.startBookQuiz(${book.id})">
                            <i class="fas fa-pen"></i> اختبار عشوائي (25 سؤال)
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// ============== نظام الفيديو ==============
class VideoSystem {
    static videos = [
        {
            id: 1,
            title: "مقدمة في البرمجة",
            url: "https://www.w3schools.com/html/mov_bbb.mp4", // فيديو تجريبي
            duration: "10:00",
            thumbnail: ""
        },
        {
            id: 2,
            title: "أساسيات JavaScript",
            url: "https://www.w3schools.com/html/movie.mp4",
            duration: "15:30",
            thumbnail: ""
        },
        {
            id: 3,
            title: "React للمبتدئين",
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            duration: "20:00",
            thumbnail: ""
        },
        {
            id: 4,
            title: "CSS Flexbox & Grid",
            url: "https://www.w3schools.com/html/movie.mp4",
            duration: "12:45",
            thumbnail: ""
        }
    ];
    
    static createVideoPlayer(videoId, onComplete) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return null;
        
        const container = document.createElement('div');
        container.className = 'video-player-container';
        container.innerHTML = `
            <video class="video-player" id="videoPlayer">
                <source src="${video.url}" type="video/mp4">
                متصفحك لا يدعم تشغيل الفيديو
            </video>
            <div class="video-controls">
                <button class="control-btn" id="playPauseBtn">
                    <i class="fas fa-play"></i>
                </button>
                <input type="range" class="progress-slider" id="videoProgress" value="0" step="0.01">
                <span class="time-display" id="timeDisplay">0:00 / ${video.duration}</span>
                <button class="control-btn" id="volumeBtn">
                    <i class="fas fa-volume-up"></i>
                </button>
                <button class="control-btn" id="fullscreenBtn">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        setTimeout(() => this.initVideoControls(container, onComplete), 100);
        return container;
    }
    
    static initVideoControls(container, onComplete) {
        const video = container.querySelector('#videoPlayer');
        const playBtn = container.querySelector('#playPauseBtn');
        const progress = container.querySelector('#videoProgress');
        const timeDisplay = container.querySelector('#timeDisplay');
        const volumeBtn = container.querySelector('#volumeBtn');
        const fullscreenBtn = container.querySelector('#fullscreenBtn');
        
        let watchedDuration = 0;
        let hasCompleted = false;
        
        playBtn.onclick = () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        };
        
        video.ontimeupdate = () => {
            const percent = (video.currentTime / video.duration) * 100;
            progress.value = percent;
            
            const currentMin = Math.floor(video.currentTime / 60);
            const currentSec = Math.floor(video.currentTime % 60);
            timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${video.duration}`;
            
            // تتبع المشاهدة
            if (!hasCompleted && video.currentTime / video.duration >= 0.9) {
                hasCompleted = true;
                if (onComplete) onComplete();
                showNotification('🎉 تهانينا! لقد أكملت مشاهدة الفيديو', 'success');
            }
        };
        
        progress.oninput = (e) => {
            video.currentTime = (e.target.value / 100) * video.duration;
        };
        
        volumeBtn.onclick = () => {
            video.muted = !video.muted;
            volumeBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        };
        
        fullscreenBtn.onclick = () => {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
        };
        
        return video;
    }
    
    static addVideoToCourse(courseId, videoId) {
        const course = courses.find(c => c.id === courseId);
        if (course && !course.videos) {
            course.videos = [];
        }
        if (course && !course.videos.find(v => v.id === videoId)) {
            course.videos.push(this.videos.find(v => v.id === videoId));
        }
    }
}

// ============== تحديث دالة showCourseDetails لإضافة الفيديوهات ==============
const originalShowCourseDetails = showCourseDetails;
window.showCourseDetails = function(courseId) {
    const course = courses.find(c => c.id === courseId);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close">&times;</span>
            <h2>${course.title}</h2>
            <p><i class="fas fa-user"></i> ${course.instructor} | <i class="fas fa-clock"></i> ${course.duration}</p>
            <div class="rating">${'★'.repeat(Math.floor(course.rating))} (${course.rating})</div>
            <p>${course.description}</p>
            
            <h3><i class="fas fa-video"></i> فيديوهات الكورس</h3>
            <div class="videos-list" id="videosList">
                ${course.videos ? course.videos.map(video => `
                    <div class="lesson-item" onclick="playVideo(${video.id}, ${courseId})">
                        <i class="fas fa-play-circle"></i>
                        <span>${video.title}</span>
                        <span class="duration">${video.duration}</span>
                    </div>
                `).join('') : '<p>لا توجد فيديوهات مضافة بعد</p>'}
            </div>
            
            <h3><i class="fas fa-book"></i> الكتب المتاحة</h3>
            <div class="books-list" id="booksList">
                ${course.books ? course.books.map(book => `
                    <div class="lesson-item" onclick="BookQuizSystem.startBookQuiz(${book.id})">
                        <i class="fas fa-book"></i>
                        <span>${book.title} - ${book.author}</span>
                        <button class="btn-secondary" onclick="event.stopPropagation(); BookQuizSystem.startBookQuiz(${book.id})">
                            <i class="fas fa-pen"></i> اختبار
                        </button>
                    </div>
                `).join('') : '<p>لا توجد كتب مضافة</p>'}
            </div>
            
            <h3><i class="fas fa-tasks"></i> الدروس</h3>
            <div class="lessons-list">
                ${Array.from({length: course.lessons}, (_, i) => `
                    <div class="lesson-item ${currentUser?.progress[courseId]?.completedLessons.includes(i) ? 'completed' : ''}" 
                         onclick="${currentUser ? `markLessonComplete(${courseId}, ${i})` : 'showNotification(\"الرجاء تسجيل الدخول أولاً\", \"error\")'}">
                        <i class="fas ${currentUser?.progress[courseId]?.completedLessons.includes(i) ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                        <span>الدرس ${i+1}: ${course.title} - الجزء ${i+1}</span>
                        ${currentUser?.progress[courseId]?.completedLessons.includes(i) ? '<span class="completed-badge">مكتمل</span>' : ''}
                    </div>
                `).join('')}
            </div>
            
            <h3><i class="fas fa-star"></i> التقييمات</h3>
            <div id="reviewsContainer"></div>
            ${currentUser ? `
                <div class="review-section">
                    <h4>أضف تقييمك</h4>
                    <select id="ratingSelect">
                        <option value="5">★★★★★</option>
                        <option value="4">★★★★☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="1">★☆☆☆☆</option>
                    </select>
                    <textarea id="reviewComment" placeholder="اكتب تعليقك..."></textarea>
                    <button class="btn-primary" onclick="RatingSystem.addReview(${courseId}, document.getElementById('ratingSelect').value, document.getElementById('reviewComment').value)">
                        إرسال التقييم
                    </button>
                </div>
            ` : '<p>سجل دخولك لتقييم الكورس</p>'}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => modal.remove();
    RatingSystem.displayReviews(courseId);
};

// ============== تشغيل الفيديو ==============
function playVideo(videoId, courseId) {
    if (!currentUser) {
        showNotification('الرجاء تسجيل الدخول أولاً لمشاهدة الفيديو', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <span class="close">&times;</span>
            <div id="videoPlayerContainer"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const videoContainer = modal.querySelector('#videoPlayerContainer');
    const videoPlayer = VideoSystem.createVideoPlayer(videoId, () => {
        showNotification('تم إكمال مشاهدة الفيديو! +10 نقاط', 'success');
        // إضافة نقاط إضافية
        if (currentUser) {
            if (!currentUser.points) currentUser.points = 0;
            currentUser.points += 10;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    });
    
    if (videoPlayer) {
        videoContainer.appendChild(videoPlayer);
    }
    
    modal.querySelector('.close').onclick = () => modal.remove();
}

// ============== تحديث دالة displayCourses لإضافة الكتب ==============
const originalDisplayCourses = displayCourses;
window.displayCourses = function(containerId, coursesToShow = courses) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = coursesToShow.map(course => `
        <div class="course-card" onclick="showCourseDetails(${course.id})">
            <div class="course-image">
                <i class="fas fa-laptop-code"></i>
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description.substring(0, 100)}...</p>
                <div class="rating">
                    ${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5-Math.floor(course.rating))}
                    <span>(${course.reviews.length} تقييم)</span>
                </div>
                <div class="course-meta">
                    <span><i class="fas fa-user"></i> ${course.instructor}</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-book"></i> ${course.lessons} درس</span>
                    <span><i class="fas fa-video"></i> ${course.videos ? course.videos.length : 0} فيديو</span>
                </div>
                ${currentUser ? `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${ProgressTracker.getProgress(course.id)}%"></div>
                    </div>
                    <div class="progress-text">${Math.round(ProgressTracker.getProgress(course.id))}% مكتمل</div>
                ` : ''}
                <div class="price">$${course.price}</div>
                <button class="btn-primary" onclick="event.stopPropagation(); enrollCourse(${course.id})">
                    ${currentUser && ProgressTracker.getProgress(course.id) > 0 ? 'استمرار' : 'اشترك الآن'}
                </button>
            </div>
        </div>
    `).join('');
};

// ============== إضافة الفيديوهات للكورسات عند التهيئة ==============
function initializeVideosAndBooks() {
    // إضافة فيديوهات للكورسات
    VideoSystem.videos.forEach((video, index) => {
        const courseId = (index % 3) + 1;
        VideoSystem.addVideoToCourse(courseId, video.id);
    });
    
    // إضافة الكتب للكورسات
    courses.forEach((course, index) => {
        course.books = booksDatabase.slice(index * 2, index * 2 + 2).filter(b => b);
    });
    
    // حفظ التغييرات
    localStorage.setItem('courses', JSON.stringify(courses));
}

// ============== تحديث دالة التهيئة ==============
const originalInit = init;
window.init = function() {
    if (typeof originalInit === 'function') originalInit();
    initializeVideosAndBooks();
    
    // عرض الكتب في الصفحة الرئيسية
    const booksSection = document.createElement('section');
    booksSection.className = 'featured-books';
    booksSection.innerHTML = `
        <div class="container">
            <h2 class="section-title"><i class="fas fa-book-open"></i> مكتبة الكتب والاختبارات</h2>
            <div id="booksGrid"></div>
        </div>
    `;
    
    const featuredCourses = document.querySelector('.featured-courses');
    if (featuredCourses) {
        featuredCourses.insertAdjacentElement('afterend', booksSection);
    }
    
    BookQuizSystem.displayBooks('booksGrid');
};

// إضافة زر الوضع الداكن بشكل واضح وتفعيله
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // تفعيل الوضع الداكن بشكل إضافي
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.style.position = 'fixed';
        darkModeBtn.style.bottom = '20px';
        darkModeBtn.style.right = '20px';
        darkModeBtn.style.left = 'auto';
        darkModeBtn.style.zIndex = '9999';
        darkModeBtn.style.width = '50px';
        darkModeBtn.style.height = '50px';
        darkModeBtn.style.borderRadius = '50%';
        darkModeBtn.style.background = 'var(--primary-color)';
        darkModeBtn.style.color = 'white';
        darkModeBtn.style.border = 'none';
        darkModeBtn.style.cursor = 'pointer';
        darkModeBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    }
});
cancelAnimationFrame
