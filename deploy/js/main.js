/**
 * 新思考电机 - 官方网站交互脚本
 * 模块化架构，包含所有页面交互逻辑
 */

// ============================================
// 工具函数
// ============================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// 图片懒加载和错误处理
const ImageLoader = {
    // 备用图片列表 - 使用本地 SVG
    fallbackImages: {
        banner: '/assets/images/banner.svg',
        product: '/assets/images/placeholder.svg',
        about: '/assets/images/factory.svg',
        news: '/assets/images/placeholder.svg'
    },

    // 初始化懒加载
    initLazyLoad() {
        const images = $$('img[data-src], img:not([src])');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px' });

        images.forEach(img => imageObserver.observe(img));
    },

    // 加载单张图片
    loadImage(img) {
        const src = img.dataset.src || img.src;
        if (!src) return;

        // 添加加载状态
        img.classList.add('img-loading');
        
        const tempImg = new Image();
        
        tempImg.onload = () => {
            img.src = src;
            img.classList.remove('img-loading');
            img.classList.add('img-loaded');
        };

        tempImg.onerror = () => {
            // 使用备用图片
            const fallback = this.getFallbackImage(img);
            if (fallback && img.src !== fallback) {
                img.src = fallback;
            }
            img.classList.remove('img-loading');
            img.classList.add('img-error');
        };

        tempImg.src = src;
    },

    // 获取备用图片
    getFallbackImage(img) {
        const alt = img.alt || '';
        if (alt.includes('产品') || alt.includes('电机')) {
            return this.fallbackImages.product;
        }
        if (alt.includes('新闻')) {
            return this.fallbackImages.news;
        }
        if (alt.includes('关于') || alt.includes('企业')) {
            return this.fallbackImages.about;
        }
        return this.fallbackImages.product;
    },

    // 预加载关键图片
    preloadCriticalImages() {
        const criticalImages = [
            this.fallbackImages.banner,
            this.fallbackImages.product
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
};

// ============================================
// 页面加载动画
// ============================================
class PageLoader {
    constructor() {
        this.loader = $('#pageLoader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');
                // 启动入场动画
                document.body.style.overflow = '';
            }, 600);
        });
        // 防止加载期间滚动
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// 导航栏交互
// ============================================
class Navigation {
    constructor() {
        this.header = $('#header');
        this.menuBtn = $('#menuBtn');
        this.navList = $('#navList');
        this.navItems = $$('.nav-item');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        // 滚动监听 - 头部样式切换
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        // 移动端菜单
        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        // 导航点击
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.onNavClick(e));
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    onScroll() {
        const scrollY = window.scrollY;

        // 添加滚动样式
        if (scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScroll = scrollY;
    }

    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.navList.classList.toggle('active');
    }

    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.navList.classList.remove('active');
    }

    onNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target) {
                const offsetTop = target.offsetTop - 72;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            this.closeMenu();
        }
    }

    // 更新导航高亮
    updateActiveSection(sectionId) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }
}

// ============================================
// 轮播图
// ============================================
class BannerSlider {
    constructor() {
        this.slides = $$('.banner-slide');
        this.dots = $$('.dot');
        this.prevBtn = $('#bannerPrev');
        this.nextBtn = $('#bannerNext');
        this.currentIndex = 0;
        this.autoPlayTimer = null;
        this.autoPlayInterval = 5000;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // 按钮事件
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // 指示点
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });

        // 自动播放
        this.startAutoPlay();

        // 鼠标悬停暂停
        const banner = $('.banner');
        banner?.addEventListener('mouseenter', () => this.stopAutoPlay());
        banner?.addEventListener('mouseleave', () => this.startAutoPlay());

        // 触摸滑动
        this.setupTouchEvents(banner);
    }

    goTo(index) {
        // 移除当前活动幻灯片的动画类
        this.slides[this.currentIndex].querySelectorAll('.animate-fadeUp').forEach(el => {
            el.style.animation = 'none';
        });

        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        // 重新触发动画
        this.slides[this.currentIndex].querySelectorAll('.animate-fadeUp').forEach(el => {
            el.style.animation = '';
            el.offsetHeight; // 触发重排
        });
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goTo(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => this.next(), this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    setupTouchEvents(element) {
        if (!element) return;
        let startX = 0;
        let endX = 0;

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.next();
                else this.prev();
            }
        }, { passive: true });
    }
}

// ============================================
// 滚动动画
// ============================================
class ScrollAnimator {
    constructor() {
        this.elements = $$('.scroll-animate');
        this.init();
    }

    init() {
        // 使用 IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 触发数字递增动画
                        if (entry.target.querySelector('.stat-number')) {
                            this.animateNumber(entry.target.querySelector('.stat-number'));
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        this.elements.forEach(el => observer.observe(el));
    }

    animateNumber(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo 缓动
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * target);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(update);
    }
}

// ============================================
// 导航高亮跟踪
// ============================================
class SectionTracker {
    constructor(navigation) {
        this.navigation = navigation;
        this.sections = $$('section[id]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.navigation.updateActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' }
        );

        this.sections.forEach(section => observer.observe(section));
    }
}

// ============================================
// 产品中心交互
// ============================================
class ProductManager {
    constructor() {
        this.filterBtns = $$('.filter-btn');
        this.productItems = $$('.product-item');
        this.modal = $('#productModal');
        this.modalClose = $('#modalClose');
        this.detailBtns = $$('.product-detail-btn');
        this.init();
    }

    init() {
        // 产品数据
        this.products = [
            {
                title: '直流无刷电机',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
                desc: '采用先进的磁路设计和优化的绕组结构，实现高效节能运行。内置智能驱动器，支持多种控制模式，广泛应用于智能家居、工业自动化设备等领域。',
                specs: [
                    { label: '额定电压', value: '12V/24V/48V' },
                    { label: '额定功率', value: '10W~500W' },
                    { label: '转速范围', value: '500~20000 RPM' },
                    { label: '效率', value: '≥85%' },
                    { label: '防护等级', value: 'IP54' },
                    { label: '噪音', value: '≤45dB' }
                ]
            },
            {
                title: '步进电机',
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
                desc: '高精度步进控制，步距角精度达±3%。采用优质磁性材料和精密加工工艺，确保低速大扭矩输出。广泛应用于3D打印、数控机床、机器人等领域。',
                specs: [
                    { label: '步距角', value: '0.9°/1.8°' },
                    { label: '相数', value: '2相/3相' },
                    { label: '保持扭矩', value: '0.1~12 N·m' },
                    { label: '电流', value: '0.5~6A' },
                    { label: '绝缘等级', value: 'B级' },
                    { label: '寿命', value: '≥20000h' }
                ]
            },
            {
                title: '伺服电机',
                image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop',
                desc: '高动态响应伺服系统，配备17/23位绝对值编码器，实现纳米级定位精度。适用于高端自动化生产线、新能源汽车配套设备等应用场景。',
                specs: [
                    { label: '额定功率', value: '50W~5kW' },
                    { label: '编码器', value: '17/23bit绝对值' },
                    { label: '转速', value: '0~6000 RPM' },
                    { label: '扭矩精度', value: '±1%' },
                    { label: '过载能力', value: '3倍额定' },
                    { label: '响应频率', value: '≥1.5kHz' }
                ]
            },
            {
                title: '微型直流无刷电机',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
                desc: '超小型设计，外径最小仅16mm。适用于医疗器械、精密仪器等空间受限场景，低振动、低噪音运行。',
                specs: [
                    { label: '外径', value: '16~42mm' },
                    { label: '额定电压', value: '5V/12V/24V' },
                    { label: '额定功率', value: '1~50W' },
                    { label: '转速', value: '1000~40000 RPM' },
                    { label: '重量', value: '15~200g' },
                    { label: '噪音', value: '≤35dB' }
                ]
            },
            {
                title: '闭环步进电机',
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
                desc: '集成高分辨率编码器，实现闭环控制，兼具步进电机的简便性与伺服电机的高精度。不失步、不丢步，完美替代传统步进方案。',
                specs: [
                    { label: '步距角', value: '0.9°/1.8°' },
                    { label: '编码器', value: '1000~5000 PPR' },
                    { label: '保持扭矩', value: '0.5~8 N·m' },
                    { label: '精度', value: '±0.05°' },
                    { label: '控制模式', value: '脉冲/Modbus' },
                    { label: '寿命', value: '≥30000h' }
                ]
            },
            {
                title: '定制化解决方案',
                image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop',
                desc: '根据客户需求定制电机参数、外观及接口，提供从设计到量产的一站式电机解决方案。专业工程师团队全程跟进，确保满足客户个性化需求。',
                specs: [
                    { label: '定制周期', value: '2~8周' },
                    { label: '起订量', value: '1000台起' },
                    { label: '设计支持', value: '免费方案设计' },
                    { label: '测试验证', value: '全套测试报告' },
                    { label: '售后服务', value: '5年质保' },
                    { label: '技术支持', value: '7×24小时' }
                ]
            }
        ];

        // 筛选按钮
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });

        // 详情按钮
        this.detailBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showDetail(parseInt(btn.dataset.product)));
        });

        // 关闭模态框
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // ESC 关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    filter(btn) {
        // 更新按钮状态
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;

        this.productItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filterValue === 'all' || category === filterValue;

            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
                // 重新触发动画
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    showDetail(index) {
        const product = this.products[index];
        if (!product) return;

        $('#modalImage').src = product.image;
        $('#modalTitle').textContent = product.title;
        $('#modalDesc').textContent = product.desc;

        // 构建规格表
        const specsContainer = $('#modalSpecs');
        specsContainer.innerHTML = '<h4>产品规格</h4>';
        product.specs.forEach(spec => {
            specsContainer.innerHTML += `
                <div class="modal-spec-item">
                    <span>${spec.label}</span>
                    <span>${spec.value}</span>
                </div>
            `;
        });

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// 新闻动态交互
// ============================================
class NewsManager {
    constructor() {
        this.tabs = $$('.news-tab');
        this.newsItems = $$('.news-item');
        this.loadMoreBtn = $('#loadMoreNews');
        this.extraNewsLoaded = false;
        this.init();
    }

    init() {
        // Tab 切换
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });

        // 加载更多
        this.loadMoreBtn?.addEventListener('click', () => this.loadMore());
    }

    switchTab(tab) {
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.tab;

        this.newsItems.forEach(item => {
            const type = item.dataset.type;
            const shouldShow = filter === 'all' || type === filter;

            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    loadMore() {
        if (this.extraNewsLoaded) {
            this.showToast('已加载全部新闻', 'success');
            return;
        }

        const extraNews = [
            {
                type: 'industry',
                tag: 'industry',
                tagText: '行业资讯',
                tagClass: 'industry',
                img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
                date: '2025-11-18',
                views: '756',
                title: '新思考电机亮相2026慕尼黑电子展，创新产品引发行业关注',
                desc: '新思考电机携旗下最新研发的高效伺服电机系列亮相2026慕尼黑电子展，展台吸引了来自全球30多个国家的专业观众...'
            },
            {
                type: 'product',
                tag: 'product',
                tagText: '新品发布',
                tagClass: 'product',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
                date: '2025-10-25',
                views: '1,890',
                title: '新思考电机推出全新智能驱动器系列，助力工业4.0升级',
                desc: '新思考电机今日正式推出全新智能驱动器系列，支持EtherCAT、Profinet等主流工业总线协议，助力客户实现智能制造升级...'
            }
        ];

        const newsList = $('#newsList');
        extraNews.forEach((news, index) => {
            const newsEl = document.createElement('div');
            newsEl.className = 'news-item scroll-animate visible';
            newsEl.dataset.type = news.type;
            newsEl.style.opacity = '0';
            newsEl.style.transform = 'translateY(20px)';
            newsEl.innerHTML = `
                <div class="news-img">
                    <img src="${news.img}" alt="${news.title}">
                    <div class="news-tag ${news.tagClass}">${news.tagText}</div>
                </div>
                <div class="news-body">
                    <div class="news-meta">
                        <span class="news-date"><i class="far fa-calendar"></i> ${news.date}</span>
                        <span class="news-view"><i class="far fa-eye"></i> ${news.views}</span>
                    </div>
                    <h4>${news.title}</h4>
                    <p>${news.desc}</p>
                    <a href="#" class="news-link">阅读全文 <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            newsList.appendChild(newsEl);

            // 延迟动画
            setTimeout(() => {
                newsEl.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                newsEl.style.opacity = '1';
                newsEl.style.transform = 'translateY(0)';
            }, index * 150 + 100);
        });

        this.extraNewsLoaded = true;
        this.loadMoreBtn.innerHTML = '已加载全部 <i class="fas fa-check"></i>';
    }

    showToast(msg, type = 'success') {
        const container = $('#toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon"><i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i></span>
            <span class="toast-msg">${msg}</span>
        `;
        container.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ============================================
// 联系表单验证
// ============================================
class ContactForm {
    constructor() {
        this.form = $('#contactForm');
        this.submitBtn = $('#submitBtn');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // 实时验证
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        let errorEl = $(`#${name}Error`);
        let isValid = true;

        // 清除错误
        field.classList.remove('error');
        if (errorEl) errorEl.textContent = '';

        switch (name) {
            case 'name':
                if (!value) {
                    this.setFieldError(field, errorEl, '请输入您的姓名');
                    isValid = false;
                } else if (value.length < 2) {
                    this.setFieldError(field, errorEl, '姓名至少2个字符');
                    isValid = false;
                }
                break;
            case 'phone':
                if (!value) {
                    this.setFieldError(field, errorEl, '请输入联系电话');
                    isValid = false;
                } else if (!/^1[3-9]\d{9}$/.test(value) && !/^0\d{2,3}-?\d{7,8}$/.test(value)) {
                    this.setFieldError(field, errorEl, '请输入有效的电话号码');
                    isValid = false;
                }
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    this.setFieldError(field, errorEl, '请输入有效的邮箱地址');
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    this.setFieldError(field, errorEl, '请输入留言内容');
                    isValid = false;
                } else if (value.length < 10) {
                    this.setFieldError(field, errorEl, '留言内容至少10个字符');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    setFieldError(field, errorEl, msg) {
        field.classList.add('error');
        if (errorEl) errorEl.textContent = msg;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // 验证所有字段
        const fields = this.form.querySelectorAll('[required]');
        let allValid = true;
        fields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) {
            // 滚动到第一个错误字段
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // 模拟提交
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1500));

        this.submitBtn.classList.remove('loading');
        this.submitBtn.disabled = false;

        // 显示成功提示
        Toast.show('留言提交成功！我们将在1个工作日内与您联系。', 'success');

        // 重置表单
        this.form.reset();
    }
}

// ============================================
// Toast 通知
// ============================================
class Toast {
    static show(msg, type = 'success') {
        const container = $('#toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon"><i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i></span>
            <span class="toast-msg">${msg}</span>
        `;
        container.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
}

// ============================================
// 回到顶部
// ============================================
class BackToTop {
    constructor() {
        this.btn = $('#backToTop');
        this.init();
    }

    init() {
        if (!this.btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.btn.classList.add('visible');
            } else {
                this.btn.classList.remove('visible');
            }
        }, { passive: true });

        this.btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// 向下滚动提示
// ============================================
class ScrollHint {
    constructor() {
        this.hint = $('#scrollHint');
        this.init();
    }

    init() {
        if (!this.hint) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.hint.style.opacity = '0';
                this.hint.style.pointerEvents = 'none';
            } else {
                this.hint.style.opacity = '1';
                this.hint.style.pointerEvents = 'auto';
            }
        }, { passive: true });

        this.hint.addEventListener('click', () => {
            const aboutSection = $('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 72,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 预加载关键图片
    ImageLoader.preloadCriticalImages();
    
    // 初始化图片懒加载
    ImageLoader.initLazyLoad();
    
    // 页面加载动画
    const pageLoader = new PageLoader();

    // 导航
    const navigation = new Navigation();

    // 轮播图
    const bannerSlider = new BannerSlider();

    // 滚动动画
    const scrollAnimator = new ScrollAnimator();

    // 导航高亮
    const sectionTracker = new SectionTracker(navigation);

    // 产品中心
    const productManager = new ProductManager();

    // 新闻动态
    const newsManager = new NewsManager();

    // 联系表单
    const contactForm = new ContactForm();

    // 回到顶部
    const backToTop = new BackToTop();

    // 向下滚动提示
    const scrollHint = new ScrollHint();

    console.log('🚀 新思考电机官网已加载完成');
});
