document.addEventListener('DOMContentLoaded', () => {
    // ==================== TRANSLATION SYSTEM ====================
    const translations = {
        ar: {
            langBtn: 'EN',
            title: 'محوّل PDF إلى صور',
            subtitle: 'حوّل ملفاتك بكل سهولة وسرعة، وبخصوصية تامة (يتم التحويل داخل متصفحك).',
            modePdfToImg: 'PDF → صور',
            modeImgToPdf: 'صور → PDF',
            formatLabel: 'صيغة الصورة:',
            formatPng: 'PNG (خلفية شفافة / جودة عالية)',
            formatJpg: 'JPEG (حجم أصغر)',
            qualityLabel: 'جودة الصورة:',
            scaleLabel: 'الدقة (التكبير):',
            scale1: 'عادية (1x)',
            scale15: 'جيدة (1.5x)',
            scale2: 'عالية (2x) - يُنصح بها',
            scale3: 'ممتازة (3x)',
            dropTitle: 'اسحب وأفلت ملف الـ PDF هنا',
            dropOr: 'أو',
            chooseFile: 'اختر ملفاً',
            processing: 'جاري المعالجة... يرجى الانتظار',
            extractedPages: 'الصفحات المستخرجة',
            downloadZip: 'تحميل الكل (ZIP)',
            newFile: 'ملف جديد',
            download: 'تحميل',
            page: 'صفحة',
            pageSizeLabel: 'حجم الصفحة:',
            pageFit: 'مطابق للصورة',
            orientationLabel: 'الاتجاه:',
            portrait: 'عمودي (Portrait)',
            landscape: 'أفقي (Landscape)',
            marginLabel: 'الهوامش:',
            noMargin: 'بدون هوامش',
            smallMargin: 'صغيرة (10px)',
            mediumMargin: 'متوسطة (20px)',
            dropImgTitle: 'اسحب وأفلت الصور هنا',
            chooseImages: 'اختر صوراً',
            selectedImages: 'الصور المختارة',
            addMore: 'إضافة المزيد',
            convertToPdf: 'تحويل إلى PDF',
            reset: 'إعادة ضبط',
            reorderHint: '💡 يمكنك حذف الصور بالضغط على زر ✕',
            creatingPdf: 'جاري إنشاء ملف PDF...',
            pdfReady: 'ملف PDF جاهز!',
            downloadPdf: 'تحميل PDF',
            newConversion: 'تحويل جديد',
            alertPdf: 'يرجى اختيار ملف PDF صالح.',
            alertError: 'حدث خطأ أثناء معالجة الملف. يرجى المحاولة مرة أخرى.',
            alertImg: 'يرجى اختيار ملفات صور صالحة.',
            alertZipError: 'حدث خطأ أثناء إنشاء الملف المضغوط.',
            readingFile: 'جاري قراءة الملف...',
            extracting: 'جاري استخراج {n} صفحة...',
            processed: 'تم معالجة صفحة {current} من {total}',
            preparing: 'جاري التجهيز...',
        },
        en: {
            langBtn: 'عربي',
            title: 'PDF to Image Converter',
            subtitle: 'Convert your files easily, quickly, and with full privacy (conversion happens in your browser).',
            modePdfToImg: 'PDF → Images',
            modeImgToPdf: 'Images → PDF',
            formatLabel: 'Image Format:',
            formatPng: 'PNG (Transparent / High Quality)',
            formatJpg: 'JPEG (Smaller Size)',
            qualityLabel: 'Image Quality:',
            scaleLabel: 'Resolution (Scale):',
            scale1: 'Normal (1x)',
            scale15: 'Good (1.5x)',
            scale2: 'High (2x) - Recommended',
            scale3: 'Excellent (3x)',
            dropTitle: 'Drag & Drop your PDF file here',
            dropOr: 'or',
            chooseFile: 'Choose File',
            processing: 'Processing... Please wait',
            extractedPages: 'Extracted Pages',
            downloadZip: 'Download All (ZIP)',
            newFile: 'New File',
            download: 'Download',
            page: 'Page',
            pageSizeLabel: 'Page Size:',
            pageFit: 'Fit to Image',
            orientationLabel: 'Orientation:',
            portrait: 'Portrait',
            landscape: 'Landscape',
            marginLabel: 'Margins:',
            noMargin: 'No Margins',
            smallMargin: 'Small (10px)',
            mediumMargin: 'Medium (20px)',
            dropImgTitle: 'Drag & Drop images here',
            chooseImages: 'Choose Images',
            selectedImages: 'Selected Images',
            addMore: 'Add More',
            convertToPdf: 'Convert to PDF',
            reset: 'Reset',
            reorderHint: '💡 You can remove images by clicking the ✕ button',
            creatingPdf: 'Creating PDF file...',
            pdfReady: 'PDF is Ready!',
            downloadPdf: 'Download PDF',
            newConversion: 'New Conversion',
            alertPdf: 'Please select a valid PDF file.',
            alertError: 'An error occurred while processing the file. Please try again.',
            alertImg: 'Please select valid image files.',
            alertZipError: 'An error occurred while creating the ZIP file.',
            readingFile: 'Reading file...',
            extracting: 'Extracting {n} pages...',
            processed: 'Processed page {current} of {total}',
            preparing: 'Preparing...',
        }
    };

    let currentLang = 'ar';

    function switchLanguage() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        const html = document.documentElement;
        html.setAttribute('lang', currentLang);
        html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        document.title = currentLang === 'ar' ? 'محول الـ PDF إلى صور (متقدّم)' : 'Advanced PDF & Image Converter';

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
    }

    // ==================== ELEMENTS ====================
    // Language Toggle
    const langToggle = document.getElementById('langToggle');

    // Mode tabs
    const modeTabs = document.querySelectorAll('.mode-tab');
    const modeContents = document.querySelectorAll('.mode-content');

    // PDF to Image elements
    const dropZone = document.getElementById('dropZone');
    const pdfInput = document.getElementById('pdfInput');
    const outputFormat = document.getElementById('outputFormat');
    const quality = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const scale = document.getElementById('scale');
    const processingSection = document.getElementById('processingSection');
    const resultsSection = document.getElementById('resultsSection');
    const imageGrid = document.getElementById('imageGrid');
    const pageCountDisplay = document.getElementById('pageCount');
    const progressFill = document.getElementById('progressFill');
    const processingText = document.getElementById('processingText');
    const uploadSection = document.querySelector('#pdfToImgMode .upload-section');
    const downloadZipBtn = document.getElementById('downloadZipBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Image to PDF elements
    const imgDropZone = document.getElementById('imgDropZone');
    const imgInput = document.getElementById('imgInput');
    const imgInputMore = document.getElementById('imgInputMore');
    const imgUploadSection = document.getElementById('imgUploadSection');
    const imgPreviewSection = document.getElementById('imgPreviewSection');
    const imgPreviewGrid = document.getElementById('imgPreviewGrid');
    const imgCount = document.getElementById('imgCount');
    const convertToPdfBtn = document.getElementById('convertToPdfBtn');
    const resetImgBtn = document.getElementById('resetImgBtn');
    const imgProcessingSection = document.getElementById('imgProcessingSection');
    const imgResultSection = document.getElementById('imgResultSection');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const resetImgResultBtn = document.getElementById('resetImgResultBtn');

    // State
    let pdfDoc = null;
    let imagesData = [];
    let currentFileName = '';
    let uploadedImages = [];
    let generatedPdfBlob = null;

    // ==================== LANGUAGE TOGGLE ====================
    langToggle.addEventListener('click', switchLanguage);

    // ==================== MODE SWITCHING ====================
    modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            modeTabs.forEach(t => t.classList.remove('active'));
            modeContents.forEach(c => c.classList.remove('active'));

            // Activate clicked tab
            tab.classList.add('active');
            const mode = tab.getAttribute('data-mode');
            if (mode === 'pdf-to-img') {
                document.getElementById('pdfToImgMode').classList.add('active');
            } else {
                document.getElementById('imgToPdfMode').classList.add('active');
            }
        });
    });

    // ==================== PDF TO IMAGE (Existing Logic) ====================
    quality.addEventListener('input', (e) => {
        qualityValue.textContent = `${Math.round(e.target.value * 100)}%`;
    });

    // Drag & Drop Handling for PDF
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('active'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        handleFiles(e.dataTransfer.files);
    }, false);

    pdfInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        if (file.type !== 'application/pdf') {
            alert(translations[currentLang].alertPdf);
            return;
        }

        currentFileName = file.name.replace(/\.[^/.]+$/, "");
        
        const fileReader = new FileReader();
        
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            processPDF(typedarray);
        };

        uploadSection.classList.add('hidden');
        processingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        imageGrid.innerHTML = '';
        imagesData = [];
        progressFill.style.width = '0%';
        processingText.textContent = translations[currentLang].readingFile;

        fileReader.readAsArrayBuffer(file);
    }

    async function processPDF(data) {
        try {
            const loadingTask = pdfjsLib.getDocument({data: data});
            pdfDoc = await loadingTask.promise;
            
            const numPages = pdfDoc.numPages;
            pageCountDisplay.textContent = numPages;
            
            processingText.textContent = translations[currentLang].extracting.replace('{n}', numPages);

            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                await renderPage(pageNum, numPages);
            }

            processingSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');

        } catch (error) {
            console.error('Error parsing PDF:', error);
            alert(translations[currentLang].alertError);
            resetPdfUI();
        }
    }

    async function renderPage(pageNum, totalPages) {
        const page = await pdfDoc.getPage(pageNum);
        const currentScale = parseFloat(scale.value);
        const viewport = page.getViewport({ scale: currentScale });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { alpha: false });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
            background: 'white'
        };

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render(renderContext).promise;

        const mimeType = outputFormat.value;
        const imgQuality = parseFloat(quality.value);
        const ext = mimeType === 'image/png' ? 'png' : 'jpg';

        const dataUrl = canvas.toDataURL(mimeType, imgQuality);
        
        imagesData.push({
            dataUrl: dataUrl,
            filename: `${currentFileName}_page_${pageNum}.${ext}`
        });

        createImageCard(dataUrl, pageNum, ext);

        const progressPercentage = (pageNum / totalPages) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        processingText.textContent = translations[currentLang].processed
            .replace('{current}', pageNum)
            .replace('{total}', totalPages);
    }

    function createImageCard(dataUrl, pageNum, ext) {
        const card = document.createElement('div');
        card.className = 'image-card';
        
        const img = document.createElement('img');
        img.src = dataUrl;
        img.className = 'image-preview';
        img.alt = `Page ${pageNum}`;
        
        const label = document.createElement('div');
        label.className = 'page-label';
        label.textContent = `${translations[currentLang].page} ${pageNum}`;

        const downloadBtn = document.createElement('a');
        downloadBtn.href = dataUrl;
        downloadBtn.download = `${currentFileName}_page_${pageNum}.${ext}`;
        downloadBtn.className = 'btn download-single';
        downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> ${translations[currentLang].download}`;

        card.appendChild(img);
        card.appendChild(label);
        card.appendChild(downloadBtn);
        
        imageGrid.appendChild(card);
    }

    // Download All as ZIP
    downloadZipBtn.addEventListener('click', async () => {
        if (imagesData.length === 0) return;
        
        const originalText = downloadZipBtn.innerHTML;
        downloadZipBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${translations[currentLang].preparing}`;
        downloadZipBtn.disabled = true;

        try {
            const zip = new JSZip();
            
            imagesData.forEach((img) => {
                const base64Data = img.dataUrl.split(',')[1];
                zip.file(img.filename, base64Data, {base64: true});
            });

            const zipContent = await zip.generateAsync({type: 'blob'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipContent);
            link.download = `${currentFileName}_images.zip`;
            link.click();
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error('Error creating ZIP:', error);
            alert(translations[currentLang].alertZipError);
        } finally {
            downloadZipBtn.innerHTML = originalText;
            downloadZipBtn.disabled = false;
        }
    });

    resetBtn.addEventListener('click', resetPdfUI);

    function resetPdfUI() {
        pdfInput.value = '';
        imagesData = [];
        currentFileName = '';
        uploadSection.classList.remove('hidden');
        processingSection.classList.add('hidden');
        resultsSection.classList.add('hidden');
        imageGrid.innerHTML = '';
    }

    // ==================== IMAGE TO PDF ====================
    // Drag & Drop for images
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imgDropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        imgDropZone.addEventListener(eventName, () => imgDropZone.classList.add('active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imgDropZone.addEventListener(eventName, () => imgDropZone.classList.remove('active'), false);
    });

    imgDropZone.addEventListener('drop', (e) => {
        handleImageFiles(e.dataTransfer.files);
    }, false);

    imgInput.addEventListener('change', function() {
        handleImageFiles(this.files);
    });

    imgInputMore.addEventListener('change', function() {
        handleImageFiles(this.files);
    });

    function handleImageFiles(files) {
        if (files.length === 0) return;

        const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (validFiles.length === 0) {
            alert(translations[currentLang].alertImg);
            return;
        }

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImages.push({
                    dataUrl: e.target.result,
                    name: file.name
                });
                renderImgPreviews();
            };
            reader.readAsDataURL(file);
        });

        // Show preview section
        imgUploadSection.classList.add('hidden');
        imgPreviewSection.classList.remove('hidden');
        imgResultSection.classList.add('hidden');
    }

    function renderImgPreviews() {
        imgPreviewGrid.innerHTML = '';
        imgCount.textContent = uploadedImages.length;

        uploadedImages.forEach((imgData, index) => {
            const card = document.createElement('div');
            card.className = 'image-card';

            // Number badge
            const numberBadge = document.createElement('div');
            numberBadge.className = 'img-number';
            numberBadge.textContent = index + 1;

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'img-remove-btn';
            removeBtn.innerHTML = '✕';
            removeBtn.title = 'Remove';
            removeBtn.addEventListener('click', () => {
                uploadedImages.splice(index, 1);
                renderImgPreviews();
                if (uploadedImages.length === 0) {
                    resetImgUI();
                }
            });

            const img = document.createElement('img');
            img.src = imgData.dataUrl;
            img.className = 'image-preview';
            img.alt = imgData.name;

            const label = document.createElement('div');
            label.className = 'page-label';
            label.textContent = imgData.name;

            card.appendChild(numberBadge);
            card.appendChild(removeBtn);
            card.appendChild(img);
            card.appendChild(label);

            imgPreviewGrid.appendChild(card);
        });

        // If still have images, make sure preview is visible
        if (uploadedImages.length > 0) {
            imgUploadSection.classList.add('hidden');
            imgPreviewSection.classList.remove('hidden');
        }
    }

    // Convert Images to PDF
    convertToPdfBtn.addEventListener('click', async () => {
        if (uploadedImages.length === 0) return;

        imgPreviewSection.classList.add('hidden');
        imgProcessingSection.classList.remove('hidden');

        try {
            const { jsPDF } = window.jspdf;

            const pageSize = document.getElementById('pdfPageSize').value;
            const orientation = document.getElementById('pdfOrientation').value;
            const margin = parseInt(document.getElementById('pdfMargin').value);

            // Create PDF
            let pdf;
            if (pageSize === 'fit') {
                // Will be set per image
                pdf = new jsPDF({ orientation: orientation, unit: 'px' });
            } else {
                pdf = new jsPDF({ orientation: orientation, format: pageSize, unit: 'mm' });
            }

            for (let i = 0; i < uploadedImages.length; i++) {
                const imgData = uploadedImages[i];

                // Load image to get dimensions
                const imgEl = await loadImage(imgData.dataUrl);
                const imgWidth = imgEl.naturalWidth;
                const imgHeight = imgEl.naturalHeight;

                if (i > 0) {
                    if (pageSize === 'fit') {
                        pdf.addPage([imgWidth + margin * 2, imgHeight + margin * 2]);
                    } else {
                        pdf.addPage();
                    }
                } else if (pageSize === 'fit') {
                    // First page with fit
                    pdf = new jsPDF({
                        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [imgWidth + margin * 2, imgHeight + margin * 2]
                    });
                }

                if (pageSize === 'fit') {
                    pdf.addImage(imgData.dataUrl, 'JPEG', margin, margin, imgWidth, imgHeight);
                } else {
                    // Scale image to fit page
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    const availWidth = pageWidth - margin * 2;
                    const availHeight = pageHeight - margin * 2;
                    
                    const ratio = Math.min(availWidth / imgWidth, availHeight / imgHeight);
                    const scaledWidth = imgWidth * ratio;
                    const scaledHeight = imgHeight * ratio;
                    
                    // Center image
                    const x = (pageWidth - scaledWidth) / 2;
                    const y = (pageHeight - scaledHeight) / 2;
                    
                    pdf.addImage(imgData.dataUrl, 'JPEG', x, y, scaledWidth, scaledHeight);
                }
            }

            generatedPdfBlob = pdf.output('blob');

            imgProcessingSection.classList.add('hidden');
            imgResultSection.classList.remove('hidden');

        } catch (error) {
            console.error('Error creating PDF:', error);
            alert(translations[currentLang].alertError);
            resetImgUI();
        }
    });

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // Download PDF
    downloadPdfBtn.addEventListener('click', () => {
        if (!generatedPdfBlob) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(generatedPdfBlob);
        link.download = 'converted_images.pdf';
        link.click();
        URL.revokeObjectURL(link.href);
    });

    // Reset Image to PDF
    resetImgBtn.addEventListener('click', resetImgUI);
    resetImgResultBtn.addEventListener('click', resetImgUI);

    function resetImgUI() {
        uploadedImages = [];
        generatedPdfBlob = null;
        imgInput.value = '';
        imgInputMore.value = '';
        imgPreviewGrid.innerHTML = '';
        imgCount.textContent = '0';
        imgUploadSection.classList.remove('hidden');
        imgPreviewSection.classList.add('hidden');
        imgProcessingSection.classList.add('hidden');
        imgResultSection.classList.add('hidden');
    }
});
