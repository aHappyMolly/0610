
document.addEventListener('DOMContentLoaded', function() {
	
	const player = document.getElementById('player');
    const step = 40; // 提高滾動速度
    const boundaryOffset = 50; // 與視窗邊緣的距離
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let scrollTimer;
    let collidedElement = null;

    function scrollToSmooth(x, y) {
        window.scrollTo({
            left: x,
            top: y,
            behavior: 'smooth'
        	});
		}

    function handleBoundary() {
        const rect = player.getBoundingClientRect();

        if (rect.top <= boundaryOffset && window.scrollY > 0) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                scrollToSmooth(0, window.scrollY - boundaryOffset);
            	}, 50); // 提前滾動開始時間並縮短延遲
            }
        else if (rect.bottom >= windowHeight - boundaryOffset && window.scrollY < document.documentElement.scrollHeight - windowHeight) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
            	scrollToSmooth(0, window.scrollY + boundaryOffset);
				}, 50); // 提前滾動開始時間並縮短延遲
			}
    	}
		 
		 
	//模擬滑鼠觸發.碰撞偵測
	function checkCollision() {
    	const playerRect = player.getBoundingClientRect();
        const elements = document.querySelectorAll('div, span, img, a, p'); // 需要檢測的元素列表
        let newcollidedElement = null;
			
		elements.forEach(element => {
			if (element !== player) {
				const rect = element.getBoundingClientRect();
				if (
					playerRect.left < rect.right &&
                    playerRect.right > rect.left &&
                    playerRect.top < rect.bottom &&
                    playerRect.bottom > rect.top
                    )
                    {
					newCollidedElement = element;
					if (collidedElement !== newCollidedElement) {
						element.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true, cancelable: true }));   
						}
						}
					else {
						if (collidedElement === element) {
							element.dispatchEvent(new Event('mouseleave', { bubbles: true , cancelable: true }));
						}
					}
				}
			});
			collidedElement = newCollidedElement;
		}
		  

            document.addEventListener('scroll', handleBoundary);

            document.addEventListener('keydown', function(event) {
                // 阻止箭頭鍵的默認滾動行為
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                    event.preventDefault();
                }

                let top = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
                let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

                switch(event.key) {
                	case 'ArrowUp':
						player.style.backgroundImage = "url('素材/向上.gif')"; // 向上的GIF檔
                        if (top > 0) {
                            player.style.top = (top - step) + 'px';
                            if (player.offsetTop < window.scrollY) {
                                scrollToCenter();
                            }}
                        handleBoundary();
                       	checkCollision();
                		break;
					
                    case 'ArrowDown':
						player.style.backgroundImage = "url('素材/向下.gif')"; // 向下的GIF檔
                        if (top < document.documentElement.scrollHeight - player.clientHeight) {
                            player.style.top = (top + step) + 'px';
                            if (player.offsetTop + player.clientHeight > window.scrollY + window.innerHeight) {
                            scrollToCenter();}}
                       handleBoundary();
                       checkCollision();
                	break;
					
                    case 'ArrowLeft':
                        player.style.left = (left - step) + 'px';
                        player.style.backgroundImage = "url('素材/向左.gif')"; // 向左的GIF檔
						     if (player.offsetLeft + player.clientWidth < 0) {
                            player.style.left = window.innerWidth + 'px';
                        }
                        handleBoundary();
                        checkCollision();
                	break;
					
                    case 'ArrowRight':
                        player.style.left = (left + step) + 'px';
                        player.style.backgroundImage = "url('素材/向右.gif')"; // 向右的GIF檔
						 if (player.offsetLeft > window.innerWidth) {
                            player.style.left = -player.clientWidth + 'px';}
                        handleBoundary();
						checkCollision();
                	break;
						
					case ' ':
						if (collidedElement) {
							collidedElement.click();
						}
						break;
                }
            });
        });