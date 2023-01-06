
//Charts render in profile.ejs
// changes 

//connects to MongoDB Charts SDK via link in html/ejs
const ChartsEmbedSDK = window.ChartsEmbedSDK;

//uses base url to connect charts via chart objects
async function renderChart() {
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-basketherapy-gzkyj',
    });
    
    // embed a chart
    //chart object
    const chart = sdk.createChart({
      //example: needs to be change later
      chartId: '638990a5-6656-445d-8ad2-6d93dc12b104',
      height: "700px",
    });
    
    // // render the chart into divs(s)
    chart
      .render(document.getElementById('chart'))

    //refreshes page 
      // window.onload=function(){
      //   document.getElementById('refresh').addEventListener('click', () => chart.refresh());
      // }
      
      let element = document.querySelector(".body-content")
  
  
    //filtering 
    //(based on future month collections...)
    const monthSelect = document.getElementById("month-filter")
    monthSelect.addEventListener("change", async (e) => {
      const monthSelect = e.target.value;
      console.log(monthSelect)
      monthSelect ? chart.setFilter({ month : {'$oid': monthSelect} }) : chart.setFilter({});
      
    });
  
  
  }
  
  
  
  
  renderChart().catch((e) => window.alert(e.message));





  // ------------------JM: INCOME TABLE (edit&delete)----------------------
  function editEvent(_id) {
    let incomeEdit = document.querySelector('.updateIncome').value
    fetch('/incomes/edit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        '_id': _id,
        'eventtitle': eventtitle,
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.href = `/incomes/${_id}`
      })
  }
  function deleteEvent(_id) {
    fetch('/incomes/deleteincomes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.href = '/gallery'
    })
  }