import React from 'react'
import { useState } from 'react'

function Patients() {
    const patientlist = [
        {
            key: "1",
            name: "Tom Holland",
            reason: "Stomachache",
            Date: "11-10-2024",
            status: "scheduled"
        },
        {
            key: "2",
            name: "Richard Maguire",
            reason: "Consultaion",
            Date: "12-10-2024",
            status: "scheduled"
        },
        {
            key: "3",
            name: "Samantha Vilson",
            reason: "Cold and Cough",
            Date: "15-10-24",
            status: "scheduled"

        },
    ];

    const [patients, setPatients] = useState(patientlist);
    const [completedCount,setCompletedCount] = useState(0);

    const handleComplete = (key) => {
        setPatients((prevPatients) => {
            const updatedPatients = [];
            
            for (let i = 0; i < prevPatients.length; i++) {
                const patient = prevPatients[i];
                
                if (patient.key === key) {
                    updatedPatients.push({ ...patient, status: 'completed' });
                } else {
                    updatedPatients.push(patient);
                }
            }
            
            return updatedPatients;
        });
        setCompletedCount((prevCount) => prevCount + 1);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto',backgroundColor:"aliceblue"}}>
          <h2>Patient Appointments</h2>
          {patients.map((patient) => (
            <div key={patient.key} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <h3 style={patient.status === 'completed' ? { textDecoration: 'line-through', color: 'gray' } : {}}>
                {patient.name}
              </h3>
              <p>Reason: {patient.reason}</p>
              <p>Date: {patient.Date}</p>
              <p>Status: {patient.status}</p>
              {patient.status === 'scheduled' && (
                <button onClick={() => handleComplete(patient.key)}>
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Total Completed Appointments: {completedCount}
          </div>
        </div>
      );

}

export default Patients;