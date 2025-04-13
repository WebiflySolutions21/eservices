export const ADMIN_ROUTES = [
  {
    id: 1,
    title: 'Configurations',
    path: '/configurations',
  },
  {
    id: 2,
    title: 'Add User',
    path: 'registration',
  },
  {
    id: 3,
    title: 'Titles Config',
    path: 'titles',
  },
  {
    id: 4,
    title: 'Deleted Patients',
    path: 'deleted-data',
  },
];

export const ADMIN_TABLE_DATA = [
  [
    {
      "_id": "ebd78f61-812a-4770-b9bb-7d69ac3371f4",
      "name": "Lokesh Bhaskar Thakare",
      "address": "Thane",
      "profession": "Engineer",
      "district": "Thane",
      "regDate": "2025-04-09",
      "sex": "Male",
      "age": "27",
      "dob": "2000-01-16",
      "username": "loki@gmail.com",
      "password": "Loki@123",
      "type": "Eye",
      "loginType": "Doctor",
      "photo": "1744213112145-photo.jpg",
      "signature": "1744213112150-signature.jpg",
      "govId": "1744213112153-govId.pdf"
    },
    {
      "_id": "c783077d-5af0-43fa-8c7d-ebb5acf2d7ef",
      "name": "Devesh",
      "address": "Sambhajinagar",
      "profession": "MBBS",
      "district": "Sambhajinagar",
      "regDate": "2025-04-09",
      "sex": "Male",
      "age": "21",
      "dob": "2003-11-06",
      "username": "devesh@gmail.com",
      "password": "Devesh@123",
      "type": "",
      "loginType": "Staff",
      "photo": "1744213235569-photo.jpg",
      "signature": "1744213235572-signature.jpg",
      "govId": "1744213235574-govId.jpg"
    },
    {
      "_id": "8abafeb5-77fd-43a2-a5c2-b54f76a2f9f0",
      "name": "Akash",
      "address": "Thane",
      "profession": "Engineer",
      "district": "Thane",
      "regDate": "2025-04-09",
      "sex": "Male",
      "age": "27",
      "dob": "2000-04-25",
      "username": "akash@gmail.com",
      "password": "Akash@123",
      "type": "",
      "loginType": "Reception",
      "photo": "1744213677046-photo.JPG",
      "signature": null,
      "govId": null
    }
  ]
]
export const ADMIN_TABLE_COLUMNS = [
    { key: 'id', title: 'ID' },
    { key: 'regDate', title: 'Registration Date', filterType: 'date' },
    { key: 'name', title: 'Name',   filterType: 'search', },
    { key: 'sex', title: 'Sex',   filterType: 'dropdown',options: ['Male', 'Female', 'Others'], },
    { key: 'age', title: 'Age' },
    { key: 'contact', title: 'Contact No',filterType: 'search', },
    { key: 'type', title: 'Specialization' },
    { key: 'loginType', title: 'Type',   filterType: 'dropdown',options: ['Doctor', 'Staff', 'Reception',"Lab","Medical"], },
    { key: 'username', title: 'Username' },
    { key: 'password', title: 'Password' },
]



