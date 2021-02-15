fetch('https://api.nasa.gov/planetary/apod?api_key=tBnm0Up2BS8xHOsgIILAi5c1o4YjcaQmSMBTIePX')
    .then(response => response.json())
    .then(data => console.log(data))
    // catch any errors - 400 & 500 level client/server http status codes
    // (rejected promises)
    .catch(error => console.log(error.message));