export default {
    state: {
        downloadArray: [],
        labelArray: [],
        chartData: {
            labels: [],
            datasets: [
                {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#ad4f4f','#DD1B16', '#00fff0','#63e311', '#d511e3', '#e3b911'],
                    data: []
                }
            ]
        }
    },
    actions: {
    },
    mutations: {
        setChartData(state, arr, arr1){
            state.chartData.datasets[0].data = arr
            state.chartData.labels = arr1
        }
    },
    getters: {
        getCharset: state => {
            return state.chartData
        }
    }
}