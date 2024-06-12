


    document.addEventListener('DOMContentLoaded', function() {
        const player = document.getElementById('player');
        const step = 40; // 提高滾動速度
        const boundaryOffset = 50; // 與視窗邊緣的距離
        const windowHeight = window.innerHeight;
        let scrollTimer;
        let followPlayer = true; // 标志视窗是否跟随 player

        // 平滑滾動到指定位置的函數
        function scrollToSmooth(x, y) {
            window.scrollTo({
                left: x,
                top: y,
                behavior: 'smooth'
            });
        }

        // 確保 player 在視窗中央的函數
        function centerPlayer() {
            const rect = player.getBoundingClientRect();
            const playerHeight = rect.height;
            const playerTop = rect.top;
            const playerBottom = rect.bottom;
            const windowTop = window.scrollY;
            const windowBottom = windowTop + windowHeight;

            if (followPlayer && windowTop > 0 && windowBottom < document.documentElement.scrollHeight) {
                const newScrollY = windowTop + playerTop - (windowHeight / 2) + (playerHeight / 2);
                scrollToSmooth(0, newScrollY);
            }
        }

        // 處理當 player 到達邊界時的滾動行為
        function handleBoundary() {
            if (!followPlayer) return; // 如果视窗不跟随 player，则直接返回

            const rect = player.getBoundingClientRect();
            const playerTop = rect.top;
            const playerBottom = rect.bottom;
            const windowTop = window.scrollY;
            const windowBottom = windowTop + windowHeight;

            if (playerTop < boundaryOffset && windowTop > 0) {
                scrollToSmooth(0, windowTop - step);
            } else if (playerBottom > windowHeight - boundaryOffset && windowBottom < document.documentElement.scrollHeight) {
                scrollToSmooth(0, windowTop + step);
            }
        }

        // 阻止空白鍵的預設滾動行為
        window.addEventListener('keydown', function(event) {
            if (event.key === ' ') {
                event.preventDefault();
            }
        });

        // 當滾動事件發生時，調用 handleBoundary 函數
        document.addEventListener('scroll', function() {
            handleBoundary();
            // 当用户滚动时禁用视窗跟随
            followPlayer = false;
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                followPlayer = true; // 一段时间后重新启用视窗跟随
            }, 500);
        });

        // 當按下鍵盤按鍵時
        document.addEventListener('keydown', function(event) {
            // 阻止箭頭鍵的默認滾動行為
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }

            // 獲取 player 當前的位置
            let top = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
            let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

            // 根據按鍵調整 player 的位置和背景圖片
            switch(event.key) {
                case 'ArrowUp':
                    if (top > 0) {
                        player.style.top = (top - step) + 'px';
                        player.style.backgroundImage = "url('素材/向上.gif')"; // 向上的 GIF 檔
                        followPlayer = true; // 启用视窗跟随
                        centerPlayer(); // 确保 player 在视窗中央
                    }
                    break;
                case 'ArrowDown':
                    if (top < document.documentElement.scrollHeight - player.offsetHeight) {
                        player.style.top = (top + step) + 'px';
                        player.style.backgroundImage = "url('素材/向下.gif')"; // 向下的 GIF 檔
                        followPlayer = true; // 启用视窗跟随
                        centerPlayer(); // 确保 player 在视窗中央
                    }
                    break;
                case 'ArrowLeft':
                    player.style.left = (left - step) + 'px';
                    player.style.backgroundImage = "url('素材/向左.gif')"; // 向左的 GIF 檔
                    // 當 player 超出左邊界時，將其移動到右邊界
                    if (player.offsetLeft + player.clientWidth < 0) {
                        player.style.left = window.innerWidth + 'px';
                    }
                    followPlayer = true; // 启用视窗跟随
                    handleBoundary();
                    break;
                case 'ArrowRight':
                    player.style.left = (left + step) + 'px';
                    player.style.backgroundImage = "url('素材/向右.gif')"; // 向右的 GIF 檔
                    // 當 player 超出右邊界時，將其移動到左邊界
                    if (player.offsetLeft > window.innerWidth) {
                        player.style.left = -player.clientWidth + 'px';
                    }
                    followPlayer = true; // 启用视窗跟随
                    handleBoundary();
                    break;
            }
        });

    });
