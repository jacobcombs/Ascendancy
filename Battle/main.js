'use strict'

class Faction {
    #units
    #hit
    #hitsPmf

    constructor(units, hit) {
        this.#units = units
        this.#hit = hit
        this.#calculateHitsPmf()
    }

    get units() { return this.#units }
    set units(value) {
        this.#units = value
        this.#calculateHitsPmf()
        update()
    }

    get hit() { return this.#hit }
    set hit(value) {
        this.#hit = value
        this.#calculateHitsPmf()
        update()
    }

    get hitChance() {
        return Math.max((7 - this.hit) / 6, 0)
    }

    get hitsPmf() { return this.#hitsPmf }
    #calculateHitsPmf() {
        this.#hitsPmf = {}
        if (this.hit == 7) { // cannot hit
            this.#hitsPmf[0] = 1
        } else if (this.hit == 1) { // always hits
            this.#hitsPmf[this.units] = 1
        } else {
            for (let i = 0; i <= this.units; i++) {
                this.#hitsPmf[i] = binomialPmf(this.units, this.hitChance, i)
            }
        }
    }

    lossPmfVersus(other) {
        let lossPmf = {}
        for (const i in other.hitsPmf) {
            let loss = Math.min(i, this.units)
            if (loss in lossPmf) {
                lossPmf[loss] += other.hitsPmf[i]
            } else {
                lossPmf[loss] = other.hitsPmf[i]
            }
        }
        return lossPmf
    }

    get expectedHits() {
        return this.units * this.hitChance
    }
    expectedLossVersus(other) {
        return Math.min(other.expectedHits, this.units)
    }

    bindToInputs(unitsInputId, hitInputId) {
        let unitsInput = document.getElementById(unitsInputId)
        let hitInput = document.getElementById(hitInputId)

        unitsInput.value = this.units
        hitInput.value = this.hit

        unitsInput.addEventListener('input', e => this.units = parseInt(e.target.value))
        hitInput.addEventListener('input', e => this.hit = parseInt(e.target.value))
    }
}

function choose(n, k) {
    if (n < 0 || k < 0) {
        throw 'n and k must be nonnegative'
    }
    if (k > n) {
        return 0
    }
    let r = 1;
    let b = Math.max(k, n - k)
    for (let i = n; i > b; i--) {
        r *= i;
    }
    for (let i = n - b; i > 1; i--) {
        r /= i;
    }
    return r
}

function binomialPmf(n, p, k) {
    if (p < 0 || 1 < p) {
        throw 'p must be between 0 and 1'
    }
    return choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

function update() {
    document.getElementById('attackerLosses').textContent = attacker.expectedLossVersus(defender).toFixed(2)
    document.getElementById('defenderLosses').textContent = defender.expectedLossVersus(attacker).toFixed(2)

    constructPmfTbodyById(attacker.lossPmfVersus(defender), 'attackerLossPmf')
    constructPmfTbodyById(defender.lossPmfVersus(attacker), 'defenderLossPmf')    
}

function formatPercent(number) {
    return (number * 100).toFixed(1) + '%';
}

function constructPmfTbodyById(pmf, tbodyId) {
    let tbody = document.getElementById(tbodyId)
    tbody.innerHTML = ''
    for (const i in pmf) {
        let row = `<tr><td>${i}</td><td>${formatPercent(pmf[i])}</td></tr>`
        tbody.innerHTML += row
    }
}

let attacker = new Faction(4, 5)
let defender = new Faction(4, 5)

attacker.bindToInputs('ships', 'attackerHit')
defender.bindToInputs('nodes', 'defenderHit')

update()