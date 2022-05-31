import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement, Title, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { ToDo } from './main';
import styles from "./charts.module.css";

const Chart = () => {

    const [tasks, setTasks] = useState<ToDo[]>([]);

    useEffect(() => {

        axios.get('http://localhost:3000/api/tasks')
            .then(function (response: any) {
                setTasks(response.data)
            }
            );

    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

    //////////////////////////////////////////////////////////

    // PIE CHART   

    const getAColor = () => {
        const color = Math.floor(Math.random() * 16777215).toString(16);

        return "#" + color;
    }

    const uncompletedTasks = tasks.filter((task) => task.status === "uncompleted").length;
    const inprogressTasks = tasks.filter((task) => task.status === "inprogress").length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;

    const statusValues: number[] = [uncompletedTasks, inprogressTasks, completedTasks];

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'STATUS',
            },
        },
    };

    const dataPC = {
        labels: ["UNCOMPLETED", "INPROGRESS", "COMPLETED"],
        datasets: [
            {
                data: statusValues,
                backgroundColor: [
                    getAColor(),
                    getAColor(),
                    getAColor()
                ],
                borderColor: [],
                borderWidth: 1.5,
            },
        ],
    };

    ////////////////////////////////////////////////////////

    // VERTICAL BAR CHART

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'PRIORITY',
            },
        },
    };



    const lowPriorityTasks = tasks.filter((task) => task.priority === 3).length;
    const moderatePriorityTasks = tasks.filter((task) => task.priority === 2).length;
    const urgentPriorityTasks = tasks.filter((task) => task.priority === 1).length;

    const priorityValues: number[] = [lowPriorityTasks, moderatePriorityTasks, urgentPriorityTasks];

    const labels = ["LOW / MODERATE / URGENT"];

    const dataVBC = {
        labels,
        datasets: [
            {
                label: 'LOW',
                data: [priorityValues[0]],
                backgroundColor: "gold",
            },
            {
                label: 'MODERATE',
                data: [priorityValues[1]],

                backgroundColor: "darkorange",
            },
            {
                label: 'URGENT',
                data: [priorityValues[2]], 
                backgroundColor: "red",
            },
        ],
    };





    ////////////////////////////////////////////////////////

    return (
        <React.Fragment>
            <section className={styles.chartsContainer}>
                <Pie options={optionsPie} data={dataPC} />
                <Bar options={optionsBar} data={dataVBC} />
            </section>
            
        </React.Fragment>
    );
}

export default Chart;

