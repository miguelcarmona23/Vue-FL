const cardsData = [{
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg',
        title: 'Extraction (2020)',
        description: 'Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career.',
        rating: 7.5,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/5eoeVwsQg35GJfARq7Azdwrzztl.jpg',
        title: 'The Last Dance (2020)',
        description: 'A 10-part documentary chronicling the untold story of Michael Jordan and the Chicago Bulls dynasty.',
        rating: 9.5,
        stars: 5
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
        title: 'Friends (1994)',
        description: 'The misadventures of a group of friends as they navigate the pitfalls of work, life and love in Manhattan.',
        rating: 8.1,
        stars: 4
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg',
        title: 'Bad Boys for Life (2020)',
        description: 'Marcus and Mike are forced to confront new threats, career changes, and midlife crises ',
        rating: 7.2,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg',
        title: 'Rick and Morty (2013)',
        description: 'Rick is a mad scientist who drags his grandson, Morty, on crazy sci-fi adventures.',
        rating: 8.7,
        stars: 4
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8ZX18L5m6rH5viSYpRnTSbb9eXh.jpg',
        title: 'The Platform (2019)',
        description: 'An unknown number of levels. Two inmates living on each level. A mysterious place, an indescribable prison.',
        rating: 7.11,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
        title: 'Star Wars: The Rise of Skywalker (2019)',
        description: 'The surviving Resistance faces the First Order as the journey of Rey, Finn and Poe Dameron continues.',
        rating: 6.5,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pmjYMCnSwndlEpiFZhhOWSWmUsu.jpg',
        title: 'Tiger King (2020)',
        description: 'A zoo owner spirals out of control amid a cast of eccentric characters in this true murder-for-hire story.',
        rating: 7.2,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        title: 'Parasite (2019)',
        description: 'Greed and class discrimination threaten the wealthy Park family and the destitute Kim clan.',
        rating: 8.5,
        stars: 4
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/MoEKaPFHABtA1xKoOteirGaHl1.jpg',
        title: 'Money Heist (2017)',
        description: 'A man called The Professor recruits a band of 8 robbers who have a single characteristic: none of them has anything to lose',
        rating: 8.4,
        stars: 4
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg',
        title: 'Birds of Prey (2020)',
        description: 'Harley Quinn joins forces with a singer, an assassin and a police detective to help a young girl who is wanted by a crime lord.',
        rating: 7.2,
        stars: 3
    },
    {
        img: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qcr9bBY6MVeLzriKCmJOv1562uY.jpg',
        title: 'The Simpson (1989)',
        description: 'This animated comedy focuses on the eponymous family in the town of Springfield.',
        rating: 7.4,
        stars: 3
    }
]

Vue.directive('scroll', {
    inserted: function(el, binding) {
        let f = function(evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

new Vue({
    el: '#app',
    data: {
        cards: cardsData,
        scrollPosition: 0
    },
    filters: {
        oneDecimal: function(value) {
            return value.toFixed(1)
        },
        toStars: function(value) {
            let result = ''
            while (result.length < value) {
                result += '★'
            }
            return result
        }
    },
    computed: {
        styledCards() {
            return this.cards.map(this.calculateCardStyle)
        }
    },
    methods: {
        onScroll() {
            this.scrollPosition = window.scrollY
        },
        calculateCardStyle(card, index) {
            const cardHeight = 160 // height + padding + margin

            const positionY = index * cardHeight
            const deltaY = positionY - this.scrollPosition

            // constrain deltaY between -160 and 0
            const dY = this.clamp(deltaY, -cardHeight, 0)

            const dissapearingValue = (dY / cardHeight) + 1
            const zValue = dY / cardHeight * 50
            const yValue = dY / cardHeight * -20

            card.style = {
                opacity: dissapearingValue,
                transform: `perspective(200px) translate3d(0,${yValue}px, ${zValue}px)`
            }
            return card
        },
        clamp(value, min, max) {
            return Math.min(Math.max(min, value), max)
        }
    }
})