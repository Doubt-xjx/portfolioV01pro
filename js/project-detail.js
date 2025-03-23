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
                <img src="${image}" alt="项目图片${index + 1}" loading="lazy" class="gallery-image">
            </div>
        `;
    });
    
    container.innerHTML = galleryHTML;
    
    // 添加图片点击事件
    setupImageModal();
}

// 设置图片模态框功能
function setupImageModal() {
    // 获取模态框元素
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-modal');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    // 为每个图片添加点击事件
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer'; // 添加指针样式提示可点击
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // 关闭模态框函数
    function closeModal() {
        modal.classList.remove('show');
        // 恢复背景滚动
        document.body.style.overflow = '';
    }
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
            year: '2023 - 2023',
            category: '网页设计',
            description: [
                '监管工作台和企业工作台的设计，为监管部门和企业提供了全面的运输监管和管理工具。实时的车辆监控、待处理报警概况、企业车辆信息、驾驶员概况等功能，帮助监管人员迅速响应和处理问题。企业工作台则通过报警统计、车辆位置监控、报警高峰时间统计等功能，帮助企业管理层深入了解运输状况，优化资源调配。'
               
            ],
            features: [
                '合车辆运营状态分布：分析车辆运营状态的分布情况，包括行驶中、停车、维修等状态',
                '报警类型分布：统计不同报警类型的分布情况，帮助运营管理人员了解报警主要集中在哪些方面',
                '到车载设备安装与故障情况：查看平台上车载设备的安装情况，及时发现未安装设备的车辆，统计车载设备故障情况，以提前预防或解决潜在问题',
                '车辆运营状态与报警类型的关系：分析车辆运营状态与报警类型之间的关系，帮助运营管理人员了解不同状态下的报警情况，采取相应的措施'
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
                '通过实时监控运营、财务、客户和客服情况，平台有助于提高服务效率，降低成本，并为保险公司提供更准确的财务数据。灵活的计费方案设计使得平台适应不同业务模式，为双方提供更加透明、高效的合作。这一系统的应用将促进道路救援行业与保险行业的协同发展，提升整个行业服务水平。'
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
            year: '2023 - 2023',
            category: '网页设计',
            description: [
                '为客服团队提供了高效的订单管理和任务监控工具。通过实时监控订单情况、详细查询订单信息以及监控救援任务的详细情况，系统大大提高了客服人员的工作效率，确保了救援服务的快速响应。配置救援服务供应商信息的功能，使得客服团队可以更灵活地协调合作伙伴，提供更优质的服务。这一系统的引入将在客服和救援管理领域带来更高水平的数字化和智能化服务。'
            ],
            features: [
                '实时订单监控：客服人员通过系统可以实时监控救援订单的状态、位置和进度，确保快速响应和高效服务。订单实时更新，提供全面的信息展示',
                '订单详细查询：提供详细的订单查询功能，客服人员可以查看订单中包含的车辆保险信息、任务要求、特殊需求等详细信息，确保了解每个订单的背景和特征',
                '车辆救援任务监控：系统支持客服人员监控车辆救援任务的详细信息，包括任务进度、当前位置、救援人员信息等。这有助于客服及时提供信息支持和服务协调',
                '配置救援服务供应商信息：系统提供了配置救援服务供应商信息的功能，客服人员可以添加和管理救援服务供应商的详细信息，包括供应商名称、联系方式、服务范围等。这有助于客服团队更好地协调和提供救援服务'
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
            year: '2024 - 2025',
            category: '网页设计',
            description: [
                '阳光北京分公司人车精细化管理系统通过全面集成的车辆与设备管理、实时监控和数据分析功能，提升了车辆调度、运营效率和管理透明度。系统的异常预警和远程指挥功能为公司提供了更高的安全保障，同时证据中心和统计分析的结合能够为决策提供数据支持，有效降低运营成本和风险。该系统的实施将推动公司车辆管理的数字化和智能化，提升整体运营效率和安全性。'
            ],
            features: [
                '车辆管理：管理公司所有车辆的基本信息、状态、使用情况等，包括车辆的调度、维修、保养等',
                '监控管理：提供对公司车辆的实时监控，包括车辆位置、行驶轨迹、速度等，支持视频监控，管理员可以随时查看车辆的实时影像，确保车辆和司机的安全',
                '区域管理：根据业务需求对不同区域的车辆进行分类管理，支持区域内车辆的状态监控和数据分析，提升区域内的运营效率与安全管理',
                '设备管理：管理公司所有设备的基本信息、状态、使用情况等，包括设备的安装、维修、保养等',
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
            year: '2023 - 2023',
            category: '网页设计',
            description: [
                '为车辆出行提供了一套完善的解决方案，使其能够更精准、高效地管理未来车辆出行。通过实时监控、统计分析和综合管理各类型车辆，平台有助于保障道路安全、提高交通运输效率，实现更加智慧和可持续的城市交通管理。'
            ],
            features: [
                '设备管理：实时统计并展示车辆上安装设备的数量，提供设备在线情况监控，确保系统稳定运行',
                '车辆数量统计：统计不同类型车辆的数量，包括公车、私家车和商务车等，提供分区域、分类型的车辆数量数据，帮助了解交通状况',
                'EDR（事件数据记录器）次数统计：统计车辆上的EDR记录次数，用于分析交通事故发生频率，提供趋势分析，为交通安全决策提供数据支持',
                '车辆行驶轨迹统计：统计车辆的行驶轨迹，提供车辆位置信息，帮助分析车辆行驶路线，为交通管理提供数据支持'
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
            year: '2023 - 2023',
            category: '网页设计',
            description: [
                '为用户提供了对案件、车辆、人员、承修方等多方面信息的一站式监控和查询。通过可视化的方式展示各项指标，帮助用户迅速洞察数据，及时做出决策。该系统的引入将大幅提高信息展示的效率和效果，助力用户更好地理解和管理相关数据，促使决策更加智能化。'
            ],
            features: [
                '承修方信息展示：承修方总览：以图表形式展示承修方的概览信息，包括承修方数量、服务类型等，承修方详细信息：提供承修方的详细信息，包括公司名称、服务范围、联系方式等',
                '风险概览：风险数据可视化：展示风险指标、趋势、分布等，以便及时了解潜在风险，风险明细查看：提供查看风险细节的功能，便于深入了解和分析',
                '理赔查勘详情查看：理赔查勘概况：以图表方式展示理赔查勘的数量、状态、处理时长等关键信息，详情查看：提供理赔查勘任务的详细信息，包括任务编号、查勘地点、查勘员信息等'
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
            year: '2024 - 2025',
            category: '网页设计',
            description: [
                '通过集成化的车辆管理、人员管理、成本分析、服务监控等功能，帮助政企单位实现更加高效和透明的管理。平台不仅优化了资源调配，降低了管理成本，还通过数据分析为决策提供了精准支持。车辆与人员的全生命周期管理确保了资产的最优使用和人员的职业发展，有助于提升整体运营效率与服务质量。该平台将推动政企单位在车辆与人员管理方面的数字化转型，提升管理决策的科学性与精确性。'
            ],
            features: [
                '数据分析与决策支持：平台提供强大的数据分析工具，帮助管理者实时跟踪车辆使用和人员发展的各项数据，进行趋势分析、异常预警等',
                '报告生成与审批流程：支持各类定制化报告生成，包括车辆使用报告、人员绩效报告、成本报告等',
                '车辆与人员构成分析：车辆与人员构成分析',
                '车辆与人员的全生命周期管理：车辆与人员的全生命周期管理'
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
            year: '2023 - 2023',
            category: '网页设计',
            description: [
                '为社区项目管理员提供了一体化、便捷的管理工具，使其能够高效处理社区内的各类管理任务。通过信息发布、诉求管理、申请管理等功能，项目管理员能够更好地与居民互动、解决问题，提高社区内的管理水平和服务质量。这一系统的应用将促进社区内部的良好沟通，增进社区管理与居民之间的信任和合作。'
            ],
            features: [
                '社区公告：实现社区公告的编辑、发布和撤回功能，方便管理员及时传达重要信息，实现社区公告的编辑、发布和撤回功能，方便管理员及时传达重要信息',
                '活动管理：管理社区内的各类活动，包括文化演出、康体活动、社区会议等，提供活动发布、报名管理、活动审核等功能，方便社区活动的组织和推广',
                '商户管理：管理社区内的商户信息，包括入驻申请、商户资料、服务评价等，管理社区内的商户信息，包括入驻申请、商户资料、服务评价等',
                '社区管理：管理社区的基本信息，包括社区名称、地址、联系方式等，提供社区管理的基本功能，方便社区管理员进行管理'
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

        'ddcf': {
            title: '迪迪车服',
            year: '2024 - 2024',
            category: 'APP设计',
            description: [
                '该平台通过整合车辆安全检测、保养服务、动力电池检测和人车生活服务，全面提升了车主的用车体验，同时增强了保险公司在售后服务和客户维护方面的竞争力。通过代为送检、定期保养和多元化的服务项目，平台有效降低了车主的用车风险，提高了车辆的安全性和可靠性。此项目为保险公司提供了一个全面的车主权益管理系统，提升了客户满意度，增强了客户的忠诚度，推动了保险行业向更加智能化和个性化的服务转型。'
            ],
            features: [
                '车辆安全检测：车主可以通过平台使用其车主权益进行车辆安全检测，涵盖刹车系统、发动机、轮胎、灯光等重要安全部件',
                '定期保养服务：平台支持车辆定期保养预约，车主可以根据保养周期设定提醒，定期检查和保养车辆的各项系统',
                '人车服务与生活服务：除了车辆相关的检测和保养，平台还整合了多种人车服务与生活服务，如道路救援、代驾服务、汽车清洁、洗车、加油、停车服务等',
                '车主权益管理：车主可以通过平台管理其车主权益，包括车辆保险、保养、维修、保险理赔等相关信息，提高车主权益的管理和维护'
            ],
            images: [
                'https://i.postimg.cc/tgzRYqFR/1-2x.png',
                'https://i.postimg.cc/P5Y5nzxw/2-2x.png',
                'https://i.postimg.cc/268kWsxQ/3-2x.png',
                'https://i.postimg.cc/rpTFV00Y/4-2x.png',
                'https://i.postimg.cc/xjZfkFNm/5-2x.png',
                'https://i.postimg.cc/HxZp96Sf/6-2x.png',
                'https://i.postimg.cc/vT4Gq5kD/7-2x.png',
                'https://i.postimg.cc/nrNp6Cf2/8-2x.png',
                'https://i.postimg.cc/bwcqgDTN/9-2x.png',
                'https://i.postimg.cc/qMCk2X25/10-2x.png',
                'https://i.postimg.cc/W1GTHNWm/11-2x.png',
                'https://i.postimg.cc/jjRtVpmp/12-2x.png',
                'https://i.postimg.cc/rpgcqhLK/13-2x.png',
                'https://i.postimg.cc/d11F38qn/14-2x.png',
                'https://i.postimg.cc/76Wk2fh4/15-2x.png',
                'https://i.postimg.cc/2yLfFrLZ/16-2x.png',
                'https://i.postimg.cc/DmV3xH1Y/17-2x.png',
                'https://i.postimg.cc/fW134bK1/19-2x.png',
                'https://i.postimg.cc/qBNtZK88/18-2x.png'
            ]
        },

        'ddsgjy': {
            title: '迪迪事故救援',
            year: '2023 - 2023',
            category: 'APP设计',
            description: [
                '平台通过抢单大厅、实时监控和评价系统，为救援车司机和普通用户提供了高效便捷的转运服务。用户可以通过平台找到合适的救援车司机，而救援车司机则可以更灵活地接单，提高运输效率。促进行业的数字化和智能化发展，为用户和救援车司机创造更多价值。'
            ],
            features: [
                '抢单大厅：救援车司机可以在平台的抢单大厅中实时查看并接受用户发布的转运业务。这种实时匹配机制提高了救援车司机的订单接收效率，同时确保普通用户的转运需求能够迅速得到响应',
                '用户发布转运业务：普通用户可以通过平台发布转运业务需求，包括货物类型、起点和终点等信息。用户还可以设置板车要求，确保匹配到合适的救援车辆和司机，提高运输的专业性和安全性',
                '运输记录和数据分析：平台记录每一次运输的详细信息，包括运输轨迹、运输时间、车辆状态等。通过数据分析，平台提供关键的运输统计和报告，为用户和救援车司机提供有益的决策支持',
                '评价系统：用户和救援车司机可以通过平台的评价系统进行评价和反馈，平台会根据用户的评价和反馈进行相应的调整和改进，确保平台的服务质量和用户满意度'
            ],
            images: [
                'https://i.postimg.cc/k4rZ3K2B/1-2x.png',
                'https://i.postimg.cc/DwMH6tFQ/2-2x.png',
                'https://i.postimg.cc/25LJK28s/3-2x.png',
                'https://i.postimg.cc/pLT3D2NX/4-2x.png',
                'https://i.postimg.cc/MHqFXwbw/5-2x.png',
                'https://i.postimg.cc/KznWZjTQ/5-2x-2.png',
                'https://i.postimg.cc/x85FzZtz/6-2x.png',
                'https://i.postimg.cc/1Rrd2gs3/7-2x.png',
                'https://i.postimg.cc/656PX9pL/8-2x.png'
            ]
        },

        
        'hycyzj': {
            title: '货运车友之家',
            year: '2023 - 2023',
            category: 'APP设计',
            description: [
                '通过提供全方位的服务，不仅方便了货运公司司机的日常运营，也提升了整个货运行业的效率。通过优化货源匹配和提供紧急救援、加油、维修等服务，平台将为货运公司司机提供更加安全、便捷和高效的运输体验。这不仅有助于提高货运公司的运营水平，还为司机提供了更多的支持和便利。'
            ],
            features: [
                '货源发布与寻找：该平台允许货运公司司机方便地发布空载或满载的货源信息，并提供智能匹配算法，使司机可以快速找到适合自己路线和运力的货源，实现更高效的运输计划',
                '找车和找司机：司机可以在平台上发布找车或找司机的需求，实现即时匹配。这有助于解决货运公司在调度方面的难题，提高运输效率，减少空载行驶',
                '附近救援服务：平台整合了紧急救援服务，司机可以在突发状况下请求附近的救援服务，如故障修复、拖车服务等。这保障了货运过程中的安全性，减少因故障导致的运输中断'
                
            ],
            images: [
                'https://i.postimg.cc/nhF92PTL/1-2x.png',
                'https://i.postimg.cc/3xt4cFbF/2-2x.png',
                'https://i.postimg.cc/7Yy2G620/3-2x.png',
                'https://i.postimg.cc/02dJpsY3/4-2x.png',
                'https://i.postimg.cc/XvXGSBRS/5-2x.png',
                'https://i.postimg.cc/CKtZFL0Z/6-2x.png',
                'https://i.postimg.cc/tTxs7QRB/7-2x.png',
                'https://i.postimg.cc/SRLj76M8/8-2x.png',
                'https://i.postimg.cc/hPgX45k0/9-2x.png',
                'https://i.postimg.cc/Yq3hvxkB/10-2x.png',
                'https://i.postimg.cc/sgg17ZDQ/11-2x.png',
                'https://i.postimg.cc/qvDqLMzm/12-2x.png',
                'https://i.postimg.cc/9f4MN59c/13-2x.png',
                'https://i.postimg.cc/CKWK3PCk/14-2x.png'
            ]
        },

        'ybjy': {
            title: '亿保救援',
            year: '2023 - 2024',
            category: 'APP设计',
            description: [
                '通过智能的订单分配和实时监控功能，为技师和调度管理员提供了更加高效、便捷的工作体验。系统的使用将提高救援服务的整体质量，缩短救援响应时间，增强公司的竞争力。这一系统的引入将有助于提升整个道路救援行业的数字化水平，推动业务向智能、高效的方向发展。'
            ],
            features: [
                '车辆转运和救援服务：该系统致力于为道路救援公司的技师和调度管理员提供全面的车辆转运和救援服务。技师可以使用系统接受订单、提供车辆转运或救援服务，确保及时、高效的道路救援',
                '调度订单分配：调度管理员可以通过系统实时监控接入的订单，根据技师的位置、技能和可用性等因素，智能分配订单。这有助于优化调度流程，提高道路救援服务的响应速度和质量',
                '服务记录和反馈：系统记录每一次救援任务的详细信息，包括车辆状态、救援过程等。技师和调度管理员可以提供实时的任务反馈，有助于优化服务质量和客户满意度',
                '数据统计和分析：系统提供了丰富的数据统计和分析功能，包括订单数量、服务时长、车辆位置等。这有助于调度管理员和公司管理者了解道路救援服务的整体情况，为决策提供支持'
            ],
            images: [
                'https://i.postimg.cc/5NNFqrs2/1-2x.png',
                'https://i.postimg.cc/90cwkgV1/2-2x.png',
                'https://i.postimg.cc/qBG3KrXF/3-2x.png',
                'https://i.postimg.cc/J0KHC3z8/4-2x.png',
                'https://i.postimg.cc/zXtHdkQS/5-2x.png',
                'https://i.postimg.cc/jSBwTStD/6-2x.png',
                'https://i.postimg.cc/cLvgPnyq/7-2x.png',
                'https://i.postimg.cc/R0f3ZxZX/8-2x.png',
                'https://i.postimg.cc/LXpJqQqR/9-2x.png',
                'https://i.postimg.cc/1trfD06F/10-2x.png',
                'https://i.postimg.cc/5yPyRxsN/11-2x.png',
                'https://i.postimg.cc/sxf1mB9N/12-2x.png',
                'https://i.postimg.cc/wTv7smBt/13-2x.png',
                'https://i.postimg.cc/FsB1bHfT/14-2x.png',
                'https://i.postimg.cc/BnPbmfH4/15-2x.png',
                'https://i.postimg.cc/N0hMVCkT/16-2x.png',
                'https://i.postimg.cc/KYnzy70W/17-2x.png',
                'https://i.postimg.cc/LXD8J9KB/18-2x.png',
                'https://i.postimg.cc/26r5jqJS/19-2x.png'
            ]
        },

        'ybqyyc': {
            title: '亿保企业用车',
            year: '2022 - 2022',
            category: 'APP设计',
            description: [
                '这是一款为提升企业内部用车管理效率、降低成本、提高信息透明度而设计的系统。通过数字化、自动化的流程，提供了一种更加高效、安全、可控的用车管理解决方案。'
            ],
            features: [
                '用车申请和审批流程：企业员工可以通过系统提交用车申请，包括出发时间、目的地、预计返回时间等信息。审批流程经由相关管理人员进行，确保用车需求合规、有序',
                '实时申请状态和历史记录：员工可以实时查看用车申请的审批状态，并浏览历史用车记录。这有助于员工对自己的用车历史有清晰的了解，提高申请的透明度',
                '提醒和通知服务：系统通过提醒和通知功能，向员工和管理员发送用车审批状态、提醒还车等信息。这有助于确保用车流程的及时沟通，减少沟通误差',
                '车辆管理和库存管理：系统提供了车辆管理和库存管理功能，包括车辆信息录入、车辆状态监控、车辆维护和维修等。这有助于企业对车辆的管理和维护，确保车辆的质量和安全性'
            ],
            "images": [
                'https://i.postimg.cc/pVYnbvmZ/1-2x.png',
                'https://i.postimg.cc/GtQBkFWN/2-2x.png',
                'https://i.postimg.cc/9Mywf5Jc/3-2x.png',
                'https://i.postimg.cc/qq0hhb5y/4-2x.png',
                'https://i.postimg.cc/jdxnR1Nr/5-2x.png',
                'https://i.postimg.cc/yYLgxTX3/6-2x.png',
                'https://i.postimg.cc/4xnK9hBL/7-2x.png',
                'https://i.postimg.cc/K8V1rvWZ/8-2x.png',
                'https://i.postimg.cc/QtgV3gdt/9-2x.png',
                'https://i.postimg.cc/j5YCm3Km/10-2x.png',
                'https://i.postimg.cc/VNCd7PyX/11-2x.png',
                'https://i.postimg.cc/fywyT3Vv/12-2x.png'
            ]
        },

        'ybxptgc': {
            title: '亿保新平台管车小程序',
            year: '2023 - 2024',
            category: 'APP设计',
            description: [
                '该移动端是为企业用车管理员和司机提供的综合管理平台，集成了实时监控、轨迹查询、历史报警、监控回放、通知下发和统计分析等功能，旨在提升企业用车管理的效率和安全性。'
            ],
            features: [
                '轨迹查询：支持对车辆行驶轨迹的查询，管理员可以查看指定时间段内的车辆行驶路线，便于追踪运输过程中的异常情况',
                '历史报警：提供车辆历史报警记录查询，包括超速、急刹车、异常停车等报警信息。管理员可以了解每个报警的具体情况，采取必要的纠正措施',
                '监控回放：支持车辆行驶过程中的视频监控回放，查看关键时刻的驾驶情况。管理员和司机可以回顾监控视频，及时识别和解决可能的问题',
                '通知下发：支持向车辆发送通知，包括紧急通知、提醒等。管理员可以通过系统向车辆发送通知，确保车辆的安全和驾驶状态'
            ],
            "images": [
                "https://i.postimg.cc/Bn866fnR/1-2x.png",
                "https://i.postimg.cc/sgt2GHBx/2-2x.png",
                "https://i.postimg.cc/xTp8n1nK/3-2x.png",
                "https://i.postimg.cc/wTjMCm8q/4-2x.png",
                "https://i.postimg.cc/brCyymcz/5-2x.png",
                "https://i.postimg.cc/pTBV72s5/6-2x.png",
                "https://i.postimg.cc/QM1dQg5b/7-2x.png",
                "https://i.postimg.cc/4dGNBKQT/8-2x.png",
                "https://i.postimg.cc/tJCRGLcS/9-2x.png",
                "https://i.postimg.cc/SQDNfxXw/10-2x.png",
                "https://i.postimg.cc/ZKnY7zp0/11-2x.png",
                "https://i.postimg.cc/GhfL6gxK/12-2x.png"
            ]
        },

        'ycgclglxt': {
            title: '亿车管车辆管理系统',
            year: '2022 - 2022',
            category: 'APP设计',
            description: [
                '通过全面的功能模块，为企业提供了高效的公车管理解决方案。从申请审批到车辆调度、监控回访以及使用统计分析，系统为企业提供了全方位、数字化的公车管理工具，提高了公车使用的透明度、效率和成本控制能力。这一系统的应用将有助于提升企业公车管理水平，确保公车的安全、合规使用。'
            ],
            features: [
                '车辆申请和审批：企业人员可以通过系统提交公车使用申请，包括出发时间、行程目的等信息。审批流程由相关负责人进行，确保公车使用符合企业政策和规定',
                '车辆调度和实时查询：系统支持企业人员进行车辆调度，确保公车的合理利用。同时，用户可以实时查询公车的当前位置和行驶轨迹，提高车辆使用的透明度和实时性',
                '车辆监控和回访：通过集成车辆监控设备，系统可以实现对公车的远程监控。这包括实时车况、行驶速度等信息。监控回访功能允许管理人员回顾历史车辆使用情况，确保车辆使用符合规定',
                '公车使用统计和分析：系统提供了公车使用统计和分析功能，包括公车使用时长、行驶里程等统计数据。这有助于企业了解公车使用情况，为决策提供支持'
            ],
            "images": [
                "https://i.postimg.cc/FRFXY0x1/1-2x.png",
                "https://i.postimg.cc/9QThKmMX/2-2x.png",
                "https://i.postimg.cc/LsppMcYt/3-2x.png",
                "https://i.postimg.cc/BvBGZmHd/4-2x.png",
                "https://i.postimg.cc/kGBrc9zm/5-2x.png",
                "https://i.postimg.cc/xCsDMqs5/6-2x.png",
                "https://i.postimg.cc/9XnHfRwF/7-2x.png",
                "https://i.postimg.cc/zvMs26YR/8-2x.png",
                "https://i.postimg.cc/hPQWQDV8/9-2x.png",
                "https://i.postimg.cc/g299vCKC/10-2x.png",
                "https://i.postimg.cc/fbZ6PYp5/11-2x.png",
                "https://i.postimg.cc/YCQ58dnh/12-2x.png",
                "https://i.postimg.cc/yNPwCkzK/13-2x.png"
            ]
        },

        'ykdywglpt': {
            title: '亿科达运维管理平台',
            year: '2023 - 2023',
            category: 'APP设计',
            description: [
                '为技师提供了全面的任务管理和工单查看功能，优化了团队协作和工作流程。通过人员管理、设备管理、统计分析和设备巡检等功能，系统能够提高车载设备的管理效率，确保设备的正常运行。这一系统的应用将为车载设备安装团队提供更高效、可靠的工作平台，提升服务质量和团队绩效。'
            ],
            features: [
                '设备管理：车载设备档案：记录车载设备的基本信息，包括型号、生产日期等，设备安装记录：记录设备的安装历史，方便后续维护和查阅',
                '统计分析：工单完成统计：系统提供工单完成情况的统计分析，方便管理人员了解团队绩效，设备巡检统计：记录设备巡检情况，分析设备维护状况',
                '设备巡检：定期设备巡检：系统支持对车载设备进行定期巡检，确保设备正常运行，异常处理流程：若发现设备异常，技师可发起维修任务并记录巡检结果',
                '任务管理：任务分配：系统支持对任务进行分配，确保每个技师都能接收到相应的任务，任务进度跟踪：技师可以实时查看任务进度，及时处理任务中的问题'
            ],
            "images": [
                "https://i.postimg.cc/fRQF3xzZ/1-2x.png",
                "https://i.postimg.cc/Mp0L1vHB/2-2x.png",
                "https://i.postimg.cc/02wF2tqc/3-2x.png",
                "https://i.postimg.cc/VsT28x2J/4-2x.png",
                "https://i.postimg.cc/W42H8TqH/5-2x.png",
                "https://i.postimg.cc/pTr1NCZQ/6-2x.png",
                "https://i.postimg.cc/5tnkkTwN/7-2x.png",
                "https://i.postimg.cc/nzWSnmRy/8-2x.png",
                "https://i.postimg.cc/0jJWjNhb/9-2x.png",
                "https://i.postimg.cc/Z0tfdShj/10-2x.png",
                "https://i.postimg.cc/28nYXj3k/11-2x.png",
                "https://i.postimg.cc/gcCdDLzt/12-2x.png",
                "https://i.postimg.cc/sfQs74rZ/13-2x.png",
                "https://i.postimg.cc/XY3WMMyw/14-2x.png",
                "https://i.postimg.cc/pLZHR0D3/15-2x.png",
                "https://i.postimg.cc/vmZdBWhT/16-2x.png"
            ]
        },

        'zjclaqjc': {
            title: '紫金车辆安全检测',
            year: '2024 - 2024',
            category: 'APP设计',
            description: [
                '紫金保险车辆安全检测服务平台通过车主权益的整合，简化了车主的安全检测流程，提供了高效、便捷的车辆安全保障。通过代送检、专业检测和详细报告，为车主提供全面的车辆安全状况评估，增强了车主的安全意识和保障感。'
            ],
            features: [
                '权益下单：车主可以通过平台使用紫金保险的车主权益进行车辆安全检测服务的下单',
                '车辆代送检：车主通过平台发起服务请求后，系统将自动安排专业人员将车辆送至指定检测点，提供全程代送检服务，确保车辆在合适的时间内完成检测，免去车主的奔波麻烦',
                '车辆安全检测：在指定检测点，车辆将进行全面的安全检测，包括车身外观、发动机、刹车、转向系统、灯光、轮胎等多个方面，提供专业的检测报告，并根据检测结果提供详细的建议，帮助车主了解车辆的安全状况',
                '车主权益管理：车主可以通过平台管理自己的车主权益，包括车辆保险、保养、维修、保险理赔等相关信息，提高车主权益的管理和维护'
            ],
            "images": [
                "https://i.postimg.cc/c40k0dX4/1-2x.png",
                "https://i.postimg.cc/YqRnSTsN/2-2x.png",
                "https://i.postimg.cc/W1f5Ggjh/3-2x.png",
                "https://i.postimg.cc/FHKPkGMM/4-2x.png",
                "https://i.postimg.cc/W4FXXzbS/5-2x.png",
                "https://i.postimg.cc/cJpTjWvW/6-2x.png",
                "https://i.postimg.cc/rm5g2H4r/7-2x.png",
                "https://i.postimg.cc/ZnZHbLPD/8-2x.png",
                "https://i.postimg.cc/D0gg8bBf/9-2x.png",
                "https://i.postimg.cc/xjygsWnr/10-2x.png",
                "https://i.postimg.cc/Hs6zmXrB/11-2x.png",
                "https://i.postimg.cc/vHYhC3Z4/12-2x.png"
            ]
        },

        'fwjly': {
            title: '服务记录仪',
            year: '2024 - 2025',
            category: 'APP设计',
            description: [
                '该服务记录仪为理赔查勘员提供了一个高效、精准的工作工具，全面提升了理赔查勘的透明度和信息处理效率。通过视频采集和远程通话，理赔查勘员可以迅速获取现场情况并与客户实时沟通，有效缩短理赔周期。远程抓拍和文件管理功能为理赔流程提供了精确证据，确保理赔的公正性与准确性。'
            ],
            features: [
                '视频实时采集：设备支持高质量视频实时采集，理赔查勘员可以对事故现场进行全程录制，确保获取完整的现场信息',
                '远程抓拍：设备可以在理赔查勘过程中进行远程抓拍，记录事故现场的细节、损伤部位及其他关键信息',
                '文件管理：提供高效的文件管理功能，理赔查勘员可以将现场采集的文件、照片、视频等信息进行分类管理',
                '远程通话：设备支持远程通话功能，理赔查勘员可以与客户进行实时沟通，及时了解事故情况和处理进度'
            ],
            "images": [
                "https://i.postimg.cc/52LLKzWP/1-2x.png",
                "https://i.postimg.cc/ZRKNqDBg/2-2x.png",
                "https://i.postimg.cc/HLm5qLpT/3-2x.png",
                "https://i.postimg.cc/s2JSsRX7/4-2x.png",
                "https://i.postimg.cc/ZR7dvF6q/5-2x.png",
                "https://i.postimg.cc/5yXFBYmS/6-2x.png",
                "https://i.postimg.cc/rs7RQVnX/7-2x.png",
                "https://i.postimg.cc/kMHSnsn1/8-2x.png",
                "https://i.postimg.cc/4xkhc3Hp/9-2x.png",
                "https://i.postimg.cc/DybXmG02/10-2x.png",
                "https://i.postimg.cc/BnTPBG2k/11-2x.png",
                "https://i.postimg.cc/JhRDTdqn/12-2x.png",
                "https://i.postimg.cc/nLTsNYR1/13-2x.png",
                "https://i.postimg.cc/766C4Gjr/14-2x.png",
                "https://i.postimg.cc/0QBzy5qM/15-2x.png"
            ]
        },

        'ysfbddjy': {
            title: '云闪付版迪迪救援',
            year: '2024 - 2024',
            category: 'APP设计',
            description: [
                '云闪付车主救援服务平台通过提供全方位的紧急救援支持，帮助车主在遇到车辆故障或困境时快速获得专业的救援服务。通过一键发起、实时追踪和高效响应，平台为车主提供了便捷的救援体验，显著提升了车主的出行安全感和信任感。'
            ],
            features: [
                '拖车救援：车主如果遇到车辆故障无法自行修复时，可以选择拖车救援服务，车主通过平台发起拖车请求，系统将调度最近的救援车辆，将车辆拖至指定修理厂或服务点',
                '困境救援：当车主在特殊情况下（如陷入泥泞、雪地、沙滩等）无法脱困时，可选择困境救援服务，救援人员将携带专业脱困设备，前往现场帮助车主解决困境，恢复行车',
                '实际进度追踪：车主可以实时查看救援服务的进度，包括救援人员的位置、到达时间以及救援完成情况'
            ],
            "images": [
                "https://i.postimg.cc/ydwqv2H3/1-2x.png",
                "https://i.postimg.cc/Hn5qK3YZ/2-2x.png",
                "https://i.postimg.cc/gcZbncVV/3-2x.png",
                "https://i.postimg.cc/tCGQP0kL/4-2x.png",
                "https://i.postimg.cc/150xrWY4/5-2x.png",
                "https://i.postimg.cc/2SCsc4PG/6-2x.png",
                "https://i.postimg.cc/sgKttMzr/7-2x.png",
                "https://i.postimg.cc/N0MWYQGr/8-2x.png",
                "https://i.postimg.cc/g0T121rt/9-2x.png",
                "https://i.postimg.cc/wMKPhJXh/10-2x.png",
                "https://i.postimg.cc/26LMbTZk/11-2x.png",
                "https://i.postimg.cc/prDSkTC3/12-2x.png",
                "https://i.postimg.cc/44tjXLGw/13-2x.png",
                "https://i.postimg.cc/NfcSF6ft/14-2x.png",
                "https://i.postimg.cc/RVL8HWNH/15-2x.png",
                "https://i.postimg.cc/K8cWrmMs/16-2x.png",
                "https://i.postimg.cc/L8ybxGk4/17-2x.png"
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
                '救援场景集：常见道路救援情境的场景设计'
            ],
            "images": [
                "https://i.postimg.cc/qvMTtCm7/1-1x.png",
                "https://i.postimg.cc/CL40L4st/2-1x.png",
                "https://i.postimg.cc/L6SRpWLL/3-1x.png",
                "https://i.postimg.cc/Z57h6Kgx/4-1x.png",
                "https://i.postimg.cc/HLr1z11D/5-1x.png",
                "https://i.postimg.cc/7Lj8QtqC/6-1x.png",
                "https://i.postimg.cc/gjW9GwXm/7-1x.png",
                "https://i.postimg.cc/LXfKdksx/8-1x.png",
                "https://i.postimg.cc/LXj7QHy7/9-1x.png",
                "https://i.postimg.cc/yNMtTJTc/10-1x.png",
                "https://i.postimg.cc/5tYDv58f/11-1x.png",
                "https://i.postimg.cc/FFy5Dx8R/12-1x.png"
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
            "images": [
                "https://i.postimg.cc/K8VSjcRk/1-1-1x.png",
                "https://i.postimg.cc/sg1C3GDC/1-2-1x.png",
                "https://i.postimg.cc/m2mGxy4S/1-3-1x.png",
                "https://i.postimg.cc/zXz1PPsB/1-4-1x.png",
                "https://i.postimg.cc/4dkDv8vX/1-5-1x.png",
                "https://i.postimg.cc/PxWBSmKY/1-6-1x.png",
                "https://i.postimg.cc/9f73737x/1-7-1x.png",
                "https://i.postimg.cc/C5w9Xz6t/1-8-1x.png",
                "https://i.postimg.cc/QCSv3h2M/1-9-1x.png",
                "https://i.postimg.cc/SQGB8fnp/1-10-1x.png",
                "https://i.postimg.cc/655Dh4Z4/1-11-1x.png",
                "https://i.postimg.cc/65jFb6Vj/1-12-1x.png",
                "https://i.postimg.cc/52XThcnx/1-13-1x.png",
                "https://i.postimg.cc/SxH3qZvc/1-14-1x.png",
                "https://i.postimg.cc/rpWbpSB3/1-15-1x.png",
                "https://i.postimg.cc/76kRJ5D6/1-16-1x.png"
            ]
        }
    };
    
    // 返回指定项目的数据
    return projectsData[projectId] || null;
}