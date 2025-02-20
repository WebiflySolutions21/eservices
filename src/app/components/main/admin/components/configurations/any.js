let data = {
    mainTitle:"title",
    mainDesc:"mainDesc",
    buttonTitle:"buttonTitle",
    "sections": [
        {
            "id": "dynamicFormConfig",
            "title": "Admission Form",
            "description": "Please fill Details Carefully",
            "piFields": [
                {
                    "type": "text",
                    "label": "Name",
                    "subLabel": "Fill all required fields carefully",
                    "apiKey": "name",
                    "default": "",
                    "placeholder": "Enter Name",
                    "info": "",
                    "validations": {
                        "required": {
                            "val": 1,
                            "msg": ""
                        }
                    },
                    "extra": {
                        "uploadApi": ""
                    },
                    "isRequired": "required"
                },
                {
                    "type": "number",
                    "label": "Contact No",
                    "subLabel": "Initial Details",
                    "apiKey": "contact_no",
                    "default": "0000000000",
                    "placeholder": "Enter Number",
                    "info": "",
                    "validations": {
                        "required": {
                            "val": 0,
                            "msg": ""
                        }
                    },
                    "extra": {
                        "uploadApi": ""
                    },
                    "isRequired": true
                }
            ],
            "sectionCta": {
                "label": "Submit",
                "showCta": true
            }
        }
    ],
    "hideSectionHeader": false,
    "isSubmit": true
}


let data2 = {
    "mainTitle": "Admission Form",
    "mainDesc": "Please fill Details Carefully",
    "buttonTitle": "Submit",
    "fields": [
        {
            "title": "Personal Details",
            "description": "Fill all required fields carefully",
            "label": "Name",
            "type": "text",
            "placeholder": "Enter Name",
            "defaultValue": "",
            "required": true
        },
        {
            "title": "Initial Assesment",
            "description": "Initial Details",
            "label": "Contact No",
            "type": "number",
            "placeholder": "Enter Number",
            "defaultValue": "0000000000",
            "required": false
        }
    ]
}

