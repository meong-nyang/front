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

function Graph({ graphData, showRefund }) {
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
        scales: {
            y: {
                beginAtZero: true,
                min: 0
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '매출(원)',
            },
        },
    };

    const Alldata = {
        labels: graphData.date,
        datasets: [
            {
                label: '매출',
                data: graphData.amount,
                borderColor: '#0000ff',
            },
            {
                label: "환불액",
                data: graphData.refundAmount,
                borderColor: '#ff0000',
            }
        ]
    };

    const Amountdata = {
        labels: graphData.date,
        datasets: [
            {
                label: '매출',
                data: graphData.amount,
                borderColor: '#0000ff',
            }
        ]
    };

    return (
        <div css={s.layout}>
            <Line options={options} data={showRefund ? Alldata : Amountdata} />
        </div>
    );
}

export default Graph;