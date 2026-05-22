/**
 * API 数据管理模块
 * 从后端 API 获取动态数据
 */

// 本地开发使用 localhost，生产环境使用 Render 地址
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3004/api'
  : 'https://shicoh-api.onrender.com/api';

// 简单的 fetch 封装
const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('API 请求失败，使用默认数据:', error);
        return null;
    }
};

// 数据管理器
const DataManager = {
    // 获取企业信息
    async getCompanyInfo() {
        const data = await apiRequest('/company');
        if (data && data.code === 200) {
            return data.data;
        }
        return null;
    },

    // 获取轮播图
    async getBanners() {
        const data = await apiRequest('/banners');
        if (data && data.code === 200) {
            return data.data;
        }
        return null;
    },

    // 获取产品列表
    async getProducts() {
        const data = await apiRequest('/products');
        if (data && data.code === 200) {
            return data.data;
        }
        return null;
    },

    // 获取新闻列表
    async getNews() {
        const data = await apiRequest('/news');
        if (data && data.code === 200) {
            return data.data;
        }
        return null;
    },

    // 获取合作伙伴列表
    async getPartners() {
        const data = await apiRequest('/partners');
        if (data && data.code === 200) {
            return data.data;
        }
        return null;
    }
};

// 页面数据渲染器
const PageRenderer = {
    // 渲染轮播图
    renderBanners(banners) {
        if (!banners || banners.length === 0) return;
        
        const container = document.getElementById('bannerSlides');
        if (!container) return;

        // 按排序字段排序
        banners.sort((a, b) => a.sort - b.sort);

        // 生成 HTML
        const html = banners.map((banner, index) => `
            <div class="banner-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${banner.image}')">
                <div class="banner-overlay"></div>
                <div class="banner-content">
                    <h1 class="animate-fadeUp">${banner.title}</h1>
                    <p class="animate-fadeUp delay-1">${banner.subtitle}</p>
                    <div class="banner-btns animate-fadeUp delay-2">
                        <a href="${banner.link || '#about'}" class="btn btn-primary">了解更多</a>
                        <a href="#contact" class="btn btn-outline">联系我们</a>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;

        // 重新初始化轮播图
        if (window.bannerSlider) {
            window.bannerSlider.slides = document.querySelectorAll('.banner-slide');
            window.bannerSlider.currentIndex = 0;
        }
    },

    // 渲染企业信息
    renderCompanyInfo(company) {
        if (!company) return;

        // 更新统计数据
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].dataset.target = company.stats?.experience || 21;
            statNumbers[1].dataset.target = company.stats?.countries || 50;
            statNumbers[2].dataset.target = company.stats?.capacity || 5000;
            statNumbers[3].dataset.target = company.stats?.patents || 200;
        }

        // 更新企业简介
        const aboutText = document.querySelector('.about-text');
        if (aboutText && company.description) {
            const paragraphs = aboutText.querySelectorAll('p');
            if (paragraphs.length > 0) {
                paragraphs[0].textContent = company.description;
            }
        }

        // 更新企业荣誉
        const aboutFeatures = document.querySelector('.about-features');
        if (aboutFeatures && company.features) {
            aboutFeatures.innerHTML = company.features.map(feature => `
                <div class="about-feature">
                    <i class="fas fa-check-circle"></i>
                    <span>${feature}</span>
                </div>
            `).join('');
        }

        // 更新联系信息
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            const label = item.querySelector('strong');
            const value = item.querySelector('p');
            if (label && value) {
                const labelText = label.textContent;
                if (labelText.includes('地址') && company.address) {
                    value.textContent = company.address;
                } else if (labelText.includes('电话') && company.phone) {
                    value.textContent = company.phone;
                } else if (labelText.includes('邮箱') && company.email) {
                    value.textContent = company.email;
                } else if (labelText.includes('工作时间') && company.workHours) {
                    value.textContent = company.workHours;
                }
            }
        });
        
        // 更新地图位置文字
        const mapPlaceholder = document.querySelector('.map-placeholder p');
        if (mapPlaceholder && company.address) {
            // 提取地址的主要部分（城市+区域）
            const addressParts = company.address.split('市');
            if (addressParts.length > 0) {
                mapPlaceholder.textContent = addressParts[0] + '市' + (addressParts[1] ? addressParts[1].split('区')[0] + '区' : '');
            } else {
                mapPlaceholder.textContent = company.address.substring(0, 20);
            }
        }
    },

    // 渲染产品列表
    renderProducts(products) {
        if (!products || products.length === 0) return;

        const container = document.getElementById('productList');
        if (!container) return;

        const categoryMap = {
            brushless: '直流无刷电机',
            stepper: '步进电机',
            servo: '伺服电机',
            custom: '定制方案'
        };

        const html = products.map((product, index) => `
            <div class="product-item scroll-animate" data-category="${product.category}">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                    ${index < 2 ? `<div class="product-badge ${index === 1 ? 'new' : ''}">${index === 0 ? '热销' : '新品'}</div>` : ''}
                    <div class="product-overlay">
                        <button class="product-detail-btn" data-product="${index}">
                            <i class="fas fa-eye"></i> 查看详情
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="product-tags">
                        ${Array.isArray(product.tags) ? product.tags.map(tag => `<span>${tag}</span>`).join('') : ''}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        // 重新绑定产品详情按钮事件
        const detailBtns = container.querySelectorAll('.product-detail-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const productIndex = parseInt(btn.dataset.product);
                if (window.productManager) {
                    window.productManager.showDetail(productIndex);
                }
            });
        });
        
        // 重新初始化产品筛选功能
        if (window.productManager) {
            window.productManager.productItems = document.querySelectorAll('.product-item');
        }
    },

    // 渲染新闻列表
    renderNews(news) {
        if (!news || news.length === 0) return;

        const container = document.getElementById('newsList');
        if (!container) return;

        const typeMap = {
            company: { text: '公司新闻', class: '' },
            industry: { text: '行业资讯', class: 'industry' },
            product: { text: '新品发布', class: 'product' }
        };

        const html = news.map((item, index) => `
            <div class="news-item scroll-animate" data-type="${item.type}">
                <div class="news-img">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="news-tag ${typeMap[item.type]?.class || ''}">${typeMap[item.type]?.text || '新闻'}</div>
                </div>
                <div class="news-body">
                    <div class="news-meta">
                        <span class="news-date"><i class="far fa-calendar"></i> ${item.date}</span>
                        <span class="news-view"><i class="far fa-eye"></i> ${item.views ? item.views.toLocaleString() : 0}</span>
                    </div>
                    <h4>${item.title}</h4>
                    <p>${item.summary}</p>
                    <a href="javascript:void(0)" class="news-link" onclick="showNewsDetail(${index})">阅读全文 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        // 保存新闻数据到全局变量
        window.newsData = news;
    },

    // 渲染合作伙伴
    renderPartners(partners) {
        if (!partners || partners.length === 0) return;

        const container = document.querySelector('.partner-track');
        if (!container) return;

        // 过滤启用的合作伙伴
        const enabledPartners = partners.filter(p => p.enabled !== 0);
        
        // 按排序字段排序
        enabledPartners.sort((a, b) => a.sort - b.sort);

        // 生成 HTML，复制一份以实现无缝滚动
        const html = [...enabledPartners, ...enabledPartners].map(partner => {
            // 如果有 logo 图片则显示图片，否则显示文字
            const logoContent = partner.logo 
                ? `<img src="${partner.logo}" alt="${partner.name}" style="max-width: 100%; max-height: 60px; object-fit: contain;">`
                : `<div class="partner-logo">${partner.name}</div>`;
            
            return `
                <div class="partner-item">
                    ${partner.website 
                        ? `<a href="${partner.website}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${logoContent}</a>`
                        : logoContent
                    }
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }
};

// 初始化加载数据
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔄 正在从 API 加载数据...');

    // 并行加载所有数据
    const [companyInfo, banners, products, news, partners] = await Promise.all([
        DataManager.getCompanyInfo(),
        DataManager.getBanners(),
        DataManager.getProducts(),
        DataManager.getNews(),
        DataManager.getPartners()
    ]);

    // 渲染数据
    if (banners) {
        PageRenderer.renderBanners(banners);
        console.log('✅ 轮播图已更新');
    }

    if (companyInfo) {
        PageRenderer.renderCompanyInfo(companyInfo);
        console.log('✅ 企业信息已更新');
    }

    if (products) {
        PageRenderer.renderProducts(products);
        console.log('✅ 产品列表已更新');
    }

    if (news) {
        PageRenderer.renderNews(news);
        console.log('✅ 新闻列表已更新');
    }

    if (partners) {
        PageRenderer.renderPartners(partners);
        console.log('✅ 合作伙伴已更新');
    }

    // 如果 API 都失败了，使用页面上的默认数据
    if (!companyInfo && !banners && !products && !news && !partners) {
        console.log('⚠️ API 不可用，使用默认数据');
    }
});

// 显示新闻详情弹窗
window.showNewsDetail = function(index) {
    const news = window.newsData?.[index];
    if (!news) return;
    
    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'news-modal';
    modal.innerHTML = `
        <div class="news-modal-content">
            <button class="news-modal-close" onclick="closeNewsModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="news-modal-header">
                <img src="${news.image}" alt="${news.title}">
                <div class="news-modal-tag">${news.type === 'company' ? '公司新闻' : news.type === 'industry' ? '行业资讯' : '新品发布'}</div>
            </div>
            <div class="news-modal-body">
                <h2>${news.title}</h2>
                <div class="news-modal-meta">
                    <span><i class="far fa-calendar"></i> ${news.date}</span>
                    <span><i class="far fa-eye"></i> ${news.views ? news.views.toLocaleString() : 0} 次阅读</span>
                </div>
                <div class="news-modal-content-text">
                    ${news.content || news.summary}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 动画显示
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeNewsModal();
        }
    });
    
    // ESC 关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeNewsModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
};

// 关闭新闻弹窗
window.closeNewsModal = function() {
    const modal = document.querySelector('.news-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
};

// 导出供其他模块使用
window.DataManager = DataManager;
window.PageRenderer = PageRenderer;
