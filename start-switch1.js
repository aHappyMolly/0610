document.addEventListener('DOMContentLoaded', (event) => {
    const player = document.getElementById('player');
    const blood = document.getElementById('blood');	
	const imageA = document.getElementById('imageA');
    const imageB = document.getElementById('imageB');
    const title1 = document.getElementById('title1');
    const imageC = document.getElementById('imageC');
    const imageD = document.getElementById('imageD');
    const imageE = document.getElementById('imageE');

    imageA.addEventListener('mouseover', () => { 
		imageB.style.display = 'block';
		imageB.style.opacity = '1';
		imageA.style.display = 'none';
		console.log("hi");
	    });

    imageB.addEventListener('mouseout', () => {
		imageB.style.display = 'none';
		imageA.style.display = 'block';
		console.log("out");
		
    	});

    imageB.addEventListener('click', () => {
		
		
        setTimeout(() => {
            imageA.style.display = 'none';
			imageB.style.display = 'none';
			
            title1.style.display = 'none';
            imageC.style.display = 'none';
            imageD.style.display = 'block';
            imageE.style.display = 'block';
			player.style.display = 'block'; 
			blood.style.display = 'block';
		
			
            player.style.top = imageC.style.top; // 設定player位置
            player.style.left = imageC.style.left; 
			
            setTimeout(() => {
				imageA.style.display = 'none';
                imageD.style.opacity = '1';
                imageE.style.opacity = '1';
				player.style.opacity = '1'; // 設定player透明度
				blood.style.opacity = '1'; 
            }, 50); // 確保 display 屬性更改後觸發過渡
        }, 500); // 與過渡時間匹配
    
	});

});