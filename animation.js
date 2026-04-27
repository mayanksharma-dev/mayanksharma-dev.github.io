document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.intro-image');
    if (!container) return;

    const canvas = document.getElementById('cube-canvas');
    if (!canvas) return;

    let materialColor = 0x22d3ee;
    if (document.body.classList.contains('light-theme')) {
        materialColor = 0x0ea5e9;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.LineBasicMaterial({ color: materialColor });
    
    const group = new THREE.Group();

    const positions = [
        [-2, 2, 0], [0, 2, 0], [2, 2, 0],
        [-2, 0, 0], [0, 0, 0], [2, 0, 0],
        [-2, -2, 0], [0, -2, 0], [2, -2, 0]
    ];

    positions.forEach(pos => {
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, material);
        line.position.set(pos[0], pos[1], pos[2]);
        group.add(line);
    });

    scene.add(group);
    camera.position.z = 10;

    // Speed control (press to speed up)
    let speedMultiplier = 1;
    const pressStart = () => (speedMultiplier = 4);
    const pressEnd = () => (speedMultiplier = 1);

    canvas.addEventListener('pointerdown', pressStart);
    window.addEventListener('pointerup', pressEnd);
    window.addEventListener('pointercancel', pressEnd);
    window.addEventListener('pointerleave', pressEnd);

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.x += 0.002 * speedMultiplier;
        group.rotation.y += 0.003 * speedMultiplier;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });

    document.addEventListener('themeChanged', (e) => {
        material.color.setHex(e.detail.isLight ? 0x0ea5e9 : 0x22d3ee);
    });
});


///  ------------- this is smooth cube animation  -------------
// document.addEventListener('DOMContentLoaded', function () {
//   const container = document.querySelector('.intro-image');
//   if (!container) return;

//   const canvas = document.getElementById('cube-canvas');
//   if (!canvas) return;

//   let baseColor = 0x22d3ee;
//   if (document.body.classList.contains('light-theme')) {
//     baseColor = 0x0ea5e9;
//   }

//   const scene = new THREE.Scene();

//   const camera = new THREE.PerspectiveCamera(
//     75,
//     container.clientWidth / container.clientHeight,
//     0.1,
//     1000
//   );

//   const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(container.clientWidth, container.clientHeight);

//   const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);

//   const material = new THREE.LineBasicMaterial({
//     color: baseColor,
//     transparent: true,
//     opacity: 0.95
//   });

//   const glowMaterial = new THREE.LineBasicMaterial({
//     color: 0x6ee7ff,
//     transparent: true,
//     opacity: 0.25
//   });

//   const group = new THREE.Group();

//   const positions = [
//     [-2, 2, 0], [0, 2, 0], [2, 2, 0],
//     [-2, 0, 0], [0, 0, 0], [2, 0, 0],
//     [-2, -2, 0], [0, -2, 0], [2, -2, 0]
//   ];

//   positions.forEach(pos => {
//     const edges = new THREE.EdgesGeometry(geometry);
//     const line = new THREE.LineSegments(edges, material);
//     line.position.set(pos[0], pos[1], pos[2]);

//     const glow = new THREE.LineSegments(edges, glowMaterial);
//     glow.position.copy(line.position);
//     glow.scale.setScalar(1.03);

//     group.add(glow);
//     group.add(line);
//   });

//   scene.add(group);
//   camera.position.z = 10;

//   let speedMultiplier = 1;
//   const baseSpeed = { x: 0.002, y: 0.003 };

//   const pressStart = () => (speedMultiplier = 4);
//   const pressEnd = () => (speedMultiplier = 1);

//   canvas.addEventListener('pointerdown', pressStart);
//   window.addEventListener('pointerup', pressEnd);
//   window.addEventListener('pointercancel', pressEnd);
//   window.addEventListener('pointerleave', pressEnd);

//   function animate() {
//     requestAnimationFrame(animate);

//     group.rotation.x += baseSpeed.x * speedMultiplier;
//     group.rotation.y += baseSpeed.y * speedMultiplier;

//     renderer.render(scene, camera);
//   }

//   animate();

//   window.addEventListener('resize', () => {
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     camera.aspect = container.clientWidth / container.clientHeight;
//     camera.updateProjectionMatrix();
//   });

//   document.addEventListener('themeChanged', (e) => {
//     const newColor = e.detail.isLight ? 0x0ea5e9 : 0x22d3ee;
//     material.color.setHex(newColor);
//   });
// });




// ------------- this is smooth cube animation with the starfield background and parallax drift -------------
// document.addEventListener('DOMContentLoaded', function () {
//   const container = document.querySelector('.intro-image');
//   if (!container) return;

//   const canvas = document.getElementById('cube-canvas');
//   if (!canvas) return;

//   let baseColor = 0x22d3ee;
//   if (document.body.classList.contains('light-theme')) {
//     baseColor = 0x0ea5e9;
//   }

//   const scene = new THREE.Scene();
//   scene.fog = new THREE.FogExp2(0x05060f, 0.045);

//   const camera = new THREE.PerspectiveCamera(
//     75,
//     container.clientWidth / container.clientHeight,
//     0.1,
//     1000
//   );

//   const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(container.clientWidth, container.clientHeight);

//   // ===== Starfield background =====
//   const starGeometry = new THREE.BufferGeometry();
//   const starCount = 1200;
//   const starPositions = new Float32Array(starCount * 3);
//   for (let i = 0; i < starCount; i++) {
//     const i3 = i * 3;
//     starPositions[i3] = (Math.random() - 0.5) * 200;
//     starPositions[i3 + 1] = (Math.random() - 0.5) * 200;
//     starPositions[i3 + 2] = -Math.random() * 200;
//   }
//   starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
//   const starMaterial = new THREE.PointsMaterial({
//     color: 0x7aa8ff,
//     size: 0.6,
//     sizeAttenuation: true,
//     transparent: true,
//     opacity: 0.8
//   });
//   const stars = new THREE.Points(starGeometry, starMaterial);
//   scene.add(stars);

//   // ===== Cubes =====
//   const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);

//   const material = new THREE.LineBasicMaterial({
//     color: baseColor,
//     transparent: true,
//     opacity: 0.95
//   });

//   const glowMaterial = new THREE.LineBasicMaterial({
//     color: 0x6ee7ff,
//     transparent: true,
//     opacity: 0.25
//   });

//   const group = new THREE.Group();

//   const positions = [
//     [-2, 2, 0], [0, 2, 0], [2, 2, 0],
//     [-2, 0, 0], [0, 0, 0], [2, 0, 0],
//     [-2, -2, 0], [0, -2, 0], [2, -2, 0]
//   ];

//   positions.forEach(pos => {
//     const edges = new THREE.EdgesGeometry(geometry);
//     const line = new THREE.LineSegments(edges, material);
//     line.position.set(pos[0], pos[1], pos[2]);

//     // Soft glow layer (same cube, slightly scaled)
//     const glow = new THREE.LineSegments(edges, glowMaterial);
//     glow.position.copy(line.position);
//     glow.scale.setScalar(1.03);

//     group.add(glow);
//     group.add(line);
//   });

//   scene.add(group);
//   camera.position.z = 10;

//   // ===== Motion controls =====
//   let speedMultiplier = 1;
//   const baseSpeed = { x: 0.002, y: 0.003 };

//   const pressStart = () => (speedMultiplier = 4);
//   const pressEnd = () => (speedMultiplier = 1);

//   canvas.addEventListener('pointerdown', pressStart);
//   window.addEventListener('pointerup', pressEnd);
//   window.addEventListener('pointercancel', pressEnd);
//   window.addEventListener('pointerleave', pressEnd);

//   // ===== Subtle parallax drift =====
//   let drift = { x: 0, y: 0 };
//   window.addEventListener('mousemove', (e) => {
//     const nx = (e.clientX / window.innerWidth) * 2 - 1;
//     const ny = (e.clientY / window.innerHeight) * 2 - 1;
//     drift.x = nx * 0.2;
//     drift.y = -ny * 0.2;
//   });

//   function animate() {
//     requestAnimationFrame(animate);

//     group.rotation.x += baseSpeed.x * speedMultiplier;
//     group.rotation.y += baseSpeed.y * speedMultiplier;

//     group.position.x += (drift.x - group.position.x) * 0.02;
//     group.position.y += (drift.y - group.position.y) * 0.02;

//     // slow starfield drift
//     stars.rotation.y += 0.0003;
//     stars.rotation.x += 0.00015;

//     renderer.render(scene, camera);
//   }

//   animate();

//   window.addEventListener('resize', () => {
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     camera.aspect = container.clientWidth / container.clientHeight;
//     camera.updateProjectionMatrix();
//   });

//   document.addEventListener('themeChanged', (e) => {
//     const newColor = e.detail.isLight ? 0x0ea5e9 : 0x22d3ee;
//     material.color.setHex(newColor);
//   });
// });
