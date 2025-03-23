document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数中的项目ID
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        // 如果没有找到项目ID，显示错误信息
        showErrorMessage('未找到项目信息，请返回作品集页面');
        return;
    }

    // 获取页面元素
    const projectTitle = document.getElementById('project-title');
    const projectYear = document.getElementById('project-year').querySelector('span');
    const projectCategory = document.getElementById('project-category').querySelector('span');
    const projectDescription = document.getElementById('project-description');
    const projectImages = document.getElementById('project-images');
    
    // 显示加载状态
    projectImages.innerHTML = `
        <div class="masonry-loading">
            <div class="spinner"></div>
            <p>加载项目信息中...</p>
        </div>
    `;
    
    // 加载项目数据（模拟异步加载）
    setTimeout(() => {
        const projectData = getProjectData(projectId);
        
        if (!projectData) {
            showErrorMessage('无法加载项目数据，请稍后再试');
            return;
        }
        
        // 更新页面标题
        document.title = `${projectData.title} - 徐金鑫`;
        
        // 填充项目数据
        projectTitle.textContent = projectData.title;
        projectYear.textContent = projectData.year;
        projectCategory.textContent = projectData.category;
        
        // 填充项目描述
        let descriptionHTML = '';
        projectData.description.forEach(paragraph => {
            descriptionHTML += `<p>${paragraph}</p>`;
        });
        
        if (projectData.features && projectData.features.length > 0) {
            descriptionHTML += '<h3>项目功能</h3><ul>';
            projectData.features.forEach(feature => {
                descriptionHTML += `<li>${feature}</li>`;
            });
            descriptionHTML += '</ul>';
        }
        
        projectDescription.innerHTML = descriptionHTML;
        
        // 渲染图片瀑布流
        renderProjectImages(projectData.images, projectImages);

    }, 500); // 0.5秒延迟，模拟加载
});

// 显示错误信息
function showErrorMessage(message) {
    const projectImages = document.getElementById('project-images');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    
    projectTitle.textContent = '项目加载失败';
    projectDescription.innerHTML = `<p class="error-message">${message}</p>`;
    projectImages.innerHTML = '';
    document.title = '项目加载失败 - 徐金鑫';
}

// 渲染项目图片
function renderProjectImages(images, container) {
    if (!images || images.length === 0) {
        container.innerHTML = '<p class="no-images">暂无项目图片</p>';
        return;
    }
    
    let galleryHTML = '';
    
    images.forEach((image, index) => {
        galleryHTML += `
            <div class="gallery-item">
                <img src="${image}" alt="项目图片${index + 1}" loading="lazy">
            </div>
        `;
    });
    
    container.innerHTML = galleryHTML;
}

// 获取项目数据
function getProjectData(projectId) {
    // 项目数据对象，实际项目中可以从API获取
    const projectsData = {
        // 网页设计项目
        'ykdhtglxt': {
            title: '亿科达合同管理系统',
            year: '2025 - 2025',
            category: '网页设计',
            description: [
                '亿科达合同管理系统是一个为企业提供全面合同生命周期管理的平台。该系统能够帮助企业高效管理合同的创建、审批、执行和归档全过程，提高工作效率和降低合规风险。',
                '系统采用模块化设计，界面简洁直观，用户可以轻松上手。通过强大的搜索和筛选功能，用户可以快速找到所需的合同信息，减少了人工查找的时间成本。'
            ],
            features: [
                '合同模板库：提供多种行业标准合同模板，支持自定义修改',
                '智能审批流程：根据合同类型和金额自动分配审批路径',
                '到期提醒：自动提醒合同即将到期，避免错过重要节点',
                '数据分析：提供合同统计和分析功能，辅助决策制定'
            ],
            images: [
                'https://i.postimg.cc/htmKR7tZ/web-ykdhtglxt.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        },
        'ddjy': {
            title: '迪迪救援PC端',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '迪迪救援PC端是为救援公司和保险公司设计的道路救援管理系统。该平台整合了救援资源和保险服务，提供了一站式的救援调度和管理解决方案。',
                '界面设计采用了直观的操作流程和清晰的信息展示，帮助操作人员快速做出决策，提高救援效率。同时，系统支持多终端协同工作，确保救援信息的实时同步和准确传递。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/Qtv0WTLc/web-ddjy.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        },
        // APP设计项目
        'ddjyjs': {
            title: '迪迪救援技师APP（V4.0）',
            year: '2024 - 2024',
            category: 'APP设计',
            description: [
                '迪迪救援技师APP是专为救援技师打造的移动应用，是技师接单、导航和完成救援工作的重要工具。V4.0版本在用户体验和功能上进行了全面升级，更好地满足救援工作的需求。',
                '新版本采用了更加直观的UI设计，优化了工作流程，减少了操作步骤，让技师能够更专注于救援工作本身。同时，加强了位置服务和导航功能，提高了救援效率。'
            ],
            features: [
                '智能接单：基于位置的救援任务推荐和一键接单',
                '精准导航：救援导航和实时路况提醒',
                '救援辅助：常见车型救援指南和技术支持',
                '工单管理：便捷的救援记录和证据采集工具'
            ],
            images: [
                'https://i.postimg.cc/jjZHyJfL/app-ddjyjs.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        },
        'appxlt': {
            title: '晓邻通',
            year: '2023 - 2024',
            category: 'APP设计',
            description: [
                '晓邻通是一款面向社区居民的生活服务应用，旨在连接居民与社区服务，提供便捷的社区生活体验。应用涵盖社区公告、物业服务、邻里互动等多个功能模块。',
                '在设计上，晓邻通采用了简洁友好的界面风格，确保不同年龄段的用户都能轻松使用。通过优化的信息架构和交互设计，提高了用户找到所需服务的效率。'
            ],
            features: [
                '物业服务：在线报修、缴费、预约等功能',
                '社区活动：活动发布、报名和互动',
                '邻里互助：闲置交换、技能共享平台',
                '社区商圈：本地商家服务和优惠信息'
            ],
            images: [
                'https://i.postimg.cc/9X4kFW3G/app-xlt.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        },
        // 三维设计项目
        'clcj': {
            title: '车辆场景',
            year: '2022 - 至今',
            category: '三维设计',
            description: [
                '车辆场景是一系列为汽车服务和救援应用开发的3D模型库，包含了多种车型、道路场景和救援情境的三维设计。这些模型被用于公司产品中的演示、培训和界面元素。',
                '所有模型都注重细节和准确性，确保能够准确表达各种救援场景和车辆状态。通过优化的多边形结构和材质设计，保证了模型在各种应用场景中的良好表现。'
            ],
            features: [
                '多种车型库：包含常见汽车品牌和型号的精细3D模型',
                '救援场景集：常见道路救援情境的场景设计',
                '交互动画：车辆故障和救援过程的动画演示',
                '轻量化设计：优化的模型结构，适合移动端应用'
            ],
            images: [
                'https://i.postimg.cc/kMK9LC67/3D-clcj.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        },
        // 其他项目
        'ppt': {
            title: 'PPT排版设计',
            year: '2023 - 至今',
            category: '其他设计',
            description: [
                'PPT排版设计是为公司内部汇报、产品演示和客户提案创建的一系列专业演示模板。这些模板遵循统一的设计语言，保持了品牌一致性，同时提供了丰富的页面布局选择。',
                '设计注重清晰的信息层次和视觉平衡，确保内容易读性和专业性。所有模板都针对不同场景进行了优化，包括数据展示、产品介绍和方案汇报等。'
            ],
            features: [
                '多样化布局：适合不同内容类型的布局设计',
                '数据可视化：清晰直观的图表和数据展示方式',
                '品牌一致性：统一的色彩、字体和视觉元素',
                '易于定制：模块化设计，便于根据需求调整'
            ],
            images: [
                'https://i.postimg.cc/fyKQRx9D/other-ppt.png',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg',
                'https://i.postimg.cc/QMnWx4Tc/placeholder-1.jpg'
            ]
        }
    };
    
    // 返回指定项目的数据
    return projectsData[projectId] || null;
}