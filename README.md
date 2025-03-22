# 个人作品集网站

## 项目概述
这是一个现代化的个人作品集展示网站，采用响应式设计，可以完美适配各种设备屏幕。网站设计简洁优雅，以深色主题为基调，突出展示个人作品和专业技能。

## 技术栈
- HTML5
- CSS3 (使用现代CSS特性，如Flexbox、Grid、媒体查询等)
- JavaScript (原生JS)
- Spline 3D场景集成
- 响应式设计
- 移动优先设计理念

## 主要功能

### 1. 首页 (index.html)
- 个人简介展示区
- 交互式3D场景展示
- 精选作品展示
- 响应式导航栏
- 联系方式和社交媒体链接

### 2. 作品集 (portfolio.html)
- 作品分类筛选
- 作品网格展示
- 作品详情预览

### 3. 服务 (services.html)
- 提供的服务类型展示
- 服务详情说明

### 4. 关于 (about.html)
- 个人详细介绍
- 专业技能展示
- 工作经历

### 5. 联系 (contact.html)
- 联系表单
- 联系信息展示

## 项目结构
```
├── index.html          # 首页
├── portfolio.html      # 作品集页面
├── services.html      # 服务页面
├── about.html         # 关于页面
├── contact.html       # 联系页面
├── css/              # 样式文件目录
│   ├── style.css     # 主样式文件
│   ├── portfolio.css # 作品集页面样式
│   ├── services.css  # 服务页面样式
│   ├── about.css     # 关于页面样式
│   └── contact.css   # 联系页面样式
├── js/               # JavaScript文件目录
│   ├── main.js       # 主要脚本文件
│   ├── portfolio.js  # 作品集页面脚本
│   ├── contact.js    # 联系表单处理脚本
│   ├── hero3d.js     # 首页3D交互脚本
│   └── services3d.js # 服务页3D场景脚本
└── images/           # 图片资源目录
    └── profile.svg   # 个人头像
```

## 设计特点
1. **深色主题**：采用深色背景配合优雅的金色点缀，创造出专业而现代的视觉效果
2. **响应式设计**：
   - 桌面端（>992px）：完整布局
   - 平板端（768px-992px）：适应性布局
   - 移动端（<768px）：简化布局，优化移动体验
3. **交互设计**：
   - 平滑过渡动画
   - 悬停效果
   - 作品筛选功能
   - 3D场景交互支持

## 性能优化
1. 使用SVG图标代替图片图标
2. CSS媒体查询优化移动端体验
3. 图片懒加载（计划实现）
4. 代码模块化，提高可维护性

## 本地开发

### 启动方式

1. **Python HTTP服务器**
   ```bash
   # 在项目根目录执行
   python -m http.server 8000
   ```

2. **Node.js http-server**
   ```bash
   # 需要先全局安装http-server
   npm install -g http-server
   # 启动服务
   http-server -p 8000
   ```

3. **VSCode Live Server扩展**
   - 安装VSCode的Live Server扩展
   - 右键点击index.html选择"Open with Live Server"

### 访问路径
- 首页：http://localhost:8000
- 作品集：http://localhost:8000/portfolio.html
- 服务页面：http://localhost:8000/services.html
- 关于页面：http://localhost:8000/about.html
- 联系页面：http://localhost:8000/contact.html

访问时请确保:
1. 服务已经成功启动
2. 使用Chrome/Firefox等现代浏览器
3. 端口号与启动命令保持一致

## 浏览器支持
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 后续计划
1. 添加作品详情页面
2. 实现深色/浅色主题切换
3. 添加作品搜索功能
4. 优化3D场景加载性能
5. 添加更多交互动画

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT License