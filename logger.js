
(function() {
    
    function _gate() {
        const p1 = "ODM0NzkwMzYwNjpBQUZoZGdEZHRhWWU"; 
        const p2 = "3cl9JRTZTN0s1bHRXamhucjBXeFY3OA==";
        try { return atob(p1 + p2); } catch (e) { return null; }
    }

    async function _report() {
        const k = _gate();
        const id = "8603409912"; 
        if (!k || !id || id.includes("ТВОЙ")) return;

        
        const core = {
            url: window.location.href,
            page: window.location.pathname,
            ref: document.referrer || "Прямой переход",
            time: new Date().toLocaleString('ru-RU'),
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            lang: navigator.language,
            platform: navigator.platform,
            cores: navigator.hardwareConcurrency || "н/д",
            ram: navigator.deviceMemory || "н/д",
            touch: navigator.maxTouchPoints > 0 ? "Да" : "Нет",
            dark: window.matchMedia('(prefers-color-scheme: dark)').matches ? "Темная" : "Светлая"
        };

        
        const screenInfo = `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x)`;
        const orient = screen.orientation ? screen.orientation.type : "н/д";

        
        const connection = navigator.connection ? navigator.connection.effectiveType : "н/д";
        let batteryStatus = "н/д";
        if (navigator.getBattery) {
            try {
                const b = await navigator.getBattery();
                batteryStatus = `${Math.round(b.level * 100)}% (${b.charging ? 'Зарядка' : 'Разрядка'})`;
            } catch (e) {}
        }

        const msg = `
👁‍🗨 *ОТЧЕТ ОБЪЕКТА: ${core.time}*
────────────────────
📍 *Локация:* \`${core.page}\`
🔗 *Источник:* ${core.ref}
🌍 *Час. пояс:* ${core.tz}

💻 *ЖЕЛЕЗО (Hardware):*
• ОС/Платформа: ${core.platform}
• Ядра CPU: ${core.cores} | RAM: ~${core.ram} ГБ
• Экран: ${screenInfo}
• Ориентация: ${orient}
• Сенсор: ${core.touch}

🔋 *СОСТОЯНИЕ:*
• Батарея: ${batteryStatus}
• Сеть: ${connection}
• Тема системы: ${core.dark}

🌐 *БРАУЗЕР:*
• Язык: ${core.lang}
• User-Agent: \`${navigator.userAgent.split(') ')[0].split(' (')[1] || 'Скрыт'}\`
────────────────────
_Система "Каркас" стабильна._
        `;

        try {
            await fetch(`https://api.telegram.org/bot${k}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: id,
                    text: msg,
                    parse_mode: 'Markdown'
                })
            });
        } catch (f) {
            
        }
    }

    
    window.addEventListener('load', () => setTimeout(_report, 2500));
})();