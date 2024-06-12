   document.addEventListener('DOMContentLoaded', (event) => {
// 碰撞检测函数
    function checkCollision(player, element) {
        const playerRect = player.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        return !(
            playerRect.top > elementRect.bottom ||
            playerRect.bottom < elementRect.top ||
            playerRect.left > elementRect.right ||
            playerRect.right < elementRect.left
        );
    }

// 模拟鼠标悬停效果
    function simulateHoverEffect(player) {
        const allElements = document.querySelectorAll('*'); // 网页中的所有元素

        allElements.forEach(element => {
            if (element !== player && checkCollision(player, element)) {
                const mouseOverEvent = new Event('mouseover');
                const mouseOutEvent = new Event('mouseout');

                element.dispatchEvent(mouseOverEvent);
                setTimeout(() => {
                    element.dispatchEvent(mouseOutEvent);
                }, 200); // 保持悬停效果200ms
            }
        });
    }

    // 监听空格键按下事件
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            const allElements = document.querySelectorAll('*'); // 网页中的所有元素

            allElements.forEach(element => {
                if (element !== player && checkCollision(player, element)) {
                    const clickEvent = new Event('click');
                    element.dispatchEvent(clickEvent);
                }
            });
        }
    });

    // 每隔100ms检测一次碰撞
    setInterval(() => {
        simulateHoverEffect(player);
    }, 100);
}); 

  