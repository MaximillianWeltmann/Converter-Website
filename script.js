let convertedFiles = [];

function checkFiles() {
    let fileInput = document.getElementById('jpegFiles');
    let formatSelect = document.getElementById('formatSelect');
    
    // Varsayılan olarak görüntü formatları
    formatSelect.innerHTML = `
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
        <option value="gif">GIF</option>
        <option value="bmp">BMP</option>
        <option value="jpeg">JPEG</option>
    `;

    let isMusicFile = false;
    let isVideoFile = false;

    // Dosyaları kontrol et
    for (let i = 0; i < fileInput.files.length; i++) {
        let file = fileInput.files[i];

        // Ses dosyası mı?
        if (file.type.startsWith("audio/") || file.name.endsWith(".mp3")) {
            isMusicFile = true;
        } else if (file.type.startsWith("video/") || file.name.endsWith(".mp4")) {
            isVideoFile = true;
        }
    }

    // Eğer ses dosyası seçildiyse, ses formatlarını göster
    if (isMusicFile) {
        formatSelect.innerHTML = `
            <option value="aac">AAC</option>
            <option value="aiff">AIFF</option>
            <option value="flac">FLAC</option>
            <option value="m4a">M4A</option>
            <option value="mp3">MP3</option>
            <option value="wav">WAV</option>
            <option value="wma">WMA</option>
        `;
    }

    // Eğer video dosyası seçildiyse, video formatlarını göster
    if (isVideoFile) {
        formatSelect.innerHTML = `
            <option value="aac">AAC</option>
            <option value="aiff">AIFF</option>
            <option value="flac">FLAC</option>
            <option value="m4a">M4A</option>
            <option value="mp3">MP3</option>
            <option value="wav">WAV</option>
            <option value="wma">WMA</option>
            <option value="gif">GIF</option>
            <option value="avi">AVI</option>
            <option value="flv">FLV</option>
            <option value="mkv">MKV</option>
            <option value="mov">MOV</option>
            <option value="mp4">MP4</option>
            <option value="webm">WEBM</option>
            <option value="wmv">WMV</option>
        `;
    }
}

function convertFiles() {
    let fileInput = document.getElementById('jpegFiles');
    let files = fileInput.files;
    let format = document.getElementById('formatSelect').value;
    let fileListDiv = document.getElementById('fileList');
    fileListDiv.innerHTML = '';
    convertedFiles = [];

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (file.type.startsWith("image/")) {
                showProgressBar(file.name);
                convertImage(file, format);
            } else if (file.type.startsWith("audio/")) {
                showProgressBar(file.name);
                convertAudio(file, format);
            } else if (file.type.startsWith("video/")) {
                showProgressBar(file.name);
                convertVideo(file, format);
            }
        }
    } else {
        alert("Lütfen en az bir dosya seçin.");
    }

    if (files.length > 1) {
        showDownloadAllButton();
    }
}

function convertImage(file, format) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.onload = function () {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedDataUrl = canvas.toDataURL(`image/${format}`);
            addFileToList(file, convertedDataUrl, format);
            convertedFiles.push({ url: convertedDataUrl, name: file.name.replace(/\.[^/.]+$/, `.${format}`) });
            hideProgressBar();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function convertAudio(file, format) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let audio = new Audio();
        audio.src = event.target.result;

        // Burada ses dosyasını dönüştürme işlemini yapmalısın
        let convertedDataUrl = audio.src;  // Ses dönüşüm işlemi burada yapılacak (örneğin bir API kullanarak)
        
        addFileToList(file, convertedDataUrl, format);
        convertedFiles.push({ url: convertedDataUrl, name: file.name.replace(/\.[^/.]+$/, `.${format}`) });
        hideProgressBar();
    };
    reader.readAsDataURL(file);
}

function convertVideo(file, format) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let video = document.createElement('video');
        video.src = event.target.result;

        // Burada video dosyasını dönüştürme işlemini yapmalısın
        let convertedDataUrl = video.src;  // Video dönüşüm işlemi burada yapılacak (örneğin bir API kullanarak)
        
        addFileToList(file, convertedDataUrl, format);
        convertedFiles.push({ url: convertedDataUrl, name: file.name.replace(/\.[^/.]+$/, `.${format}`) });
        hideProgressBar();
    };
    reader.readAsDataURL(file);
}

function addFileToList(file, convertedData, format) {
    let fileItemDiv = document.createElement('div');
    fileItemDiv.classList.add('file-item');

    if (file.type.startsWith('image/')) {
        let img = document.createElement('img');
        img.src = convertedData;
        img.style.maxWidth = '200px';
        img.style.marginRight = '15px';
        fileItemDiv.appendChild(img);
    }

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    let fileName = file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name;
    infoDiv.innerHTML = `
        <strong>${fileName}</strong><br>
        Boyut: ${(file.size / 1024).toFixed(2)} KB<br>
        Dönüştürüldü: ${format.toUpperCase()}
    `;
    fileItemDiv.appendChild(infoDiv);

    let downloadBtn = document.createElement('a');
    downloadBtn.classList.add('download-btn');
    downloadBtn.href = convertedData;
    downloadBtn.download = file.name.replace(/\.[^/.]+$/, `.${format}`);
    downloadBtn.innerText = 'İndir';
    downloadBtn.style.fontSize = '16px';
    downloadBtn.style.padding = '10px';
    fileItemDiv.appendChild(downloadBtn);

    document.getElementById('fileList').appendChild(fileItemDiv);
}

function showDownloadAllButton() {
    let container = document.querySelector('.container');  // container div'ini seçiyoruz.
    
    if (!document.getElementById('downloadAllBtn')) {
        let downloadAllBtn = document.createElement('button');
        downloadAllBtn.id = 'downloadAllBtn';
        downloadAllBtn.innerText = "Tümünü İndir";
        downloadAllBtn.style.width = 'calc(100% - 30px)'; // İki liste arasındaki boşluğu eşitlemek için
        downloadAllBtn.style.margin = '20px auto 0';  // Yukarıda boşluk bırakıyoruz
        downloadAllBtn.onclick = async function () {
            let zip = new JSZip();
            let folder = zip.folder("converted_files");

            for (const file of convertedFiles) {
                const response = await fetch(file.url);
                const blob = await response.blob();
                folder.file(file.name, blob);
            }

            zip.generateAsync({ type: "blob" }).then(function (content) {
                let a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = 'converted_files.zip';
                a.click();
            });
        };
        container.appendChild(downloadAllBtn);  // Container'a ekliyoruz
    }
}

function showProgressBar(fileName) {
    let progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.innerText = `Dönüştürülüyor: ${fileName}`;
    document.body.appendChild(progressBar);
}

function hideProgressBar() {
    document.querySelectorAll('.progress-bar').forEach(bar => bar.remove());
}


// YouTube video linki işleme
// YouTube video linkini işleme
// processYoutubeLink fonksiyonu
function processYoutubeLink() {
    const url = document.getElementById('youtubeUrl').value;
    const downloadLinkContainer = document.getElementById('downloadLinkContainer');

    // Burada dış bir API veya backend sunucusu kullanılabilir
    // API'den alınan video indirme linkini işliyoruz
    if (url) {
        // Örnek olarak video linkini bir indirme linkine dönüştürürüz
        // Bu sadece frontend tarafında görünen bir simülasyon
        const videoDownloadLink = `https://your-backend-api.com/download?videoUrl=${encodeURIComponent(url)}`;
        
        downloadLinkContainer.innerHTML = `
            <a href="${videoDownloadLink}" target="_blank">Videoyu İndir</a>
        `;
    } else {
        downloadLinkContainer.innerHTML = "Lütfen geçerli bir YouTube video linki girin.";
    }
}



