// /* eslint-disable no-restricted-globals */
// // src/workers/frame.worker.js
// let retryCount = 0;
// let processingQueue = [];
// let isProcessing = false;

// async function processFrame(bitmap) {
//   try {
//     // 1. Convert to optimized format
//     const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(bitmap, 0, 0);
//     const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.8 });
//     bitmap.close();

//     // 2. Network handler with retry
//     const fetchWithRetry = async (url, options, retries = 3) => {
//       try {
//         const response = await fetch(url, options);
//         retryCount = 0;
//         return response.json();
//       } catch (error) {
//         if (retries > 0) {
//           await new Promise(resolve => 
//             setTimeout(resolve, 2 ** (4 - retries) * 1000)
//           );
//           return fetchWithRetry(url, options, retries - 1);
//         }
//         throw error;
//       }
//     };

//     // 3. Send to server
//     const formData = new FormData();
//     formData.append('frame', blob);
    
//     const result = await fetchWithRetry('/process-frame', {
//       method: 'POST',
//       body: formData,
//       // signal: controller.signal
//     });

//     self.postMessage({
//       type: 'PLATE_RESULT',
//       payload: result
//     });

//   } catch (error) {
//     self.postMessage({ type: 'NETWORK_ERROR' });
//   } finally {
//     processNextFrame();
//   }
// }

// function processNextFrame() {
//   if (processingQueue.length > 0 && !isProcessing) {
//     isProcessing = true;
//     const { bitmap } = processingQueue.shift();
//     processFrame(bitmap);
//   }
// }

// self.addEventListener('message', (event) => {
//   if (event.data.type === 'PROCESS_FRAME') {
//     processingQueue.push(event.data);
//     processNextFrame();
//   }
  
//   if (event.data.type === 'CLEANUP') {
//     processingQueue = [];
//     retryCount = 0;
//   }
// });
