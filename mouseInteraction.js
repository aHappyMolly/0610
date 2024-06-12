document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const boundaryOffset = 50; // 與視窗邊緣的距離
    let followPlayer = true; // 標誌視窗是否跟隨 player

    // 鼠標移動事件處理函數
    function handleMouseMove(event) {
        if (!followPlayer) return; // 如果視窗不跟隨 player，則直接返回

        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const rect = player.getBoundingClientRect();
        const playerWidth = rect.width;
        const playerHeight = rect.height;
        const playerLeft = rect.left;
        const playerTop = rect.top;

        // 如果鼠標在 player 區域內，則使 player 保持在鼠標位置的中心
        if (mouseX >= playerLeft && mouseX <= playerLeft + playerWidth &&
            mouseY >= playerTop && mouseY <= playerTop + playerHeight) {
            player.style.left = (mouseX - playerWidth / 2) + 'px';
            player.style.top = (mouseY - playerHeight / 2) + 'px';
        }
    }

    // 鼠標點擊事件處理函數
    function handleMouseClick(event) {
        // 當用戶點擊時重新啟用視窗跟隨
        followPlayer = true;
    }

    // 註冊鼠標移動事件監聽器
    document.addEventListener('mousemove', handleMouseMove);

    // 註冊鼠標點擊事件監聽器
    document.addEventListener('click', handleMouseClick);

    // 模擬 player 位置的鼠標移動和點擊事件
    function dispatchMouseEvent(type, x, y) {
        const event = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        });
        document.elementFromPoint(x, y).dispatchEvent(event);
    }

    // 鍵盤事件處理函數
    document.addEventListener('keydown', function(event) {
        const rect = player.getBoundingClientRect();
        const playerX = rect.left + rect.width / 2;
        const playerY = rect.top + rect.height / 2;

        switch(event.key) {
            case ' ':
                dispatchMouseEvent('mousedown', playerX, playerY);
                dispatchMouseEvent('mouseup', playerX, playerY);
                dispatchMouseEvent('click', playerX, playerY);
                break;
        }
    });
});
