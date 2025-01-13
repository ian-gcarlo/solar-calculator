document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const messageBox = document.getElementById('message-box');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close-message-box');
    const form = document.getElementById('calculator');
    const body = document.body;
    const usageTimeDropdown = document.querySelector('#usage-time');
    const themeToggleButton = document.getElementById('theme-toggle');

    // Function to display the message box
    const showMessageBox = (recommendation, yieldMin, yieldMax, minim, maxim) => {
        document.getElementById('recommendation').textContent = recommendation;
        document.getElementById('yield_min').textContent = yieldMin;
        document.getElementById('yield_max').textContent = yieldMax;
        document.getElementById('minim').textContent = minim;
        document.getElementById('maxim').textContent = maxim;
        messageBox.classList.add('visible');
        overlay.classList.add('visible');
    };

    // Dark mode toggle button
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = '🌙';
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggleButton.textContent = '🌙';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            themeToggleButton.textContent = '☀️';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Dark mode based on dropdown
    usageTimeDropdown.addEventListener('change', (event) => {
        if (event.target.value === 'night') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });

    // Form submission event
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const usage = document.querySelector('#usage-time').value;
        const bill = parseFloat(document.querySelector('#electric-bill').value) || 0;
        const provider = document.querySelector('#electric-provider').value;

        let rate;
        if (provider === 'meralco') rate = 11.96;
        else if (provider === 'veco') rate = 11.51;
        else if (provider === 'dlsp') rate = 9.21;
        else if (provider === 'cepelco') rate = 13.19;
        else rate = 13;


        // Validation for "Other" rate input
        if (provider === 'other' && rate <= 0) {
            alert("Please enter a valid kWh rate for your provider.");
            return;
        }

         // Calculate power and determine package recommendation
         const power = bill / rate / 30 / 5;
         let recommendation, yieldMin, yieldMax, minim, maxim;
 
         if (usage === 'day') {
             if (power <= 3) {
                 recommendation = "We suggest IAN Smart Boost";
                 yieldMin = '315 kW';
                 yieldMax = '450 kW';
                 minim = (((600 * 5 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 5 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             } else if (power > 3 && power <= 5.40) {
                 recommendation = "We suggest IAN Smart Power";
                 yieldMin = '567 kW';
                 yieldMax = '810 kW';
                 minim = (((600 * 9 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 9 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             } else {
                 recommendation = "We suggest IAN Smart Elite";
                 yieldMin = '1071 kW';
                 yieldMax = '1530 kW';
                 minim = (((600 * 17 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 17 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             }
         } else {
             if (power <= 3) {
                 recommendation = "We suggest IAN Smart Boost Plus+";
                 yieldMin = '315 kW';
                 yieldMax = '450 kW';
                 minim = (((600 * 5 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 5 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             } else if (power > 3 && power <= 5.40) {
                 recommendation = "We suggest IAN Smart Power Plus+";
                 yieldMin = '630 kW';
                 yieldMax = '900 kW';
                 minim = (((600 * 10 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 10 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             } else {
                 recommendation = "We suggest IAN Smart Elite Plus+";
                 yieldMin = '1071 kW';
                 yieldMax = '1530 kW';
                 minim = (((600 * 17 * 0.8 * 5 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 17 * 1 * 5 * 30) / 1000) * rate).toFixed(2);
             }
         }
 
         // Display the message box with the results
         showMessageBox(recommendation, yieldMin, yieldMax, minim, maxim);
     });
        // Function to close the message box
    const closeMessageBox = () => {
        messageBox.classList.remove('visible');
        overlay.classList.remove('visible');
    };

    // Event listeners
    closeButton.addEventListener('click', () => {
        console.log("Close button clicked!");
        console.log(messageBox.classList);
        console.log(overlay.classList);
        closeMessageBox();
        location.reload();
    });
    overlay.addEventListener('click', closeMessageBox);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMessageBox();
    });

 }); 
