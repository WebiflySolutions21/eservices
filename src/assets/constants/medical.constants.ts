export const MEDICAL_TABLE_DATA = {
    patient: [
      {
        id: 1,
        regDate: '02/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Follow Up',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 2,
        regDate: '03/02/2024',
        patientName: 'Devesh Thakare',
        sex: 'Male',
        age: '21',
        contactNo: '8208030973',
        type: 'Appointment',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 3,
        regDate: '22/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Follow Up',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 4,
        regDate: '23/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Review',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 5,
        regDate: '12/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Skip',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 6,
        regDate: '10/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Skip',
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
    ],
  };
  
  
    export const MEDICAL_TABLE_COLUMNS = {
      patient: [
        { key: 'id', title: 'ID',filterType:"text" },
        { key: 'regDate', title: 'Registration Date', filterType: 'date' },
        {
          key: 'patientName',
          title: 'Patient Name',
          filterType: 'search',
          type: 'text',
        },
        {
          key: 'sex',
          title: 'Sex',
          filterType: 'dropdown',
          options: ['Male', 'Female', 'Others'],
        },
        { key: 'age', title: 'Age' },
        {
          key: 'contactNo',
          title: 'Contact No',
          filterType: 'search',
          type: 'number',
        },
        {
          key: 'type',
          title: 'Type',
          filterType: 'dropdown',
          options: ['Skip', 'Appointment', 'Follow Up',"Review"],
        },
      ],
    };

    export const MEDICAL_VIEW_ROUTES = [
        {
          id: 1,
          title: 'Dashboard',
          path: '/medical-dashboard',
        },
      ];