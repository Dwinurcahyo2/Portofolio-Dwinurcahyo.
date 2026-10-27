document.addEventListener('DOMContentLoaded', function () {

    const textElement = document.getElementById('typing-text');

    if (!textElement) {
        return;
    }

    const texts = [
        'Fresh Graduate',
        'Web Developer',
        'Laravel Developer',
        'Frontend Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (!deleting) {

            textElement.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentText.length) {
                deleting = true;

                setTimeout(typeEffect, 1800);
                return;
            }

        } else {

            textElement.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 90);
    }

    typeEffect();

});

const fadeElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
            const delay = element.dataset.delay || 0;

            element.style.animationDelay = `${delay}ms`;
            element.classList.add('show');
        } else {
            // Reset animasi ketika elemen keluar dari layar
            element.classList.remove('show');
            element.style.animationDelay = '';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach((element) => fadeObserver.observe(element));


// =================================================================================================================
// =============================================== download pdf ====================================================
// =================================================================================================================

document.addEventListener('DOMContentLoaded', function () {

    const ball = document.getElementById('pdf-ball');
    const hoop = document.getElementById('basket-hoop');
    const area = document.getElementById('basketball-area');
    const success = document.getElementById('basket-success');
    const instruction = document.getElementById('basket-instruction');

    if (!ball || !hoop || !area) {
        return;
    }

    let isDragging = false;

    // =========================
    // DRAG START
    // =========================

    ball.addEventListener('dragstart', function (event) {

        isDragging = true;

        ball.classList.add('scale-110');

        event.dataTransfer.setData(
            'text/plain',
            'cv-ball'
        );

    });


    // =========================
    // DRAG END
    // =========================

    ball.addEventListener('dragend', function () {

        isDragging = false;

        ball.classList.remove('scale-110');

    });


    // =========================
    // DRAG OVER RING
    // =========================

    hoop.addEventListener('dragover', function (event) {

        event.preventDefault();

        hoop.classList.add('hoop-score');

    });


    // =========================
    // LEAVE RING
    // =========================

    hoop.addEventListener('dragleave', function () {

        hoop.classList.remove('hoop-score');

    });


    // =========================
    // DROP
    // =========================

    hoop.addEventListener('drop', function (event) {

        event.preventDefault();

        if (!isDragging) {
            return;
        }

        shootBall();

    });


    // =========================
    // SHOOT
    // =========================

    function shootBall() {

        isDragging = false;

        hoop.classList.remove('hoop-score');

        instruction.classList.add('hidden');

        ball.classList.remove('scale-110');

        // Animasi bola masuk ring
        ball.classList.add('pdf-score');

        // Animasi ring
        hoop.classList.add('hoop-score');

        // Tampilkan SCORE
        setTimeout(function () {

            success.classList.remove('hidden');
            success.classList.add('flex');
            success.classList.add('success-animation');

        }, 600);


        // Download CV
        setTimeout(function () {

            const link = document.createElement('a');

            link.href = 'dist/img/cv/CV-BAHASA.pdf';
            link.download = 'CV-Dwi-Nur-Cahyo.pdf';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        }, 1100);


        // Reset setelah selesai
        setTimeout(function () {

            resetBasket();

        }, 2500);

    }


    // =========================
    // RESET
    // =========================

    function resetBasket() {

        ball.classList.remove('pdf-score');

        success.classList.remove('flex');
        success.classList.add('hidden');
        success.classList.remove('success-animation');

        instruction.classList.remove('hidden');

        hoop.classList.remove('hoop-score');

        // Kembalikan posisi bola
        ball.style.left = '50%';
        ball.style.bottom = '2rem';

    }
});

// =================================================================================================================
// =============================================== open sertifikat =================================================
// =================================================================================================================

document.addEventListener('DOMContentLoaded', function () {

    const certificateCards =
        document.querySelectorAll('.certificate-card');

    const certificateModal =
        document.getElementById('certificate-modal');

    const certificateModalContent =
        document.getElementById('certificate-modal-content');

    const certificateModalImage =
        document.getElementById('certificate-modal-image');

    const certificateTitle =
        document.getElementById('certificate-title');

    const certificateClose =
        document.getElementById('certificate-close');


    // Pastikan element tersedia
    if (
        certificateCards.length === 0 ||
        !certificateModal ||
        !certificateModalImage ||
        !certificateTitle ||
        !certificateClose
    ) {
        return;
    }


    // ========================================
    // BUKA MODAL
    // ========================================

    certificateCards.forEach(function (card) {

        card.addEventListener('click', function () {

            const image =
                card.getAttribute('data-image');

            const title =
                card.getAttribute('data-title');


            certificateModalImage.src = image;
            certificateModalImage.alt = title;

            certificateTitle.textContent = title;


            certificateModal.classList.remove('hidden');

            certificateModal.classList.add('flex');

            document.body.classList.add('overflow-hidden');

        });

    });


    // ========================================
    // TUTUP MODAL
    // ========================================

    function closeCertificateModal() {

        certificateModal.classList.remove('flex');

        certificateModal.classList.add('hidden');

        document.body.classList.remove('overflow-hidden');

        certificateModalImage.src = '';

    }


    // Tombol X
    certificateClose.addEventListener(
        'click',
        closeCertificateModal
    );


    // ========================================
    // KLIK BACKGROUND
    // ========================================

    certificateModal.addEventListener('click', function (event) {

        if (event.target === certificateModal) {

            closeCertificateModal();

        }

    });


    // ========================================
    // ESC
    // ========================================

    document.addEventListener('keydown', function (event) {

        if (
            event.key === 'Escape' &&
            !certificateModal.classList.contains('hidden')
        ) {

            closeCertificateModal();

        }

    });

});

// ========================================
// Hide sertifikat
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-certificates');
    const icon = document.getElementById('certificate-icon');
    const extraCertificates = document.querySelectorAll('.extra-certificate');

    if (!toggleButton || extraCertificates.length === 0) {
        if (toggleButton) {
            toggleButton.classList.add('hidden');
        }
        return;
    }

    let isExpanded = false;

    toggleButton.addEventListener('click', function () {
        isExpanded = !isExpanded;

        extraCertificates.forEach(function (certificate) {
            certificate.classList.toggle('hidden', !isExpanded);
        });

        toggleButton.childNodes[0].textContent = isExpanded
            ? 'Sembunyikan Sertifikat '
            : 'Sertifikat Lainnya ';

        icon.textContent = isExpanded ? '↑' : '↓';
    });
});