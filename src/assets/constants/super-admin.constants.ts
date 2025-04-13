export const SUPER_ADMIN_ROUTES = [
    {
      id: 1,
      title: 'Register Hospital',
      path: '/hospital-registration',
    },
    {
      id: 2,
      title: 'Form Configurations',
      path: '/configurations',
    },
  ];

  export const SUPER_ADMIN_VIEW_ROUTES = [
    {
      id:3,
      title:'Dashboard',
      path:'super-admin-dashboard'
    },
    {
      id: 1,
      title: 'Register Hospital',
      path: '/hospital-registration',
    },
    {
      id: 2,
      title: 'Form Configurations',
      path: '/configurations',
    },
  ];


  export const SUPER_ADMIN_TABLE_DATA = [
    {
      id:1,
      regDate: '2023/10/01',
      name: 'ABC Hospital',
      mobile: '1234567890',
      hospRegNo: 'H123456',
      address: '123 Main St, City, Country',
    }
]
export const SUPER_ADMIN_TABLE_COLUMNS = [
    { key: 'id', title: 'ID' },
    { key: 'regDate', title: 'Registration Date', filterType: 'date' },
    {
      key: 'name',
      title: 'Hospital Name',
      filterType: 'search',
      type: 'text',
    },
    {
      key:'address',
      title:'Address',
      filterType: 'search',
      type: 'text',
    },
    {
      key: 'mobile',
      title: 'Hospital Contact No',
      filterType: 'search',
      type: 'number',
    },
    {
      key:'hospRegNo',
      title:'Hospital Registration No',
      filterType: 'search',
      type: 'text',
    }
  ]