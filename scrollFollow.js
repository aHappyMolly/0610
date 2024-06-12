document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const step = 40; // 提高滾動速度
    const boundaryOffset = 50; // 與視窗邊緣的距離
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

    // 處理當 player 到達邊界時的滾動行為
    function handleBoundary() {
        if (!followPlayer) return; // 如果视窗不跟随 player，则直接返回

        const rect = player.getBoundingClientRect();
        const playerTop = rect.top;
        const playerBottom = rect.bottom;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + window.innerHeight;

        if (playerTop < boundaryOffset && windowTop > 0) {
            scrollToSmooth(0, windowTop - step);
        } else if (playerBottom > window.innerHeight - boundaryOffset && windowBottom < document.documentElement.scrollHeight) {
            scrollToSmooth(0, windowTop + step);
        }
    }

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

    // 當用戶滾動到文件頂部 20px 以內時，顯示導航欄
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("navbar").style.bottom = "0";
        } else {
            document.getElementById("navbar").style.bottom = "-50px";
        }
    }
});
