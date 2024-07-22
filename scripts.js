document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const quizForm = document.getElementById('quiz-form');
    const modal = document.getElementById("quiz-modal");
    const btn = document.getElementById("open-quiz");
    const span = document.getElementsByClassName("close")[0];

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for contacting us!');
        });
    }

    // Quiz pagination functionality
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', function() {
            const nextPageId = this.getAttribute('data-next');
            const nextPage = document.getElementById(nextPageId);
            const currentPage = document.querySelector('.quiz-page:not([style*="display: none"])');
            if (currentPage && nextPage) {
                currentPage.style.display = 'none';
                nextPage.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.prev-button').forEach(button => {
        button.addEventListener('click', function() {
            const prevPageId = this.getAttribute('data-prev');
            const prevPage = document.getElementById(prevPageId);
            const currentPage = document.querySelector('.quiz-page:not([style*="display: none"])');
            if (currentPage && prevPage) {
                currentPage.style.display = 'none';
                prevPage.style.display = 'block';
            }
        });
    });

    // Quiz form submission
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let score = 0;
            const answers = document.querySelectorAll('#quiz-form input[type="radio"]:checked');
            answers.forEach(answer => {
                if (answer.value === 'yes') score += 1;
            });
            const result = document.getElementById('quiz-result');
            result.textContent = `Your security score is ${score}/15. ${
                score < 10 ? 'You should consider improving your security measures!' : 'Great job! Your security practices are strong.'
            }`;

            // Display chart
            const ctx = document.getElementById('quiz-chart').getContext('2d');
            document.getElementById('quiz-chart').style.display = 'block';
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Yes', 'No'],
                    datasets: [{
                        label: 'Security Score',
                        data: [score, 15 - score],
                        backgroundColor: ['#28a745', '#e63946'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
    }

    // Modal functionality
    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const subscriptionForm = document.getElementById('subscription-form');

    // Subscription form submission
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for subscribing!');
        });
    }

    // Enhance read-more functionality
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const postContent = this.previousElementSibling;
            postContent.style.display = postContent.style.display === 'none' ? 'block' : 'none';
            this.textContent = postContent.style.display === 'none' ? 'Read More' : 'Read Less';
        });
    });

    // Counting animation for statistics
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 100; // Adjust the speed of the count animation

    const resetCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
        });
    };

    const observerOptions = {
        threshold: 1.0 // Trigger when 100% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 50); // Adjust the speed by changing the timeout value
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeCounters = () => {
        counters.forEach(counter => {
            observer.observe(counter);
        });
    };

    let scrollCounter = 0;

    const handleScroll = () => {
        scrollCounter++;
        if (scrollCounter >= 3) {
            const section = document.getElementById('statistics');
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                resetCounters();
                observeCounters();
            }
            scrollCounter = 0;
        }
    };

    // Trigger the animation once on page load
    const initialCheck = () => {
        const section = document.getElementById('statistics');
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            resetCounters();
            observeCounters();
        }
    };

    window.addEventListener('scroll', handleScroll);
    initialCheck(); // Initial check
});
