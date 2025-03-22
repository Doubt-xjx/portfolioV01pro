document.addEventListener('DOMContentLoaded', function() {
    // 作品分类筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    if (filterButtons.length > 0 && workItems.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                
                // 为当前点击的按钮添加active类
                this.classList.add('active');
                
                // 获取筛选类别
                const filterValue = this.getAttribute('data-filter');
                
                // 筛选作品项目
                workItems.forEach(function(item) {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // 作品项目动画效果
    const animateWorkItems = function() {
        workItems.forEach(function(item, index) {
            setTimeout(function() {
                item.classList.add('show');
            }, 100 * index);
        });
    };
    
    // 页面加载时执行动画
    animateWorkItems();
});