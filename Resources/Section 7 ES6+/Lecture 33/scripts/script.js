document.getElementById('search_b').addEventListener('click', (e) => {
    // get value of search box to query API
    const searchTerm = document.getElementById('in1').value;
    // if the search term exists (is not ""), use fetch API to search
    if (searchTerm) {
        fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                // destructure data & assign to elements on our page
            })
            // catch any errors - 400 & 500 level client/server http status codes
            // (rejected promises)
            .catch(error => console.log(error.message));
    }
});
