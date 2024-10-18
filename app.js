// Access the camera stream using WebRTC
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoGallery = document.getElementById('photo-gallery');
let cameraStream;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        cameraStream = stream;
    })
    .catch(error => {
        console.error('Error accessing the camera', error);
    });

// Capture photo from the video stream
function capturePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgURL = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = imgURL;
    photoGallery.appendChild(img);
}

// Add 3D filter using Three.js
function add3DFilter() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, video.videoWidth / video.videoHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    
    renderer.setSize(video.videoWidth, video.videoHeight);

    // Simple 3D object (cube) as filter
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}
