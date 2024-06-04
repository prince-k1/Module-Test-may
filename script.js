const url = "https://mocki.io/v1/bc02fabd-aa2b-4659-9f1f-227e90fffd78";
const searchInput = document.getElementById('searchInput');

function fetchDataThen(){
    fetch(url)
        .then(response => response.json())
        .then(data => renderData(data));
}

async function fetchDataAsync(){
    let response = await fetch(url);
    let data = await response.json();
    renderData(data);
}

async function sortByCap(){
    let response = await fetch(url);
    let data = await response.json();
    data.sort((a,b) => a.market_cap - b.market_cap);
    renderData(data);
}

async function sortByPercentage(){
    let response = await fetch(url);
    let data = await response.json();
    data.sort((a,b) => b.ath_change_percentage - a.ath_change_percentage);
    renderData(data);
}

async function search(){
    let response = await fetch(url);
    let data = await response.json();
    let value = searchInput.value;
    
    if(value){
        let arr = [];
        data.forEach(item => {
            if(item.name.includes(value)){
                if(!arr.includes(item)){
                    arr.push(item);
                }
            }
        })
        data.forEach(item => {
            if(item.id.includes(value)){
                if(!arr.includes(item)){
                    arr.push(item);
                }
            }
        })
        data.forEach(item => {
            if(item.symbol.includes(value)){
                if(!arr.includes(item)){
                    arr.push(item);
                }
            }
        })
        renderData(arr);
    }
    else{
        document.getElementById('tableBody').innerHTML = ``;
    }
   
}

function renderData(data){
    let table = document.getElementById('tableBody');
    table.innerHTML = '';

    data.forEach(item => {
        let row = document.createElement('tr');
        row.id = item.id;
        row.innerHTML = `<td class="coinName">
        <img src = "${item.image}" width="30px" height="30px">
        <span>${item.name}</span>
    </td>
    <td class="symbol">${item.symbol}</td>
    <td class="current_price">${'$' + item.current_price}</td>
    <td class="total-volume">${'$' + item.total_volume}</td>
    <td class="percentage">${-item.ath_change_percentage}%</td>
    <td class="mktCap">Mkt Cap : ${'$' + item.market_cap}</td>`;
    table.appendChild(row);
    })
}





