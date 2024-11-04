/** @jsxImportSource @emotion/react */
import * as s from "./style";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function Graph({ graphData }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '매출',
            },
        },
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //x축 기준

    const data = {
        labels: graphData.date,
        datasets: [
            {
                label: '매출', //그래프 분류되는 항목
                // data: [1, 2, 3, 40000, 5, 6, 7], //실제 그려지는 데이터(Y축 숫자)
                data: graphData.amount, //실제 그려지는 데이터(Y축 숫자)
                borderColor: '#0000ff', //그래프 선 color
                // backgroundColor: 'rgba(255, 99, 132, 0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
            },
            {
                label: "환불액",
                data: graphData.refundAmount,
                borderColor: '#ff0000'
            }
        ]
    };

    return (
        <div css={s.layout}>
            {
                graphData.date.length !== 0 &&
                <Line options={options} data={data} />
            }
        </div>
    );
}

export default Graph;