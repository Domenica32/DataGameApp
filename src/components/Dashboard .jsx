import React, { useState, useEffect, useRef } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import appFirebase from '../credenciales';
import { getFirestore } from 'firebase/firestore';
import Chart from 'chart.js/auto';

const Dashboard = ({ nrc, selectedLevel }) => {
  const [users, setUsers] = useState([]);
  const chartRef = useRef(null);

  const getUsers = async () => {
    const db = getFirestore(appFirebase);
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('NRC', '==', nrc));
    const data = await getDocs(q);

    setUsers(
      data.docs
        .filter((doc) => doc.data().rol === 'estudiante')
        .map((doc) => {
          const userData = doc.data();
          return {
            ...userData,
            id: doc.id,
            scores: userData.scores || {},
          };
        })
    );
  };

  useEffect(() => {
    getUsers();
  }, [nrc]);

  useEffect(() => {
    getUsers();
  }, [selectedLevel]);

  const getChartData = () => {
    const labels = users.map(() => '');
    const data = users.map((user) => user.scores[selectedLevel] || 0);

    return {
      labels: labels,
      datasets: [
        {
          label: `Puntuación en ${selectedLevel}`,
          data: data,
          fill: false,
          borderColor: '#FDD378',
          tension: 0.1,
        },
      ],
    };
  };

  useEffect(() => {
    const ctx = document.getElementById('myChart');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: getChartData(),
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Estudiantes',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Puntuación',
            },
          },
        },
      },
    });

    chartRef.current = newChart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [users, selectedLevel]);

  return (
    <div className='dashboard-container'>
      <h2>Estadísticas globales del curso</h2>
      <canvas id='myChart' width='500' height='500'></canvas>
    </div>
  );
};

export default Dashboard;
