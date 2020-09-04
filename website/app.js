const d = new Date();

const baseURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily';
const apiKey = '&appid=146e9d8ecf3687541626d9fb3d111734';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const feelText = document.getElementById('feelings').value;
    getApiData(baseURL, document.getElementById('zip').value, apiKey).then(
        function (JTempData) {
            postData('./add', {
                temperature: JTempData,
                date: d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear(),
                feelings: feelText
            });
            updateUI();
        }
    );
}

/* Function to GET Web API Data*/
const getApiData = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL + zip + apiKey);
    try {
        const webData = await response.json();
        JTempData = webData.main.temp;
        return JTempData;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json();
        return allData;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

/* Update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();

        document.getElementById('date').innerHTML =
            'Date: ' + allData.date;

        document.getElementById('temp').innerHTML =
            'Temperature: ' + allData.temperature;

        document.getElementById('content').innerHTML =
            'Feelings: ' + allData.feelings;

    } catch (error) {
        console.log('error', error);
    }
};