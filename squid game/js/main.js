const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xb7);

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

//creating global variables
const start_pos = 3;
const end_pos = -start_pos;
const text = document.querySelector('.text');
const Time_Limit = 30;
let GameStat = "loading"
let isLookingBackward = true

function createCube(size, positionX, rotY = 0, color = 0xfbc851) {
    const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = positionX;
    cube.rotation.y = rotY;
    scene.add(cube);
    return cube;
}


camera.position.z = 5;

const loader = new THREE.GLTFLoader();

const loader1 = new THREE.TextureLoader();
loader1.load('https://preview.redd.it/k3mijsmj0wq71.png?width=2480&format=png&auto=webp&s=61fb807892a163f89bf0964a667f49324f4b200f', function(texture) {
    scene.background = texture;
});

// var map = THREE.ImageUtils.loadTexture("ssg.png");
// var material = new THREE.MeshLambertMaterial({ map: map, transparent: true });
// material.opacity = 100;


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class DOLL {
    constructor() {
        loader.load("../models/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        })
    }
    lookBack() {
        gsap.to(this.doll.rotation, { y: -3.15, duration: .45 });
        setTimeout(() => isLookingBackward = true, 150);
    }

    lookFront() {
        gsap.to(this.doll.rotation, { y: 0, duration: .45 });
        setTimeout(() => isLookingBackward = false, 450);
    }
    async start() {
        this.lookBack();
        await delay((Math.random() * 1000) + 1000);
        this.lookFront();
        await delay((Math.random() * 750) + 750);
        this.start();
    }
}

function setTrack() {
    createCube({ w: start_pos * 2 + 0.2, h: 1.5, d: 1 }, 0, 0, 0xe5a716).position.z = -1;
    createCube({ w: .2, h: 1.5, d: 1 }, start_pos, -0.35);
    createCube({ w: .2, h: 1.5, d: 1 }, end_pos, 0.35);
}
setTrack();

class Player {
    constructor() {
        const geometry = new THREE.SphereGeometry(.3, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.z = 1;
        sphere.position.x = start_pos;
        scene.add(sphere);
        this.player = sphere;
        this.playerinfo = {
            positionX: start_pos,
            velocity: 0
        }
    }

    run() {
        this.playerinfo.velocity = 0.03;
    }

    stop() {
        gsap.to(this.playerinfo, { velocity: 0, duration: .1 });
    }

    stop1() {
        this.playerinfo.velocity = 0;
    }

    check() {
        if (this.playerinfo.velocity > 0 && !isLookingBackward) {

            text.innerText = "YOU LOSE!"
            GameStat = "over"
        }
        if (this.playerinfo.positionX < end_pos + .4) {

            text.innerText = "YOU WIN!"
            GameStat = "over"
        }
    }

    update() {
        this.check();
        this.playerinfo.positionX = this.playerinfo.positionX - this.playerinfo.velocity;
        this.player.position.x = this.playerinfo.positionX;
    }
}
const player = new Player();
let doll = new DOLL();

async function init() {
    await delay(500);
    text.innerText = "Starting in 3";
    await delay(500);
    text.innerText = "Starting in 2";
    await delay(500);
    text.innerText = "Starting in 1";
    await delay(500);
    text.innerText = "GOO!!";
    startGame();
}

function startGame() {
    GameStat = "started"
    let progressBar = createCube({ w: 5, h: .1, d: 1 }, 0)
    progressBar.position.y = 3.35;
    gsap.to(progressBar.scale, { x: 0, duration: Time_Limit, ease: "none" });
    setTimeout(() => {
        if (GameStat != "over") {
            text.innerText = "YOU RAN OUT OF TIME!"
            GameStat = "over"
        }
    }, Time_Limit * 1000);
    doll.start();
}

init()
    // setTimeout(() => {
    //     doll.start();
    // }, 1000);

function animate() {
    if (GameStat == "over") return
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    player.update();
}
animate();

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('reload', onWindowReload, true);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onWindowReload() {
    player.stop1();
}

window.addEventListener('keydown', (e) => {
    if (GameStat != "started") return;
    if (e.key == "ArrowLeft") {
        player.run();
    }

})

window.addEventListener('keyup', (e) => {
    if (e.key == "ArrowLeft") {
        player.stop();
    }

})