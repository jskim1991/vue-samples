const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            coolDown: 0,
            specialAttack: true,
            winner: null,
            logs: [],
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        isSpecialAttackAvailable() {
            return this.specialAttack
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        },
    },
    methods: {
        attackMonster() {
            this.calculateCoolDown()
            const damage = getRandomValue(5, 12)
            this.monsterHealth -= damage
            this.log('player', 'attack', damage)
            this.attackPlayer()
        },
        attackPlayer() {
            const damage = getRandomValue(8, 15)
            this.playerHealth -= damage
            this.log('monster', 'attack', damage)
        },
        specialAttackMonster() {
            this.specialAttack = false
            this.coolDown += 1

            const damage = getRandomValue(10, 25)
            this.monsterHealth -= damage
            this.log('player', 'special attack', damage)
            this.attackPlayer()
        },
        healPlayer() {
            this.calculateCoolDown()
            const healValue = getRandomValue(8, 20)
            this.playerHealth += healValue
            if (this.playerHealth > 100) {
                this.playerHealth = 100
            }
            this.log('player', 'heal', healValue)
            this.attackPlayer()
        },
        calculateCoolDown() {
            if (this.specialAttack == false) {
                this.coolDown += 1
                if (this.coolDown % 3 === 0) {
                    this.specialAttack = true
                    this.coolDown = 0
                }
            }
        },
        startGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.coolDown = 0
            this.specialAttack = true
            this.winner = null
            this.logs = []
        },
        surrender() {
            this.winner = 'monster'
        },
        log(who, what, value) {
            const message = {
                actionBy: who,
                actionType: what,
                actionValue: value,
            }
            this.logs.unshift(message)
        },
    },
})

app.mount('#game')
