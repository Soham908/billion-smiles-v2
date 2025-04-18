
export interface ICause {
    _id?: string;
    causeTitle: string;
    description: string;
    category: string;
    location: string;
    volunteerDate: Date;
    numberOfVolunteers?: number;
    amountRaised?: number;

    unitCost: number; // e.g., cost to feed 1 doggo
    minUnits: number; // e.g., minimum 750 doggos
    maxUnits: number; // e.g., maximum 1500 doggos
    unitDescription: string; // e.g., "Feeding one stray dog with a meal"

    imageUrl: string;
    ngoRef: string;
    ngoName: string;
    createdAt?: Date;
    supporterUsersRef?: string[];
    supporterCount?: number;
    status: 'Ongoing' | 'Needing Support' | 'Completed';
    needsVolunteers: boolean;
}