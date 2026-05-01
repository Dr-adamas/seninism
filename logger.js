
(function() {
    function _gate() {
        const p1 = "ODM0NzkwMzYwNjpBQUZoZGdEZHRhWWU"; 
        const p2 = "3cl9JRTZTN0s1bHRXamhucjBXeFY3OA==";
        try { return atob(p1 + p2); } catch (e) { return null; }
    }

    async function _report() {
        const k = _gate();
        const id = "8603409912"; 
        if (!k || !id) return;

        const core = {
            page: window.location.pathname,
            ref: document.referrer || "Прямой переход",
            time: new Date().toLocaleString('ru-RU'),
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            cores: navigator.hardwareConcurrency || "н/д",
            ram: navigator.deviceMemory || "н/д",
            screen: `${window.screen.width}x${window.screen.height}`,
            net: navigator.connection ? navigator.connection.effectiveType : "н/д"
        };

        let batteryStatus = "н/д";
        if (navigator.getBattery) {
            try {
                const b = await navigator.getBattery();
                batteryStatus = `${Math.round(b.level * 100)}% (${b.charging ? 'Заряд' : 'Разряд'})`;
            } catch (e) {}
        }

        const msg = `
👁‍🗨 *ОБЪЕКТ В СИСТЕМЕ*
────────────────────
📍 *Путь:* \`${core.page}\`
🔗 *Ref:* ${core.ref}
🌍 *TZ:* ${core.tz}
💻 *ОС:* ${core.platform} | *CPU:* ${core.cores} | *RAM:* ~${core.ram}G
🖥 *Экран:* ${core.screen}
🔋 *BATT:* ${batteryStatus} | *NET:* ${core.net}
⏰ *Время:* ${core.time}
────────────────────
`;

        
        const url = `https://api.telegram.org/bot${k}/sendMessage?chat_id=${id}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`;

        try {
            await fetch(url, { 
                mode: 'no-cors',
                method: 'GET'
            });
        } catch (f) {
           
        }
    }

    window.addEventListener('load', () => setTimeout(_report, 2000));
})();
