const axios = require('axios');

const data = {
    hsp_id: 'BNG135',
    hsp_name: 'Fortis Hospitals',
    hsp_dept: 'Lung Diagnosis Specialists',
    hsp_timing: '00 to 23 hrs'
};

axios
    .post('http://localhost:8081', data)
    .then(res => {
        console.log("Status code:", res.status);
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
