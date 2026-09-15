(function () {
    'use strict';

    const STORAGE_KEY = 'maintenanceNoticeClosed';

    const translations = {
        en: {
            title: 'SITE UNDER MAINTENANCE',
            text: 'Some content may be temporarily unavailable.'
        },
        ru: {
            title: 'САЙТ НА ТЕХНИЧЕСКОМ ОБСЛУЖИВАНИИ',
            text: 'Часть контента может быть временно недоступна.'
        },
        hy: {
            title: 'ԿԱՅՔԸ ՏԵԽՆԻԿԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՄԵՋ Է',
            text: 'Որոշ բովանդակություն կարող է ժամանակավորապես անհասանելի լինել։'
        }
    };

    // Create the notice only when it has not been dismissed by the visitor.
    function createNotice() {
        if (localStorage.getItem(STORAGE_KEY) === 'true') return;

        const notice = document.createElement('aside');
        notice.className = 'maintenance-notice';
        notice.id = 'maintenanceNotice';
        notice.setAttribute('role', 'status');

        notice.innerHTML = `
            <span class="maintenance-icon" aria-hidden="true">⚠</span>
            <span class="maintenance-title"></span>
            <span class="maintenance-text"></span>
            <button class="maintenance-close" type="button" aria-label="Close notice">×</button>
        `;

        document.querySelector('header')?.after(notice);

        notice.querySelector('.maintenance-close').addEventListener('click', function () {
            localStorage.setItem(STORAGE_KEY, 'true');
            notice.remove();
        });

        updateNoticeLanguage();
    }

    // Keep the notice text synchronized with the site's language switcher.
    function updateNoticeLanguage() {
        const notice = document.getElementById('maintenanceNotice');
        if (!notice) return;

        const language = localStorage.getItem('siteLang') || 'en';
        const content = translations[language] || translations.en;

        notice.querySelector('.maintenance-title').textContent = content.title;
        notice.querySelector('.maintenance-text').textContent = content.text;
    }

    document.addEventListener('DOMContentLoaded', createNotice);
    window.addEventListener('siteLanguageChanged', updateNoticeLanguage);
})();
