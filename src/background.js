'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['LeBonCoinHideOffers'], function(result) {
        let settings = result.LeBonCoinHideOffers ? result.LeBonCoinHideOffers : {};

        settings.buttonHTML = 'Hide';
        if (!settings.hiddenOffers) {settings.hiddenOffers = []};

        chrome.storage.sync.set({LeBonCoinHideOffers: settings}, function() {
            console.log('LeBonCoinHideOffers extension initialized.')
        });
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'www.leboncoin.fr'},
            })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
