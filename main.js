document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Navigation Bar
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    });
  }

  // ==========================================
  // 2. Mobile Menu (Hamburger)
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const toggleMobileLinks = document.querySelectorAll('.toggle-mobile-menu');

  if (hamburger && mobileNav) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      const spans = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    toggleMobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  // ==========================================
  // 3. Scroll Reveal Animations (Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // ==========================================
  // 4. Statistics Animated Counters
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const countUp = (counterEl) => {
      const target = +counterEl.getAttribute('data-target');
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counterEl.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counterEl.innerText = target + (target === 98 ? '%' : '+');
        }
      };
      
      updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ==========================================
  // 5. Interactive Schedule Day Tabs
  // ==========================================
  const scheduleTabs = document.querySelectorAll('.schedule-tab');
  const dayPanels = document.querySelectorAll('.schedule-day-panel');

  if (scheduleTabs.length > 0 && dayPanels.length > 0) {
    scheduleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        scheduleTabs.forEach(t => t.classList.remove('active'));
        dayPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const selectedDay = tab.getAttribute('data-day');
        const targetPanel = document.getElementById(selectedDay);
        if (targetPanel) {
          targetPanel.classList.add('active');
          const panelReveals = targetPanel.querySelectorAll('.reveal');
          panelReveals.forEach(el => el.classList.add('active'));
        }
      });
    });
  }

  // ==========================================
  // 6. Testimonial Slider / Carousel
  // ==========================================
  const slider = document.getElementById('testimonials-slider');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (slider && dots.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (index) => {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentSlide = index;
    };

    const nextSlide = () => {
      let next = currentSlide + 1;
      if (next >= dots.length) {
        next = 0;
      }
      goToSlide(next);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const resetSlideShow = () => {
      clearInterval(slideInterval);
      startSlideShow();
    };

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        goToSlide(index);
        resetSlideShow();
      });
    });

    startSlideShow();
  }

  // ==========================================
  // 7. Interactive Picture Gallery Lightbox
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // 8. Booking Modal Operations
  // ==========================================
  const modalOverlay = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalSuccessCloseBtn = document.getElementById('modal-success-close-btn');
  const bookingForm = document.getElementById('booking-form');
  const formContent = document.getElementById('modal-form-content');
  const successContent = document.getElementById('modal-success-content');
  const classDropdown = document.getElementById('booking-class');
  const openBookingBtns = document.querySelectorAll('.open-booking-btn');

  if (modalOverlay && modalCloseBtn && bookingForm && formContent && successContent && classDropdown) {
    const openModal = (defaultOption = '', isPlan = false) => {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      formContent.style.display = 'block';
      successContent.style.display = 'none';

      if (defaultOption) {
        if (isPlan) {
          const notesArea = document.getElementById('booking-notes');
          if (notesArea) notesArea.value = `Hi, I am interested in joining the "${defaultOption}" membership tier.`;
          classDropdown.value = '';
        } else {
          let selectVal = '';
          if (defaultOption.includes('Sunrise Yoga Fusion')) selectVal = 'Sunrise Yoga Fusion';
          else if (defaultOption.includes('Precision Reformer Flow')) selectVal = 'Precision Pilates';
          else if (defaultOption.includes('Core Pilates Reformer')) selectVal = 'Precision Pilates';
          else if (defaultOption.includes('Classic Barre Burn')) selectVal = 'Classic Barre Burn';
          else if (defaultOption.includes('Deep Sound Bath')) selectVal = 'Deep Sound Bath & Breath';
          else if (defaultOption.includes('Sound Bath & Meditation')) selectVal = 'Deep Sound Bath & Breath';
          else if (defaultOption.includes('VYORA Athletic HIIT')) selectVal = 'VYORA Athletic HIIT';
          else if (defaultOption.includes('VYORA Athletic Masterclass')) selectVal = 'VYORA Athletic HIIT';
          else if (defaultOption.includes('Deep Restorative Stretch')) selectVal = 'Deep Restorative Stretch';
          else if (defaultOption.includes('Sunday Restorative')) selectVal = 'Deep Restorative Stretch';
          
          classDropdown.value = selectVal;
          
          const notesArea = document.getElementById('booking-notes');
          if (notesArea) notesArea.value = `Requesting booking slot: ${defaultOption}`;
        }
      } else {
        bookingForm.reset();
      }
    };

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    openBookingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenClass = btn.getAttribute('data-class');
        const chosenPlan = btn.getAttribute('data-plan');
        
        if (chosenClass) {
          openModal(chosenClass, false);
        } else if (chosenPlan) {
          openModal(chosenPlan, true);
        } else {
          openModal();
        }
      });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    if (modalSuccessCloseBtn) {
      modalSuccessCloseBtn.addEventListener('click', closeModal);
    }
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('booking-name').value.trim();
      const email = document.getElementById('booking-email').value.trim();

      if (name && email) {
        formContent.style.display = 'none';
        successContent.style.display = 'block';
        bookingForm.reset();
      }
    });
  }

  // ==========================================
  // 8.5 Contact Form Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      
      if (name && email) {
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';
        contactForm.reset();
      }
    });
  }

  // ==========================================
  // 9. Newsletter Form Submission
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const userEmail = emailInput ? emailInput.value.trim() : '';
      
      if (userEmail) {
        alert(`Thank you! A verification link has been sent to ${userEmail}. Welcome to VYORA.`);
        newsletterForm.reset();
      }
    });
  }

  // ==========================================
  // 9.2 FAQ Accordion Interactivity
  // ==========================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.parentElement;
      const faqContent = faqItem.querySelector('.faq-content');
      
      // Close other active FAQs in this list for a premium feel
      const accordion = faqItem.parentElement;
      const activeItems = accordion.querySelectorAll('.faq-item.active');
      activeItems.forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.maxHeight = '0px';
        }
      });

      // Toggle active state
      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
      } else {
        faqContent.style.maxHeight = '0px';
      }
    });
  });

  // ==========================================
  // 9.4 Amenities Showcase Slider Interactivity
  // ==========================================
  const amenitiesTrack = document.getElementById('amenities-track');
  const amenitiesDots = document.querySelectorAll('#amenities-dots .testimonial-dot');
  if (amenitiesTrack && amenitiesDots.length > 0) {
    amenitiesDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIdx = parseInt(e.target.getAttribute('data-slide'));
        amenitiesTrack.style.transform = `translateX(-${slideIdx * 100}%)`;
        amenitiesDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  }

  // ==========================================
  // 9.6 Coach Insights Mantras Slider Interactivity
  // ==========================================
  const insightsSlider = document.getElementById('insights-slider');
  const insightsDots = document.querySelectorAll('#insights-dots .testimonial-dot');
  if (insightsSlider && insightsDots.length > 0) {
    insightsDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIdx = parseInt(e.target.getAttribute('data-insight-idx'));
        insightsSlider.style.transform = `translateX(-${slideIdx * 100}%)`;
        insightsDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  }

  // ==========================================
  // 9.8 Generic Page Category Filters (Movement Pillars, Trainers, Gallery, Blog)
  // ==========================================
  const initPageFilters = () => {
    // Helper to initialize filters for any section/page
    const initFilterGroup = (filterContainerSelector, cardsContainerSelector, cardSelector, extraCallback = null) => {
      const container = document.querySelector(filterContainerSelector);
      const grid = document.querySelector(cardsContainerSelector);
      if (!container || !grid) return;

      const btns = container.querySelectorAll('.blog-filter-btn');
      const cards = grid.querySelectorAll(cardSelector);
      if (btns.length === 0 || cards.length === 0) return;

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const chosenFilter = btn.getAttribute('data-filter');
          
          if (extraCallback) {
            extraCallback(chosenFilter);
          }

          cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (chosenFilter === 'all' || category === chosenFilter) {
              card.style.display = '';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    };

    // 1. Movement Pillars Filters (programs.html)
    initFilterGroup('#programs .blog-filters', '#programs-pillar-grid', '.program-card');

    // 2. Trainers Filters (trainers.html)
    initFilterGroup('#trainer-filters', '#trainers-pillar-grid', '.trainer-card');

    // 3. Gallery Filters (gallery.html)
    initFilterGroup('#gallery-filters', '#programs-pillar-grid', '.gallery-item');

    // 4. Blog Filters (blog.html)
    const featuredBanner = document.querySelector('#blog .blog-featured-banner');
    initFilterGroup('#blog .blog-filters', '#blog .blog-grid', '.blog-card', (chosenFilter) => {
      if (featuredBanner) {
        if (chosenFilter === 'all') {
          featuredBanner.style.display = '';
          setTimeout(() => {
            featuredBanner.style.opacity = '1';
            featuredBanner.style.transform = 'translateY(0)';
          }, 50);
        } else {
          featuredBanner.style.opacity = '0';
          featuredBanner.style.transform = 'translateY(20px)';
          setTimeout(() => {
            featuredBanner.style.display = 'none';
          }, 300);
        }
      }
    });
  };
  initPageFilters();

  // ==========================================
  // 10. Theme Switcher (Light / Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('vyora-theme');
  const isHome2 = window.location.pathname.includes('home2.html');
  
  // Initialize theme from saved preference or default
  if (savedTheme === 'dark' || (!savedTheme && isHome2)) {
    document.body.classList.add('theme-dark');
  } else if (savedTheme === 'light') {
    document.body.classList.remove('theme-dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const isDark = document.body.classList.contains('theme-dark');
      localStorage.setItem('vyora-theme', isDark ? 'dark' : 'light');
    });
  }

  // ==========================================
  // 11. Class Schedule Diurnal Time Filters & Interactivity
  // ==========================================
  const scheduleFilterBtns = document.querySelectorAll('.schedule-filter-btn');
  const scheduleRows = document.querySelectorAll('.schedule-row');
  
  // Helper to parse time and return 'morning', 'afternoon', or 'evening'
  const getTimeOfDay = (row) => {
    const timeEl = row.querySelector('.schedule-time');
    if (!timeEl) return 'all';
    
    const text = timeEl.textContent.trim().toLowerCase();
    const match = text.match(/(\d{1,2}):(\d{2})\s*(am|pm)/);
    if (!match) return 'all';
    
    const hour = parseInt(match[1]);
    const ampm = match[3];
    
    if (ampm === 'am') {
      if (hour >= 6 && hour < 12) return 'morning';
      if (hour < 6 || hour === 12) return 'morning';
    } else { // pm
      if (hour === 12 || (hour >= 1 && hour < 5)) return 'afternoon';
      if (hour >= 5 && hour < 12) return 'evening';
    }
    return 'all';
  };

  const applyActiveDiurnalFilter = (panel) => {
    const activeFilterBtn = document.querySelector('.schedule-filter-btn.active');
    if (activeFilterBtn) {
      const filter = activeFilterBtn.getAttribute('data-filter');
      const panelRows = panel.querySelectorAll('.schedule-row');
      panelRows.forEach(row => {
        const timeOfDay = getTimeOfDay(row);
        if (filter === 'all' || timeOfDay === filter) {
          row.style.display = '';
          row.style.opacity = '1';
        } else {
          row.style.display = 'none';
          row.style.opacity = '0';
        }
      });
    }
  };

  if (scheduleFilterBtns.length > 0) {
    scheduleFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scheduleFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        scheduleRows.forEach(row => {
          // Only filter rows inside the active day panel
          const activePanel = row.closest('.schedule-day-panel.active');
          if (activePanel) {
            const timeOfDay = getTimeOfDay(row);
            if (filter === 'all' || timeOfDay === filter) {
              row.style.display = '';
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            } else {
              row.style.display = 'none';
              row.style.opacity = '0';
            }
          }
        });
      });
    });

    // Hook into schedule tab changes to apply filter dynamically
    if (scheduleTabs.length > 0 && dayPanels.length > 0) {
      scheduleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const selectedDay = tab.getAttribute('data-day');
          const targetPanel = document.getElementById(selectedDay);
          if (targetPanel) {
            applyActiveDiurnalFilter(targetPanel);
          }
        });
      });
    }
  }

  // ==========================================
  // 12. Member Dashboard Client-Side Portal Widgets
  // ==========================================
  
  // 12.1 SVG Goals Circular Progress Ring Animation
  const progressCircle = document.getElementById('goal-progress-circle');
  if (progressCircle) {
    setTimeout(() => {
      progressCircle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      progressCircle.style.strokeDashoffset = '75'; // 80% progress of 377 perimeter
    }, 400);
  }

  // 12.2 Hydration Widget Log Counter
  const logWaterBtn = document.getElementById('log-water-btn');
  const waterText = document.getElementById('water-text');
  const waterDropsGrid = document.getElementById('water-drops-grid');
  
  if (logWaterBtn && waterText && waterDropsGrid) {
    let cupsLogged = 4; // Starting default is 4
    
    logWaterBtn.addEventListener('click', () => {
      const waterDrops = waterDropsGrid.querySelectorAll('.water-drop');
      if (cupsLogged < 8) {
        cupsLogged++;
        waterText.innerText = `${cupsLogged} / 8 Cups Logged`;
        
        const nextDrop = waterDrops[cupsLogged - 1];
        if (nextDrop) {
          nextDrop.classList.add('filled');
          nextDrop.style.transform = 'scale(1.4)';
          setTimeout(() => {
            nextDrop.style.transform = 'scale(1)';
          }, 200);
        }
        
        if (cupsLogged === 8) {
          waterText.innerHTML = `8 / 8 Cups Logged <span style="color: var(--color-orange);">Goal Achieved! ðŸŽ‰</span>`;
          logWaterBtn.innerHTML = `<i class="fas fa-check"></i> Fully Hydrated`;
          logWaterBtn.style.backgroundColor = 'var(--color-cream)';
          logWaterBtn.style.color = 'var(--color-gray)';
          logWaterBtn.style.borderColor = 'transparent';
          logWaterBtn.disabled = true;
        }
      }
    });
  }

  // 12.3 Cancel Class Booking Feed Actions (Using Event Delegation for Dynamically Added Cards)
  const bookingsFeed = document.getElementById('bookings-feed');
  const emptyWarning = document.getElementById('empty-bookings-warning');
  
  if (bookingsFeed && emptyWarning) {
    bookingsFeed.addEventListener('click', (e) => {
      const cancelBtn = e.target.closest('.cancel-booking-btn');
      if (cancelBtn) {
        const targetId = cancelBtn.getAttribute('data-target');
        const targetSlot = document.getElementById(targetId);
        if (targetSlot) {
          targetSlot.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          targetSlot.style.opacity = '0';
          targetSlot.style.transform = 'scale(0.95) translateY(10px)';
          targetSlot.style.maxHeight = '0px';
          targetSlot.style.padding = '0px';
          targetSlot.style.margin = '0px';
          targetSlot.style.borderWidth = '0px';
          
          setTimeout(() => {
            targetSlot.remove();
            
            const remainingBookings = bookingsFeed.querySelectorAll('.faq-item');
            if (remainingBookings.length === 0) {
              emptyWarning.style.display = 'block';
              emptyWarning.style.opacity = '0';
              emptyWarning.style.transform = 'translateY(15px)';
              emptyWarning.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
              
              setTimeout(() => {
                emptyWarning.style.opacity = '1';
                emptyWarning.style.transform = 'translateY(0)';
              }, 50);
            }
          }, 500);
        }
      }
    });
  }

  // ==========================================
  // 13. Header Profile Account Dropdown Toggling
  // ==========================================
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userMenuContainer = document.getElementById('user-menu-container');

  if (userProfileBtn && userDropdown) {
    userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (userMenuContainer && !userMenuContainer.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 14. Authentication Modals & Swapping logic
  // ==========================================
  const authModal = document.getElementById('authModal');
  const authClose = document.getElementById('auth-close');
  const navLoginBtn = document.getElementById('nav-login-btn');
  const navSignupBtn = document.getElementById('nav-signup-btn');
  const loginFormContent = document.getElementById('login-form-content');
  const signupFormContent = document.getElementById('signup-form-content');
  const forgotFormContent = document.getElementById('forgot-password-content');
  const forgotPasswordBtn = document.getElementById('forgot-password-btn');
  const goToLoginFromForgot = document.getElementById('go-to-login-from-forgot');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const forgotSuccessContent = document.getElementById('forgot-success-content');
  const forgotSuccessBackBtn = document.getElementById('forgot-success-back-btn');
  const goToSignup = document.getElementById('go-to-signup');
  const goToLogin = document.getElementById('go-to-login');
  
  const openAuthModal = (view = 'login') => {
    if (authModal) {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Hide forgot success state initially when opening modal
      if (forgotSuccessContent) forgotSuccessContent.style.display = 'none';
      if (forgotPasswordForm) forgotPasswordForm.style.display = 'block';
      
      if (view === 'login') {
        if (loginFormContent) loginFormContent.style.display = 'block';
        if (signupFormContent) signupFormContent.style.display = 'none';
        if (forgotFormContent) forgotFormContent.style.display = 'none';
      } else if (view === 'signup') {
        if (loginFormContent) loginFormContent.style.display = 'none';
        if (signupFormContent) signupFormContent.style.display = 'block';
        if (forgotFormContent) forgotFormContent.style.display = 'none';
      } else if (view === 'forgot') {
        if (loginFormContent) loginFormContent.style.display = 'none';
        if (signupFormContent) signupFormContent.style.display = 'none';
        if (forgotFormContent) forgotFormContent.style.display = 'block';
      }
    }
  };

  const closeAuthModal = () => {
    if (authModal) {
      authModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (navLoginBtn) {
    navLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // If we are on the login page, we toggle the tabs
      if (window.location.pathname.includes('login.html')) {
        const tab = document.querySelector('.auth-tab[data-tab="login"]');
        if (tab) tab.click();
      } else {
        if (userDropdown) userDropdown.classList.remove('active');
        window.location.href = 'login.html?view=login';
      }
    });
  }

  if (navSignupBtn) {
    navSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.location.pathname.includes('login.html')) {
        const tab = document.querySelector('.auth-tab[data-tab="signup"]');
        if (tab) tab.click();
      } else {
        if (userDropdown) userDropdown.classList.remove('active');
        window.location.href = 'login.html?view=signup';
      }
    });
  }

  if (authClose) {
    authClose.addEventListener('click', closeAuthModal);
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });
  }

  if (goToSignup) {
    goToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginFormContent) loginFormContent.style.display = 'none';
      if (signupFormContent) signupFormContent.style.display = 'block';
      if (forgotFormContent) forgotFormContent.style.display = 'none';
    });
  }

  if (goToLogin) {
    goToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      if (signupFormContent) signupFormContent.style.display = 'none';
      if (loginFormContent) loginFormContent.style.display = 'block';
      if (forgotFormContent) forgotFormContent.style.display = 'none';
    });
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('forgot');
    });
  }

  if (goToLoginFromForgot) {
    goToLoginFromForgot.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('login');
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = forgotPasswordForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        forgotPasswordForm.style.display = 'none';
        if (forgotSuccessContent) forgotSuccessContent.style.display = 'block';
      }, 1000);
    });
  }

  if (forgotSuccessBackBtn) {
    forgotSuccessBackBtn.addEventListener('click', () => {
      openAuthModal('login');
    });
  }

  // Password Visibility Toggle Function
  const initPasswordToggles = () => {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.password-toggle-btn');
      if (btn) {
        e.preventDefault();
        const wrapper = btn.closest('.password-input-wrapper');
        if (wrapper) {
          const input = wrapper.querySelector('input');
          const icon = btn.querySelector('i');
          if (input && icon) {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            if (isPassword) {
              icon.className = 'far fa-eye-slash';
            } else {
              icon.className = 'far fa-eye';
            }
          }
        }
      }
    });
  };
  initPasswordToggles();

  // Login Form Submission simulation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Authentication successful! Opening your premium sanctuary portal.');
      closeAuthModal();
      window.location.href = 'dashboard.html';
    });
  }

  // Signup Form Submission simulation
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Registration successful! Welcome to the VYORA collective.');
      closeAuthModal();
      window.location.href = 'dashboard.html';
    });
  }

  // Password Strength Meter Check
  const signupPassword = document.getElementById('signup-password');
  const strengthBar = document.getElementById('password-strength-bar');
  const strengthText = document.getElementById('password-strength-text');

  if (signupPassword && strengthBar && strengthText) {
    signupPassword.addEventListener('input', () => {
      const val = signupPassword.value;
      let strength = 0;

      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Strength: Empty';
        strengthBar.style.backgroundColor = '#E74C3C';
      } else if (strength <= 1) {
        strengthBar.style.width = '25%';
        strengthText.textContent = 'Strength: Weak';
        strengthBar.style.backgroundColor = '#E74C3C'; // Red
      } else if (strength === 2) {
        strengthBar.style.width = '50%';
        strengthText.textContent = 'Strength: Moderate';
        strengthBar.style.backgroundColor = '#F39C12'; // Orange
      } else if (strength === 3) {
        strengthBar.style.width = '75%';
        strengthText.textContent = 'Strength: Good';
        strengthBar.style.backgroundColor = '#3498DB'; // Blue
      } else if (strength === 4) {
        strengthBar.style.width = '100%';
        strengthText.innerHTML = 'Strength: <span style="color: #2ECC71; font-weight: 700;">Excellent! âœ¨</span>';
        strengthBar.style.backgroundColor = '#2ECC71'; // Green
      }
    });
  }

  // ==========================================
  // 15. Dashboard Sidebar Panel Switcher Tabbing
  // ==========================================
  const dashSidebarLinks = document.querySelectorAll('.dash-sidebar .dash-sidebar-link');
  const dashPanes = document.querySelectorAll('.dash-pane');

  if (dashSidebarLinks.length > 0 && dashPanes.length > 0) {
    dashSidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // If logout, let standard navigation execute
        if (link.classList.contains('logout-link')) {
          return;
        }

        e.preventDefault();
        const targetPaneId = link.getAttribute('data-pane');
        const targetPane = document.getElementById(targetPaneId);

        if (targetPane) {
          // Remove active state
          dashSidebarLinks.forEach(l => l.classList.remove('active'));
          dashPanes.forEach(p => p.classList.remove('active'));

          // Add active state to selected
          link.classList.add('active');
          targetPane.classList.add('active');

          // Trigger smooth scroll or animation activation
          const paneReveals = targetPane.querySelectorAll('.reveal');
          paneReveals.forEach(el => el.classList.add('active'));
        }
      });
    });
  }

  // Go to Book Class redirection within Member Dashboard
  const dashGoToBookBtns = document.querySelectorAll('.dash-go-to-book-btn');
  if (dashGoToBookBtns.length > 0) {
    dashGoToBookBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const bookLink = document.querySelector('.dash-sidebar-link[data-pane="member-dash-book"]');
        if (bookLink) {
          bookLink.click();
        }
      });
    });
  }

  // ==========================================
  // 16. In-Dashboard Direct Bookings Scheduler Flow
  // ==========================================
  const dashBookingActionBtns = document.querySelectorAll('.dash-booking-action-btn');
  if (dashBookingActionBtns.length > 0 && bookingsFeed) {
    dashBookingActionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const className = btn.getAttribute('data-class');
        const day = btn.getAttribute('data-day');
        const time = btn.getAttribute('data-time');
        const coach = btn.getAttribute('data-coach');
        const slotId = 'booking-slot-' + Math.floor(Math.random() * 100000);

        // Remove active state of empty warning
        if (emptyWarning) emptyWarning.style.display = 'none';

        // Prepend booking card markup to bookingsFeed
        const newBooking = document.createElement('div');
        newBooking.className = 'faq-item';
        newBooking.id = slotId;
        newBooking.style.backgroundColor = 'var(--color-white)';
        newBooking.style.borderRadius = 'var(--radius-md)';
        newBooking.style.padding = '20px';
        newBooking.style.border = '1px solid var(--color-beige)';
        newBooking.style.marginBottom = '16px';
        newBooking.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        newBooking.style.opacity = '0';
        newBooking.style.transform = 'translateY(-10px)';

        newBooking.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="timeline-year" style="font-size: 0.85rem; padding: 4px 8px; border-radius: var(--radius-sm); background-color: rgba(255, 107, 26, 0.08); margin-bottom: 6px; display: inline-block;">${day}, ${time}</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-black);">${className}</h4>
              <p style="font-size: 0.85rem; color: var(--color-gray); margin-top: 4px;"><i class="fas fa-user-circle"></i> ${coach} â€¢ Studio Room</p>
            </div>
            <button class="btn btn-secondary cancel-booking-btn" data-target="${slotId}" style="padding: 8px 12px; font-size: 0.75rem; border-color: rgba(27,27,27,0.15); color: var(--color-gray);">Cancel</button>
          </div>
        `;

        bookingsFeed.insertBefore(newBooking, bookingsFeed.firstChild);

        // Animate entrance
        setTimeout(() => {
          newBooking.style.opacity = '1';
          newBooking.style.transform = 'translateY(0)';
        }, 50);

        // Update goals ratios to 100% completed
        const goalRatio = document.getElementById('goal-ratio');
        if (goalRatio) goalRatio.textContent = '5 / 5';

        const goalStatusTitle = document.getElementById('goal-status-title');
        if (goalStatusTitle) goalStatusTitle.innerHTML = 'Ritual Perfected! <span style="color: var(--color-orange);">ðŸŽ‰</span>';

        if (progressCircle) {
          progressCircle.style.strokeDashoffset = '0';
        }

        btn.textContent = 'Booked âœ”';
        btn.style.backgroundColor = 'var(--color-cream)';
        btn.style.color = 'var(--color-gray)';
        btn.disabled = true;

        alert(`Success! "${className}" has been booked on ${day} at ${time}. Check your dashboard overview.`);

        // Redirect back to main dashboard panel
        const homeLink = document.querySelector('.dash-sidebar-link[data-pane="member-dash-home"]');
        if (homeLink) homeLink.click();
      });
    });
  }

  // ==========================================
  // 17. Dashboard Profile Settings Form Submissions
  // ==========================================
  const settingsForm = document.getElementById('dash-settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const displayNameInput = document.getElementById('settings-name');
      const emailInput = document.getElementById('settings-email');
      const streakInput = document.getElementById('settings-streak');
      const caloriesInput = document.getElementById('settings-calories');
      
      const newName = displayNameInput ? displayNameInput.value.trim() : 'Elena Rostova';
      const newEmail = emailInput ? emailInput.value.trim() : 'elena@vyorafitness.com';
      const newStreak = streakInput ? streakInput.value.trim() : '12';
      const newCalories = caloriesInput ? caloriesInput.value.trim() : '3450';
      
      // Update sidebar displayName
      const sidebarName = document.getElementById('dash-sidebar-display-name');
      if (sidebarName) sidebarName.textContent = newName;
      
      // Update dropdown headers
      const dropdownNames = document.querySelectorAll('.user-name');
      dropdownNames.forEach(el => el.textContent = newName);
      
      // Update welcome message
      const welcomeTitle = document.getElementById('dash-welcome-title');
      if (welcomeTitle) {
        welcomeTitle.innerHTML = `Welcome back, <span>${newName.split(' ')[0]}</span>`;
      }
      
      // Update stats cards in dashboard
      const streakVal = document.getElementById('dash-streak');
      if (streakVal) streakVal.textContent = `${newStreak} Days`;
      
      const caloriesVal = document.getElementById('dash-calories');
      if (caloriesVal) {
        const formattedKcal = newCalories.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        caloriesVal.textContent = `${formattedKcal} kcal`;
      }
      
      alert('Sanctuary settings updated successfully!');
      
      // Go back to home dashboard overview
      const homeLink = document.querySelector('.dash-sidebar-link[data-pane="member-dash-home"]');
      if (homeLink) homeLink.click();
    });
  }

  // ==========================================
  // 18. SaaS Admin Dashboard Command Center Desk Operations
  // ==========================================
  const approvalsFeedBody = document.getElementById('admin-approvals-feed-body');
  const approvalsEmptyWarning = document.getElementById('admin-approvals-empty-warning');
  const pendingBadgeCount = document.getElementById('admin-pending-badge-count');
  const pendingBookingsStat = document.getElementById('admin-pending-bookings-stat');
  const activeMembersStat = document.getElementById('admin-active-members');

  if (approvalsFeedBody) {
    approvalsFeedBody.addEventListener('click', (e) => {
      const approveBtn = e.target.closest('.admin-approve-btn');
      const rejectBtn = e.target.closest('.admin-reject-btn');
      
      if (approveBtn || rejectBtn) {
        const rowId = (approveBtn || rejectBtn).getAttribute('data-row-id');
        const row = document.getElementById(rowId);
        
        if (row) {
          const isApprove = !!approveBtn;
          const actionTd = row.querySelector('td[style*="display: flex"]');
          
          if (actionTd) {
            if (isApprove) {
              actionTd.innerHTML = '<span class="status-badge approved">Approved</span>';
              
              // Increment active members counter
              if (activeMembersStat) {
                const curVal = parseInt(activeMembersStat.textContent.replace(/,/g, ''));
                activeMembersStat.textContent = (curVal + 1).toLocaleString();
              }
              
              alert('Applicant trial membership has been approved. Notification dispatched.');
            } else {
              actionTd.innerHTML = '<span class="status-badge suspended">Rejected</span>';
              alert('Applicant trial membership rejected.');
            }
          }
          
          // Animate row fade
          row.style.transition = 'all 0.5s ease';
          row.style.backgroundColor = isApprove ? 'rgba(46, 204, 113, 0.05)' : 'rgba(231, 76, 60, 0.05)';
          
          // Decrement pending counts
          if (pendingBadgeCount) {
            let curCount = parseInt(pendingBadgeCount.textContent);
            if (curCount > 0) {
              curCount--;
              pendingBadgeCount.textContent = curCount;
              if (curCount === 0) {
                pendingBadgeCount.style.display = 'none';
              }
            }
          }
          
          if (pendingBookingsStat) {
            let curStat = parseInt(pendingBookingsStat.textContent);
            if (curStat > 0) {
              curStat--;
              pendingBookingsStat.textContent = curStat;
            }
          }
          
          // Check if all rows approved/rejected to show warning
          setTimeout(() => {
            const rows = approvalsFeedBody.querySelectorAll('tr');
            let unprocessed = 0;
            rows.forEach(r => {
              if (r.querySelector('.admin-approve-btn')) {
                unprocessed++;
              }
            });
            
            if (unprocessed === 0 && approvalsEmptyWarning) {
              // Hide table headers/responsive wrapper and show message
              const wrapper = approvalsFeedBody.closest('.table-responsive');
              if (wrapper) wrapper.style.display = 'none';
              approvalsEmptyWarning.style.display = 'block';
            }
          }, 600);
        }
      }
    });
  }

  // SaaS Class Timetables Scheduler Editor Form Submissions
  const schedulerForm = document.getElementById('admin-scheduler-form');
  const schedulerTbody = document.getElementById('admin-recently-scheduled-tbody');
  const schedulerPlaceholder = document.getElementById('sched-empty-placeholder-row');

  if (schedulerForm && schedulerTbody) {
    schedulerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('sched-class-title').value;
      const day = document.getElementById('sched-day').value;
      const time = document.getElementById('sched-time').value;
      const instructor = document.getElementById('sched-instructor').value;
      
      // Remove empty placeholder row if exists
      if (schedulerPlaceholder) schedulerPlaceholder.remove();
      
      // Create new scheduled class row
      const newRow = document.createElement('tr');
      newRow.style.transition = 'all 0.5s ease';
      newRow.style.opacity = '0';
      newRow.style.transform = 'translateX(-10px)';
      
      newRow.innerHTML = `
        <td><strong>${day}</strong></td>
        <td>${title}</td>
        <td><span class="timeline-year" style="font-size: 0.8rem; padding: 4px 8px; border-radius: var(--radius-sm); background-color: rgba(255, 107, 26, 0.08);">${time}</span></td>
        <td>${instructor}</td>
      `;
      
      schedulerTbody.appendChild(newRow);
      
      // Animate row entrance
      setTimeout(() => {
        newRow.style.opacity = '1';
        newRow.style.transform = 'translateX(0)';
      }, 50);
      
      schedulerForm.reset();
      alert(`Success! Timetable entry registered: "${title}" on ${day} with ${instructor}.`);
    });
  }

  // ==========================================
  // 19. Pricing Membership Rates Cost Calculator
  // ==========================================
  const calcClassesInput = document.getElementById('calc-classes');
  const calcClassVal = document.getElementById('calc-class-val');
  const calcBaseBtns = document.querySelectorAll('.calc-base-btn');
  const calcBaseName = document.getElementById('calc-base-name');
  const calcTowels = document.getElementById('calc-towels');
  const calcSuite = document.getElementById('calc-suite');
  const calcTotal = document.getElementById('calc-total');

  if (calcTotal) {
    let basePrice = 290; // Default Sanctuary Access
    let baseName = 'Sanctuary Access';
    let extraClassesCount = 0;
    let hasTowels = false;
    let hasSuite = false;

    const recalculateCalculatorPrice = () => {
      // Calculate extra classes (each extra class per week adds $15 to monthly membership)
      const classesCost = extraClassesCount * 15;
      const towelsCost = hasTowels ? 15 : 0;
      const suiteCost = hasSuite ? 50 : 0;
      
      const totalPrice = basePrice + classesCost + towelsCost + suiteCost;
      calcTotal.innerHTML = `$${totalPrice} <span>/ month</span>`;
    };

    // Base Tier Selection Button click events
    calcBaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove primary classes from group
        calcBaseBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
        
        basePrice = parseInt(btn.getAttribute('data-base'));
        
        if (basePrice === 180) {
          baseName = 'Restoration Flow';
        } else if (basePrice === 290) {
          baseName = 'Sanctuary Access';
        } else if (basePrice === 490) {
          baseName = 'Oasis VIP';
        }
        
        if (calcBaseName) calcBaseName.textContent = baseName;
        recalculateCalculatorPrice();
      });
    });

    // Extra Classes Range Slider input event
    if (calcClassesInput && calcClassVal) {
      calcClassesInput.addEventListener('input', () => {
        extraClassesCount = parseInt(calcClassesInput.value);
        calcClassVal.textContent = extraClassesCount === 0 ? '0 Classes' : `+${extraClassesCount} Class${extraClassesCount > 1 ? 'es' : ''} / week`;
        recalculateCalculatorPrice();
      });
    }

    // Eucalyptus towels checkbox change event
    if (calcTowels) {
      calcTowels.addEventListener('change', () => {
        hasTowels = calcTowels.checked;
        recalculateCalculatorPrice();
      });
    }

    // Private Suite access checkbox change event
    if (calcSuite) {
      calcSuite.addEventListener('change', () => {
        hasSuite = calcSuite.checked;
        recalculateCalculatorPrice();
      });
    }

    // Calculator Lock-In Form Trigger Redirect
    const calcBookBtn = document.getElementById('calc-book-btn');
    if (calcBookBtn) {
      calcBookBtn.addEventListener('click', () => {
        let classesText = extraClassesCount > 0 ? ` with +${extraClassesCount} extra classes/wk` : '';
        let towelsText = hasTowels ? ', plus Eucalyptus Towels Service' : '';
        let suiteText = hasSuite ? ', and Private Plaster Suite Booking Access' : '';
        
        const planText = `${baseName}${classesText}${towelsText}${suiteText}`;
        
        // Open modal with customized plan details
        const navBookingBtnEl = document.getElementById('nav-booking-btn');
        if (navBookingBtnEl) {
          navBookingBtnEl.setAttribute('data-plan', planText);
          navBookingBtnEl.click();
          // Clear attribute so standard works next time
          setTimeout(() => {
            navBookingBtnEl.removeAttribute('data-plan');
          }, 100);
        }
      });
    }
  }
});




