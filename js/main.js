var apiURL = "http://localhost:5000/api";

function calculateSIP() {
    // Get input values
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const timePeriod = parseFloat(document.getElementById('timePeriod').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);


    if (!monthlyInvestment || !timePeriod || !expectedReturn) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    const monthlyRate = expectedReturn / (12 * 100);
    const months = timePeriod * 12;
    const totalInvestment = monthlyInvestment * months;


    const maturityAmount = totalInvestment * expectedReturn / 100;

    const totalReturns = totalInvestment + maturityAmount;


    document.getElementById('result').style.display = 'block';
    document.getElementById('totalInvestment').textContent =
        '₹' + totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    document.getElementById('maturityAmount').textContent =
        '₹' + totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    document.getElementById('totalReturns').textContent =
        '₹' + maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function calculateOneTime() {
    const principalAmount = parseFloat(document.getElementById('principalAmount').value);
    const onetimeTimePeriod = parseFloat(document.getElementById('onetimeTimePeriod').value);
    const onetimeExpectedReturn = parseFloat(document.getElementById('onetimeExpectedReturn').value);

    if (!principalAmount || !onetimeTimePeriod || !onetimeExpectedReturn) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    const totalInvestment = principalAmount;
    // Calculate interest earned using simple interest: Principal * Rate * Time
    const totalReturns = totalInvestment * (onetimeExpectedReturn / 100);
    const maturityAmount = totalInvestment + totalReturns;

    document.getElementById('onetimeResult').style.display = 'block';
    document.getElementById('onetimeTotalInvestment').textContent =
        '₹' + totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    document.getElementById('onetimeMaturityAmount').textContent =
        '₹' + maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    document.getElementById('onetimeTotalReturns').textContent =
        '₹' + totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Update the fetchPackages function
async function fetchPackages() {
    try {
        const response = await fetch(`${apiURL}/packages/public`);
        const packages = await response.json();

        // Separate SIP and ONE_TIME packages
        const sipPackages = packages.filter(pkg => pkg.type === 'SIP');
        const oneTimePackages = packages.filter(pkg => pkg.type === 'ONE_TIME');

        // Get unique time periods for each package type
        const sipTimePeriods = [...new Set(sipPackages.map(pkg => pkg.timePeriod))].sort((a, b) => a - b);
        const oneTimeTimePeriods = [...new Set(oneTimePackages.map(pkg => pkg.timePeriod))].sort((a, b) => a - b);

        // Generate tabs HTML dynamically based on available periods
        const sipTabsHtml = `
            <ul class="nav nav-pills mb-4 justify-content-center" id="sip-time-tabs" role="tablist">
                ${sipTimePeriods.map((period, index) => `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${index === 0 ? 'active' : ''}" data-period="${period}" type="button">${period} Year${period > 1 ? 's' : ''}</button>
                    </li>
                `).join('')}
            </ul>
        `;

        const oneTimeTabsHtml = `
            <ul class="nav nav-pills mb-4 justify-content-center" id="onetime-time-tabs" role="tablist">
                ${oneTimeTimePeriods.map((period, index) => `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${index === 0 ? 'active' : ''}" data-period="${period}" type="button">${period} Year${period > 1 ? 's' : ''}</button>
                    </li>
                `).join('')}
            </ul>
        `;

        // Get container elements
        const sipContainer = document.querySelector('#sip-plans .row');
        const oneTimeContainer = document.querySelector('#one-time .row');

        if (!sipContainer || !oneTimeContainer) {
            console.error('Container elements not found');
            return;
        }

        // Remove existing tabs if any
        const existingSipTabs = document.querySelector('#sip-time-tabs');
        const existingOneTimeTabs = document.querySelector('#onetime-time-tabs');
        if (existingSipTabs) existingSipTabs.remove();
        if (existingOneTimeTabs) existingOneTimeTabs.remove();

        // Add tabs before containers
        sipContainer.insertAdjacentHTML('beforebegin', sipTabsHtml);
        oneTimeContainer.insertAdjacentHTML('beforebegin', oneTimeTabsHtml);

        // Function to render packages based on time period
        function renderPackages(packages, container, period) {
            container.innerHTML = '';
            const filteredPackages = packages.filter(pkg => pkg.timePeriod === period);
            
            filteredPackages.forEach(plan => {
                // Get values from the plan object
                const amount = parseInt(plan.amount);
                const timePeriod = plan.timePeriod;
                const baseReturn = plan.roi || plan.percentageChange || (plan.type === 'SIP' ? 12 : 14);
                // Calculate expected return based on investment type
                const expectedReturn = plan.type === 'ONE_TIME' ? 
                    baseReturn * timePeriod : 
                    baseReturn;
                
                const interestEarned = plan.returns?.interest || 0;
                const maturityAmount = plan.returns?.maturityAmount || 0;

                const cardHtml = `
                    <div class="col-md-6 col-lg-4">
                        <div class="card investment-card shadow-sm h-100">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h6 class="text-muted mb-0">${plan.type === 'SIP' ? 'Monthly Investment' : 'Principal Amount'}</h6>
                                    <span class="amount-large" style="color: #7E38E4;">₹${amount.toLocaleString('en-IN')}</span>
                                </div>

                                <div class="row g-3 mb-4">
                                    <div class="col-6">
                                        <div class="d-flex align-items-center">
                                            <div class="stat-icon bg-primary me-3">
                                                <svg class="svg-icon-white">
                                                    <use href="#icon-clock" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div class="text-muted small">Period</div>
                                                <div class="fw-medium">${timePeriod} Year</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex align-items-center">
                                            <div class="stat-icon bg-success me-3">
                                                <svg class="svg-icon-white">
                                                    <use href="#icon-chart" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div class="text-muted small">ROI</div>
                                                <div class="roi-positive">${expectedReturn}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="pt-3 border-top border-light">
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="text-muted">Interest Earned</span>
                                                <span class="amount-medium" style="color: #7E38E4;">
                                                    ₹${Math.round(interestEarned).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="text-muted">${plan.type === 'SIP' ? 'Maturity Amount' : 'Final Amount'}</span>
                                                <span class="amount-large" style="color: #7E38E4;">
                                                    ₹${Math.round(maturityAmount).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('afterbegin', cardHtml);
            });
        }

        // Initial render with first available period
        renderPackages(sipPackages, sipContainer, sipTimePeriods[0]);
        renderPackages(oneTimePackages, oneTimeContainer, oneTimeTimePeriods[0]);

        // Add click handlers for SIP tabs
        document.querySelectorAll('#sip-time-tabs .nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('#sip-time-tabs .nav-link').forEach(t => 
                    t.classList.remove('active'));
                e.target.classList.add('active');
                const period = parseInt(e.target.dataset.period);
                renderPackages(sipPackages, sipContainer, period);
            });
        });

        // Add click handlers for one-time tabs
        document.querySelectorAll('#onetime-time-tabs .nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('#onetime-time-tabs .nav-link').forEach(t => 
                    t.classList.remove('active'));
                e.target.classList.add('active');
                const period = parseInt(e.target.dataset.period);
                renderPackages(oneTimePackages, oneTimeContainer, period);
            });
        });

    } catch (error) {
        console.error('Error fetching packages:', error);
    }
}

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Client carousel
    $(".client-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 90,
        dots: false,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    // Contact form submission handler
    const contactForm = document.querySelector('#contactForm');
    const successMessage = document.querySelector('#successMessage');

    if (contactForm) {
        // Add error message container after form creation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger d-none';
        errorDiv.id = 'formError';
        submitButton.parentNode.insertBefore(errorDiv, submitButton);

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Clear previous messages
            errorDiv.classList.add('d-none');
            errorDiv.textContent = '';
            successMessage.classList.add('d-none');

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            try {
                // Execute reCAPTCHA and get token
                const recaptchaToken = await grecaptcha.execute('6LdceM0qAAAAAHf7_AZ0x320y_pRqVAsaE7SmmII', {
                    action: 'submit_enquiry'
                });

                // Get form values
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    type: document.getElementById('enquiryType').value === 'package' ? 'PACKAGE_INQUIRY' : 'CONTACT',
                    message: document.getElementById('message').value.trim(),
                    recaptchaToken
                };

                // Form validation
                if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                    throw new Error('Please fill in all required fields');
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Phone validation (Indian format)
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(formData.phone)) {
                    throw new Error('Please enter a valid 10-digit Indian phone number');
                }

                const response = await fetch(`${apiURL}/enquiries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || 'Failed to send message');
                }

                // On success:
                contactForm.classList.add('d-none'); // Hide the form
                successMessage.classList.remove('d-none'); // Show success message
                contactForm.reset(); // Reset form data

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (error) {
                // Show error message in the error div
                errorDiv.textContent = error.message;
                errorDiv.classList.remove('d-none');
                console.error('Error:', error);
            } finally {
                // Restore button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    fetchPackages();

    $('#year').text(new Date().getFullYear());

})(jQuery);
