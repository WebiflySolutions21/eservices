export const LOGIN_ROUTES = [
    {
        id:9,
        title:"Super Admin",
        path:"/super-admin",
        identification:"super-admin"
    },
    {
        id:1,
        title:"Admin Login",
        path:"/admin",
        identification:"admin"

    },
    {
        id:2,
        title:"Reception Login",
        path:"/reception",
        identification:"reception"
        
    },
    {
        id:3,
        title:"Staff Login",
        path:"/staff",
        identification:"staff"
        
    },
    {
        id:4,
        title:"Doctor Login",
        path:"/doctor",
        identification:"doctor"
        
    },
    {
        id:5,
        title:"Opthalmologist Login",
        path:"/opthalmologist",
        identification:"opthal"
        
    },
    {
        id:6,
        title:"Medical Login",
        path:"/medical",
        identification:"medical"
    },
    {
        id:7,
        title:"Lab Login",
        path:"/lab",
        identification:"lab"
    },{
        id:8,
        title:"Book Appointment",
        path:"/appointment",
        identification:"appointment"
    },
    {
        id:8,
        title:"Shift",
        path:"/shift-admin",
        identification:"shift"
    },
]

export const LOGIN_TYPE_LANDING_PAGE=[
    { item_id: 1, item_text: 'Staff',path:"/staff",id:"staff" },
    { item_id: 2, item_text: 'Doctor',path:"/doctor",id:"doctor" },
    { item_id: 3, item_text: 'Reception' ,path:"/reception",id:"reception"},
    { item_id: 4, item_text: 'Opthalmologist',path:"/opthal",id:"opthal" },
    { item_id: 5, item_text: 'Medical',path:"/medical",id:"medical" },
    { item_id: 6, item_text: 'Lab' ,path:"/lab",id:"lab"},
  ];
  
export const INPUT_TYPES = [
    { value: 'text', label: 'Text', placeholder: 'Enter text here' },
    { value: 'password', label: 'Password', placeholder: 'Enter your password' },
    { value: 'email', label: 'Email', placeholder: 'Enter your email' },
    { value: 'number', label: 'Number', placeholder: 'Enter a number' },
    { value: 'datetime', label: 'Date', placeholder: '' },
    { value: 'file', label: 'File', placeholder: '' },
    { value: 'checkbox', label: 'Checkbox', placeholder: '' },
    { value: 'radio', label: 'Radio', placeholder: '' },
  ];

export interface IFormValueData {
    isSubmit:boolean,
    isPreload:boolean,
    data:any
}
export interface DynamicFormConfig {
    id: number;
    loginType: string; // e.g., "Staff Login", "Doctor Login"
    formName: string;  // e.g., "Admission Form"
    fields: FormField[]; // Array of form fields
  }
  
  export interface FormField {
    label: string;
    type: string; // e.g., text, number, date, select
    required: boolean;
    options?: string[]; // for dropdowns
  }
  