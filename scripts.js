// =============== FORMAT DATA ===============
const formatData = {
    archive: ['7Z', 'ACE', 'ALZ', 'ARC', 'ARJ', 'BZ', 'BZ2', 'CAB', 'CPIO', 'DEB', 'DMG', 'GZ', 'IMG', 'ISO', 'JAR', 'LHA', 'LZ', 'LZMA', 'LZO', 'RAR', 'RPM', 'RZ', 'TAR', 'TAR.7Z', 'TAR.BZ', 'TAR.BZ2', 'TAR.GZ', 'TAR.LZO', 'TAR.XZ', 'TAR.Z', 'TBZ', 'TBZ2', 'TGZ', 'TZ', 'TZO', 'XZ', 'Z', 'ZIP'],
    audio: ['ACC', 'AC3', 'AIF', 'AIFC', 'AIFF', 'AMR', 'AU', 'CAF', 'FLAC', 'M4A', 'M4B', 'MP3', 'OGA', 'VOC', 'WAV', 'WEBA', 'WMA'],
    cad: ['DWG', 'DXF'],
    document: [
        // Word Processing Formats
        'DOC', 'DOCX', 'DOCM', 'DOT', 'DOTX', 'RTF', 'TXT', 'ODT', 
        // Page Layout & Publishing
        'PDF', 'PAGES', 'DJVU', 'XPS',
        // Markup & Web
        'HTML', 'HTM', 'MD', 'RST', 'TEX', 
        // Legacy & Special
        'ABW', 'HWP', 'LWP', 'WPD', 'WPS', 'ZABW'
    ],
    ebook: ['AZW', 'AZW3', 'AZW4', 'CBC', 'CBR', 'CBZ', 'CHM', 'EPUB', 'FB2', 'HTM', 'HTMLZ', 'LIT', 'LRF', 'MOBI', 'PDB', 'PML', 'PRC', 'RB', 'SNB', 'TCR', 'TXTZ'],
    font: ['EOT', 'OTF', 'TTF', 'WOFF', 'WOFF2'],
    image: ['3FR', 'ARW', 'AVIF', 'BMP', 'CR2', 'CR3', 'CRW', 'DCR', 'DNG', 'EPS', 'ERF', 'GIF', 'HEIC', 'HEIF', 'ICNS', 'ICO', 'JFIF', 'JPEG', 'JPG', 'MOS', 'MRW', 'NEF', 'ODD', 'ODG', 'ORF', 'PEF', 'PNG', 'PPM', 'PS', 'PSD', 'RAF', 'RAW', 'RW2', 'TIF', 'TIFF', 'WEBP', 'X3F', 'XCF', 'XPS'],
    other: ['OVG', 'OPUS'],
    presentation: ['DPS', 'KEY', 'ODP', 'POT', 'POTX', 'PPS', 'PPSX', 'PPT', 'PPTM', 'PPTX'],
    spreadsheet: ['CSV', 'ET', 'NUMBERS', 'ODS', 'XLS', 'XLSM', 'XLSX'],
    vector: ['AI', 'CDR', 'CGM', 'EMF', 'SK', 'SK1', 'SVG', 'SVGZ', 'VSD', 'WMF'],
    video: ['3G2', '3GP', '3GPP', 'AVI', 'CAVS', 'DV', 'DVR', 'FLV', 'M2TS', 'M4V', 'MKV', 'MOD', 'MOV', 'MP3', 'MP4', 'MPEG', 'MPG', 'MTS', 'MXF', 'OGG', 'RM', 'RMVB', 'SWF', 'TS', 'VOB', 'WEBM', 'WMV', 'WTV']
};

// =============== DOM REFERENCES ===============
let categorySelect, outputFormatSelect, convertBtn, fileInput, fileDropArea, fileInfo, selectFileBtn;

// =============== INITIALIZATION ===============
// Apply theme before DOM is fully loaded to prevent flash of wrong theme
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM yüklendi, dönüştürücü uygulama başlatılıyor');
    
    // Initialize global variable for selected file
    window.selectedFile = null;
    
    // Get all DOM references
    initDomReferences();
    
    // Apply CSS fix for file input to make it more accessible
    applyFileInputFix();
    
    // Initialize tabs
    initializeTabs();
    
    // Add animation effects
    enhanceBackgroundAnimation();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Add additional CSS styles for animation
    addDynamicStyles();
    
    // Setup newsletter form
    setupNewsletterForm();
});

function initDomReferences() {
    categorySelect = document.getElementById('category-select');
    outputFormatSelect = document.getElementById('output-format');
    convertBtn = document.getElementById('convert-btn');
    fileInput = document.getElementById('file-input');
    fileDropArea = document.getElementById('file-drop-area');
    fileInfo = document.getElementById('file-info');
    selectFileBtn = document.getElementById('select-file-btn');
    tabBtns = document.querySelectorAll('.tab-btn');
    tabContent = document.querySelector('.tab-content');
    
    // Log for debugging
    console.log('DOM elemanları başlatıldı:');
    console.log('Dosya girişi:', fileInput);
    console.log('Dosya bırakma alanı:', fileDropArea);
    console.log('Dosya seçme butonu:', selectFileBtn);
}

function applyFileInputFix() {
    if (!fileInput) {
        console.error('CSS düzeltmesi için dosya girişi elemanı bulunamadı');
        return;
    }
    
    // Make file input more accessible while still visually hidden
    // The key is to make it have a larger size and positive z-index
    fileInput.style.position = 'absolute';
    fileInput.style.opacity = '0';
    fileInput.style.width = '100%'; 
    fileInput.style.height = '100%';
    fileInput.style.top = '0';
    fileInput.style.left = '0';
    fileInput.style.zIndex = '1'; // Positive z-index so it can receive events
    fileInput.style.cursor = 'pointer';
}

function setupEventListeners() {
    // File selection events
    if (fileInput) {
        fileInput.value = ''; // Reset value
        
        fileInput.addEventListener('change', function(event) {
            console.log('Dosya girişi değişim olayı tetiklendi');
            handleFileSelect(event);
        });
        
        fileInput.addEventListener('click', function(event) {
            console.log('Dosya girişi doğrudan tıklandı');
            // Stop propagation to prevent double events when clicking on areas that overlap
            event.stopPropagation(); 
        });
    } else {
        console.error('Dosya girişi elemanı bulunamadı!');
    }
    
    // Select file button click event
    if (selectFileBtn) {
        selectFileBtn.addEventListener('click', function(e) {
            console.log('Dosya seçme butonuna tıklandı');
            e.preventDefault();
            e.stopPropagation();
            
            if (fileInput) {
                console.log('Butondan dosya girişi tıklaması tetikleniyor');
                // Use a timeout to ensure the event is properly handled
                setTimeout(() => {
                    fileInput.click();
                }, 10);
            }
        });
    }
    
    // Drop area click event - make entire area clickable
    if (fileDropArea) {
        fileDropArea.addEventListener('click', function(e) {
            // Only trigger if not clicking on the button (which has its own handler)
            if (!e.target.closest('.select-file-btn')) {
                console.log('Dosya bırakma alanına tıklandı');
                if (fileInput) {
                    setTimeout(() => {
                        fileInput.click();
                    }, 10);
                }
            }
        });
        
        // Drag and drop events
        fileDropArea.addEventListener('dragover', handleDragOver);
        fileDropArea.addEventListener('dragleave', handleDragLeave);
        fileDropArea.addEventListener('drop', handleDrop);
    }
    
    // Category select change event
    if (categorySelect) {
        categorySelect.addEventListener('change', updateOutputFormats);
    }
    
    // Convert button click
    if (convertBtn) {
        convertBtn.addEventListener('click', startConversion);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('nav ul li').forEach(li => {
                    li.classList.remove('active');
                });
                
                this.parentElement.classList.add('active');
            }
        });
    });
    
    // Add the theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle the light-theme class on the body
            document.body.classList.toggle('light-theme');
            
            // Update the icon based on the current theme
            if (document.body.classList.contains('light-theme')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// =============== FILE HANDLING ===============
function handleFileSelect(event) {
    console.log('Dosya seçim olayı tetiklendi:', event);
    
    let file = null;
    
    // Get the file from the event
    if (event.target && event.target.files && event.target.files.length > 0) {
        file = event.target.files[0];
        console.log('Dosya seçildi:', file.name, file.size);
    } else {
        console.error('Olayda hiçbir dosya seçilmedi');
        return;
    }
    
    if (file) {
        // Store the file in the global scope
        window.selectedFile = file;
        
        // Update the UI with file information
        updateFileInfo(file);
        
        // Add visual feedback for file selection
        if (fileDropArea) {
            console.log('Dosya bırakma alanına dosya-seçildi sınıfı ekleniyor');
            fileDropArea.classList.add('file-selected');
        }
        
        // Show file type icon
        updateFileIcon(file);
        
        // Enable convert button
        if (convertBtn) {
            convertBtn.disabled = false;
        }
    }
}

function updateFileInfo(file) {
    if (!file) {
        console.error('updateFileInfo\'ya hiçbir dosya sağlanmadı');
        return;
    }
    
    if (!fileInfo) {
        console.error('Dosya bilgisi elemanı bulunamadı');
        return;
    }
    
    // Format file size (KB, MB, etc.)
    const fileSize = formatFileSize(file.size);
    
    // Update file info display
    const fileInfoSpan = fileInfo.querySelector('span');
    if (fileInfoSpan) {
        fileInfoSpan.textContent = `${file.name} (${fileSize})`;
    } else {
        fileInfo.innerHTML = `<i class="file-type-icon fas fa-file"></i> <span>${file.name} (${fileSize})</span>`;
    }
    
    // Make sure file info is visible
    fileInfo.style.display = 'flex';
    fileInfo.style.color = 'white';
    fileInfo.style.zIndex = '10'; // Ensure it's visible on top
    
    // Try to detect file category from extension
    const extension = file.name.split('.').pop().toUpperCase();
    detectFileCategory(extension);
}

function updateFileIcon(file) {
    if (!file) {
        console.error('updateFileIcon\'a hiçbir dosya sağlanmadı');
        return;
    }
    
    const fileTypeIcon = fileInfo ? fileInfo.querySelector('.file-type-icon') : null;
    if (!fileTypeIcon) {
        console.error('Dosya türü simgesi elemanı bulunamadı');
        return;
    }
    
    const extension = file.name.split('.').pop().toLowerCase();
    let iconClass = 'fas fa-file'; // Default icon
    
    // Determine icon based on file type
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
        iconClass = 'fas fa-file-image';
    } else if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
        iconClass = 'fas fa-file-audio';
    } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'].includes(extension)) {
        iconClass = 'fas fa-file-video';
    } else if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
        iconClass = 'fas fa-file-alt';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
        iconClass = 'fas fa-file-archive';
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
        iconClass = 'fas fa-file-excel';
    } else if (['ppt', 'pptx'].includes(extension)) {
        iconClass = 'fas fa-file-powerpoint';
    }
    
    // Remove any existing classes except 'file-type-icon'
    fileTypeIcon.className = 'file-type-icon';
    
    // Add the new icon class
    iconClass.split(' ').forEach(cls => {
        fileTypeIcon.classList.add(cls);
    });
    
    // Apply color based on file type
    fileTypeIcon.style.color = getFileTypeColor(extension);
}

// =============== DRAG AND DROP ===============
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Sürükleme üzerinde olayı');
    
    if (fileDropArea) {
        fileDropArea.classList.add('active');
    }
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Sürükleme ayrılma olayı');
    
    if (fileDropArea) {
        fileDropArea.classList.remove('active');
    }
}

function handleDrop(event) {
    console.log('Bırakma olayı tetiklendi');
    event.preventDefault();
    event.stopPropagation();
    
    if (fileDropArea) {
        fileDropArea.classList.remove('active');
    }
    
    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        console.log('Dosya bırakıldı:', file.name, file.size);
        
        // Store the file in the global scope
        window.selectedFile = file;
        
        // Update UI
        updateFileInfo(file);
        
        // Add visual feedback
        if (fileDropArea) {
            fileDropArea.classList.add('file-selected');
        }
        
        // Show file type icon
        updateFileIcon(file);
        
        // Enable convert button
        if (convertBtn) {
            convertBtn.disabled = false;
        }
    } else {
        console.error('Bırakma olayında dosya yok veya dataTransfer desteklenmiyor');
    }
}

// =============== HELPER FUNCTIONS ===============
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bayt';
    
    const k = 1024;
    const sizes = ['Bayt', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileTypeColor(extension) {
    // Return a color based on file type for the icon
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
        return '#42A5F5'; // Blue for images
    } else if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
        return '#66BB6A'; // Green for audio
    } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'].includes(extension)) {
        return '#EF5350'; // Red for videos
    } else if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
        return '#FF9800'; // Orange for documents
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
        return '#9C27B0'; // Purple for archives
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
        return '#4CAF50'; // Green for spreadsheets
    } else if (['ppt', 'pptx'].includes(extension)) {
        return '#FF5722'; // Deep orange for presentations
    }
    
    return '#90A4AE'; // Default gray
}

function detectFileCategory(extension) {
    let detectedCategory = null;
    
    // Check if extension exists in any category
    for (const [category, formats] of Object.entries(formatData)) {
        if (formats.includes(extension)) {
            detectedCategory = category;
            break;
        }
    }
    
    if (detectedCategory && categorySelect) {
        // Set the category select
        categorySelect.value = detectedCategory;
        
        // Trigger change event to update output formats
        const event = new Event('change');
        categorySelect.dispatchEvent(event);
    }
}

// =============== TABS INITIALIZATION ===============
function initializeTabs() {
    console.log('Format sekmeleri başlatılıyor');
    
    // Format tabları için DOM elemanlarını kontrol et
    const formatTabsContainer = document.querySelector('.format-tabs-container');
    if (!formatTabsContainer) {
        console.error('Format sekmeleri konteyneri bulunamadı!');
        return;
    }
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (!tabBtns || tabBtns.length === 0) {
        console.error('Sekme butonları bulunamadı!');
        return;
    }
    
    const tabContent = document.querySelector('.tab-content');
    if (!tabContent) {
        console.error('Sekme içeriği konteyneri bulunamadı!');
        return;
    }
    
    // Tüm tab-pane içeriklerini temizle
    tabContent.innerHTML = '';
    
    // Sayfa yüklendiğinde scroll pozisyonunu kontrol et
    window.addEventListener('load', function() {
        // Format bölümünü bulup görünür yap
        const formatsSection = document.getElementById('formats');
        if (formatsSection) {
            console.log('Format bölümü bulundu, görünürlük ayarlanıyor');
            formatsSection.style.display = 'block';
            formatsSection.style.visibility = 'visible';
            formatsSection.style.opacity = '1';
        }
    });
    
    // Her kategori için tab-pane oluştur
    Object.keys(formatData).forEach((category, index) => {
        console.log(`${category} kategorisi için sekme paneli oluşturuluyor`);
        
        const tabPane = document.createElement('div');
        tabPane.className = 'tab-pane';
        tabPane.dataset.category = category;
        
        // İlk kategoriyi (archive) aktif olarak ayarla
        if (index === 0) {
            tabPane.classList.add('active');
        }
        
        const formatGrid = document.createElement('div');
        formatGrid.className = 'format-grid';
        
        // Format itemlerini oluştur
        if (formatData[category] && formatData[category].length > 0) {
            // Belge formatları için özel gruplama
            if (category === 'document') {
                const groups = [
                    { name: 'Kelime İşleme', start: 0, end: 7 },
                    { name: 'Sayfa Düzeni ve Yayıncılık', start: 8, end: 11 },
                    { name: 'İşaretleme ve Web', start: 12, end: 16 },
                    { name: 'Eski ve Özel', start: 17, end: formatData[category].length - 1 }
                ];
                
                groups.forEach(group => {
                    // Grup başlığını ekle
                    const groupHeader = document.createElement('div');
                    groupHeader.className = 'format-group-header';
                    groupHeader.textContent = group.name;
                    formatGrid.appendChild(groupHeader);
                    
                    // Gruptaki formatları ekle
                    for (let i = group.start; i <= group.end; i++) {
                        if (formatData[category][i]) {
                            const formatItem = document.createElement('div');
                            formatItem.className = 'format-item';
                            formatItem.textContent = formatData[category][i];
                            formatGrid.appendChild(formatItem);
                        }
                    }
                });
            } else {
                // Diğer kategoriler için standart liste
                formatData[category].forEach(format => {
                    const formatItem = document.createElement('div');
                    formatItem.className = 'format-item';
                    formatItem.textContent = format;
                    formatGrid.appendChild(formatItem);
                });
            }
        } else {
            console.warn(`${category} kategorisi için format bulunamadı`);
        }
        
        tabPane.appendChild(formatGrid);
        tabContent.appendChild(tabPane);
    });
    
    // Sekme butonlarına tıklama olayı ekle
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            console.log(`${category} kategorisine tıklandı`);
            
            // Aktif sekme butonunu güncelle
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Aktif sekme panelini güncelle
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.dataset.category === category) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // İlk sekme düğmesini aktif olarak ayarla
    if (tabBtns.length > 0) {
        tabBtns[0].classList.add('active');
    }
    
    console.log('Format sekmeleri başarıyla başlatıldı');
}

// =============== CONVERSION OPTIONS ===============
function updateOutputFormats() {
    if (!categorySelect || !outputFormatSelect) {
        console.error('Kategori veya çıktı format seçimi bulunamadı');
        return;
    }
    
    const category = categorySelect.value;
    
    // Clear current options
    outputFormatSelect.innerHTML = '<option value="">Çıktı Formatı Seçin</option>';
    
    // Add new options based on selected category
    if (category && formatData[category]) {
        formatData[category].forEach(format => {
            const option = document.createElement('option');
            option.value = format;
            option.textContent = format;
            outputFormatSelect.appendChild(option);
        });
        
        // Enable output format select
        outputFormatSelect.disabled = false;
    } else {
        // Disable output format select if no category selected
        outputFormatSelect.disabled = true;
    }
}

// =============== CONVERSION PROCESS ===============
function startConversion() {
    // Get current file
    const file = window.selectedFile || (fileInput && fileInput.files && fileInput.files[0]);
    
    if (!outputFormatSelect) {
        console.error('Çıktı format seçimi bulunamadı');
        return;
    }
    
    const outputFormat = outputFormatSelect.value;
    
    if (!file || !outputFormat) {
        alert('Lütfen bir dosya ve çıktı formatı seçin.');
        return;
    }
    
    // Disable convert button and show loading state
    if (convertBtn) {
        convertBtn.disabled = true;
        
        const btnText = convertBtn.querySelector('.btn-text');
        const originalBtnText = btnText ? btnText.textContent : 'Dosyayı Dönüştür';
        
        if (btnText) {
            btnText.textContent = 'Dönüştürülüyor...';
        }
        
        // Add loading animation
        convertBtn.classList.add('loading');
        
        // Remove existing download button if any
        const existingDownloadBtn = document.querySelector('.download-btn');
        if (existingDownloadBtn) {
            existingDownloadBtn.remove();
        }
        
        // Simulate conversion (3 seconds)
        setTimeout(() => {
            // Reset button state
            convertBtn.disabled = false;
            if (btnText) {
                btnText.textContent = originalBtnText;
            }
            convertBtn.classList.remove('loading');
            
            // Create a download button
            createDownloadButton(file, outputFormat);
            
            // Show success message
            showSuccessMessage(outputFormat);
        }, 3000);
    }
}

function createDownloadButton(file, outputFormat) {
    if (!convertBtn) {
        console.error('İndirme butonunu eklemek için dönüştürme butonu bulunamadı');
        return;
    }
    
    // Generate a new filename with the selected extension
    const originalName = file.name.split('.').slice(0, -1).join('.');
    const newFileName = `${originalName}.${outputFormat.toLowerCase()}`;
    
    // In a real app, the server would convert the file
    // For this demo, we'll use the original file but with a new name
    const downloadUrl = URL.createObjectURL(file);
    
    // Create the button
    const downloadBtn = document.createElement('a');
    downloadBtn.className = 'download-btn';
    downloadBtn.href = downloadUrl;
    downloadBtn.download = newFileName;
    downloadBtn.innerHTML = `
        <span class="btn-icon"><i class="fas fa-download"></i></span>
        <span class="btn-text">Dönüştürülmüş Dosyayı İndir</span>
    `;
    
    // Add the button after the convert button
    convertBtn.parentNode.appendChild(downloadBtn);
    
    // Auto trigger download after 1 second
    setTimeout(() => {
        downloadBtn.click();
    }, 1000);
}

function showSuccessMessage(outputFormat) {
    const conversionOptions = document.querySelector('.conversion-options');
    if (!conversionOptions) {
        console.error('Dönüşüm seçenekleri konteyneri bulunamadı');
        return;
    }
    
    // Remove any existing success message
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `<i class="fas fa-check-circle"></i> Dönüşüm tamamlandı! Dosyanız ${outputFormat} formatına dönüştürüldü.`;
    
    // Add to DOM
    conversionOptions.appendChild(successMessage);
}

// =============== BACKGROUND ANIMATION ===============
function enhanceBackgroundAnimation() {
    const backgroundAnimation = document.querySelector('.background-animation');
    if (!backgroundAnimation) {
        console.error('Arka plan animasyon elemanı bulunamadı');
        return;
    }
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 15 + 5;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(110, 66, 245, 0.2), transparent 70%);
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(${size / 2}px);
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${duration}s infinite ease-in-out;
            animation-delay: -${Math.random() * 20}s;
        `;
        
        backgroundAnimation.appendChild(particle);
    }
}

// =============== ADDITIONAL STYLES ===============
function addDynamicStyles() {
    // Try to get first stylesheet or create one if none exists
    let styleSheet;
    if (document.styleSheets.length > 0) {
        styleSheet = document.styleSheets[0];
    } else {
        const style = document.createElement('style');
        document.head.appendChild(style);
        styleSheet = style.sheet;
    }
    
    try {
        // Add keyframes for floating particles animation
        styleSheet.insertRule(`
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(30px, 30px) rotate(90deg); }
                50% { transform: translate(0, 60px) rotate(180deg); }
                75% { transform: translate(-30px, 30px) rotate(270deg); }
            }
        `, styleSheet.cssRules.length);
        
        // Add loading animation CSS
        styleSheet.insertRule(`
            .convert-btn.loading {
                position: relative;
                overflow: hidden;
            }
        `, styleSheet.cssRules.length);
        
        styleSheet.insertRule(`
            .convert-btn.loading::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                animation: loading 1.5s infinite;
            }
        `, styleSheet.cssRules.length);
        
        styleSheet.insertRule(`
            @keyframes loading {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `, styleSheet.cssRules.length);
    } catch (e) {
        console.error('Dinamik stil eklerken hata:', e);
    }
}

/**
 * Newsletter Form Handling 
 */
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterEmail.value.trim();
            if (!email) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission (in a real app, this would be an API call)
            showLoadingIndicator(newsletterForm);
            
            // Simulate API response delay
            setTimeout(() => {
                hideLoadingIndicator(newsletterForm);
                showNotification('Bültenimize başarıyla abone oldunuz!', 'success');
                newsletterEmail.value = '';
            }, 1500);
        });
    }
}

/**
 * Show loading indicator on a form
 */
function showLoadingIndicator(form) {
    // First check if loading indicator already exists
    if (form.querySelector('.form-loading-indicator')) {
        return;
    }
    
    // Disable form inputs and submit button
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.setAttribute('disabled', 'disabled');
    });
    
    // Create and append loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'form-loading-indicator';
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    form.appendChild(loadingIndicator);
}

/**
 * Hide loading indicator
 */
function hideLoadingIndicator(form) {
    const loadingIndicator = form.querySelector('.form-loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
    
    // Re-enable form inputs and submit button
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.removeAttribute('disabled');
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to document body
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('notification-visible');
    }, 10);
    
    // Setup close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.remove('notification-visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto hide after 5 seconds for success and info
    if (type !== 'error') {
        setTimeout(() => {
            notification.classList.remove('notification-visible');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
} 