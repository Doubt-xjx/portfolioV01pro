document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');

            // 设置aria-expanded状态
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // 点击导航链接时关闭菜单
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
    
    // 微信二维码模态框功能
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    const modalClose = wechatModal?.querySelector('.modal-close');
    
    if (wechatBtn && wechatModal) {
        wechatBtn.addEventListener('click', function() {
            wechatModal.style.display = 'flex';
            body.classList.add('no-scroll');
            
            // 添加动画类
            setTimeout(() => {
                wechatModal.classList.add('active');
            }, 10);
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // 点击模态框外部关闭
        wechatModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // 关闭模态框函数
        function closeModal() {
            wechatModal.classList.remove('active');
            setTimeout(() => {
                wechatModal.style.display = 'none';
                body.classList.remove('no-scroll');
            }, 300);
        }

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && wechatModal.style.display === 'flex') {
                closeModal();
            }
        });
    }
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // 回退方案
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Spline场景加载处理
    const splineViewer = document.querySelector('spline-viewer');
    const skeletonLoader = document.querySelector('.skeleton-loader');
    
    if (splineViewer && skeletonLoader) {
        // 显示加载状态
        skeletonLoader.style.display = 'block';
        
        // 监听加载完成事件
        splineViewer.addEventListener('load', function() {
            // 淡出加载动画
            skeletonLoader.style.opacity = '0';
            setTimeout(() => {
                skeletonLoader.style.display = 'none';
            }, 300);
            
            console.log('Spline scene loaded successfully');
        });

        // 监听加载失败事件
        splineViewer.addEventListener('error', function(e) {
            console.error('Spline scene failed to load:', e);
            skeletonLoader.style.display = 'none';
        });

        // 设置加载超时 - 10秒后如果还没加载完成，隐藏加载动画
        setTimeout(function() {
            if (skeletonLoader.style.display !== 'none') {
                console.warn('Spline scene load timeout');
                skeletonLoader.style.opacity = '0';
                setTimeout(() => {
                    skeletonLoader.style.display = 'none';
                }, 300);
            }
        }, 10000);
    }
});