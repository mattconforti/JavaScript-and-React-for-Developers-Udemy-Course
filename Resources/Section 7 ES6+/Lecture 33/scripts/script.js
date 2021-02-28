// hide the img elements
let imgList = document.getElementsByClassName("nasa_img");
for (let im of imgList) {
    im.style.display = "none";
}
// define global caption array
var captionArr = [];

// on search button click
document.getElementById("search_b").addEventListener("click", () => {
    // get value of search box to query API
    const searchTerm = document.getElementById("in1").value;
    // clean this value ^ and make sure no sql injection/malicious stuff??


    // if the search term exists (is not ""), use fetch API to search
    if (searchTerm) {
        fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
        // need more search parameters ^^ to only search for images etc????
        // look at documentation under search section!!!
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                // destructure & parse thru data  - WILL PROBABLY NEED TO REFACTOR 
                // - must be an easier/more efficient way to parse thru this INTENSE ASS JSON
                // (but instructor wants us to use destructuring)
                const {collection} = data; // get collection property
                const {href: path, items} = collection;
                console.log(path);
                // use first 10 results
                const [result1,result2,result3,result4,result5,result6,result7,result8,result9,result10] = items;
                // store the results in an array for easier manipulation (looping thru)
                const resultArr = [];
                resultArr.push(result1, result2, result3, result4, result5, result6, result7, result8, result9, result10);
                console.log(resultArr);
                // get the image links (& captions) for each result
                // create an array to store image hrefs & captions
                let linkArr = [];
                for (const element of resultArr) {
                    // get link from links arr (1 elem arr)
                    var link = element.links[0];
                    linkArr.push(link.href);
                    captionArr.push(element.data[0].description);
                }
                console.log(captionArr);

                // THIS CODE DOESNT WORK! IT DOES BUT IT DOESNT MAKE THE IMGS GET POPULATED WITH
                // ORIGINAL PICS
                // replace thumbnail with original pictures (by changing end of url to ~orig.jpg)
                // for (let l of linkArr) {
                //    l = l.replace("thumb", "orig");
                //   console.log(l);
                //}

                // assign image paths to empty img elements on our page
                for (let i=0; i<imgList.length; i++) {
                    // put images display back to normal (not hidden)
                    imgList[i].style.display = "initial";
                    imgList[i].src = linkArr[i]; // assign the src property here accordingly
                    console.log(imgList[i].src);
                }

                // save users search & results using localstorage
                var myLocStor = window.localStorage;
                myLocStor.setItem(searchTerm, linkArr); // set key as search term, value as image paths
                console.log(myLocStor);
                // create search history option element, set its value, add it to DOM
                var optionNode = document.createElement("option");
                optionNode.value = searchTerm;
                document.getElementById("search_dataList").appendChild(optionNode);
            })
            // catch any http errors - 400 & 500 level client/server http status codes
            // (rejected promises)
            .catch(error => console.log(error.message));
    }
});

// add mouseover and mouseout event listeners to each image

for(let im of imgList) {
    im.addEventListener('mouseover', () => im.style.opacity = ".5");
    im.addEventListener('mouseout', () => im.style.opacity = "1");
}
