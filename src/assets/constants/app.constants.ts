export const LOGIN_ROUTES = [
    {
        id:1,
        title:"Admin Login",
        path:"/admin",

    },
    {
        id:2,
        title:"New Registration",
        path:"/registration",
        
    },
    {
        id:3,
        title:"Staff Login",
        path:"/staff",
        
    },
    {
        id:4,
        title:"Doctor Login",
        path:"/doctor",
        
    },
    {
        id:5,
        title:"Opthalmologist Login",
        path:"/opthalmologist",
        
    },
    {
        id:6,
        title:"Medical Login",
        path:"/medical",
    },
    {
        id:7,
        title:"Lab Login",
        path:"/lab",
    },{
        id:8,
        title:"Book Appointment",
        path:"/appointment",
    },
    
]

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
  