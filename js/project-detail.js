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
                'https://i.postimg.cc/0QVs0YVj/1-1x.png',
                'https://i.postimg.cc/fbjZJnXx/2-1x.png',
                'https://i.postimg.cc/DZvhGjdR/3-1x.png',
                'https://i.postimg.cc/D0mKjSNg/4-1x.png',
                'https://i.postimg.cc/L40SqVq0/5-1x.png',
                'https://i.postimg.cc/yx5CwV4z/6-1x.png',
                'https://i.postimg.cc/Gh8CvsG3/7-1x.png',
                'https://i.postimg.cc/ncyt2cG4/8-1x.png',
                'https://i.postimg.cc/XY96zSsT/9-1x.png',
                'https://i.postimg.cc/25mNpcJ3/10-1x.png',
                'https://i.postimg.cc/ZR5kn9JS/11-1x.png',
                'https://i.postimg.cc/Dzgk7Qk6/12-1x.png',
                'https://i.postimg.cc/FRWML9KJ/13-1x.png',
                'https://i.postimg.cc/Kj1d7dKp/14-1x.png',
                'https://i.postimg.cc/jq9Vqd9p/15-1x.png',
                'https://i.postimg.cc/fy118Bmz/16-1x.png'
            ]
        },

        'phjgpt': {
            title: '普货监管平台',
            year: '2025 - 2025',
            category: '网页设计',
            description: [
                '监管工作台和企业工作台的设计，为监管部门和企业提供了全面的运输监管和管理工具。实时的车辆监控、待处理报警概况、企业车辆信息、驾驶员概况等功能，帮助监管人员迅速响应和处理问题。企业工作台则通过报警统计、车辆位置监控、报警高峰时间统计等功能，帮助企业管理层深入了解运输状况，优化资源调配。'
               
            ],
            features: [
                '合同模板库：提供多种行业标准合同模板，支持自定义修改',
                '智能审批流程：根据合同类型和金额自动分配审批路径',
                '到期提醒：自动提醒合同即将到期，避免错过重要节点',
                '数据分析：提供合同统计和分析功能，辅助决策制定'
            ],
            images: [
                'https://i.postimg.cc/RZjcCR4Q/1-2x.png',
                'https://i.postimg.cc/B63HHn8j/2-2x.png',
                'https://i.postimg.cc/YC46wVKC/3-2x.png',
                'https://i.postimg.cc/W4g0dk4R/4-2x.png',
                'https://i.postimg.cc/9MBTpHTJ/5-2x.png',
                'https://i.postimg.cc/gjkhttHd/6-2x.png',
                'https://i.postimg.cc/d3HybR5C/7-2x.png',
                'https://i.postimg.cc/QN01KsjM/7-2x-2.png',
                'https://i.postimg.cc/xT8HK7d3/8-2x.png',
                'https://i.postimg.cc/zXQhpjbZ/9-2x.png',
                'https://i.postimg.cc/sgZhLh7B/10-2x.png',
                'https://i.postimg.cc/pdbFMLJs/11-2x.png',
                'https://i.postimg.cc/jjHJxY8t/12-2x.png'
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
                'https://i.postimg.cc/pX7mHLJg/10-2x.png',
                'https://i.postimg.cc/DwX8y3Cm/11-2x.png',
                'https://i.postimg.cc/zfY3y2M7/12-2x.png',
                'https://i.postimg.cc/R01hKQxB/13-2x.png',
                'https://i.postimg.cc/8515HJTr/14-2x.png',
                'https://i.postimg.cc/ydvNr1Np/15-2x.png',
                'https://i.postimg.cc/JzDBDkhr/1-2x.png',
                'https://i.postimg.cc/hGVzMRxN/2-2x.png',
                'https://i.postimg.cc/dVbZ8V78/3-2x.png',
                'https://i.postimg.cc/cHZKbkBC/4-2x.png',
                'https://i.postimg.cc/zBjLZwxj/5-2x.png',
                'https://i.postimg.cc/kGg2nVZd/6-2x.png',
                'https://i.postimg.cc/Bb7XtS9P/7-2x.png',
                'https://i.postimg.cc/v8010zg8/8-2x.png',
                'https://i.postimg.cc/Fs1Y8L3y/9-2x.png'
            ]
        },

        'ygbxzzfwpt': {
            title: '阳光保险增值服务平台',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '为客服团队提供了高效的订单管理和任务监控工具。通过实时监控订单情况、详细查询订单信息以及监控救援任务的详细情况，系统大大提高了客服人员的工作效率，确保了救援服务的快速响应。配置救援服务供应商信息的功能，使得客服团队可以更灵活地协调合作伙伴，提供更优质的服务。这一系统的引入将在客服和救援管理领域带来更高水平的数字化和智能化服务。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/zBsx6gG0/1-2x.png',
                'https://i.postimg.cc/mZ9XM8mq/2-2x.png',
                'https://i.postimg.cc/Y9GXd3Mv/3-2x.png',
                'https://i.postimg.cc/4ypWgxKZ/4-2x.png',
                'https://i.postimg.cc/vHL02DFt/5-2x.png',
                'https://i.postimg.cc/2Sk2smCR/6-2x.png',
                'https://i.postimg.cc/R0qG0R3g/7-2x.png',
                'https://i.postimg.cc/4xWBZM3K/8-2x.png',
                'https://i.postimg.cc/L5k3WQ78/9-2x.png',
                'https://i.postimg.cc/yxCTvCLG/10-2x.png',
                'https://i.postimg.cc/Pf1yNNxn/11-2x.png',
                'https://i.postimg.cc/4N51bMV8/12-2x.png',
                'https://i.postimg.cc/BnnBhgCJ/13-2x.png',
                'https://i.postimg.cc/jS3QB78P/14-2x.png',
                'https://i.postimg.cc/Bv8c3nyy/15-2x.png'
            ]
        },

        'ygbjfgsrcjxhglxt': {
            title: '阳光北京分公司人车精细化管理系统',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '阳光北京分公司人车精细化管理系统通过全面集成的车辆与设备管理、实时监控和数据分析功能，提升了车辆调度、运营效率和管理透明度。系统的异常预警和远程指挥功能为公司提供了更高的安全保障，同时证据中心和统计分析的结合能够为决策提供数据支持，有效降低运营成本和风险。该系统的实施将推动公司车辆管理的数字化和智能化，提升整体运营效率和安全性。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/br4tYxt2/1-2x.png',
                'https://i.postimg.cc/cH932y1h/2-2x.png',
                'https://i.postimg.cc/MHnB8PvS/3-2x.png',
                'https://i.postimg.cc/hjPx2Pnh/4-2x.png',
                'https://i.postimg.cc/g2FZfKpC/5-2x.png',
                'https://i.postimg.cc/NMM91J8H/6-2x.png',
                'https://i.postimg.cc/htLdg7Pf/7-2x.png',
                'https://i.postimg.cc/PqKvvsDH/8-2x.png',
                'https://i.postimg.cc/k4pVwQwh/9-2x.png',
                'https://i.postimg.cc/qBWwvy0L/10-2x.png',
                'https://i.postimg.cc/gr9xbGCV/11-2x.png',
                'https://i.postimg.cc/8cf7Y70k/12-2x.png',
                'https://i.postimg.cc/qBNQrjfq/13-2x.png',
                'https://i.postimg.cc/TYm9L13X/14-2x.png',
                'https://i.postimg.cc/Njcx1tK2/15-2x.png',
                'https://i.postimg.cc/SKQ7vG7y/16-2x.png',
                'https://i.postimg.cc/Jz55xFX6/17-2x.png',
                'https://i.postimg.cc/438bkhBp/18-2x.png'
            ]
        },

        
        'ykglptcjyypt': {
            title: '云通管理平台场景应用平台',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '为车辆出行提供了一套完善的解决方案，使其能够更精准、高效地管理未来车辆出行。通过实时监控、统计分析和综合管理各类型车辆，平台有助于保障道路安全、提高交通运输效率，实现更加智慧和可持续的城市交通管理。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/vmpjFjPr/1-2x.png',
                'https://i.postimg.cc/X78TGsJW/2-2x.png',
                'https://i.postimg.cc/sDykgk3K/3-2x.png',
                'https://i.postimg.cc/sggbp5Qh/4-2x.png',
                'https://i.postimg.cc/pTzS2Z7g/5-2x.png',
                'https://i.postimg.cc/sxJ0W23m/6-2x.png',
                'https://i.postimg.cc/kMNHzTWS/7-2x.png',
                'https://i.postimg.cc/jds1byhF/8-2x.png',
                'https://i.postimg.cc/L6Nb6hC6/9-2x.png',
                'https://i.postimg.cc/3xNby7Vj/10-2x.png',
                'https://i.postimg.cc/8zYXM9g2/11-2x.png',
                'https://i.postimg.cc/mrFXwjbt/12-2x.png'
            ]
        },

        'ythlpyyjgksh': {
            title: '一体化理赔运营监控可视化',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '为用户提供了对案件、车辆、人员、承修方等多方面信息的一站式监控和查询。通过可视化的方式展示各项指标，帮助用户迅速洞察数据，及时做出决策。该系统的引入将大幅提高信息展示的效率和效果，助力用户更好地理解和管理相关数据，促使决策更加智能化。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/brzfWWJ6/1-2x.png',
                'https://i.postimg.cc/9MHhtrjH/2-2x.png',
                'https://i.postimg.cc/W3mP9T2F/3-2x.png',
                'https://i.postimg.cc/5tCJC8Tm/4-2x.png',
                'https://i.postimg.cc/hPtq0kNv/5-2x.png',
                'https://i.postimg.cc/CLrprvVN/6-2x.png',
                'https://i.postimg.cc/4xrksmyH/7-2x.png',
                'https://i.postimg.cc/2SqRs4kf/8-2x.png',
                'https://i.postimg.cc/QM1LthK4/9-2x.png',
                'https://i.postimg.cc/4dQr6P5p/10-2x.png',
                'https://i.postimg.cc/rmkBR3S8/11-2x.png',
                'https://i.postimg.cc/J07SPX6v/12-2x.png',
                'https://i.postimg.cc/3NLV6wzR/13-2x.png',
                'https://i.postimg.cc/bNJKnQ22/14-2x.png',
                'https://i.postimg.cc/nh9gRp2F/15-2x.png',
                'https://i.postimg.cc/Gh56xHkg/16-2x.png'
            ]
        },

        'qcfwzxszyyclglpt': {
            title: '汽车服务中心数字运营管理平台',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '通过集成化的车辆管理、人员管理、成本分析、服务监控等功能，帮助政企单位实现更加高效和透明的管理。平台不仅优化了资源调配，降低了管理成本，还通过数据分析为决策提供了精准支持。车辆与人员的全生命周期管理确保了资产的最优使用和人员的职业发展，有助于提升整体运营效率与服务质量。该平台将推动政企单位在车辆与人员管理方面的数字化转型，提升管理决策的科学性与精确性。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/251BP9J7/1-3x.png',
                'https://i.postimg.cc/7Zs2trBL/2-3x.png',
                'https://i.postimg.cc/5NJL63Yf/3-3x.png',
                'https://i.postimg.cc/ZYp6bgqf/4-3x.png'
            ]
        },

        'webxlt': {
            title: '晓邻通管理后台',
            year: '2023 - 至今',
            category: '网页设计',
            description: [
                '为社区项目管理员提供了一体化、便捷的管理工具，使其能够高效处理社区内的各类管理任务。通过信息发布、诉求管理、申请管理等功能，项目管理员能够更好地与居民互动、解决问题，提高社区内的管理水平和服务质量。这一系统的应用将促进社区内部的良好沟通，增进社区管理与居民之间的信任和合作。'
            ],
            features: [
                '实时救援地图：展示救援车辆位置和状态，支持智能调度',
                '救援工单管理：全流程跟踪救援进度，支持多角色协作',
                '客户信息管理：整合保险和车辆信息，提供精准服务',
                '数据分析报表：提供救援数据统计和分析，优化运营决策'
            ],
            images: [
                'https://i.postimg.cc/GmQZZqYt/1-2x.png',
                'https://i.postimg.cc/5tKDtysM/2-2x.png',
                'https://i.postimg.cc/Zq51ZpFc/3-2x.png',
                'https://i.postimg.cc/d17pZFfZ/4-2x.png',
                'https://i.postimg.cc/90Zk1pCW/5-2x.png',
                'https://i.postimg.cc/66vF99RD/6-2x.png',
                'https://i.postimg.cc/TYvF1ZJh/7-2x.png',
                'https://i.postimg.cc/5N5GCnsg/8-2x.png',
                'https://i.postimg.cc/2S2KH3RB/9-2x.png',
                'https://i.postimg.cc/XvqDt341/10-2x.png',
                'https://i.postimg.cc/k5HhmZ5J/11-2x.png',
                'https://i.postimg.cc/MTj3KDcy/12-2x.png',
                'https://i.postimg.cc/gjVM32Hj/13-2x.png',
                'https://i.postimg.cc/HWXvq61m/14-2x.png',
                'https://i.postimg.cc/X7W149nC/15-2x.png',
                'https://i.postimg.cc/SNGTsjKt/16-2x.png'
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
                'https://i.postimg.cc/Wp0V3bVB/1-2x.png',
                'https://i.postimg.cc/762kSq2T/2-2x.png',
                'https://i.postimg.cc/C5Cp6JJh/3-2x.png',
                'https://i.postimg.cc/mkWGwKYp/4-2x.png',
                'https://i.postimg.cc/VL18bQLd/5-2x.png',
                'https://i.postimg.cc/QxbrQ4HS/6-2x.png',
                'https://i.postimg.cc/HLJDCT3P/7-2x.png',
                'https://i.postimg.cc/dVVc42CF/8-2x.png',
                'https://i.postimg.cc/DwpkDSQX/9-2x.png',
                'https://i.postimg.cc/CKWyh9QM/10-2x.png',
                'https://i.postimg.cc/cHYprTpR/11-2x.png',
                'https://i.postimg.cc/zvr9WKN9/12-2x.png',
                'https://i.postimg.cc/D0PRc0ym/13-2x.png',
                'https://i.postimg.cc/BZ5W3Ycs/14-2x.png',
                'https://i.postimg.cc/bNq7wx3n/15-2x.png',
                'https://i.postimg.cc/7YXpG5WW/16-2x.png'
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
                'https://i.postimg.cc/y8cphWQK/1-2x.png',
                'https://i.postimg.cc/tgbSBywx/2-2x.png',
                'https://i.postimg.cc/HxsSCzpW/3-2x.png',
                'https://i.postimg.cc/QMq6PwZn/4-2x.png',
                'https://i.postimg.cc/mkP8Prz0/5-2x.png',
                'https://i.postimg.cc/Kzq0cTzP/6-2x.png',
                'https://i.postimg.cc/6qFznNCT/7-2x.png',
                'https://i.postimg.cc/9MZyKq9X/8-2x.png',
                'https://i.postimg.cc/J4BpmGWX/9-2x.png',
                'https://i.postimg.cc/bwxLDWrN/10-2x.png',
                'https://i.postimg.cc/Bn9Mv4qV/11-2x.png',
                'https://i.postimg.cc/nLn2v29K/12-2x.png',
                'https://i.postimg.cc/zfpjphTs/13-2x.png',
                'https://i.postimg.cc/C1142KNz/14-2x.png',
                'https://i.postimg.cc/Tw4cvX7Q/15-2x.png',
                'https://i.postimg.cc/1XVr9YbS/16-2x.png',
                'https://i.postimg.cc/3rjgZm7n/17-2x.png'
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