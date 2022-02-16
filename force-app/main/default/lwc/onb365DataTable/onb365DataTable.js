import { LightningElement, wire, track, api } from 'lwc';
// Apex Imports
import getCandidateOnboarding from '@salesforce/apex/getCandidateOnboarding.getONBDocs';


export default class Onb365DataTable extends LightningElement {
    @api recordId;
    @track candONBData;
    @track contactRow = {};
    @track rowOffset = 0;  
    @track modalContainer = false;

    @track columns = [
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }
    },
    {
        label: 'Onboarding Requirement',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true
    },
    {
        label: 'Status',
        fieldName: 'Onboarding_Status',
        type: 'text',
        sortable: true
    },
    {
        label: 'Date Last Modified',
        fieldName: 'Status_Changed_Date',
        type: 'date',
        sortable: true
    }
];

    connectedCallback() {
        console.log(this.recordId);
    }

    @wire(getCandidateOnboarding, {recordId: '$recordId'})
    returnedData({data, error}) {
        if(data) {
            let flattenedDatas = [];
            data.forEach( element => {
                let flattenedData = {};
                flattenedData.Id = element.Id;
                flattenedData.Name = element.Onboarding_Requirement__r.Name;
                flattenedData.Type = element.Onboarding_Requirement__r.Onboarding_Requirement_Type__c;
                flattenedData.Onboarding_Status = element.Onboarding_Requirement_Status__c;
                flattenedData.Status_Changed_Date = element.Status_Changed_Date__c;
                flattenedDatas.push(flattenedData);
            });
            this.candONBData = flattenedDatas;
            console.log(`Cand ONB returned: `, data);
        } else if (error) {
            console.log(`Errors ===> `, error);
        }
    };

    handleRowAction(event){
        const dataRow = event.detail.row;
        window.console.log('dataRow@@ ' + dataRow);
        this.contactRow = dataRow;
        window.console.log('contactRow## ' + dataRow);
        this.modalContainer = true;
     }
   
     closeModalAction(){
      this.modalContainer=false;
     }
}