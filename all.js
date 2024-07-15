// 獲取 canvas 元素並設置其尺寸
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 獲取 2D 繪圖上下文
const ctx = canvas.getContext("2d");

// 初始化圖片陣列和當前顯示的圖片索引
const imgArr = []
let drawImgIndex = 0
let touchStartY = 0;

// 計算圖片在 canvas 中的最佳尺寸，保持原始比例
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
}

// 在 canvas 中繪製圖片，確保圖片居中顯示
function drawImg(img) {
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const { width: imgWidth, height: imgHeight } = calculateAspectRatioFit(img.width, img.height, canvasWidth, canvasHeight);

    // 計算圖片在 canvas 中的居中位置
    const x = (canvasWidth - imgWidth) / 2;
    const y = (canvasHeight - imgHeight) / 2;

    // 清除 canvas 並繪製新圖片
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
}

// 初始化圖片陣列，載入所有圖片
function init(imgArr){
    for(let i=1;i<65;i++){
        const img = new Image()
        if(i<10){
            img.src = `./assets/000${i}.png`
        }else{
            img.src = `./assets/00${i}.png`
        }
        imgArr.push(img)
    }
}

// 呼叫初始化函數
init(imgArr)

// 在頁面載入後的 1 秒繪製第一張圖片
setTimeout(() => {
    drawImg(imgArr[drawImgIndex])
}, 1000)

// 處理滾動事件，更新顯示的圖片
function handleScroll(delta) {
    if(Math.abs(delta) > 10){
        if(delta < 0 && drawImgIndex > 0){
            drawImgIndex--
        }else if(delta > 0 &&  drawImgIndex < 63){
            drawImgIndex++
        }
        drawImg(imgArr[drawImgIndex])
    }
}

// 滑鼠滾輪事件監聽器
document.addEventListener('wheel', (e) => {
    handleScroll(e.deltaY);
})

// 觸控裝置的觸摸開始事件監聽器
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
})

// 觸控裝置的觸摸移動事件監聽器
document.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    handleScroll(delta);
    touchStartY = touchEndY;
})

// 視窗調整大小事件監聽器，用於響應式設計
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawImg(imgArr[drawImgIndex]);
})