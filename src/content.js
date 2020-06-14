'use strict';

function addHideButton(settings, offer, offerId) {
    let btn = document.createElement('button');
    btn.setAttribute('id', 'leboncoinhiddenoffers_button_' + offerId);
    btn.setAttribute('class', 'leboncoinhiddenoffers_button');
    btn.innerHTML = settings.buttonHTML;

    btn.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();

        offer.style.display = 'none';
        settings.hiddenOffers.push(offerId);

        chrome.storage.sync.set({LeBonCoinHideOffers: settings}, function() {
            console.log('LeBonCoinHideOffers settings updated.')
        });
    });

    let el = offer.querySelector('[itemprop="availabilityStarts"]')
    if (el) el.appendChild(btn);
}

chrome.storage.sync.get({LeBonCoinHideOffers: {}}, function(result) {
    let settings = result.LeBonCoinHideOffers;

    let offers = document.querySelectorAll('[itemtype="http://schema.org/Offer"]');
    for (var i = offers.length - 1; i >= 0; i--) {
        let offer = offers[i];
        let offerId = offer.querySelector('a').getAttribute('href').match(/[0-9]+/g)[0];

        if (settings.hiddenOffers.includes(offerId)) {
            offer.style.display = 'none';
            continue;
        }

        addHideButton(settings, offer, offerId);
    }
});
