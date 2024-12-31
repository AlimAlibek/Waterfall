
const wave = `
<svg width="100%" height="100%">
    <defs>
      <linearGradient id="linGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#020085" stop-opacity="0" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#020085" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${new Array(Math.floor(window.innerWidth/35)).fill(1).map((_, i) => {
        return `
            <rect x="${10 * i + 5}" y="5%" width="3" height="90%" rx="3">
                <animate
                  attributeName="height"
                  values="60%; 80%; 60%"
                  dur="${Math.random() + 0.8}"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="25%; 5%; 25%;"
                  dur="${Math.random() + 0.8}"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill"
                  values="#6b00c2;#020085;#6b00c2"
                  dur="${Math.random() + 1}"
                  repeatCount="indefinite"
                />
            </rect>
            <rect x="${10 * i + 3}" y="30%" width="7" height="30%" rx="3" fill="url('#linGrad')" >
                <animate
                attributeName="y"
                values="30%; 40%; 30%;"
                dur="${Math.random() + 1}"
                repeatCount="indefinite"
                />
            </rect>
        `
    }).join(' ')}
</svg>
`
const TopBLockContents = [
    '<h2>Сдесь могла быть ваша реклама</h2>',
    '<h2>Любой контент</h2>'
]

const rightBLockContents = [
    '<h2>И здесь тоже...</h2>',
    wave
]
