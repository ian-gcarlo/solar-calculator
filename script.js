document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const messageBox = document.getElementById('message-box');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close-message-box');
    const form = document.getElementById('calculator');
    const body = document.body;
    const usageTimeDropdown = document.querySelector('#usage-time');

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
         const power = bill / rate / 30 / 4;
         let recommendation, yieldMin, yieldMax, minim, maxim;
 
         if (usage === 'day') {
             if (power <= 3) {
                 recommendation = "We suggest IAN Smart Boost";
                 yieldMin = '288 kW';
                 yieldMax = '360 kW';
                 minim = (((600 * 5 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 5 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             } else if (power > 3 && power <= 6.0) {
                 recommendation = "We suggest IAN Smart Power";
                 yieldMin = '576 kW';
                 yieldMax = '720 kW';
                 minim = (((600 * 9 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 9 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             } 
             else if (power > 6 && power <= 11.0) {
                 recommendation = "We suggest IAN Smart Elite";
                 yieldMin = '1036 kW';
                 yieldMax = '1296 kW';
                 minim = (((600 * 18 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 18 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             }
             else {
                 recommendation = "We suggest IAN Smart Ultra";
                 yieldMin = '1267 kW';
                 yieldMax = '1584 kW';
                 minim = (((600 * 22 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 22 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             }
         } else {
             if (power <= 3) {
                 recommendation = "We suggest IAN Smart Boost Plus+";
                 yieldMin = '288 kW';
                 yieldMax = '360 kW';
                 minim = (((600 * 5 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 5 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             } else if (power > 3 && power <= 6.0) {
                 recommendation = "We suggest IAN Smart Power Plus+";
                 yieldMin = '576 kW';
                 yieldMax = '720 kW';
                 minim = (((600 * 10 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 10 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
             } else {
                 recommendation = "We suggest IAN Smart Elite Plus+";
                 yieldMin = '1036 kW';
                 yieldMax = '1296 kW';
                 minim = (((600 * 18 * 0.8 * 4 * 30) / 1000) * rate).toFixed(2);
                 maxim = (((600 * 18 * 1 * 4 * 30) / 1000) * rate).toFixed(2);
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
