const itemsSection = document.querySelector(".home__content");
const showMoreButton = document.querySelector(".button__more")

function renderMovies(movieObject, nodeDiv) {
    let node = document.createElement("div");
    node.classList.add("movie");
    node.setAttribute("id", movieObject.internal)
    
    let img = movieObject.img;
    let title = movieObject.main_taiwan_name;
    let imdb_rating = movieObject.imdb_rating
    let path = movieObject.internal
    let rotten_audience_rating = movieObject.audience_rating
    let rotten_tomator_rating = movieObject.tomator_rating
    let douban_rating = movieObject.douban_rating
    let htmlText = `
        <a class="movie" href= movie/${path} target="_blank">
        <img src=${img}>
        <div class="movie__info">
            <h3>${title}</h3>
            <div class="rank">
                <div>
                    <img src="https://stylishforjimmy.s3-ap-northeast-1.amazonaws.com/imdb.png">
                    <p>${imdb_rating}</p>
                </div>
                <div>
                    <img src="https://stylishforjimmy.s3-ap-northeast-1.amazonaws.com/douban.jpg">
                    <p>${douban_rating}</p>
                </div>
                <div>
                    <img src="https://stylishforjimmy.s3-ap-northeast-1.amazonaws.com/tomato.png">
                    <p>${rotten_audience_rating}</p>
                </div>
            </div>
        </div>
`;
    node.innerHTML = htmlText;
    nodeDiv.appendChild(node);
}

// const checkedValue = element.querySelector('input[type=radio]:checked').value;
function main(url) {
    showMoreButton.style.display="none"

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((datalist) => {

            let dataArray = datalist; //I will get a list of dict
            console.log(dataArray)
            let num = dataArray.length;
            

            console.log(num)

            if (num == 0){
                console.log("x")
                let node = document.createElement("div");
                node.style.color = "white"
                node.innerHTML = "無相關結果"
                itemsSection.appendChild(node)
            }
            else if (num < 20){
                for (let i = 0; i < num; i++) {
                    renderMovies(dataArray[i], itemsSection);
                }
                showMoreButton.style.display="none"
            }
            else{
                for (let i = 0; i < num; i++) {
                    renderMovies(dataArray[i], itemsSection);
                }
                showMoreButton.style.display="inline"
            }

        });
}
let offsetNum = 0

// showMoreButton = document.querySelector(".button__more")


const elem = document.querySelector(".search__section")
const featureElem = document.querySelector('.feature__wrapper');
const yearElem = document.querySelector('.period__wrapper');
const sortElem = document.querySelector(".radios__block")
// let yearInnerhtml = ""
// for (let i = 2021 ;i>=2000;i--){
//     addHtml = `      <div class="tag">
//     <input type="radio" id=${i} name="period">
//     <label for=${i}>${i}</label>
//   </div>`
//   yearInnerhtml += addHtml
// }
// yearElem.innerHTML = `      <div class="tag">
// <input type="radio" id="all__period" name="period" checked>
// <label for="all__period">不分時間</label>
// </div>` +yearInnerhtml
function initSliderSetting() {
    const parent = document.querySelector(".range-slider")
    if(!parent) return
    const rangeS = parent.querySelectorAll("input[type=range]");
    const numberS = parent.querySelectorAll("input[type=number]");
  
    rangeS.forEach((elem) => {
        elem.oninput = function() {
        let slide1 = rangeS[0].value
        let slide2 = rangeS[1].value
  
        if (slide1 > slide2) [slide1, slide2] = [slide2, slide1];
        numberS[0].value = slide1
        numberS[1].value = slide2
      }
    })
    numberS.forEach((elem) => {
        elem.oninput = function() {
              let number1 = parseFloat(numberS[0].value)
              let number2 = parseFloat(numberS[1].value)
              
        if (number1 > number2) {
          const tmp = number1
          numberS[0].value = number2
          numberS[1].value = tmp
        }
        rangeS[0].value = number1
        rangeS[1].value = number2
      }
    });
  }
  
  initSliderSetting();
main('/api/movie?sort=rating_total_amount')
let queryString ;
function isNumber(val) {
    // negative or positive
    return /^[-]?[\.\d]+$/.test(val);
  }  
elem.addEventListener('change', function(e) {
    
   
    let featureValue = featureElem.querySelector('input[type=radio]:checked').id;
    // console.log(featureValue)
    let yearValue = yearElem.querySelectorAll("input[type=number]");
    // console.log(yearValue)
    let imdbRating = document.querySelector('#imdb').value
    let doubanRating = document.querySelector('#douban').value
    let tomatoRating = document.querySelector('#tomatoes').value
    let sortValue = sortElem.querySelector('input[type=radio]:checked').id
    console.log(sortValue)
    queryString = ""
    queryString += `&sort=${sortValue}`
    // console.log(imdbRating,doubanRating,tomatoRating)
    if (isNumber(featureValue)){
        console.log(1)
        queryString += `&feature=${featureValue}`
    }
    if (isNumber(yearValue[0].value)){
        console.log(2)
        queryString += `&start_year=${yearValue[0].value}&end_year=${yearValue[1].value}`
    }
    if (isNumber(imdbRating)){
        queryString += `&imdb_rating=${imdbRating}`
    }
    if (isNumber(doubanRating)){
        queryString += `&douban_rating=${doubanRating}`
    }
    if (isNumber(tomatoRating)){
        queryString += `&tomato_rating=${tomatoRating}`
    }
    console.log(queryString)
    itemsSection.innerHTML = ""
    offsetNum = 0
    main(`/api/movie/?start=${offsetNum}${queryString}`)
})





// let node = document.createElement("button");
// node.classList.add("button__more");
// node.innerHTML = "顯示更多"
// document.body.appendChild(node);
showMoreButton.addEventListener("click",()=>{
    console.log(queryString)
    offsetNum += 20
    if (queryString){
    main(`/api/movie/?start=${offsetNum}${queryString}`)}
    else{
        main(`/api/movie/?start=${offsetNum}`)
    }
})
showMoreButton.style.display="none"