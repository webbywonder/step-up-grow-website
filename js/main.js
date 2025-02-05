// Move this function outside of the jQuery IIFE
function calculateSIP() {
    // Get input values
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const timePeriod = parseFloat(document.getElementById('timePeriod').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);

    // Validate inputs
    if (!monthlyInvestment || !timePeriod || !expectedReturn) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate SIP returns
    const monthlyRate = expectedReturn / (12 * 100);
    const months = timePeriod * 12;
    const totalInvestment = monthlyInvestment * months;

    // Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
    const maturityAmount = totalInvestment * expectedReturn / 100;

    const totalReturns = totalInvestment + maturityAmount;

    // Display results
    document.getElementById('result').style.display = 'block';
    document.getElementById('totalInvestment').textContent = 
        '₹' + totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('maturityAmount').textContent = 
        '₹' + totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('totalReturns').textContent = 
        '₹' + maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

function calculateOneTime() {
    // Get input values
    const principalAmount = parseFloat(document.getElementById('principalAmount').value);
    const onetimeTimePeriod = parseFloat(document.getElementById('onetimeTimePeriod').value);
    const onetimeExpectedReturn = parseFloat(document.getElementById('onetimeExpectedReturn').value);

    // Validate inputs
    if (!principalAmount || !onetimeTimePeriod || !onetimeExpectedReturn) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate one-time investment returns
    const totalInvestment = principalAmount;
    const maturityAmount = totalInvestment * Math.pow(1 + (onetimeExpectedReturn / 100), onetimeTimePeriod);
    const totalReturns = maturityAmount - totalInvestment;

    // Display results in the same order as SIP calculator
    document.getElementById('onetimeResult').style.display = 'block';
    document.getElementById('onetimeTotalInvestment').textContent = 
        '₹' + totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('onetimeMaturityAmount').textContent = 
        '₹' + maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('onetimeTotalReturns').textContent = 
        '₹' + totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0});
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
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
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
        nav : false,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    

    // SIP Calculator function
    function calculateSIP() {
        // Get input values
        const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
        const timePeriod = parseFloat(document.getElementById('timePeriod').value);
        const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);

        // Validate inputs
        if (!monthlyInvestment || !timePeriod || !expectedReturn) {
            alert('Please fill in all fields with valid numbers');
            return;
        }

        // Calculate SIP returns
        const monthlyRate = expectedReturn / (12 * 100);
        const months = timePeriod * 12;
        const totalInvestment = monthlyInvestment * months;

        // Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
        const maturityAmount = totalInvestment * expectedReturn / 100;

        const totalReturns = totalInvestment + maturityAmount;

        // Display results
        document.getElementById('result').style.display = 'block';
        document.getElementById('totalInvestment').textContent = 
            '₹' + totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0});
        document.getElementById('maturityAmount').textContent = 
            '₹' + totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0});
        document.getElementById('totalReturns').textContent = 
            '₹' + maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0});
    }
    

    // Contact form submission handler
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;

                // Get form values and map enquiryType to the expected type format
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    type: document.getElementById('enquiryType').value === 'package' ? 'PACKAGE_INQUIRY' : 'CONTACT',
                    message: document.getElementById('message').value.trim()
                };

                try {
                    const response = await fetch('http://localhost:5000/api/enquiries', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        throw new Error(data.message || 'Failed to send message');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again later.');
                } finally {
                    // Restore button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }
            });
        }
    });

})(jQuery);

