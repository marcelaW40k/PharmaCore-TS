export class Prescription {
    id_prescription?: number | null;
    id_patient: number;
    id_doctor: number;
    issue_date: Date;   

    constructor(infoPrescription: {
        id_prescription?: number | null,
        id_patient: number,
        id_doctor: number,
        issue_date: Date
    }) {
        this.id_prescription = infoPrescription.id_prescription;
        this.id_patient = infoPrescription.id_patient;
        this.id_doctor = infoPrescription.id_doctor;
        this.issue_date = infoPrescription.issue_date;
    }
}