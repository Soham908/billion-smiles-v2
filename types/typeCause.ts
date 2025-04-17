
export interface ICause {
    _id: string;
    causeTitle: string;
    description: string;
    category: string;
    location: string;
    volunteerDate: Date;
    numberOfVolunteers: number;
    amountRaised: number;
    amountRequired: string;
    image?: string;
    ngoRef: string;
    ngoName: string;
    createdAt: Date;
    supporterUsersRef: string[];
    supporterCount: number;
    status: 'Ongoing' | 'Needing Support' | 'Completed';
    needsVolunteers: boolean
}