/**
 * 新思考电机 - 官方网站交互脚本
 * 模块化架构，包含所有页面交互逻辑
 */

// ============================================
// 工具函数
// ============================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// 将API返回的相对路径图片URL转换为完整URL
// 开发环境：返回相对路径（通过Vite代理 /uploads -> localhost:3002/uploads）
// 生产环境：拼接API服务器完整地址
const API_SERVER_URL = window.location.hostname === 'localhost'
    ? ''  // 开发环境由Vite代理处理，不需要前缀
    : 'https://shicoh-api.vercel.app';

const getFullImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('data:')) return url;
    // /uploads/ 路径：开发环境走Vite代理，生产环境拼接API服务器地址
    if (url.startsWith('/uploads/')) {
        return API_SERVER_URL + url;
    }
    // /assets/ 路径是前端静态资源，不需要转换
    return url;
};

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

        // 鼠标悬停暂停
        const banner = $('.banner');
        banner?.addEventListener('mouseenter', () => this.stopAutoPlay());
        banner?.addEventListener('mouseleave', () => this.startAutoPlay());

        // 触摸滑动
        this.setupTouchEvents(banner);
        
        // 延迟启动自动播放，确保页面完全加载
        setTimeout(() => {
            this.startAutoPlay();
        }, 1000);
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
        // 检查页面是否可见
        if (document.visibilityState === 'visible') {
            this.autoPlayTimer = setInterval(() => this.next(), this.autoPlayInterval);
        }
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

    // 从 API 数据更新产品列表（由 api.js 调用）
    updateFromAPI(products) {
        if (!products || products.length === 0) return;
        this.products = products.map(p => ({
            title: p.name || p.title,
            image: p.image,
            desc: p.description || p.desc,
            specs: Array.isArray(p.specs) ? p.specs : [],
            category: p.category,
            tags: p.tags || []
        }));
    }

    // 重新绑定详情按钮事件（DOM 更新后由 api.js 调用）
    rebindDetailButtons() {
        this.detailBtns = $$('.product-detail-btn');
        this.detailBtns.forEach(btn => {
            // 移除旧的事件监听器（通过克隆节点）
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => this.showDetail(parseInt(newBtn.dataset.product)));
        });
        this.detailBtns = $$('.product-detail-btn');
        this.productItems = $$('.product-item');
    }

    init() {
        // 产品数据（支持多语言，作为 API 不可用时的后备）
        this.products = [
            {
                title: { zh: '直流无刷电机', 'zh-TW': '直流無刷電機', en: 'Brushless DC Motor' },
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
                desc: { zh: '采用先进的磁路设计和优化的绕组结构，实现高效节能运行。内置智能驱动器，支持多种控制模式，广泛应用于智能家居、工业自动化设备等领域。', 'zh-TW': '採用先進的磁路設計和優化的繞組結構，實現高效節能運行。內置智能驅動器，支持多種控制模式，廣泛應用於智能家電、工業自動化設備等領域。', en: 'Advanced magnetic circuit design and optimized winding structure for high-efficiency energy-saving operation. Built-in intelligent driver supports multiple control modes, widely used in smart home and industrial automation.' },
                specs: [
                    { label: { zh: '额定电压', 'zh-TW': '額定電壓', en: 'Rated Voltage' }, value: '12V/24V/48V' },
                    { label: { zh: '额定功率', 'zh-TW': '額定功率', en: 'Rated Power' }, value: '10W~500W' },
                    { label: { zh: '转速范围', 'zh-TW': '轉速範圍', en: 'Speed Range' }, value: '500~20000 RPM' },
                    { label: { zh: '效率', 'zh-TW': '效率', en: 'Efficiency' }, value: '≥85%' },
                    { label: { zh: '防护等级', 'zh-TW': '防護等級', en: 'IP Rating' }, value: 'IP54' },
                    { label: { zh: '噪音', 'zh-TW': '噪音', en: 'Noise' }, value: '≤45dB' }
                ]
            },
            {
                title: { zh: '步进电机', 'zh-TW': '步進電機', en: 'Stepper Motor' },
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
                desc: { zh: '高精度步进控制，步距角精度达±3%。采用优质磁性材料和精密加工工艺，确保低速大扭矩输出。广泛应用于3D打印、数控机床、机器人等领域。', 'zh-TW': '高精度步進控制，步距角精度達±3%。採用優質磁性材料和精密加工工藝，確保低速大扭矩輸出。廣泛應用於3D列印、數控機床、機器人等領域。', en: 'High-precision stepper control with step angle accuracy of ±3%. Premium magnetic materials and precision machining ensure low-speed high-torque output. Widely used in 3D printing, CNC machines, and robotics.' },
                specs: [
                    { label: { zh: '步距角', 'zh-TW': '步距角', en: 'Step Angle' }, value: '0.9°/1.8°' },
                    { label: { zh: '相数', 'zh-TW': '相數', en: 'Phases' }, value: '2/3 Phase' },
                    { label: { zh: '保持扭矩', 'zh-TW': '保持扭矩', en: 'Holding Torque' }, value: '0.1~12 N·m' },
                    { label: { zh: '电流', 'zh-TW': '電流', en: 'Current' }, value: '0.5~6A' },
                    { label: { zh: '绝缘等级', 'zh-TW': '絕緣等級', en: 'Insulation Class' }, value: 'Class B' },
                    { label: { zh: '寿命', 'zh-TW': '壽命', en: 'Life Span' }, value: '≥20000h' }
                ]
            },
            {
                title: { zh: '伺服电机', 'zh-TW': '伺服電機', en: 'Servo Motor' },
                image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop',
                desc: { zh: '高动态响应伺服系统，配备17/23位绝对值编码器，实现纳米级定位精度。适用于高端自动化生产线、新能源汽车配套设备等应用场景。', 'zh-TW': '高動態響應伺服系統，配備17/23位絕對值編碼器，實現納米級定位精度。適用於高端自動化生產線、新能源汽車配套設備等應用場景。', en: 'High dynamic response servo system with 17/23-bit absolute encoder for nanometer-level positioning. Suitable for high-end automated production lines and new energy vehicle equipment.' },
                specs: [
                    { label: { zh: '额定功率', 'zh-TW': '額定功率', en: 'Rated Power' }, value: '50W~5kW' },
                    { label: { zh: '编码器', 'zh-TW': '編碼器', en: 'Encoder' }, value: '17/23bit Absolute' },
                    { label: { zh: '转速', 'zh-TW': '轉速', en: 'Speed' }, value: '0~6000 RPM' },
                    { label: { zh: '扭矩精度', 'zh-TW': '扭矩精度', en: 'Torque Accuracy' }, value: '±1%' },
                    { label: { zh: '过载能力', 'zh-TW': '過載能力', en: 'Overload Capacity' }, value: '3× Rated' },
                    { label: { zh: '响应频率', 'zh-TW': '響應頻率', en: 'Response Freq.' }, value: '≥1.5kHz' }
                ]
            },
            {
                title: { zh: '微型直流无刷电机', 'zh-TW': '微型直流無刷電機', en: 'Micro Brushless DC Motor' },
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
                desc: { zh: '超小型设计，外径最小仅16mm。适用于医疗器械、精密仪器等空间受限场景，低振动、低噪音运行。', 'zh-TW': '超小型設計，外徑最小僅16mm。適用於醫療器械、精密儀器等空間受限場景，低振動、低噪音運行。', en: 'Ultra-compact design with minimum outer diameter of 16mm. Suitable for medical devices and precision instruments with limited space, featuring low vibration and low noise.' },
                specs: [
                    { label: { zh: '外径', 'zh-TW': '外徑', en: 'Outer Dia.' }, value: '16~42mm' },
                    { label: { zh: '额定电压', 'zh-TW': '額定電壓', en: 'Rated Voltage' }, value: '5V/12V/24V' },
                    { label: { zh: '额定功率', 'zh-TW': '額定功率', en: 'Rated Power' }, value: '1~50W' },
                    { label: { zh: '转速', 'zh-TW': '轉速', en: 'Speed' }, value: '1000~40000 RPM' },
                    { label: { zh: '重量', 'zh-TW': '重量', en: 'Weight' }, value: '15~200g' },
                    { label: { zh: '噪音', 'zh-TW': '噪音', en: 'Noise' }, value: '≤35dB' }
                ]
            },
            {
                title: { zh: '闭环步进电机', 'zh-TW': '閉環步進電機', en: 'Closed-loop Stepper Motor' },
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
                desc: { zh: '集成高分辨率编码器，实现闭环控制，兼具步进电机的简便性与伺服电机的高精度。不失步、不丢步，完美替代传统步进方案。', 'zh-TW': '集成高分辨率編碼器，實現閉環控制，兼具步進電機的簡便性與伺服電機的高精度。不失步、不丟步，完美替代傳統步進方案。', en: 'Integrated high-resolution encoder for closed-loop control, combining stepper motor simplicity with servo motor precision. No step loss, perfect replacement for traditional stepper solutions.' },
                specs: [
                    { label: { zh: '步距角', 'zh-TW': '步距角', en: 'Step Angle' }, value: '0.9°/1.8°' },
                    { label: { zh: '编码器', 'zh-TW': '編碼器', en: 'Encoder' }, value: '1000~5000 PPR' },
                    { label: { zh: '保持扭矩', 'zh-TW': '保持扭矩', en: 'Holding Torque' }, value: '0.5~8 N·m' },
                    { label: { zh: '精度', 'zh-TW': '精度', en: 'Accuracy' }, value: '±0.05°' },
                    { label: { zh: '控制模式', 'zh-TW': '控制模式', en: 'Control Mode' }, value: 'Pulse/Modbus' },
                    { label: { zh: '寿命', 'zh-TW': '壽命', en: 'Life Span' }, value: '≥30000h' }
                ]
            },
            {
                title: { zh: '定制化解决方案', 'zh-TW': '定製化解決方案', en: 'Custom Solutions' },
                image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop',
                desc: { zh: '根据客户需求定制电机参数、外观及接口，提供从设计到量产的一站式电机解决方案。专业工程师团队全程跟进，确保满足客户个性化需求。', 'zh-TW': '根據客戶需求定製電機參數、外觀及接口，提供從設計到量產的一站式電機解決方案。專業工程師團隊全程跟進，確保滿足客戶個性化需求。', en: 'Customize motor parameters, appearance and interfaces according to customer needs, providing one-stop motor solutions from design to mass production. Professional engineer team follows up throughout the process.' },
                specs: [
                    { label: { zh: '定制周期', 'zh-TW': '定製週期', en: 'Custom Lead Time' }, value: '2~8 Weeks' },
                    { label: { zh: '起订量', 'zh-TW': '起訂量', en: 'MOQ' }, value: '1,000 Units' },
                    { label: { zh: '设计支持', 'zh-TW': '設計支援', en: 'Design Support' }, value: 'Free' },
                    { label: { zh: '测试验证', 'zh-TW': '測試驗證', en: 'Test & Verification' }, value: 'Full Report' },
                    { label: { zh: '售后服务', 'zh-TW': '售後服務', en: 'After-sales' }, value: '5-Year Warranty' },
                    { label: { zh: '技术支持', 'zh-TW': '技術支援', en: 'Tech Support' }, value: '7×24h' }
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

        // 咨询报价按钮 - 点击时关闭弹窗
        const quoteBtn = this.modal?.querySelector('.btn-primary');
        if (quoteBtn) {
            quoteBtn.addEventListener('click', (e) => {
                // 先关闭弹窗，再让链接导航生效
                this.closeModal();
            });
        }

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

        const lang = window.i18n ? window.i18n.getLang() : 'zh';
        const getLocalizedText = (obj) => {
            if (typeof obj === 'string') return obj;
            return obj[lang] || obj['zh'] || '';
        };

        $('#modalImage').src = getFullImageUrl(product.image);
        $('#modalTitle').textContent = getLocalizedText(product.title);
        $('#modalDesc').textContent = getLocalizedText(product.desc);

        // 构建规格表
        const specsContainer = $('#modalSpecs');
        const specsTitle = window.i18n ? window.i18n.t('products.modal.specs') : '产品规格';
        specsContainer.innerHTML = `<h4>${specsTitle}</h4>`;
        product.specs.forEach(spec => {
            specsContainer.innerHTML += `
                <div class="modal-spec-item">
                    <span>${getLocalizedText(spec.label)}</span>
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

    // 从 API 数据更新新闻列表（由 api.js 调用）
    updateFromAPI(news) {
        if (!news || news.length === 0) return;
        this.newsItems = $$('.news-item');
        // 重置加载更多状态
        this.extraNewsLoaded = false;
        // 确保所有新闻项都是可见的
        this.newsItems.forEach(item => {
            item.classList.remove('hidden');
            item.style.display = '';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
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

        // 刷新新闻项引用（API可能已更新DOM）
        this.newsItems = $$('.news-item');

        this.newsItems.forEach(item => {
            const type = item.dataset.type;
            const shouldShow = filter === 'all' || type === filter;

            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    }

    loadMore() {
        if (this.extraNewsLoaded) {
            const msg = window.i18n ? window.i18n.t('toast.allNewsLoaded') : '已加载全部新闻';
            this.showToast(msg, 'success');
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
        const allLoadedText = window.i18n ? window.i18n.t('news.allLoaded') : '已加载全部';
        this.loadMoreBtn.innerHTML = `${allLoadedText} <i class="fas fa-check"></i>`;
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

        // 提交到API
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            const formData = {
                name: this.form.querySelector('#name').value.trim(),
                phone: this.form.querySelector('#phone').value.trim(),
                email: this.form.querySelector('#email').value.trim(),
                subject: this.form.querySelector('#subject').value,
                content: this.form.querySelector('#message').value.trim()
            };

            // 获取API基础URL
            const apiBase = window.location.hostname === 'localhost' 
                ? '/api' 
                : 'https://shicoh-api.vercel.app/api';

            const response = await fetch(`${apiBase}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.code === 200) {
                // 显示成功提示
                const successMsg = window.i18n ? window.i18n.t('toast.submitSuccess') : '留言提交成功！我们将在1个工作日内与您联系。';
                Toast.show(successMsg, 'success');
                // 重置表单
                this.form.reset();
            } else {
                Toast.show(result.message || '提交失败，请稍后重试', 'error');
            }
        } catch (error) {
            console.error('留言提交失败:', error);
            Toast.show('网络错误，请稍后重试', 'error');
        } finally {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
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
// 语言切换交互（下拉选择）
// ============================================
class LanguageSwitcher {
    constructor() {
        this.switcher = $('#langSwitcher');
        this.toggle = $('#langToggle');
        this.dropdown = $('#langDropdown');
        this.options = $$('.lang-option');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.switcher) return;

        // 点击切换按钮，展开/收起下拉菜单
        this.toggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // 点击下拉选项，切换语言
        this.options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.dataset.lang;
                if (lang && window.i18n) {
                    window.i18n.setLang(lang);
                }
                this.closeDropdown();
            });
        });

        // 点击页面其他区域关闭下拉
        document.addEventListener('click', (e) => {
            if (!this.switcher.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // ESC 关闭下拉
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });

        // 初始化时应用保存的语言
        if (window.i18n) {
            window.i18n.applyTranslations();
        }
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        this.switcher.classList.toggle('open', this.isOpen);
    }

    closeDropdown() {
        this.isOpen = false;
        this.switcher.classList.remove('open');
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

    // 语言切换
    const languageSwitcher = new LanguageSwitcher();

// 轮播图
const bannerSlider = new BannerSlider();
window.bannerSlider = bannerSlider;

    // 滚动动画
    const scrollAnimator = new ScrollAnimator();

    // 导航高亮
    const sectionTracker = new SectionTracker(navigation);

// 产品中心
const productManager = new ProductManager();
window.productManager = productManager;

// 新闻动态
const newsManager = new NewsManager();
window.newsManager = newsManager;

    // 联系表单
    const contactForm = new ContactForm();

    // 回到顶部
    const backToTop = new BackToTop();

    // 向下滚动提示
    const scrollHint = new ScrollHint();

    console.log('🚀 新思考电机官网已加载完成');
});
