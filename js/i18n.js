/**
 * 多语言国际化模块 (i18n)
 * 支持中文简体(zh)、中文繁体(zh-TW)、英文(en)
 */

const translations = {
    // ============================================
    // 导航栏
    // ============================================
    'nav.home': {
        zh: '首页',
        'zh-TW': '首頁',
        en: 'Home'
    },
    'nav.about': {
        zh: '企业简介',
        'zh-TW': '企業簡介',
        en: 'About Us'
    },
    'nav.products': {
        zh: '产品中心',
        'zh-TW': '產品中心',
        en: 'Products'
    },
    'nav.news': {
        zh: '新闻动态',
        'zh-TW': '新聞動態',
        en: 'News'
    },
    'nav.contact': {
        zh: '联系我们',
        'zh-TW': '聯繫我們',
        en: 'Contact'
    },
    'nav.getQuote': {
        zh: '获取报价',
        'zh-TW': '獲取報價',
        en: 'Get Quote'
    },
    'nav.logoText': {
        zh: '新思考电机 <span>股份有限公司</span>',
        'zh-TW': '新思考電機 <span>股份有限公司</span>',
        en: 'Shicoh Motor <span>Co., Ltd.</span>'
    },

    // ============================================
    // 页面加载
    // ============================================
    'loader.loading': {
        zh: '加载中...',
        'zh-TW': '載入中...',
        en: 'Loading...'
    },

    // ============================================
    // 横幅轮播
    // ============================================
    'banner.slide1.title': {
        zh: '创新驱动 精工制造',
        'zh-TW': '創新驅動 精工製造',
        en: 'Innovation Driven, Precision Manufacturing'
    },
    'banner.slide1.desc': {
        zh: '新思考电机专注于各类微特电机的研发、生产与销售，为全球客户提供高品质的电机解决方案，以技术创新引领行业发展。',
        'zh-TW': '新思考電機專注於各類微特電機的研發、生產與銷售，為全球客戶提供高品質的電機解決方案，以技術創新引領行業發展。',
        en: 'Shicoh Motor focuses on the R&D, production and sales of various micro special motors, providing high-quality motor solutions for global customers and leading the industry with technological innovation.'
    },
    'banner.slide1.btn1': {
        zh: '了解更多',
        'zh-TW': '瞭解更多',
        en: 'Learn More'
    },
    'banner.slide1.btn2': {
        zh: '联系我们',
        'zh-TW': '聯繫我們',
        en: 'Contact Us'
    },
    'banner.slide2.title': {
        zh: '智能制造 引领未来',
        'zh-TW': '智能製造 引領未來',
        en: 'Smart Manufacturing, Leading the Future'
    },
    'banner.slide2.desc': {
        zh: '拥有全自动化生产线和智能检测系统，年产能超过5000万台，品质管控达到国际一流水准。',
        'zh-TW': '擁有全自動化生產線和智能檢測系統，年產能超過5000萬台，品質管控達到國際一流水準。',
        en: 'Equipped with fully automated production lines and intelligent inspection systems, annual capacity exceeds 50 million units, with world-class quality control.'
    },
    'banner.slide2.btn1': {
        zh: '产品中心',
        'zh-TW': '產品中心',
        en: 'Products'
    },
    'banner.slide2.btn2': {
        zh: '企业实力',
        'zh-TW': '企業實力',
        en: 'Our Strength'
    },
    'banner.slide3.title': {
        zh: '全球合作 互利共赢',
        'zh-TW': '全球合作 互利共贏',
        en: 'Global Cooperation, Mutual Benefit'
    },
    'banner.slide3.desc': {
        zh: '产品远销全球50多个国家和地区，与多家世界500强企业建立长期战略合作关系。',
        'zh-TW': '產品遠銷全球50多個國家和地區，與多家世界500強企業建立長期戰略合作關係。',
        en: 'Products are exported to over 50 countries and regions worldwide, with long-term strategic partnerships with multiple Fortune 500 companies.'
    },
    'banner.slide3.btn1': {
        zh: '新闻动态',
        'zh-TW': '新聞動態',
        en: 'News'
    },
    'banner.slide3.btn2': {
        zh: '商务合作',
        'zh-TW': '商務合作',
        en: 'Business Cooperation'
    },
    'banner.scrollDown': {
        zh: '向下滚动',
        'zh-TW': '向下滾動',
        en: 'Scroll Down'
    },

    // ============================================
    // 数据统计条
    // ============================================
    'stats.experience': {
        zh: '年行业经验',
        'zh-TW': '年行業經驗',
        en: 'Years Experience'
    },
    'stats.countries': {
        zh: '覆盖国家和地区',
        'zh-TW': '覆蓋國家和地區',
        en: 'Countries & Regions'
    },
    'stats.capacity': {
        zh: '万台年产能',
        'zh-TW': '萬台年產能',
        en: 'M Units/Year Capacity'
    },
    'stats.patents': {
        zh: '项技术专利',
        'zh-TW': '項技術專利',
        en: 'Technical Patents'
    },

    // ============================================
    // 企业简介
    // ============================================
    'about.subtitle': {
        zh: 'About Us',
        'zh-TW': 'About Us',
        en: 'About Us'
    },
    'about.title': {
        zh: '企业简介',
        'zh-TW': '企業簡介',
        en: 'About Us'
    },
    'about.desc': {
        zh: '专注微特电机研发制造21年，以技术创新驱动行业发展',
        'zh-TW': '專注微特電機研發製造21年，以技術創新驅動行業發展',
        en: '21 years of focus on micro motor R&D and manufacturing, driving industry development through technological innovation'
    },
    'about.badgeText': {
        zh: '年专业经验',
        'zh-TW': '年專業經驗',
        en: 'Years of Expertise'
    },
    'about.heading': {
        zh: '关于新思考电机',
        'zh-TW': '關於新思考電機',
        en: 'About Shicoh Motor'
    },
    'about.p1': {
        zh: '新思考电机股份有限公司成立于2005年，是一家集研发、生产、销售为一体的国家级高新技术企业，总部位于中国长三角智能制造产业带。',
        'zh-TW': '新思考電機股份有限公司成立於2005年，是一家集研發、生產、銷售為一體的國家級高新技術企業，總部位於中國長三角智能製造產業帶。',
        en: 'Shicoh Motor Co., Ltd., established in 2005, is a national high-tech enterprise integrating R&D, production and sales, headquartered in the Yangtze River Delta intelligent manufacturing industrial belt of China.'
    },
    'about.p2': {
        zh: '公司专注于直流无刷电机、步进电机、伺服电机等系列产品的研发与制造，产品广泛应用于智能家居、工业自动化、新能源汽车、医疗设备等领域。',
        'zh-TW': '公司專注於直流無刷電機、步進電機、伺服電機等系列產品的研發與製造，產品廣泛應用於智能家電、工業自動化、新能源汽車、醫療設備等領域。',
        en: 'The company specializes in the R&D and manufacturing of brushless DC motors, stepper motors, servo motors and other series products, widely used in smart home, industrial automation, new energy vehicles, medical equipment and other fields.'
    },
    'about.p3': {
        zh: '凭借先进的生产设备、严格的质量管控体系和专业的技术团队，公司产品远销全球50多个国家和地区，与多家世界500强企业建立了长期战略合作关系。',
        'zh-TW': '憑藉先進的生產設備、嚴格的品質管控體系和專業的技術團隊，公司產品遠銷全球50多個國家和地區，與多家世界500強企業建立了長期戰略合作關係。',
        en: 'With advanced production equipment, strict quality control systems and professional technical teams, our products are exported to over 50 countries and regions, with long-term strategic partnerships with multiple Fortune 500 companies.'
    },
    'about.feature1': {
        zh: '国家级高新技术企业',
        'zh-TW': '國家級高新技術企業',
        en: 'National High-tech Enterprise'
    },
    'about.feature2': {
        zh: 'ISO9001质量体系认证',
        'zh-TW': 'ISO9001品質體系認證',
        en: 'ISO9001 Quality Certification'
    },
    'about.feature3': {
        zh: 'IATF16949汽车认证',
        'zh-TW': 'IATF16949汽車認證',
        en: 'IATF16949 Automotive Certification'
    },
    'about.feature4': {
        zh: '200+技术专利',
        'zh-TW': '200+技術專利',
        en: '200+ Technical Patents'
    },
    'about.viewMore': {
        zh: '查看完整介绍',
        'zh-TW': '查看完整介紹',
        en: 'View Full Profile'
    },

    // ============================================
    // 产品中心
    // ============================================
    'products.subtitle': {
        zh: 'Products',
        'zh-TW': 'Products',
        en: 'Products'
    },
    'products.title': {
        zh: '产品中心',
        'zh-TW': '產品中心',
        en: 'Product Center'
    },
    'products.desc': {
        zh: '多品类电机产品，满足不同行业应用需求',
        'zh-TW': '多品類電機產品，滿足不同行業應用需求',
        en: 'Diverse motor products for various industry applications'
    },
    'products.filterAll': {
        zh: '全部产品',
        'zh-TW': '全部產品',
        en: 'All Products'
    },
    'products.filterBrushless': {
        zh: '直流无刷电机',
        'zh-TW': '直流無刷電機',
        en: 'Brushless DC Motors'
    },
    'products.filterStepper': {
        zh: '步进电机',
        'zh-TW': '步進電機',
        en: 'Stepper Motors'
    },
    'products.filterServo': {
        zh: '伺服电机',
        'zh-TW': '伺服電機',
        en: 'Servo Motors'
    },
    'products.filterCustom': {
        zh: '定制方案',
        'zh-TW': '定製方案',
        en: 'Custom Solutions'
    },
    'products.viewDetail': {
        zh: '查看详情',
        'zh-TW': '查看詳情',
        en: 'View Details'
    },
    'products.hot': {
        zh: '热销',
        'zh-TW': '熱銷',
        en: 'Hot'
    },
    'products.new': {
        zh: '新品',
        'zh-TW': '新品',
        en: 'New'
    },
    // 产品1 - 直流无刷电机
    'products.p1.name': {
        zh: '直流无刷电机',
        'zh-TW': '直流無刷電機',
        en: 'Brushless DC Motor'
    },
    'products.p1.desc': {
        zh: '高效节能、低噪音、长寿命，适用于智能家居、工业自动化设备等场景。',
        'zh-TW': '高效節能、低噪音、長壽命，適用於智能家電、工業自動化設備等場景。',
        en: 'High efficiency, low noise, long service life, suitable for smart home and industrial automation equipment.'
    },
    'products.p1.tag1': { zh: '高效节能', 'zh-TW': '高效節能', en: 'High Efficiency' },
    'products.p1.tag2': { zh: '低噪音', 'zh-TW': '低噪音', en: 'Low Noise' },
    'products.p1.tag3': { zh: '长寿命', 'zh-TW': '長壽命', en: 'Long Life' },
    // 产品2 - 步进电机
    'products.p2.name': {
        zh: '步进电机',
        'zh-TW': '步進電機',
        en: 'Stepper Motor'
    },
    'products.p2.desc': {
        zh: '高精度、高扭矩、响应快，广泛应用于3D打印、数控机床、机器人等领域。',
        'zh-TW': '高精度、高扭矩、響應快，廣泛應用於3D列印、數控機床、機器人等領域。',
        en: 'High precision, high torque, fast response, widely used in 3D printing, CNC machines, robotics and more.'
    },
    'products.p2.tag1': { zh: '高精度', 'zh-TW': '高精度', en: 'High Precision' },
    'products.p2.tag2': { zh: '高扭矩', 'zh-TW': '高扭矩', en: 'High Torque' },
    'products.p2.tag3': { zh: '响应快', 'zh-TW': '響應快', en: 'Fast Response' },
    // 产品3 - 伺服电机
    'products.p3.name': {
        zh: '伺服电机',
        'zh-TW': '伺服電機',
        en: 'Servo Motor'
    },
    'products.p3.desc': {
        zh: '高动态响应、精准定位，适用于高端自动化生产线、新能源汽车配套设备。',
        'zh-TW': '高動態響應、精準定位，適用於高端自動化生產線、新能源汽車配套設備。',
        en: 'High dynamic response, precise positioning, suitable for high-end automated production lines and new energy vehicle equipment.'
    },
    'products.p3.tag1': { zh: '动态响应', 'zh-TW': '動態響應', en: 'Dynamic Response' },
    'products.p3.tag2': { zh: '精准定位', 'zh-TW': '精準定位', en: 'Precise Positioning' },
    'products.p3.tag3': { zh: '高性能', 'zh-TW': '高性能', en: 'High Performance' },
    // 产品4 - 微型直流无刷电机
    'products.p4.name': {
        zh: '微型直流无刷电机',
        'zh-TW': '微型直流無刷電機',
        en: 'Micro Brushless DC Motor'
    },
    'products.p4.desc': {
        zh: '超小型设计，适用于医疗器械、精密仪器等空间受限场景。',
        'zh-TW': '超小型設計，適用於醫療器械、精密儀器等空間受限場景。',
        en: 'Ultra-compact design, suitable for medical devices, precision instruments and other space-limited applications.'
    },
    'products.p4.tag1': { zh: '超小型', 'zh-TW': '超小型', en: 'Ultra-Compact' },
    'products.p4.tag2': { zh: '精密控制', 'zh-TW': '精密控制', en: 'Precision Control' },
    'products.p4.tag3': { zh: '低振动', 'zh-TW': '低振動', en: 'Low Vibration' },
    // 产品5 - 闭环步进电机
    'products.p5.name': {
        zh: '闭环步进电机',
        'zh-TW': '閉環步進電機',
        en: 'Closed-loop Stepper Motor'
    },
    'products.p5.desc': {
        zh: '集成编码器闭环控制，兼具步进电机简便性与伺服电机精度。',
        'zh-TW': '集成編碼器閉環控制，兼具步進電機簡便性與伺服電機精度。',
        en: 'Integrated encoder closed-loop control, combining stepper motor simplicity with servo motor precision.'
    },
    'products.p5.tag1': { zh: '闭环控制', 'zh-TW': '閉環控制', en: 'Closed-loop' },
    'products.p5.tag2': { zh: '高精度', 'zh-TW': '高精度', en: 'High Precision' },
    'products.p5.tag3': { zh: '不失步', 'zh-TW': '不失步', en: 'No Step Loss' },
    // 产品6 - 定制化解决方案
    'products.p6.name': {
        zh: '定制化解决方案',
        'zh-TW': '定製化解決方案',
        en: 'Custom Solutions'
    },
    'products.p6.desc': {
        zh: '根据客户需求定制电机参数、外观及接口，提供一站式电机解决方案。',
        'zh-TW': '根據客戶需求定製電機參數、外觀及接口，提供一站式電機解決方案。',
        en: 'Customize motor parameters, appearance and interfaces according to customer needs, providing one-stop motor solutions.'
    },
    'products.p6.tag1': { zh: '按需定制', 'zh-TW': '按需定製', en: 'On-demand' },
    'products.p6.tag2': { zh: '专属设计', 'zh-TW': '專屬設計', en: 'Custom Design' },
    'products.p6.tag3': { zh: '一站式', 'zh-TW': '一站式', en: 'One-stop' },

    // 产品模态框
    'products.modal.specs': {
        zh: '产品规格',
        'zh-TW': '產品規格',
        en: 'Specifications'
    },
    'products.modal.quote': {
        zh: '咨询报价',
        'zh-TW': '諮詢報價',
        en: 'Request Quote'
    },
    'products.modal.download': {
        zh: '下载规格书',
        'zh-TW': '下載規格書',
        en: 'Download Specs'
    },

    // ============================================
    // 新闻动态
    // ============================================
    'news.subtitle': {
        zh: 'News',
        'zh-TW': 'News',
        en: 'News'
    },
    'news.title': {
        zh: '新闻动态',
        'zh-TW': '新聞動態',
        en: 'Latest News'
    },
    'news.desc': {
        zh: '了解新思考电机最新资讯与行业动态',
        'zh-TW': '瞭解新思考電機最新資訊與行業動態',
        en: 'Stay updated with Shicoh Motor news and industry trends'
    },
    'news.tabAll': {
        zh: '全部',
        'zh-TW': '全部',
        en: 'All'
    },
    'news.tabCompany': {
        zh: '公司新闻',
        'zh-TW': '公司新聞',
        en: 'Company News'
    },
    'news.tabIndustry': {
        zh: '行业资讯',
        'zh-TW': '行業資訊',
        en: 'Industry Insights'
    },
    'news.tabProduct': {
        zh: '新品发布',
        'zh-TW': '新品發佈',
        en: 'New Products'
    },
    'news.readMore': {
        zh: '阅读全文',
        'zh-TW': '閱讀全文',
        en: 'Read More'
    },
    'news.loadMore': {
        zh: '加载更多',
        'zh-TW': '載入更多',
        en: 'Load More'
    },
    'news.allLoaded': {
        zh: '已加载全部',
        'zh-TW': '已載入全部',
        en: 'All Loaded'
    },
    'news.tagCompany': {
        zh: '公司新闻',
        'zh-TW': '公司新聞',
        en: 'Company'
    },
    'news.tagIndustry': {
        zh: '行业资讯',
        'zh-TW': '行業資訊',
        en: 'Industry'
    },
    'news.tagProduct': {
        zh: '新品发布',
        'zh-TW': '新品發佈',
        en: 'New Product'
    },

    // ============================================
    // 合作伙伴
    // ============================================
    'partners.subtitle': {
        zh: 'Partners',
        'zh-TW': 'Partners',
        en: 'Partners'
    },
    'partners.title': {
        zh: '合作伙伴',
        'zh-TW': '合作夥伴',
        en: 'Our Partners'
    },
    'partners.desc': {
        zh: '携手全球知名企业，共创行业未来',
        'zh-TW': '攜手全球知名企業，共創行業未來',
        en: 'Partnering with global leading enterprises to shape the future'
    },

    // ============================================
    // 联系我们
    // ============================================
    'contact.subtitle': {
        zh: 'Contact',
        'zh-TW': 'Contact',
        en: 'Contact'
    },
    'contact.title': {
        zh: '联系我们',
        'zh-TW': '聯繫我們',
        en: 'Contact Us'
    },
    'contact.desc': {
        zh: '我们期待为您提供专业的电机解决方案',
        'zh-TW': '我們期待為您提供專業的電機解決方案',
        en: 'We look forward to providing professional motor solutions for you'
    },
    'contact.infoTitle': {
        zh: '联系方式',
        'zh-TW': '聯繫方式',
        en: 'Contact Information'
    },
    'contact.address': {
        zh: '公司地址',
        'zh-TW': '公司地址',
        en: 'Address'
    },
    'contact.addressValue': {
        zh: '江苏省苏州市工业园区智能制造产业园88号',
        'zh-TW': '江蘇省蘇州市工業園區智能製造產業園88號',
        en: 'No.88, Intelligent Manufacturing Industrial Park, Suzhou Industrial Park, Jiangsu, China'
    },
    'contact.phone': {
        zh: '联系电话',
        'zh-TW': '聯繫電話',
        en: 'Phone'
    },
    'contact.email': {
        zh: '电子邮箱',
        'zh-TW': '電子郵箱',
        en: 'Email'
    },
    'contact.workHours': {
        zh: '工作时间',
        'zh-TW': '工作時間',
        en: 'Working Hours'
    },
    'contact.workHoursValue': {
        zh: '周一至周五 8:30-17:30',
        'zh-TW': '週一至週五 8:30-17:30',
        en: 'Mon - Fri 8:30 - 17:30'
    },
    'contact.mapText': {
        zh: '江苏省苏州市工业园区',
        'zh-TW': '江蘇省蘇州市工業園區',
        en: 'Suzhou Industrial Park, Jiangsu, China'
    },
    'contact.formTitle': {
        zh: '留言咨询',
        'zh-TW': '留言諮詢',
        en: 'Leave a Message'
    },
    'contact.formDesc': {
        zh: '请填写以下信息，我们将尽快与您联系',
        'zh-TW': '請填寫以下資訊，我們將盡快與您聯繫',
        en: 'Please fill in the information below, we will contact you soon'
    },
    'contact.name': {
        zh: '姓名',
        'zh-TW': '姓名',
        en: 'Name'
    },
    'contact.namePlaceholder': {
        zh: '请输入您的姓名',
        'zh-TW': '請輸入您的姓名',
        en: 'Please enter your name'
    },
    'contact.phoneField': {
        zh: '电话',
        'zh-TW': '電話',
        en: 'Phone'
    },
    'contact.phonePlaceholder': {
        zh: '请输入您的联系电话',
        'zh-TW': '請輸入您的聯繫電話',
        en: 'Please enter your phone number'
    },
    'contact.emailField': {
        zh: '邮箱',
        'zh-TW': '郵箱',
        en: 'Email'
    },
    'contact.emailPlaceholder': {
        zh: '请输入您的邮箱（选填）',
        'zh-TW': '請輸入您的郵箱（選填）',
        en: 'Please enter your email (optional)'
    },
    'contact.subject': {
        zh: '咨询主题',
        'zh-TW': '諮詢主題',
        en: 'Subject'
    },
    'contact.subjectPlaceholder': {
        zh: '请选择咨询主题',
        'zh-TW': '請選擇諮詢主題',
        en: 'Please select a subject'
    },
    'contact.subjectProduct': {
        zh: '产品咨询',
        'zh-TW': '產品諮詢',
        en: 'Product Inquiry'
    },
    'contact.subjectQuote': {
        zh: '获取报价',
        'zh-TW': '獲取報價',
        en: 'Get Quote'
    },
    'contact.subjectTech': {
        zh: '技术支持',
        'zh-TW': '技術支援',
        en: 'Technical Support'
    },
    'contact.subjectCooperation': {
        zh: '商务合作',
        'zh-TW': '商務合作',
        en: 'Business Cooperation'
    },
    'contact.subjectOther': {
        zh: '其他',
        'zh-TW': '其他',
        en: 'Other'
    },
    'contact.message': {
        zh: '留言内容',
        'zh-TW': '留言內容',
        en: 'Message'
    },
    'contact.messagePlaceholder': {
        zh: '请输入您想咨询的内容',
        'zh-TW': '請輸入您想諮詢的內容',
        en: 'Please enter your message'
    },
    'contact.submit': {
        zh: '提交留言',
        'zh-TW': '提交留言',
        en: 'Submit'
    },
    'contact.submitting': {
        zh: '提交中...',
        'zh-TW': '提交中...',
        en: 'Submitting...'
    },

    // ============================================
    // 页脚
    // ============================================
    'footer.desc': {
        zh: '新思考电机专注于各类微特电机的研发、生产与销售，为全球客户提供高品质的电机解决方案。',
        'zh-TW': '新思考電機專注於各類微特電機的研發、生產與銷售，為全球客戶提供高品質的電機解決方案。',
        en: 'Shicoh Motor focuses on the R&D, production and sales of various micro special motors, providing high-quality motor solutions globally.'
    },
    'footer.aboutUs': {
        zh: '关于我们',
        'zh-TW': '關於我們',
        en: 'About Us'
    },
    'footer.aboutCompany': {
        zh: '企业简介',
        'zh-TW': '企業簡介',
        en: 'Company Profile'
    },
    'footer.aboutHistory': {
        zh: '发展历程',
        'zh-TW': '發展歷程',
        en: 'Our History'
    },
    'footer.aboutHonor': {
        zh: '荣誉资质',
        'zh-TW': '榮譽資質',
        en: 'Honors & Qualifications'
    },
    'footer.aboutCulture': {
        zh: '企业文化',
        'zh-TW': '企業文化',
        en: 'Corporate Culture'
    },
    'footer.productsTitle': {
        zh: '产品中心',
        'zh-TW': '產品中心',
        en: 'Products'
    },
    'footer.productBrushless': {
        zh: '直流无刷电机',
        'zh-TW': '直流無刷電機',
        en: 'Brushless DC Motors'
    },
    'footer.productStepper': {
        zh: '步进电机',
        'zh-TW': '步進電機',
        en: 'Stepper Motors'
    },
    'footer.productServo': {
        zh: '伺服电机',
        'zh-TW': '伺服電機',
        en: 'Servo Motors'
    },
    'footer.productCustom': {
        zh: '定制化解决方案',
        'zh-TW': '定製化解決方案',
        en: 'Custom Solutions'
    },
    'footer.supportTitle': {
        zh: '服务支持',
        'zh-TW': '服務支援',
        en: 'Support'
    },
    'footer.supportTech': {
        zh: '技术支持',
        'zh-TW': '技術支援',
        en: 'Technical Support'
    },
    'footer.supportAfterSale': {
        zh: '售后服务',
        'zh-TW': '售後服務',
        en: 'After-sales Service'
    },
    'footer.supportFaq': {
        zh: '常见问题',
        'zh-TW': '常見問題',
        en: 'FAQ'
    },
    'footer.supportDownload': {
        zh: '下载中心',
        'zh-TW': '下載中心',
        en: 'Downloads'
    },
    'footer.copyright': {
        zh: '© 2026 新思考电机股份有限公司 版权所有 | 苏ICP备12345678号',
        'zh-TW': '© 2026 新思考電機股份有限公司 版權所有 | 蘇ICP備12345678號',
        en: '© 2026 Shicoh Motor Co., Ltd. All Rights Reserved | Su ICP No.12345678'
    },

    // ============================================
    // 其他
    // ============================================
    'backToTop': {
        zh: '回到顶部',
        'zh-TW': '回到頂部',
        en: 'Back to Top'
    },
    'toast.submitSuccess': {
        zh: '留言提交成功！我们将在1个工作日内与您联系。',
        'zh-TW': '留言提交成功！我們將在1個工作日內與您聯繫。',
        en: 'Message submitted successfully! We will contact you within 1 business day.'
    },
    'toast.allNewsLoaded': {
        zh: '已加载全部新闻',
        'zh-TW': '已載入全部新聞',
        en: 'All news loaded'
    }
};

// ============================================
// 语言切换管理器
// ============================================
class I18n {
    constructor() {
        this.translations = translations;
        this.supportedLangs = ['zh', 'zh-TW', 'en'];
        this.langLabels = {
            'zh': '中文',
            'zh-TW': '繁體',
            'en': 'EN'
        };
        // 从 localStorage 获取保存的语言，默认简体中文
        this.currentLang = localStorage.getItem('shicoh-lang') || 'zh';
    }

    // 获取翻译文本
    t(key) {
        const entry = this.translations[key];
        if (!entry) return key;
        return entry[this.currentLang] || entry['zh'] || key;
    }

    // 切换语言
    setLang(lang) {
        if (!this.supportedLangs.includes(lang)) return;
        this.currentLang = lang;
        localStorage.setItem('shicoh-lang', lang);
        this.applyTranslations();
        // 更新 HTML lang 属性
        const langMap = { 'zh': 'zh-CN', 'zh-TW': 'zh-TW', 'en': 'en' };
        document.documentElement.lang = langMap[lang] || 'zh-CN';
    }

    // 获取当前语言
    getLang() {
        return this.currentLang;
    }

    // 应用所有翻译到页面
    applyTranslations() {
        // 更新所有带 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.t(key);
            if (text) {
                // 如果有 data-i18n-html 属性，使用 innerHTML（支持HTML标签如<span>）
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = text;
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder !== undefined) {
                        el.placeholder = text;
                    }
                } else if (el.tagName === 'OPTION') {
                    el.textContent = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // 更新所有带 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = this.t(key);
            if (text) {
                el.placeholder = text;
            }
        });

        // 更新所有带 data-i18n-title 属性的元素（页面标题等）
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const text = this.t(key);
            if (text) {
                el.title = text;
            }
        });

        // 更新页面 title
        const pageTitle = {
            zh: '新思考电机股份有限公司 - 专业电机研发与制造',
            'zh-TW': '新思考電機股份有限公司 - 專業電機研發與製造',
            en: 'Shicoh Motor Co., Ltd. - Professional Motor R&D and Manufacturing'
        };
        document.title = pageTitle[this.currentLang] || pageTitle.zh;

        // 更新 meta description
        const metaDesc = {
            zh: '新思考电机专注于各类微特电机的研发、生产与销售，为全球客户提供高品质的电机解决方案。',
            'zh-TW': '新思考電機專注於各類微特電機的研發、生產與銷售，為全球客戶提供高品質的電機解決方案。',
            en: 'Shicoh Motor focuses on R&D, production and sales of micro special motors, providing high-quality motor solutions globally.'
        };
        const metaDescEl = document.querySelector('meta[name="description"]');
        if (metaDescEl) {
            metaDescEl.content = metaDesc[this.currentLang] || metaDesc.zh;
        }

        // 更新语言切换下拉选项状态
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLang);
        });

        // 更新当前语言显示文本
        const langLabels = { 'zh': '中', 'zh-TW': '繁', 'en': 'EN' };
        const langCurrentEl = document.getElementById('langCurrent');
        if (langCurrentEl) {
            langCurrentEl.textContent = langLabels[this.currentLang] || '中';
        }
    }
}

// 创建全局实例
const i18n = new I18n();

// 导出
window.I18n = I18n;
window.i18n = i18n;
window.translations = translations;
