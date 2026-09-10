const torchBtn = document.getElementById('torchBtn');
const status = document.getElementById('status');
let stream = null;
let track = null;
let isOn = false;

torchBtn.addEventListener('click', async () => {
    try {
        if (!isOn) {
            // Request camera
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            
            // Get the video track
            track = stream.getVideoTracks()[0];
            
            // Turn on torch
            await track.applyConstraints({
                advanced: [{ torch: true }]
            });
            
            isOn = true;
            torchBtn.textContent = 'Turn OFF';
            torchBtn.classList.add('on');
            status.textContent = 'Torch is ON';
            
        } else {
            // Turn off torch
            if (track) {
                await track.applyConstraints({
                    advanced: [{ torch: false }]
                });
            }
            
            // Stop camera
            if (stream) {
                stream.getTracks().forEach(t => t.stop());
            }
            
            isOn = false;
            torchBtn.textContent = 'Turn ON';
            torchBtn.classList.remove('on');
            status.textContent = 'Torch is OFF';
        }
    } catch (error) {
        status.textContent = '❌ Torch not supported';
        console.error(error);
    }
});