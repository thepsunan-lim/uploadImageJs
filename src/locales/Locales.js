import TH from './TH.js'
import EN from './EN.js'
import CTRL from 'react-nc'

CTRL.LOCALE = {}

function defineKeyToLocale(key) {
    Object.defineProperty(CTRL.LOCALE, key, {
        get: function() {
            return CTRL.state.language === 'TH' ? TH[key] : EN[key]
        }
    })
}

for (var key in TH) {
    defineKeyToLocale(key)
}
