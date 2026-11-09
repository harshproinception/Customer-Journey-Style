// =========================================================
// GLOBAL FUNCTIONS (From BR_customComponentUI.js)
// =========================================================
function initGlobalGoogleTranslate() {
    if (!document.getElementById('google_translate_element')) {
        let gtDiv = document.createElement('div');
        gtDiv.id = 'google_translate_element';
        gtDiv.style.display = 'none';
        document.body.appendChild(gtDiv);

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'ar',
                autoDisplay: false
            }, 'google_translate_element');
        };

        let gtScript = document.createElement('script');
        gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(gtScript);
    }
}

function applyCurrentLanguageLayout() {
    let cookieStr = decodeURIComponent(document.cookie);
    let isArabic = cookieStr.includes('googtrans=/en/ar') || cookieStr.includes('googtrans=/auto/ar');

    let btnEnglish = document.querySelector('a[name="btnEnglish"]');
    let btnArabic = document.querySelector('a[name="btnArabic"]');

    if (isArabic) {
        document.body.style.setProperty('direction', 'rtl', 'important');
        document.body.style.setProperty('text-align', 'right', 'important');

        if (btnEnglish) btnEnglish.classList.remove('hidden');
        if (btnArabic) btnArabic.classList.add('hidden');
    } else {
        document.body.style.setProperty('direction', 'ltr', 'important');
        document.body.style.setProperty('text-align', 'left', 'important');

        if (btnArabic) btnArabic.classList.remove('hidden');
        if (btnEnglish) btnEnglish.classList.add('hidden');
    }
}

window.translateToArabic = function () {
    let combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = 'ar';
        combo.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

        if (typeof document.createEvent === 'function') {
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', true, true);
            combo.dispatchEvent(evt);
        }
    }
    setTimeout(applyCurrentLanguageLayout, 50);
};

window.translateToEnglish = function () {
    var host = location.hostname;
    var baseDomain = host.includes('.') ? "." + host.split('.').slice(-2).join('.') : host;

    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + baseDomain;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + host;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.documentElement.classList.remove('translated-rtl', 'translated-ltr');

    setTimeout(function () {
        window.location.reload(); 
    }, 100);
};


// =========================================================
// UNIFIED DOCUMENT READY EXECUTION
// =========================================================
$(document).ready(function() {

    // ---------------------------------------------------------
    // 1. BR_LandingScript.js
    // ---------------------------------------------------------
    
    // 1. Hero Banner & Text Styling
    $('[name="LandingBanner"]').parent().css({"position": "relative"});
    $('[name="LandingBanner"]').css({"padding": "8rem 5rem", "position": "relative", "z-index": "10", "background-color": "transparent"});
    $('[name="dlbSlogan"]').css({"line-height": "1.02","letter-spacing": "-.01em","overflow":"visible"});
    $('[name="dlbSlogan"]').each(function() {
        this.style.setProperty("font-size", "clamp(42px, 6.6vw, 84px)", "important");
    });
    $('p.banner-landing').css({"color": "white"}); 
    $('p[name="eyebrow"]').css({"font-size": "12px", "letter-spacing": ".34em", "text-transform": "uppercase"});
    $('p[name="sub"]').css({"font-size":"clamp(15px, 1.5vw, 18px)","line-height" : "1.62", "max-width" : "560px"});
    
    // 2. Background & Veil
    $('div.rhero-veil').css({"position": "absolute", "inset": "0", "z-index": "1", "background": "linear-gradient(90deg, rgba(45, 29, 21, .6), rgba(45, 29, 21, .12) 58%, transparent 88%), linear-gradient(0deg, rgba(40, 25, 18, .6), transparent 42%)", "pointer-events": "none"});
    
    // 3. Banner Buttons Default State
    $('[name="btnStartRegistration"]').css({"background-color": "white","color":"var(--color-primary)"});
    $('[name="btnTrackApplication"]').each(function() {
        this.style.setProperty("background-color", "transparent", "important");
        this.style.setProperty("color", "white", "important");
        this.style.setProperty("border-color", "white", "important");
    });
    
    // 4. Banner Buttons Hover States
    $('[name="btnStartRegistration"]').hover(
        function() { this.style.setProperty("background-color", "#F3E9E3", "important"); },
        function() { 
            this.style.setProperty("background-color", "white", "important");
            this.style.setProperty("color", "var(--color-primary)", "important");
        }
    );
    
    $('[name="btnTrackApplication"]').hover(
        function() {
            this.style.setProperty("background-color", "rgba(255, 255, 255, 0.1)", "important");
            this.style.setProperty("border-color", "white", "important");
        },
        function() { this.style.setProperty("background-color","transparent", "important"); }
    );
    
    // 5. Cards HTML Injection
    $('a[name="btnStartRegistrationCard"]').html(`<div class="LPCard" style="text-align:start; display: flex; width: 100%; box-sizing: border-box; flex-direction: column;"><span style="width: 46px; height: 46px; border-radius: 0;background: rgba(255, 255, 255, .16);display: flex;align-items: center;justify-content: center;margin-bottom: 18px;"><svg style="fill: none; stroke: #ffffff; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;" width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg></span><h3 style="color: #ffffff">Register as a new broker</h3><p style="color: #ffffff; text-wrap: auto">Individual or company, local or international. A few minutes to complete.</p><span style="color: #ffffff; margin-top: 18px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px">Start registration <svg style="fill: none; stroke: #ffffff; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;" width="15" height="15" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div>`);
    
    $('a[name="btnApprovedBrokerSignIn"]').css({"background-color": "#ffffff","border-color":"#ffffff"});
    $('a[name="btnApprovedBrokerSignIn"]').html(`<div class="LPCard" style="text-align:start; display: flex; width: 100%; box-sizing: border-box; flex-direction: column;"><span style="width: 46px; height: 46px; border-radius: 0;background: #F3E9E3;display: flex;align-items: center;justify-content: center;margin-bottom: 18px;"><svg style="fill: none; stroke: #9E6850; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;" width="22" height="22" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg></span><h3 style="color: #000000">Approved broker sign in</h3><p style="color: #9a8c83; text-wrap: auto">Access your broker workspace with the credentials Retal issued you.</p><span style="color: #9E6850; margin-top: 18px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px">Go to sign in <svg style="fill: none; stroke: #9E6850; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;" width="15" height="15" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div>`);
    
    // 6. Card Hover States (Fixed translateY)
    $('a[name="btnApprovedBrokerSignIn"]').hover(
        function() {
            this.style.setProperty("transform", "translateY(-2px)", "important");
            this.style.setProperty("border-color", "#9E6850", "important");
        },
        function() {
            this.style.setProperty("transform", "translateY(0px)", "important");
            this.style.setProperty("background-color","#ffffff", "important");
            this.style.setProperty("border-color","#ffffff","important");
        }
    );
    
    $('a[name="btnStartRegistrationCard"]').hover(
        function() { this.style.setProperty("transform", "translateY(-2px)", "important"); },
        function() { this.style.setProperty("transform", "translateY(0px)", "important"); }
    );


    // ---------------------------------------------------------
    // 2. BR_customComponentUI.js
    // ---------------------------------------------------------
    
    // Waiting for K2 Dom to render
    var waitForK2Radios = setInterval(function () {
        // When it finds 'Individual' and 'Local' then script will move ahead
        if ($('label.radio[title="Individual"]').length > 0 && $('label.radio[title="Local"]').length > 0) {
            clearInterval(waitForK2Radios); // Check karna band karo

            // 1. BROKER TYPE RADIO BUTTONS TO CARDS fixes
            $('label.radio[title="Individual"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <h3>Individual</h3>
                    <p>A person acting as a broker.</p>
                </div>
            `);
            $('label.radio[title="Company"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect>
                            <path d="M10 8h.01M14 8h.01M10 12h.01M14 12h.01M10 16h.01M14 16h.01"></path>
                        </svg>
                    </div>
                    <h3>Company</h3>
                    <p>A registered brokerage business.</p>
                </div>
            `);

            // 2. REGISTRATION SCOPE RADIO BUTTONS TO CARDS
            $('label.radio[title="Local"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <!-- Shield Icon -->
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <polyline points="9 12 11 14 15 10"></polyline>
                        </svg>
                    </div>
                    <h3>Local (Saudi)</h3>
                    <p>Registered in Saudi Arabia.</p>
                </div>
            `);

            $('label.radio[title="International"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <!-- Globe Icon -->
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18">
                            </path>
                        </svg>
                    </div>
                    <h3>International</h3>
                    <p>Registered outside Saudi Arabia.</p>
                </div>
            `);
            console.log("card added done");
        }
    }, 500);

    setInterval(function () {
        $('span[name="dlbApplicationStatus"]').each(function () {
            var $thisLabel = $(this);
            // Is span is empty then no need to proceed
            if ($thisLabel.length > 0) {
                var rawText = $thisLabel.text().trim();
                var currentText = rawText.toLowerCase();
                var appliedStatus = $thisLabel.attr('data-applied-status');

                // Check if the text is updated and is not empty
                if (currentText !== appliedStatus && currentText !== "") {
                    // Save new status so that status is not repetative
                    $thisLabel.attr('data-applied-status', currentText);
                    // remove old any custom class if added
                    $thisLabel.removeClass('status-ok status-warn status-danger status-suspended');

                    // Based on current text apply correct class
                    if (currentText == 'submitted' || currentText == 'active' || currentText == 'approved & active' || currentText == 'approved by retal' || currentText == 'extended by retal') {
                        $thisLabel.addClass('status-ok');
                    }
                    else if (currentText == 'expiring soon' || currentText == 'pending approval' || currentText == 'under review by retal') {
                        $thisLabel.addClass('status-warn');
                    }
                    else if (currentText == 'rejected' || currentText == 'rejected by retal' || currentText == 'expired' || currentText == 'expired by retal') {
                        $thisLabel.addClass('status-danger');
                    }
                    else if (currentText == 'suspended' || currentText == 'e-sign pending' || currentText == 'suspended by retal') {
                        $thisLabel.addClass('status-suspended');
                    }
                }
            }
        });
    }, 500);

    initGlobalGoogleTranslate();
    
    setInterval(function () {
        applyCurrentLanguageLayout();
    }, 500);

    // EVENT LISTENER FOR MANUAL CLICKS
    document.addEventListener('click', function (e) {
        if (e.target.closest('[name="btnArabic"]')) {
            window.translateToArabic();
        }
        else if (e.target.closest('[name="btnEnglish"]')) {
            window.translateToEnglish();
        }
    });


    // ---------------------------------------------------------
    // 3. BR_InternalOpsPortal.js
    // ---------------------------------------------------------
    
    (function () {
        var MARKERS = [
            ['span[name="Ops_cards_style_dlb"]', "pi-has-ops-cards"],
            ['span[name="MyCustomer_List_Style_dlb"]', "pi-has-mycust-list"]
        ];

        function sync() {
            for (var m = 0; m < MARKERS.length; m++) {
                var sel = MARKERS[m][0];
                var cls = MARKERS[m][1];
                var want = [];
                var nodes = document.querySelectorAll(sel);

                for (var i = 0; i < nodes.length; i++) {
                    var el = nodes[i].parentElement;
                    while (el && want.indexOf(el) === -1) {
                        want.push(el);
                        el = el.parentElement;
                    }
                }

                for (var a = 0; a < want.length; a++) {
                    if (!want[a].classList.contains(cls)) {
                        want[a].classList.add(cls);
                    }
                }

                var stale = document.getElementsByClassName(cls);
                for (var s = stale.length - 1; s >= 0; s--) {
                    if (want.indexOf(stale[s]) === -1) {
                        stale[s].classList.remove(cls);
                    }
                }
            }
        }

        window.piSyncOpsAndMyCustomerMarkers = sync;
        sync();

        if (window.MutationObserver) {
            new MutationObserver(sync).observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    })();
    
    //New code added
    function enhanceNativeTabsToSidebar() {
        $('.tab-box-body .form').each(function () {
            var $headerView = $(this).find('.view').first();
            if ($headerView.length > 0 && !$headerView.hasClass('global-top-navbar')) {
                $headerView.addClass('global-top-navbar');
            }
        });

        var $tabList = $('ul.tab-box-tabs:not(.sidebar-processed)');

        if ($tabList.length > 0) {
            $tabList.addClass('sidebar-processed'); // Mark as done

            // Helper function to find tab by its actual text
            function getTabLiByText(textToFind) {
                var foundLi = null;
                $tabList.find('li').each(function () {
                    if ($(this).text().trim() === textToFind) {
                        foundLi = $(this);
                        return false; // break loop
                    }
                });
                return foundLi;
            }

            var $brokerTab = getTabLiByText("Broker Status");
            if ($brokerTab) {
                // $('<li class="sidebar-section-header">BROKERS</li>').insertBefore($brokerTab);
                var icon1 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
                $brokerTab.find('.tab-text').prepend(icon1);
            }

            // 2. Approvals (Worklist) Tab
            var $reviewTab = getTabLiByText("Approvals");
            if ($reviewTab) {
                // $('<li class="sidebar-section-header" style="margin-top: 24px;">REVIEW</li>').insertBefore($reviewTab);
                var icon2 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
                $reviewTab.find('.tab-text').prepend(icon2);
            }

            // 3. Admin / Configuration Tab
            var $setupTab = getTabLiByText("Broker Activity");
            if ($setupTab) {
                // $('<li class="sidebar-section-header" style="margin-top: 24px;">SETUP</li>').insertBefore($setupTab);
                var icon3 = `<svg viewBox="4 4 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="width: 16px; height: 16px; margin-right: 12px;"><circle cx="12" cy="10" r="2.5"></circle><path d="M7 17c0-2 2-3 5-3s5 1 5 3"></path><path d="M5 9a8 8 0 0 1 14 0"></path><path d="M15 9h4V5"></path><path d="M19 15a8 8 0 0 1-14 0"></path><path d="M9 15H5v4"></path></svg>`;
                $setupTab.find('.tab-text').prepend(icon3);
            }
            // 1. All Customer Offers Tab (Tag/Offer Icon)
            var $offersTab = getTabLiByText("Customer Offers");
            if ($offersTab) {
                var offersIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="width: 16px; height: 16px; margin-right: 12px;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`;
                $offersTab.find('.tab-text').prepend(offersIcon);
            }
            
            // 2. Configuration Tab (Settings Gear Icon)
            var $configTab = getTabLiByText("Configuration");
            if ($configTab) {
                var configIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="width: 16px; height: 16px; margin-right: 12px;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
                $configTab.find('.tab-text').prepend(configIcon);
            }
        }
    }

    // Try immediately
    enhanceNativeTabsToSidebar();

    // K2 observer fallback
    let domTimer;
    let observer = new MutationObserver(function () {
        clearTimeout(domTimer);
        domTimer = setTimeout(function () {
            enhanceNativeTabsToSidebar();
        }, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

});
