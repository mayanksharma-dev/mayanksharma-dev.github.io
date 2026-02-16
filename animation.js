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

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.x += 0.002;
        group.rotation.y += 0.003;
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
