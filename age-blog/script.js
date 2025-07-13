document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const ctaButton = document.querySelector('.cta-button');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    ctaButton.addEventListener('click', function() {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.blog-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = card.querySelector('h3').textContent;
            showModal(title);
        });
    });
    
    function showModal(title) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>可恶！你居然想看本小姐的文章详情...</p>
                    <p>虽然还没有写完整的内容，但是本小姐会努力的！</p>
                    <p>（才不是因为害羞才没写完呢！）</p>
                    <div class="modal-actions">
                        <button class="btn-primary">点赞 💖</button>
                        <button class="btn-secondary">收藏 ✨</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    }
    
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const messages = [
                '可恶！本小姐还没有开通这个呢！',
                '真是的，想联系本小姐要等等哦～',
                '哼！暂时还不能通过这个方式找到本小姐！',
                '纳尼？本小姐正在准备中...'
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showToast(randomMessage);
        });
    });
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.className = 'floating-heart-random';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'floatUp 4s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                document.body.removeChild(heart);
            }, 4000);
        }, 5000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            transform: translateY(-50px);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .modal-header h3 {
            color: var(--primary-color);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        
        .modal-close:hover {
            color: var(--primary-color);
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: var(--gradient-pink);
            color: white;
        }
        
        .btn-secondary {
            background: var(--gradient-blue);
            color: white;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-pink);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10001;
            font-weight: 600;
        }
        
        .toast.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
    
    createHearts();
    
    document.addEventListener('click', function(e) {
        if (Math.random() < 0.1) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '1rem';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                document.body.removeChild(sparkle);
            }, 1000);
        }
    });
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleEffect {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
});