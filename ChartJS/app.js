// As of 10/1, JS Experiments has 5 commits, Euler has 23 commits, DebianAnsible has 13 commits, 3 commits in Work-Term 
// Found number of commits by running `git log --online | wc -l` on my own repositories, as well as `git log --online | grep "Will-Bo" | wc -l` on Work-Term
const labels = [
                'JavaScript Experiments',
                'EulerSolutions',
                'DebianAnsible',
                'Work-Term'
    ];

const data = {

    labels: labels,

    datasets: [{
        label: "Commits",

        data: [5, 23, 13, 3],

        backgroundColor: [
            'rgba(3, 218, 198, 1)',
            'rgba(187, 134, 252, 1)',
            'rgba(55, 0, 179, 1)',
            'rgba(250, 163, 86, 1)'
        ],
        
        borderColor: [
            'rgb(3, 218, 198)',
            'rgb(187, 134, 252',
            'rgb(55, 0, 179)',
            'rgb(250, 163, 86)'
       ] 

    }]
};

const plugin = {
    beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    },
};

const titlePlugin = {
    title: {
        display: true,
        text: "Will's GitHub Commits",
    }
};

const legendPlugin = {
    legend: {
        display: true,
        labels: {
            font: {
                color: 'white'
            }
        }
    },
};

const config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        x: {
                            ticks: {
                                color: '#02d6ed'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#02d6ed'
                            }
                        }
                    },
                    grid: {
                        color: 'white'
                    },

                    title: {
                        display: true,
                        text: "Will's GitHub Commits",
                        color: "white"
                    },
                    legend: {
                        display: false,
                        labels: {
                            font: {
                                color: 'white'
                            }
                        }
                    }

                },
                plugins: [plugin]//, titlePlugin, legendPlugin]
/*                plugins: {
                    beforeDraw: (chart) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = 'black';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    },
                    title: {
                        display: true,
                        text: "Will's GitHub Commits",
                    },
                    legend: {
                        display: false,
                    },
                }*/
            };

const myChart = new Chart(
                document.getElementById('myChart'),
                config
                );
