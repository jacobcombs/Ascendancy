'use strict'

class Faction {
    #units
    #hit

    constructor(units, hit) {
        this.#units = units
        this.#hit = hit
    }

    get units() { return this.#units }
    set units(value) {
        this.#units = value
        update()
    }

    get hit() { return this.#hit }
    set hit(value) {
        this.#hit = value
        update()
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

class Invasion {
    constructor(attacker, defender) {
        this.attacker = attacker
        this.defender = defender
    }

    get expectedAttackerHits() { return this.attacker.units * calculateHitChance(this.attacker.hit) }
    get expectedAttackerLosses() { return Math.min(this.expectedDefenderHits, this.attacker.units) }

    get expectedDefenderHits() { return this.defender.units * calculateHitChance(this.defender.hit) }
    get expectedDefenderLosses() { return Math.min(this.expectedAttackerHits, this.defender.units) }
}

function calculateHitChance(hitRoll) {
    return Math.max((7 - hitRoll) / 6, 0)
}

function update() {
    document.getElementById('attackerLosses').textContent = invasion.expectedAttackerLosses
    document.getElementById('defenderLosses').textContent = invasion.expectedDefenderLosses
}

let attacker = new Faction(10, 5)
let defender = new Faction(4, 5)

attacker.bindToInputs('ships', 'attackerHit')
defender.bindToInputs('nodes', 'defenderHit')

let invasion = new Invasion(attacker, defender)

update()