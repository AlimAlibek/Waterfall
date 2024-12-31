
window.addEventListener("load", () => {
   const loader = document.getElementsByClassName('loader');
   if (loader[0]) {
    loader[0].style.display = 'none'
   }
})

let ready = false;
let go = false;

document.addEventListener('mousemove', (e) => {

    Object.assign(document.documentElement, {
        style: `
            --rotate-x: ${(e.clientX - window.innerWidth/2) * -0.0005}deg;
            --rotate-y: ${(e.clientY - window.innerHeight/2) * 0.0009}deg;
            --translate-x: ${(e.clientX - window.innerWidth/2)}px;
            --translate-y: ${(e.clientY - window.innerHeight/2)}px;
        `
    })

    if (!ready) {
        setTimeout(() => {
            go = true;
        }, 900)
    }

    ready = true;
})

document.body.style.cssText = `
    --right-block-x-position-px: 0px;
    --right-block-y-position-px: 0px;
    --right-block-z-position-px: -110px;
    --right-block-scale: 0.5;
    --top-block-y-position-px: 0px;
    --top-block-x-position-px: 0px;
    --top-block-z-position-px: -110px;
    --top-block-scale: 0.5;
    --right-block-transition: none;
    --top-block-transition: none;
    --right-block-display: none;
`

const blockTransition = 'transform 1.7s cubic-bezier(0.23,1,0.32,1)'

const scrollDelta = 40;

const maxRightBlockLeftPositionPercent = 95;
const maxRightBlockYPositionPercent = 50;

const minTopBlockYPositionPercent = 0;
const maxTopBlockYPositionPercent = 50;
const maxTopBlockXPositionPercent = 40;

let scrollPositionPx = 0

let prevTopBlockSection = 0;
let prevRightBlockSection = 0;

const rightBlock = document.getElementById("block-right")
const topBlock = document.getElementById("block-top")

document.addEventListener('wheel', e => {

    if (!go) {
        return;
    }

    scrollPositionPx = e.deltaY > 0 ? scrollPositionPx + scrollDelta : scrollPositionPx - scrollDelta;

    if (scrollPositionPx < 0) {
        scrollPositionPx = 0;
    }

    const scrollPositionPercent = scrollPositionPx/window.innerHeight*100;

    const currentScrollSection = Math.floor(scrollPositionPercent/100);

    const currentRightBlockSection = Math.floor((currentScrollSection-1)/2);
    const currentTopBlockSection = Math.floor(currentScrollSection/2);

    if (currentTopBlockSection !== prevTopBlockSection) {
        topBlock.innerHTML = TopBLockContents[currentTopBlockSection] || '';
        prevTopBlockSection = currentTopBlockSection;
    }
    if (currentRightBlockSection !== prevRightBlockSection) {
        rightBlock.innerHTML = rightBLockContents[currentRightBlockSection] || '';
        prevRightBlockSection = currentRightBlockSection;
    }

    const scrollPosition1SectionPercent = scrollPositionPercent - (100*(currentScrollSection - (currentScrollSection % 2)));

    const scrollPosition2SectionPercent = currentScrollSection < 1
        ? scrollPositionPercent
        : scrollPositionPercent - (100*(currentScrollSection - ((currentScrollSection - 1) % 2)));

    const rightBlockXPositionPercent = scrollPosition2SectionPercent <= maxRightBlockLeftPositionPercent
        ? 100 - scrollPosition2SectionPercent
        : (100 - ((maxRightBlockLeftPositionPercent - (scrollPosition2SectionPercent - maxRightBlockLeftPositionPercent))));

    const rightBlockYPositionPercent = Math.min(scrollPosition2SectionPercent/3, maxRightBlockYPositionPercent);

    const topBlockYPositionPercent = scrollPosition1SectionPercent < maxTopBlockYPositionPercent
        ? 20 - scrollPosition1SectionPercent
        : Math.min((scrollPosition1SectionPercent - 70), maxTopBlockYPositionPercent);

    const topBlockXPositionPercent = scrollPosition1SectionPercent < 100
        ? maxTopBlockXPositionPercent
        : maxTopBlockXPositionPercent - ((scrollPosition1SectionPercent-(scrollPosition1SectionPercent < 180 ? 100 : 50)))

   document.body.style.cssText = `

        --right-block-x-position-px: ${Math.round(window.innerWidth/100*rightBlockXPositionPercent)}px;
        --right-block-y-position-px: ${Math.round(window.innerHeight/100*rightBlockYPositionPercent)}px;
        --right-block-z-position-px: ${scrollPosition2SectionPercent <= maxRightBlockLeftPositionPercent ? 79 : 81}px;
        --right-block-scale: ${Math.min((scrollPosition2SectionPercent/100).toFixed(2), 1.3)};

        --top-block-y-position-px: ${Math.round(window.innerHeight/100*topBlockYPositionPercent)}px;
        --top-block-x-position-px: ${Math.round(window.innerWidth/100*topBlockXPositionPercent)}px;
        --top-block-z-position-px: ${scrollPosition1SectionPercent <= 30 ? 9 : 11}px;
        --top-block-scale: ${scrollPosition1SectionPercent <= 40 ? (scrollPosition1SectionPercent/150).toFixed(2) : Math.min((scrollPosition1SectionPercent/120).toFixed(2), 0.9)};

        --scroll-position-section: ${scrollPosition1SectionPercent};

        --right-block-transition: ${(scrollPosition2SectionPercent < 20) ? 'none' : blockTransition};
        --top-block-transition: ${(scrollPosition1SectionPercent < 5 || scrollPosition1SectionPercent > 190) ? 'none' : blockTransition};
        --right-block-display: ${currentScrollSection < 1 ? 'none' : 'auto'};

   `
})
