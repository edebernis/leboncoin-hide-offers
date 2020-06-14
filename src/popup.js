'use strict';

let totalHiddenOffers = document.getElementById('totalHiddenOffers');
chrome.storage.sync.get(['LeBonCoinHideOffers'], function(result) {
    totalHiddenOffers.innerHTML = result.LeBonCoinHideOffers.hiddenOffers.length;
});

let resetHiddenOffersBtn = document.getElementById('resetHiddenOffers');
resetHiddenOffersBtn.onclick = function(element) {
    totalHiddenOffers.innerHTML = 0;

    chrome.storage.sync.get(['LeBonCoinHideOffers'], function(result) {
        let settings = result.LeBonCoinHideOffers;
        settings.hiddenOffers = [];

        chrome.storage.sync.set({LeBonCoinHideOffers: settings}, function() {
            console.log('LeBonCoinHideOffers hidden offers reset.')
        });
    });
};
