
const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const button = document.getElementById('button')
const restart = document.getElementById('restart')
button.addEventListener("click", game)
restart.addEventListener('click', reStart)
const img = document.getElementsByTagName('img')



const container = document.querySelector('.container')
const p = document.createElement('p');
p.className = 'result'
const gameOver = document.createElement('p')
gameOver.className = 'gameOver'


//загрузка астеройда
let asterimg = new Image()
asterimg.src = './img/aster1.png'
//загрузка звука выстрела
let audio1 = new Audio();
audio1.preload = 'auto';
audio1.src = './sound/laser1.mp3';

//загрузка звука полета каробля
let audioship = new Audio();
audioship.preload = 'auto';
audioship.src = './sound/gol.mp3';

//загрузка звука взрыва
let audiobang = new Audio();
audiobang.preload = 'auto';
audiobang.src = './sound/bangAsteroid.mp3';


//загрузка звука взрыва коробля
let audiobangShip = new Audio();
audiobangShip.preload = 'auto';
audiobangShip.src = './sound/bangShip.mp3';

// выйстрел
let fireImg = new Image()
fireImg.src = './img/fire.png'
// загрузка самолета
let shipimg = new Image()
shipimg.src = './img/ship.png'

// загрузка фона
let fonimg = new Image()
fonimg.src = './img/kosmos.png'

// загрузка взрыва
let explimg = new Image()
explimg.src = './img/bang.png'

// загрузка взрыва коробля
let explAirimg = new Image()
explAirimg.src = './img/airBang.png'
// координаты корабля
let ship = { x: 300, y: 300, del: 0 }


// движение курсора 
canvas.addEventListener('mousemove', function (e) {
    ship.x = e.offsetX - 45
    ship.y = e.offsetY - 40
})

// Делаем один астеройд
//var aster = {x:0, y:300, dx:1, dy:2} // кординаты астеройда, dx-скорость передвижения, dy - скорость изменения координат 

// делаем много астеройдов
let timer = 0

const aster = [] // делаем много астеройдов

const fire = []// массив для выйстрелов

const expl = [] // массив для взрывов 

let callexpl = 0 //количество очков

let explAir = {} // взрыв самолета

let speedFire = 80 // скорость огня

let speedaster = 20

let level = 1
// explimg.onload = function () {
//     // game()
// }
if (timer > 1) {
    restart.style.display = 'none'


}
function reStart() {
    button.style.display = 'none'
    restart.style.display = 'none'
  
    if (timer > 2) {
        window.location.reload()
        img[0].style.display = 'none'

    } else {
        game()
img[0].style.display = 'none'


    }

}

// игровой цикл
function game() {
    update()
    render()

    ship.del !== 1 ? requestAnimFrame(game) : null//браузер будет вызывать эту функцию с астотой 60герц, если корабль подобьют, игра закончиться

}

function update() {
    timer++
    if (timer % speedaster === 0) {
        //   aster.push({ x: 0, y: 300, dx: 1, dy: 2 })// увеличиваем количество астеройдов каждые 10 фреймов
        aster.push({
            x: Math.random() * 1000, // рандомное появление астеройдов 
            y: -50, // астеройды появляются за экраном
            dx: Math.random() * 2 - 1, // рандомная скорость от -1 до 2 для каждого астеройда  
            dy: Math.random() * 2 + 2, // что бы астеройды летели вниз а не вверх 
            del: 0    // для пометки при попадании снаряда, если станет 1 то удаляем астеройд
        })

    }

    // звук полета каробля
    audioship.play()

    // выстрелы
    if (timer % speedFire === 0) {
        if (callexpl < 50) {
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5 })

            audio1.play();

        }
        if (callexpl >= 50 && callexpl < 200) {
            speedFire = 50
            speedaster = 15
            level = 2
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5 })
            shipimg.src = './img/ship1.png'
            fireImg.src = './img/fire1.png'

            audio1.src = './sound/laser5_2.mp3'

            audio1.play();


        }
        if (callexpl >= 200 && callexpl < 300) {
            speedaster = 12
            level = 3
            shipimg.src = './img/ship2.png'
            fonimg.src = './img/spase.png'
            audio1.src = './sound/lazer6_2.mp3'
            audio1.play();
            audiobang.src = './sound/bangAsteroid.mp3';
            audiobang.play()

            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: -0.5, dy: -5 })
        }
        if (callexpl >= 300 && callexpl < 550) {
            speedFire = 40
            speedaster = 9
            level = 4
            shipimg.src = './img/ship3.png'
            audio1.src = './sound/laser5_3.mp3'
            audio1.play()
            audiobang.src = './sound/bangAsteroid2.mp3';
            audiobang.play()

            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: -0.5, dy: -5 })
        }
        if (callexpl >= 550 && callexpl < 800) {
            speedaster = 5
            speedFire = 30
            level = 5
            shipimg.src = './img/ship4.png'
            fonimg.src = './img/spase2.png'
            audio1.src = './sound/lazer7.mp3'
            audio1.play()
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0.8, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: -0.8, dy: -5 })

        }
        if (callexpl >= 800 && callexpl < 1200) {
            speedaster = 5
            level = 6
            speedFire = 20
            shipimg.src = './img/ship5.png'
            fireImg.src = './img/fire2.png'
            audio1.src = './sound/lazer8.mp3'
            audio1.play()

            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: -0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: - 1, dy: -5 })

        }
        if (callexpl >= 1200) {
            speedaster = 5
            level = 7
            speedFire = 20
            fonimg.src = './img/space4.png'

            shipimg.src = './img/ship6.png'
            audio1.src = './sound/lazer9.mp3'
            audio1.play()

            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 1, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0, dy: -5.2 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: 0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: -0.5, dy: -5 })
            fire.push({ x: ship.x + 25, y: ship.y - 15, dx: - 1, dy: -5 })
        }



    }
    // двигаем пули
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx
        fire[i].y = fire[i].y + fire[i].dy

        if (fire[i].y < - 30) fire.splice(i, 1)
    }


    //Анимация взрыва
    for (i in expl) {
        expl[i].animx = expl[i].animx + 1
        if (expl[i].animx > 7) { expl[i].animy++; expl[i].animx = 0 }
        if (expl[i].animy > 7)
            expl.splice(i, 1)
    }
    for (i in aster) {
        aster[i].x = aster[i].x + aster[i].dx // при апдейте координата ч у астеройда увеличивается на единицу
        aster[i].y = aster[i].y + aster[i].dy // при апдейте координата ч у астеройда увеличивается на единицу


        // границы
        if (aster[i].x >= 1420 || aster[i].x < 0) aster[i].dx = -aster[i].dx // граница движения астеройда,
        if (aster[i].y >= 900) aster.splice(i, 1)// граница движения астеройда,

        //проверим каждый астеройд на столкновение с каждой пулей
        for (j in fire) {
            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                callexpl++
                // произошло столкновение
                //   exp1.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0})

                // спам взрыва
                expl.push({ x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0 })

                // помечаем астеройд на удаление
                aster[i].del = 1
                fire.splice(j, 1); break;
            }
        }
        if (aster[i].del === 1) aster.splice(i, 1)

        for (k in aster) {
            if (Math.abs(ship.x + 45 - aster[k].x - 15) < 50 && Math.abs(ship.y - aster[k].y) < 25) {
                ship.del = 1
            }


        }

    }
}

function render() {
    context.drawImage(fonimg, 0, 0, 1200, 900);
    context.drawImage(shipimg, ship.x, ship.y, 100, 100);
    for (i in fire) context.drawImage(fireImg, fire[i].x, fire[i].y, 50, 50);
    for (i in aster) context.drawImage(asterimg, aster[i].x, aster[i].y, 80, 80);
    context.font = "12px Arial";
    context.fillStyle = "white";
    context.opasity = 0.5
    context.fillText('® Студия Ильи Дмитриева', 450, 10)
    // отрисовка зврыва
    for (i in expl) {
        audiobang.play()

        context.drawImage(explimg, 100 * Math.floor(expl[i].animx), 100 * Math.floor(expl[i].animy), 100, 100, expl[i].x, expl[i].y, 100, 100);
    }
    if (ship.del === 1) {
        audioship.pause()
        audiobangShip.play()
        context.drawImage(explAirimg, ship.x - 60, ship.y - 50, 200, 200);
        audio1.pause()
        setTimeout(() => { audiobangShip.pause() }, 3000)

        setTimeout(() => { restart.style.display = 'block' }, 3050)
        setTimeout(() => { img[0].style.display = 'block' }, 3050)

        

    }
    p.innerHTML = `Попаданий: ${callexpl} Уровень: ${level}`
    container.appendChild(p)



    // показ окончания игры
    if (ship.del === 1) {
        gameOver.innerHTML = "Game ower"
        container.appendChild(gameOver)

    }


}
// для того чтобы игра работала в любом браузере
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20)
        }
})()

