document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.img-thumbnail');
    const resetButton = document.getElementById('reset-btn');
    let initialPositions = [];

    function saveInitialPositions() {
        initialPositions = [];
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            initialPositions.push({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                parent: img.parentElement
            });
        });
    }

    // 保存初始位置
    saveInitialPositions();

    // 點擊圖片時使其散落
    images.forEach(img => {
        img.addEventListener('click', () => {
            images.forEach((img, index) => {
                img.style.position = 'absolute';
                img.style.top = `${Math.random() * (window.innerHeight - img.clientHeight)}px`;
                img.style.left = `${Math.random() * (window.innerWidth - img.clientWidth)}px`;
            });
        });
    });

    // 點擊恢復按鈕時將圖片恢復到初始位置
    resetButton.addEventListener('click', () => {
        images.forEach((img, index) => {
            img.style.position = 'relative';
            img.style.top = 'auto';
            img.style.left = 'auto';
            initialPositions[index].parent.appendChild(img); // 將圖片放回到初始的col-sm-4內
        });
    });

    // 窗口調整大小時更新初始位置
    window.addEventListener('resize', saveInitialPositions);
});