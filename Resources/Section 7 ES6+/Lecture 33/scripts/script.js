fetch('https://api.nasa.gov/planetary/apod?api_key=tBnm0Up2BS8xHOsgIILAi5c1o4YjcaQmSMBTIePX')
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
        const {date, explanation, media_type, service_version, title, url} = data;
        console.log(`Date: ${date}`);
    })
    // catch any errors - 400 & 500 level client/server http status codes
    // (rejected promises)
    .catch(error => console.log(error.message));