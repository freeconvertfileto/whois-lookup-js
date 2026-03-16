(function() {
    var inputEl = document.getElementById('whoisDomain');
    var btnEl = document.getElementById('whoisLookup');
    var resultsEl = document.getElementById('whoisResults');
    var loadingEl = document.getElementById('whoisLoading');
    var dataEl = document.getElementById('whoisData');

    function lookup() {
        var domain = inputEl.value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        if (!domain) return;
        resultsEl.style.display = 'block';
        loadingEl.style.display = 'block';
        dataEl.innerHTML = '';
        btnEl.disabled = true;

        fetch('https://api.file-converter-free.com/api/whois?domain=' + encodeURIComponent(domain))
            .then(function(r) { return r.json(); })
            .then(function(data) {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                if (data.error) { dataEl.innerHTML = '<div class="nettool-error">' + data.error + '</div>'; return; }
                var html = '';
                var fields = [
                    ['Domain Name', data.domain_name],
                    ['Registrar', data.registrar],
                    ['Registration Date', data.creation_date],
                    ['Expiration Date', data.expiration_date],
                    ['Updated Date', data.updated_date],
                    ['Status', data.status],
                    ['Name Servers', data.name_servers],
                    ['DNSSEC', data.dnssec],
                    ['Registrant', data.registrant],
                    ['Registrant Country', data.registrant_country]
                ];
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i][1]) {
                        var val = Array.isArray(fields[i][1]) ? fields[i][1].join(', ') : fields[i][1];
                        html += '<div class="nettool-row"><span class="nettool-key">' + fields[i][0] + '</span><span class="nettool-val">' + val + '</span></div>';
                    }
                }
                if (data.raw) {
                    html += '<div class="nettool-section-title">Raw WHOIS Data</div>';
                    html += '<pre style="font-size:0.8rem;color:var(--gray-600);white-space:pre-wrap;max-height:300px;overflow-y:auto;background:var(--gray-100);padding:1rem;border-radius:8px;">' + data.raw + '</pre>';
                }
                dataEl.innerHTML = html || '<div class="nettool-error">No data found for this domain.</div>';
            })
            .catch(function() {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                dataEl.innerHTML = '<div class="nettool-error">Failed to fetch WHOIS data. Please try again.</div>';
            });
    }

    btnEl.addEventListener('click', lookup);
    inputEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') lookup(); });
})();
